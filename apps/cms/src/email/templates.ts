type Language = 'es' | 'en'

function baseLayout(content: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fusion Legal</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap');
    body { margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-wrapper { width: 100%; background-color: #f4f4f4; padding: 40px 0; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #19304B; font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-header { padding: 32px 40px 24px; text-align: center; border-bottom: 3px solid #FAD02C; }
    .email-header h1 { margin: 0; color: #FAD02C; font-size: 24px; font-weight: 800; letter-spacing: 0.02em; font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-body { padding: 32px 40px; color: #ffffff; font-size: 16px; line-height: 1.7; font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-body p { margin: 0 0 16px; }
    .email-body a { color: #FAD02C; }
    .email-cta { display: inline-block; padding: 14px 32px; background-color: #FAD02C; color: #19304B; font-size: 16px; font-weight: 700; text-decoration: none; margin: 8px 0 16px; font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-footer { padding: 24px 40px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.5); border-top: 1px solid rgba(255,255,255,0.1); font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-footer a { color: rgba(255,255,255,0.5); text-decoration: underline; }
    .preheader { display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; }
  </style>
</head>
<body>
  ${preheader ? `<span class="preheader">${preheader}</span>` : ''}
  <div class="email-wrapper">
    <div class="email-container">
      <div class="email-header">
        <h1>Fusion Legal</h1>
      </div>
      ${content}
    </div>
  </div>
</body>
</html>`
}

const i18n = {
  confirmation: {
    es: {
      subject: 'Confirma tu suscripción — Fusion Legal',
      preheader: 'Un clic para completar tu suscripción',
      heading: '¡Casi listo!',
      body: 'Gracias por suscribirte a nuestro boletín. Solo falta un paso: confirma tu dirección de correo haciendo clic en el botón de abajo.',
      cta: 'Confirmar suscripción',
      ignore: 'Si no solicitaste esta suscripción, puedes ignorar este correo.',
    },
    en: {
      subject: 'Confirm your subscription — Fusion Legal',
      preheader: 'One click to complete your subscription',
      heading: 'Almost there!',
      body: 'Thanks for subscribing to our newsletter. Just one more step: confirm your email address by clicking the button below.',
      cta: 'Confirm subscription',
      ignore: "If you didn't request this subscription, you can ignore this email.",
    },
  },
  newTag: {
    es: {
      subject: (tag: string) => `Nueva categoría disponible: ${tag}`,
      preheader: (tag: string) => `Explora contenido sobre ${tag}`,
      heading: '¡Nueva categoría!',
      body: (tag: string) =>
        `Acabamos de agregar la categoría <strong>${tag}</strong> a nuestro blog. Podrías encontrar contenido relevante para ti.`,
      cta: 'Ver el blog',
    },
    en: {
      subject: (tag: string) => `New category available: ${tag}`,
      preheader: (tag: string) => `Explore content about ${tag}`,
      heading: 'New category!',
      body: (tag: string) =>
        `We just added the <strong>${tag}</strong> category to our blog. You might find relevant content there.`,
      cta: 'View the blog',
    },
  },
  unsubscribe: {
    es: 'Desuscribirse',
    en: 'Unsubscribe',
  },
  blogPost: {
    es: {
      cta: 'Leer el artículo →',
    },
    en: {
      cta: 'Read the article →',
    },
  },
}

export function confirmationTemplate(
  language: Language,
  token: string,
  siteUrl: string,
): { subject: string; html: string } {
  const t = i18n.confirmation[language]
  const confirmUrl = `${siteUrl}/api/subscribers/confirm?token=${encodeURIComponent(token)}`

  const content = `
    <div class="email-body">
      <p><strong>${t.heading}</strong></p>
      <p>${t.body}</p>
      <p><a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;background-color:#FAD02C;color:#19304B !important;font-size:16px;font-weight:700;text-decoration:none;margin:8px 0 16px;">${t.cta}</a></p>
      <p style="font-size: 13px; color: rgba(255,255,255,0.6);">${t.ignore}</p>
    </div>
    <div class="email-footer">
      <p>Fusion Legal</p>
    </div>`

  return { subject: t.subject, html: baseLayout(content, t.preheader) }
}

export function newTagTemplate(
  language: Language,
  tagName: string,
  unsubscribeToken: string,
  siteUrl: string,
): { subject: string; html: string } {
  const t = i18n.newTag[language]
  const unsub = i18n.unsubscribe[language]
  const unsubUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
  const blogUrl = `${siteUrl}/blog`

  const content = `
    <div class="email-body">
      <p><strong>${t.heading}</strong></p>
      <p>${t.body(tagName)}</p>
      <p><a href="${blogUrl}" style="display:inline-block;padding:14px 32px;background-color:#FAD02C;color:#19304B !important;font-size:16px;font-weight:700;text-decoration:none;margin:8px 0 16px;">${t.cta}</a></p>
    </div>
    <div class="email-footer">
      <p>Fusion Legal</p>
      <p><a href="${unsubUrl}">${unsub}</a></p>
    </div>`

  return { subject: t.subject(tagName), html: baseLayout(content, t.preheader(tagName)) }
}

export function campaignTemplate(
  subject: string,
  bodyHtml: string,
  unsubscribeToken: string,
  siteUrl: string,
  language: Language = 'es',
): string {
  const unsub = i18n.unsubscribe[language]
  const unsubUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`

  const content = `
    <div class="email-body">
      ${bodyHtml}
    </div>
    <div class="email-footer">
      <p>Fusion Legal</p>
      <p><a href="${unsubUrl}">${unsub}</a></p>
    </div>`

  return baseLayout(content, subject)
}

export function blogPostTemplate(
  subject: string,
  preheader: string,
  bodyText: string,
  ctaUrl: string,
  unsubscribeToken: string,
  siteUrl: string,
  language: Language = 'es',
): string {
  const ctaLabel = i18n.blogPost[language].cta
  const unsub = i18n.unsubscribe[language]
  const unsubUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`

  const content = `
    <div class="email-body">
      <p><strong>${subject}</strong></p>
      <p>${bodyText}</p>
      <p><a href="${ctaUrl}" style="display:inline-block;padding:14px 32px;background-color:#FAD02C;color:#19304B !important;font-size:16px;font-weight:700;text-decoration:none;margin:8px 0 16px;">${ctaLabel}</a></p>
    </div>
    <div class="email-footer">
      <p>Fusion Legal</p>
      <p><a href="${unsubUrl}">${unsub}</a></p>
    </div>`

  return baseLayout(content, preheader || subject)
}
