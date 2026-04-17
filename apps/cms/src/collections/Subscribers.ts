import type { CollectionConfig } from 'payload'
import { encryptEmail, hashEmail, decryptEmail, generateToken } from '../email/crypto'
import { sendEmail } from '../email/resend'
import { confirmationTemplate, newTagTemplate } from '../email/templates'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getSiteUrl(): string {
  const url = process.env.PUBLIC_SITE_URL
  if (!url) throw new Error('PUBLIC_SITE_URL is not set')
  return url.replace(/\/$/, '')
}

function getCmsUrl(): string {
  return process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'emailHash',
    defaultColumns: ['emailHash', 'status', 'language', 'confirmedAt'],
    description: 'Suscriptores al boletín de email marketing',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc.emailEncrypted && doc.emailIv) {
          try {
            doc.emailDecrypted = decryptEmail(doc.emailEncrypted, doc.emailIv)
          } catch {
            doc.emailDecrypted = '[error al descifrar]'
          }
        }
        return doc
      },
    ],
  },
  endpoints: [
    {
      path: '/subscribe',
      method: 'post',
      handler: async (req) => {
        try {
          const body = await req.json!()
          const email = body?.email
          const tags = body?.tags
          const language = body?.language || 'es'

          if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
            return Response.json(
              { error: 'Correo electrónico inválido' },
              { status: 400 },
            )
          }

          if (language !== 'es' && language !== 'en') {
            return Response.json({ error: 'Idioma inválido' }, { status: 400 })
          }

          const hash = hashEmail(email)

          const existing = await req.payload.find({
            collection: 'subscribers',
            where: { emailHash: { equals: hash } },
            limit: 1,
            depth: 0,
            overrideAccess: true,
          })

          if (existing.docs.length > 0) {
            const sub = existing.docs[0] as any
            // DEV MODE: always allow re-subscribe by deleting existing record
            await req.payload.delete({
              collection: 'subscribers',
              id: sub.id,
              overrideAccess: true,
            })
          }

          const { encrypted, iv } = encryptEmail(email)
          const confirmToken = generateToken()
          const unsubscribeToken = generateToken()

          const tagIds =
            Array.isArray(tags) && tags.length > 0
              ? tags.map((t: unknown) => Number(t)).filter((n: number) => Number.isFinite(n))
              : []

          await req.payload.create({
            collection: 'subscribers',
            overrideAccess: true,
            data: {
              emailHash: hash,
              emailEncrypted: encrypted,
              emailIv: iv,
              tags: tagIds,
              language,
              status: 'pending',
              confirmToken,
              unsubscribeToken,
            },
          })

          const cmsUrl = getCmsUrl()
          const template = confirmationTemplate(language, confirmToken, cmsUrl)

          const emailResult = await sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
          })

          if (!emailResult.success) {
            console.error('[Subscribe] Email send failed:', emailResult.error)
          }

          return Response.json({ success: true })
        } catch (err) {
          console.error('[Subscribe]', err)
          return Response.json({ error: 'Error interno' }, { status: 500 })
        }
      },
    },
    {
      path: '/confirm',
      method: 'get',
      handler: async (req) => {
        try {
          const url = new URL(req.url || '', 'http://localhost')
          const token = url.searchParams.get('token')

          if (!token) {
            return new Response(htmlPage('Token inválido', 'No se proporcionó un token.'), {
              status: 400,
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            })
          }

          const result = await req.payload.find({
            collection: 'subscribers',
            where: { confirmToken: { equals: token } },
            limit: 1,
            depth: 0,
            overrideAccess: true,
          })

          if (result.docs.length === 0) {
            return new Response(
              htmlPage('Token no encontrado', 'Este enlace ya fue usado o es inválido.'),
              { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
            )
          }

          const sub = result.docs[0]

          await req.payload.update({
            collection: 'subscribers',
            id: sub.id,
            overrideAccess: true,
            data: {
              status: 'confirmed',
              confirmedAt: new Date().toISOString(),
              confirmToken: '',
            },
          })

          const siteUrl = getSiteUrl()
          return new Response(
            htmlPage(
              '¡Suscripción confirmada!',
              `Tu correo ha sido confirmado exitosamente. Recibirás nuestro contenido.
              <br><br><a href="${siteUrl}/blog" style="color:#FAD02C;">Volver al blog</a>`,
            ),
            { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
          )
        } catch (err) {
          console.error('[Confirm]', err)
          return new Response(htmlPage('Error', 'Ocurrió un error inesperado.'), {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          })
        }
      },
    },
    {
      path: '/unsubscribe',
      method: 'get',
      handler: async (req) => {
        try {
          const url = new URL(req.url || '', 'http://localhost')
          const token = url.searchParams.get('token')

          if (!token) {
            return new Response(htmlPage('Token inválido', 'No se proporcionó un token.'), {
              status: 400,
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            })
          }

          const result = await req.payload.find({
            collection: 'subscribers',
            where: { unsubscribeToken: { equals: token } },
            limit: 1,
            depth: 0,
            overrideAccess: true,
          })

          if (result.docs.length === 0) {
            return new Response(
              htmlPage('Token no encontrado', 'Este enlace ya fue usado o es inválido.'),
              { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
            )
          }

          await req.payload.update({
            collection: 'subscribers',
            id: result.docs[0].id,
            overrideAccess: true,
            data: {
              status: 'unsubscribed',
              unsubscribeToken: '',
            },
          })

          const siteUrl = getSiteUrl()
          return new Response(
            htmlPage(
              'Te has desuscrito',
              `Ya no recibirás correos de nuestra parte.
              <br><br><a href="${siteUrl}" style="color:#FAD02C;">Volver al sitio</a>`,
            ),
            { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
          )
        } catch (err) {
          console.error('[Unsubscribe]', err)
          return new Response(htmlPage('Error', 'Ocurrió un error inesperado.'), {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          })
        }
      },
    },
    {
      path: '/stats',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const all = await req.payload.find({
            collection: 'subscribers',
            where: { status: { equals: 'confirmed' } },
            limit: 0,
            depth: 1,
            overrideAccess: true,
          })

          const confirmed = all.docs as any[]
          const totalConfirmed = confirmed.length

          const tagCounts: Record<string, number> = {}
          for (const sub of confirmed) {
            if (sub.tags && Array.isArray(sub.tags)) {
              for (const tag of sub.tags) {
                const name = typeof tag === 'object' ? tag.name : String(tag)
                if (name) tagCounts[name] = (tagCounts[name] || 0) + 1
              }
            }
          }

          const topSubscribedTags = Object.entries(tagCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)

          return Response.json({ totalConfirmed, topSubscribedTags })
        } catch (err) {
          console.error('[SubscriberStats]', err)
          return Response.json({ error: 'Internal error' }, { status: 500 })
        }
      },
    },
  ],
  fields: [
    {
      name: 'emailHash',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Email (hash)',
      admin: {
        readOnly: true,
        description: 'SHA-256 del correo — usado para buscar duplicados',
      },
    },
    {
      name: 'emailDecrypted',
      type: 'text',
      label: 'Email',
      admin: {
        readOnly: true,
        description: 'Email descifrado (solo visible en admin, no almacenado)',
      },
      hooks: {
        beforeChange: [({ siblingData }) => {
          delete siblingData.emailDecrypted
        }],
      },
    },
    {
      name: 'emailEncrypted',
      type: 'text',
      required: true,
      label: 'Email (cifrado)',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'emailIv',
      type: 'text',
      required: true,
      label: 'IV',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Etiquetas de interés',
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      label: 'Idioma',
      options: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'es',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Confirmado', value: 'confirmed' },
        { label: 'Desuscrito', value: 'unsubscribed' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'confirmToken',
      type: 'text',
      index: true,
      label: 'Token de confirmación',
      admin: { hidden: true },
    },
    {
      name: 'unsubscribeToken',
      type: 'text',
      index: true,
      label: 'Token de desuscripción',
      admin: { hidden: true },
    },
    {
      name: 'confirmedAt',
      type: 'date',
      label: 'Confirmado el',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}

/** Sends new tag notification to all confirmed subscribers */
export async function notifySubscribersAboutNewTag(
  payload: any,
  tagName: string,
): Promise<void> {
  const cmsUrl = getCmsUrl()

  const result = await payload.find({
    collection: 'subscribers',
    where: { status: { equals: 'confirmed' } },
    limit: 0,
    depth: 0,
    overrideAccess: true,
  })

  const subscribers = result.docs as any[]

  for (const sub of subscribers) {
    if (!sub.emailEncrypted || !sub.emailIv || !sub.unsubscribeToken) continue
    try {
      const email = decryptEmail(sub.emailEncrypted, sub.emailIv)
      const lang = sub.language === 'en' ? 'en' : 'es'
      const template = newTagTemplate(lang, tagName, sub.unsubscribeToken, cmsUrl)
      void sendEmail({ to: email, subject: template.subject, html: template.html })
    } catch (err) {
      console.error(`[NewTagNotify] Failed for subscriber ${sub.id}:`, err)
    }
  }
}

function htmlPage(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} — Fusion Legal</title>
  <style>
    body{margin:0;background:#19304B;color:#fff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .card{max-width:480px;padding:48px;text-align:center}
    h1{color:#FAD02C;font-size:28px;margin:0 0 16px}
    p{font-size:16px;line-height:1.7;color:rgba(255,255,255,0.85);margin:0}
    a{color:#FAD02C;text-decoration:none;font-weight:700}
    a:hover{text-decoration:underline}
  </style>
</head>
<body><div class="card"><h1>${title}</h1><p>${body}</p></div></body>
</html>`
}
