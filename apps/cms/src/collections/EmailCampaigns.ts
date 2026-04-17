import type { CollectionConfig } from 'payload'
import { decryptEmail } from '../email/crypto'
import { sendEmail } from '../email/resend'
import { campaignTemplate } from '../email/templates'
import { lexicalToHtml } from '../email/lexical-serialize'

function getCmsUrl(): string {
  return process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

export const EmailCampaigns: CollectionConfig = {
  slug: 'email-campaigns',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'targetLanguage', 'recipientCount', 'sentAt'],
    description: 'Campañas de email marketing',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        const wasDraft =
          operation === 'update' && previousDoc?.status === 'draft' && doc.status === 'sent'

        if (!wasDraft) return doc

        // Fire-and-forget: send emails async
        void sendCampaignEmails(doc, req.payload)

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Asunto',
    },
    {
      name: 'preheader',
      type: 'text',
      label: 'Preheader',
      admin: {
        description: 'Texto de vista previa en la bandeja de entrada',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Contenido',
    },
    {
      name: 'targetTags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Etiquetas destino',
      admin: {
        description: 'Vacío = todos los suscriptores confirmados',
      },
    },
    {
      name: 'targetLanguage',
      type: 'select',
      required: true,
      label: 'Idioma destino',
      options: [
        { label: 'Todos', value: 'all' },
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'all',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Enviado', value: 'sent' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'sentAt',
      type: 'date',
      label: 'Enviado el',
      admin: {
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'recipientCount',
      type: 'number',
      label: 'Destinatarios',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Cantidad de correos enviados',
      },
    },
    {
      name: 'emailPreview',
      type: 'ui',
      label: 'Vista previa del correo',
      admin: {
        components: {
          Field: './components/EmailPreviewField#EmailPreviewField',
        },
      },
    },
    {
      name: 'campaignType',
      type: 'select',
      label: 'Tipo de campaña',
      options: [
        { label: 'Manual', value: 'manual' },
        { label: 'Blog Post', value: 'blog-post' },
      ],
      defaultValue: 'manual',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'linkedBlogPost',
      type: 'relationship',
      relationTo: 'blog-posts',
      label: 'Blog vinculado',
      admin: {
        readOnly: true,
        condition: (data: any) => data?.campaignType === 'blog-post',
      },
    },
  ],
}

async function sendCampaignEmails(campaign: any, payload: any): Promise<void> {
  try {
    const cmsUrl = getCmsUrl()
    const bodyHtml = lexicalToHtml(campaign.body)

    // Build subscriber query
    const where: any = { status: { equals: 'confirmed' } }

    if (campaign.targetLanguage && campaign.targetLanguage !== 'all') {
      where.language = { equals: campaign.targetLanguage }
    }

    // If targeting specific tags, find subscribers with at least one matching tag
    const targetTagIds =
      Array.isArray(campaign.targetTags) && campaign.targetTags.length > 0
        ? campaign.targetTags.map((t: any) => (typeof t === 'object' ? t.id : t))
        : null

    if (targetTagIds) {
      where.tags = { in: targetTagIds }
    }

    const result = await payload.find({
      collection: 'subscribers',
      where,
      limit: 0,
      depth: 0,
      overrideAccess: true,
    })

    const subscribers = result.docs as any[]
    let sentCount = 0

    for (const sub of subscribers) {
      if (!sub.emailEncrypted || !sub.emailIv || !sub.unsubscribeToken) continue
      try {
        const email = decryptEmail(sub.emailEncrypted, sub.emailIv)
        const lang = sub.language === 'en' ? 'en' : 'es'
        const html = campaignTemplate(
          campaign.subject,
          bodyHtml,
          sub.unsubscribeToken,
          cmsUrl,
          lang,
        )
        const result = await sendEmail({ to: email, subject: campaign.subject, html })
        if (result.success) sentCount++
      } catch (err) {
        console.error(`[Campaign] Failed for subscriber ${sub.id}:`, err)
      }
    }

    // Update campaign with sent metadata
    await payload.update({
      collection: 'email-campaigns',
      id: campaign.id,
      overrideAccess: true,
      data: {
        sentAt: new Date().toISOString(),
        recipientCount: sentCount,
      },
    })

    console.log(`[Campaign] "${campaign.subject}" sent to ${sentCount} subscribers`)
  } catch (err) {
    console.error('[Campaign] Error sending campaign:', err)
  }
}
