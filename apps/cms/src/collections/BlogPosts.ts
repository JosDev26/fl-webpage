import type { CollectionConfig } from 'payload'
import { decryptEmail } from '../email/crypto'
import { sendEmail } from '../email/resend'
import { blogPostTemplate } from '../email/templates'

function getCmsUrl(): string {
  return process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

function getSiteUrl(): string {
  const url = process.env.PUBLIC_SITE_URL
  if (!url) throw new Error('PUBLIC_SITE_URL is not set')
  return url.replace(/\/$/, '')
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'published_date'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        // Prevent re-triggering when we update linkedCampaignId
        if (req?.context?.skipEmailHook) return doc

        const justPublished =
          doc.status === 'published' &&
          (operation === 'create' || previousDoc?.status === 'draft')

        if (
          !justPublished ||
          !doc.sendEmailCampaign ||
          doc.linkedCampaignId
        ) {
          return doc
        }

        // Must have tags
        const postTagIds = Array.isArray(doc.tags)
          ? doc.tags.map((t: any) => (typeof t === 'object' ? t.id : t))
          : []

        if (postTagIds.length === 0) return doc

        // Fire async
        void sendBlogEmail(doc, postTagIds, req.payload)

        return doc
      },
    ],
  },
  endpoints: [
    {
      path: '/increment-views',
      method: 'post',
      handler: async (req) => {
        try {
          const body = await req.json!()
          const slug = body?.slug

          if (!slug || typeof slug !== 'string') {
            return Response.json({ error: 'Slug is required' }, { status: 400 })
          }

          const result = await req.payload.find({
            collection: 'blog-posts',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 0,
          })

          const post = result.docs[0]
          if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 })
          }

          await req.payload.update({
            collection: 'blog-posts',
            id: post.id,
            data: { views: (Number(post.views) || 0) + 1 },
            depth: 0,
          })

          return Response.json({ success: true })
        } catch {
          return Response.json({ error: 'Internal error' }, { status: 500 })
        }
      },
    },
    {
      path: '/stats',
      method: 'get',
      handler: async (req) => {
        try {
          const allPosts = await req.payload.find({
            collection: 'blog-posts',
            limit: 0,
            depth: 1,
          })

          const docs = allPosts.docs as any[]
          const published = docs.filter((d) => d.status === 'published')
          const drafts = docs.filter((d) => d.status === 'draft')
          const totalViews = docs.reduce((sum, d) => sum + (Number(d.views) || 0), 0)

          // Top 5 most viewed
          const topPosts = [...docs]
            .sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0))
            .slice(0, 5)
            .map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              views: Number(d.views) || 0,
              status: d.status,
            }))

          // Posts this month
          const now = new Date()
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
          const thisMonth = published.filter(
            (d) => d.published_date && d.published_date >= startOfMonth,
          )

          // Posts per tag
          const tagCounts: Record<string, number> = {}
          for (const doc of docs) {
            if (doc.tags && Array.isArray(doc.tags)) {
              for (const tag of doc.tags) {
                const name = typeof tag === 'object' ? tag.name : String(tag)
                if (name) tagCounts[name] = (tagCounts[name] || 0) + 1
              }
            }
          }
          const tagsBreakdown = Object.entries(tagCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)

          // Recent 5 posts
          const recent = [...published]
            .sort(
              (a, b) =>
                new Date(b.published_date || 0).getTime() -
                new Date(a.published_date || 0).getTime(),
            )
            .slice(0, 5)
            .map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              published_date: d.published_date,
              views: Number(d.views) || 0,
            }))

          return Response.json({
            totalPosts: docs.length,
            publishedCount: published.length,
            draftCount: drafts.length,
            totalViews,
            topPosts,
            thisMonthCount: thisMonth.length,
            tagsBreakdown,
            recent,
          })
        } catch {
          return Response.json({ error: 'Internal error' }, { status: 500 })
        }
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'URL amigable, ej: mi-primer-articulo',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extracto',
      admin: {
        description: 'Resumen corto para la lista de artículos',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenido',
    },
    {
      name: 'cover_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },
    {
      name: 'published_date',
      type: 'date',
      label: 'Fecha de publicación',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Etiquetas',
      admin: {
        description: 'Selecciona una o más etiquetas para este artículo',
      },
    },
    {
      name: 'views',
      type: 'number',
      label: 'Visitas',
      defaultValue: 0,
      admin: {
        description: 'Contador de visitas del artículo',
      },
    },
    {
      name: 'meta_title',
      type: 'text',
      label: 'Meta título (SEO)',
      admin: {
        description: 'Si se deja vacío, se usa el título del artículo',
      },
    },
    {
      name: 'meta_description',
      type: 'textarea',
      label: 'Meta descripción (SEO)',
    },
    // ── Email Marketing ──────────────────────────────
    {
      name: 'sendEmailCampaign',
      type: 'checkbox',
      label: 'Iniciar email marketing para este blog',
      defaultValue: false,
      admin: {
        description: 'Activa para enviar un email a los suscriptores cuando publiques este artículo',
      },
    },
    {
      name: 'blogEmailWarning',
      type: 'ui',
      label: ' ',
      admin: {
        condition: (data: any) => Boolean(data?.sendEmailCampaign),
        components: {
          Field: './components/BlogEmailWarning#BlogEmailWarning',
        },
      },
    },
    {
      name: 'blogEmailAutoFill',
      type: 'ui',
      label: ' ',
      admin: {
        components: {
          Field: './components/BlogEmailAutoFill#BlogEmailAutoFill',
        },
      },
    },
    {
      name: 'emailSubject',
      type: 'text',
      label: 'Asunto del correo',
      admin: {
        condition: (data: any) => Boolean(data?.sendEmailCampaign),
        description: 'Editable antes de publicar.',
        placeholder: 'Título del correo',
      },
    },
    {
      name: 'emailPreheader',
      type: 'text',
      label: 'Subtítulo / Preheader',
      admin: {
        condition: (data: any) => Boolean(data?.sendEmailCampaign),
        description: 'Texto corto visible en la bandeja de entrada',
        placeholder: 'Vista previa del correo',
      },
    },
    {
      name: 'emailBodyText',
      type: 'textarea',
      label: 'Texto del email',
      admin: {
        condition: (data: any) => Boolean(data?.sendEmailCampaign),
        description: 'Editable antes de publicar.',
        placeholder: 'Texto introductorio del email',
      },
    },
    {
      name: 'emailTargetLanguage',
      type: 'select',
      label: 'Idioma del email',
      options: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
        { label: 'Todos', value: 'all' },
      ],
      defaultValue: 'es',
      admin: {
        condition: (data: any) => Boolean(data?.sendEmailCampaign),
      },
    },
    {
      name: 'linkedCampaignId',
      type: 'number',
      admin: { hidden: true, readOnly: true },
    },
    {
      name: 'emailSentAt',
      type: 'date',
      admin: { hidden: true, readOnly: true },
    },
  ],
}

