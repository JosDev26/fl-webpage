import { NextRequest, NextResponse } from 'next/server'
import {
  confirmationTemplate,
  newTagTemplate,
  campaignTemplate,
  blogPostTemplate,
  contactFormTemplate,
} from '@/email/templates'

// Only available in development
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ template: string }> },
) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not Found', { status: 404 })
  }

  const { template } = await params
  const SITE = 'https://fusionlegal.com'
  const CMS_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? new URL(req.url).origin
  const TOKEN = 'sample-token-abc123'

  let html: string | undefined

  switch (template) {
    case 'confirmation-es':
      html = confirmationTemplate('es', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`).html
      break
    case 'confirmation-en':
      html = confirmationTemplate('en', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`).html
      break
    case 'new-tag-es':
      html = newTagTemplate('es', 'Derecho Laboral', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`).html
      break
    case 'new-tag-en':
      html = newTagTemplate('en', 'Labor Law', TOKEN, SITE, `${CMS_URL}/fl_logo.webp`).html
      break
    case 'blog-post-es':
      html = blogPostTemplate(
        '5 errores que cometen los negocios con sus contratos',
        'Evita estos errores antes de que sea tarde',
        'Muchos dueños de negocios firman contratos sin revisarlos adecuadamente. En este artículo te explicamos los cinco errores más comunes y cómo evitarlos.',
        `${SITE}/blog/5-errores-contratos`,
        TOKEN,
        SITE,
        'es',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
        `${CMS_URL}/fl_logo.webp`,
      )
      break
    case 'blog-post-en':
      html = blogPostTemplate(
        '5 mistakes businesses make with their contracts',
        'Avoid these mistakes before it is too late',
        'Many business owners sign contracts without reviewing them properly. In this article we explain the five most common mistakes and how to avoid them.',
        `${SITE}/blog/5-contract-mistakes`,
        TOKEN,
        SITE,
        'en',
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
        `${CMS_URL}/fl_logo.webp`,
      )
      break
    case 'campaign-es':
      html = campaignTemplate(
        'Novedades de Junio 2026',
        '<p style="margin:0 0 16px;color:#ffffff;">Hola,</p><p style="margin:0 0 16px;color:#ffffff;">Este mes publicamos nuevos artículos sobre <strong style="color:#ffffff;">cumplimiento fiscal</strong> y <strong style="color:#ffffff;">contratos comerciales</strong>.</p>',
        TOKEN,
        SITE,
        'es',
        `${CMS_URL}/fl_logo.webp`,
      )
      break
    case 'contact':
      html = contactFormTemplate(
        'Juan Pérez',
        'juan.perez@ejemplo.com',
        'Hola, me gustaría obtener más información sobre sus servicios de asesoría legal para mi negocio.',
        `${CMS_URL}/fl_logo.webp`,
      ).html
      break
    default:
      return new NextResponse('Not Found', { status: 404 })
  }

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
