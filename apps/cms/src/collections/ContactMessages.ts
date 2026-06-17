import type { CollectionConfig } from 'payload'
import { sendEmail } from '../email/resend'
import { contactFormTemplate } from '../email/templates'

const MAX_NAME = 200
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getContactEmail(): string {
  return process.env.CONTACT_EMAIL || 'josueherreradev@gmail.com'
}

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    description: 'Mensajes recibidos desde el formulario de contacto del sitio web',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  endpoints: [
    {
      path: '/submit',
      method: 'post',
      handler: async (req) => {
        try {
          const body = await req.json!()
          const name = typeof body?.name === 'string' ? body.name.trim() : ''
          const email = typeof body?.email === 'string' ? body.email.trim() : ''
          const message = typeof body?.message === 'string' ? body.message.trim() : ''
          const honeypot = body?.website

          // Honeypot check — bots fill this hidden field
          if (honeypot) {
            return Response.json({ success: true })
          }

          if (!name || name.length > MAX_NAME) {
            return Response.json(
              { error: 'Nombre inválido' },
              { status: 400 },
            )
          }

          if (!email || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL) {
            return Response.json(
              { error: 'Correo electrónico inválido' },
              { status: 400 },
            )
          }

          if (!message || message.length > MAX_MESSAGE) {
            return Response.json(
              { error: 'Mensaje inválido' },
              { status: 400 },
            )
          }

          // Save to database
          await req.payload.create({
            collection: 'contact-messages',
            data: { name, email, message, status: 'new' },
            overrideAccess: true,
          })

          // Send notification email
          const { subject, html } = contactFormTemplate(name, email, message)
          const result = await sendEmail({
            to: getContactEmail(),
            subject,
            html,
          })

          if (!result.success) {
            console.error('[ContactMessages] Email failed:', result.error)
            // Still return success — the message was saved to DB
          }

          return Response.json({ success: true })
        } catch (err) {
          console.error('[ContactMessages] Error:', err)
          return Response.json(
            { error: 'Error interno del servidor' },
            { status: 500 },
          )
        }
      },
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: MAX_NAME,
      label: 'Nombre',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Correo electrónico',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: MAX_MESSAGE,
      label: 'Mensaje',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Leído', value: 'read' },
        { label: 'Respondido', value: 'replied' },
      ],
      label: 'Estado',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