/** Convert plain text (with \n\n paragraph breaks) to minimal valid Lexical JSON */
function textToLexicalJson(text: string): object {
  const paragraphs = (text || '').split('\n\n').filter(Boolean)
  const children = paragraphs.length > 0 ? paragraphs : ['']
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: children.map((para) => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [
          {
            type: 'text',
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: para,
          },
        ],
      })),
    },
  }
}

async function sendBlogEmail(
  doc: any,
  postTagIds: number[],
  payload: any,
): Promise<void> {
  try {
    const cmsUrl = getCmsUrl()
    const siteUrl = getSiteUrl()

    // Find confirmed subscribers with at least one matching tag
    const result = await payload.find({
      collection: 'subscribers',
      where: {
        status: { equals: 'confirmed' },
        tags: { in: postTagIds },
      },
      limit: 0,
      depth: 0,
      overrideAccess: true,
    })

    const subscribers = result.docs as any[]
    if (subscribers.length === 0) {
      console.log(`[BlogEmail] No matching subscribers for "${doc.title}"`)
      return
    }

    const subject = doc.emailSubject || doc.title
    const preheader = doc.emailPreheader || ''
    const bodyText = doc.emailBodyText || doc.excerpt || ''
    const ctaUrl = `${siteUrl}/blog/${doc.slug}`
    const language = doc.emailTargetLanguage === 'en' ? 'en' : 'es'

    let sentCount = 0

    for (const sub of subscribers) {
      if (!sub.emailEncrypted || !sub.emailIv || !sub.unsubscribeToken) continue
      try {
        const email = decryptEmail(sub.emailEncrypted, sub.emailIv)
        const html = blogPostTemplate(
          subject,
          preheader,
          bodyText,
          ctaUrl,
          sub.unsubscribeToken,
          cmsUrl,
          language,
        )
        const emailResult = await sendEmail({ to: email, subject, html })
        if (emailResult.success) sentCount++
      } catch (err) {
        console.error(`[BlogEmail] Failed for subscriber ${sub.id}:`, err)
      }
    }

    // Create an EmailCampaign record
    const campaign = await payload.create({
      collection: 'email-campaigns',
      overrideAccess: true,
      data: {
        subject,
        preheader,
        body: textToLexicalJson(bodyText),
        targetLanguage: doc.emailTargetLanguage || 'es',
        status: 'sent',
        sentAt: new Date().toISOString(),
        recipientCount: sentCount,
        campaignType: 'blog-post',
        linkedBlogPost: doc.id,
      },
    })

    // Update blog post with campaign link (guard against re-send)
    await payload.update({
      collection: 'blog-posts',
      id: doc.id,
      overrideAccess: true,
      context: { skipEmailHook: true },
      data: {
        linkedCampaignId: campaign.id,
        emailSentAt: new Date().toISOString(),
      },
    })

    console.log(`[BlogEmail] "${subject}" sent to ${sentCount} subscribers, campaign #${campaign.id}`)
  } catch (err) {
    console.error('[BlogEmail] Error:', err)
  }
}
