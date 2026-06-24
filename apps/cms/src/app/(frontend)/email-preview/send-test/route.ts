import { NextRequest, NextResponse } from 'next/server'
import {
  confirmationTemplate,
  newTagTemplate,
  campaignTemplate,
  blogPostTemplate,
  contactFormTemplate,
} from '@/email/templates'
import { sendEmail } from '@/email/resend'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 })
  }

  if (!process.env.MAILTRAP_API_TOKEN) {
    return NextResponse.json(
      { error: 'MAILTRAP_API_TOKEN no está configurado en el .env' },
      { status: 400 },
    )
  }

  const { template, to } = await req.json()

  if (!to || !template) {
    return NextResponse.json({ error: 'Faltan campos: template, to' }, { status: 400 })
  }

  const SITE = 'https://fusionlegal.com'
  const CMS_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? new URL(req.url).origin
  const TOKEN = 'sample-token-abc123'

  let html: string
  let subject: string

  switch (template) {
    case 'confirmation-es': {
      const t = confirmationTemplate('es', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`)
      html = t.html; subject = t.subject
      break
    }
    case 'confirmation-en': {
      const t = confirmationTemplate('en', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`)
      html = t.html; subject = t.subject
      break
    }
    case 'new-tag-es': {
      const t = newTagTemplate('es', 'Derecho Laboral', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`)
      html = t.html; subject = t.subject
      break
    }
    case 'new-tag-en': {
      const t = newTagTemplate('en', 'Labor Law', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`)
      html = t.html; subject = t.subject
      break
    }
    case 'blog-post-es':
      subject = '5 errores que cometen los negocios con sus contratos'
      html = blogPostTemplate(
        subject,
        'Evita estos errores antes de que sea tarde',
        'Muchos dueños de negocios firman contratos sin revisarlos adecuadamente. En este artículo te explicamos los cinco errores más comunes y cómo evitarlos.',
        `${SITE}/blog/5-errores-contratos`,
        TOKEN, SITE, 'es',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
        `${CMS_URL}/fl_logo.webp`,
      )
      break
    case 'blog-post-en':
      subject = '5 mistakes businesses make with their contracts'
      html = blogPostTemplate(
        subject,
        'Avoid these mistakes before it is too late',
        'Many business owners sign contracts without reviewing them properly.',
        `${SITE}/blog/5-contract-mistakes`,
        TOKEN, SITE, 'en',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
        `${CMS_URL}/fl_logo.webp`,
      )
      break
    case 'campaign-es':
      subject = 'Novedades de Junio 2026'
      html = campaignTemplate(
        subject,
        '<p style="margin:0;padding-bottom:16px;color:#ffffff;">Hola,</p><p style="margin:0;color:#ffffff;">Este mes publicamos nuevos artículos sobre <strong style="color:#ffffff;">cumplimiento fiscal</strong> y <strong style="color:#ffffff;">contratos comerciales</strong>.</p>',
        TOKEN, SITE, 'es',
        `${CMS_URL}/fl_logo.webp`,
      )
      break
    case 'contact': {
      const t = contactFormTemplate('Juan Pérez', 'juan.perez@ejemplo.com', 'Mensaje de prueba desde el formulario de contacto.', `${CMS_URL}/fl_logo.webp`)
      html = t.html; subject = t.subject
      break
    }
    default:
      return NextResponse.json({ error: `Template desconocido: ${template}` }, { status: 400 })
  }

  const result = await sendEmail({ to, subject, html })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ ok: true, to, subject })
}
