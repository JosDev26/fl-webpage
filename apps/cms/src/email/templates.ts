type Language = 'es' | 'en'

// rgba equivalents over #19304B background:
// rgba(255,255,255,0.5) → #8C97A5
// rgba(255,255,255,0.6) → #9BA6B0
// rgba(255,255,255,0.1) border → #324A65

function baseLayout(content: string, preheader?: string, logoUrl?: string): string {
  const headerContent = logoUrl
    ? `<!--[if !mso]><!--><img src="${logoUrl}" alt="Fusion Legal" height="56" style="display:block;margin:0 auto;border:0;outline:0;max-height:56px;" /><!--<![endif]--><!--[if mso]><h1 style="margin:0;color:#FAD02C;font-size:24px;font-weight:bold;font-family:Arial,sans-serif;">Fusion Legal</h1><![endif]-->`
    : `<h1 style="margin:0;color:#FAD02C;font-size:24px;font-weight:bold;letter-spacing:0.02em;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Fusion Legal</h1>`
  return `<!DOCTYPE html>
<html lang="es" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <title>Fusion Legal</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap');
    body { margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .preheader { display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .email-cell { padding: 24px 20px !important; }
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a, p, h1, h2, h3 { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body bgcolor="#f4f4f4" style="margin:0;padding:0;background-color:#f4f4f4;">
  ${preheader ? `<div class="preheader" style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:40px 0;">
        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>
        <![endif]-->
        <table class="email-container" role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#19304B" style="max-width:600px;width:100%;background-color:#19304B;">
          <tr>
            <td align="center" bgcolor="#19304B" style="padding:24px 40px;text-align:center;border-bottom:3px solid #FAD02C;background-color:#19304B;">
              ${headerContent}
            </td>
          </tr>
          ${content}
        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
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
  logoUrl?: string,
): { subject: string; html: string } {
  const t = i18n.confirmation[language]
  const confirmUrl = `${siteUrl}/api/subscribers/confirm?token=${encodeURIComponent(token)}`

  const content = `
    <tr>
      <td class="email-cell" bgcolor="#19304B" style="padding:32px 40px;color:#ffffff;font-size:16px;line-height:1.7;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;"><strong>${t.heading}</strong></p>
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${t.body}</p>
        <div style="padding-bottom:16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td bgcolor="#FAD02C" style="background-color:#FAD02C;padding:14px 32px;">
                <a href="${confirmUrl}" style="color:#19304B;font-size:16px;font-weight:bold;text-decoration:none;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${t.cta}</a>
              </td>
            </tr>
          </table>
        </div>
        <p style="margin:0;font-size:13px;color:#9BA6B0;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${t.ignore}</p>
      </td>
    </tr>
    <tr>
      <td bgcolor="#19304B" style="padding:24px 40px;text-align:center;font-size:12px;color:#8C97A5;border-top:1px solid #324A65;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;color:#8C97A5;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Fusion Legal</p>
      </td>
    </tr>`

  return { subject: t.subject, html: baseLayout(content, t.preheader, logoUrl) }
}

export function newTagTemplate(
  language: Language,
  tagName: string,
  unsubscribeToken: string,
  siteUrl: string,
  logoUrl?: string,
): { subject: string; html: string } {
  const t = i18n.newTag[language]
  const unsub = i18n.unsubscribe[language]
  const unsubUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
  const blogUrl = `${siteUrl}/blog`

  const content = `
    <tr>
      <td class="email-cell" bgcolor="#19304B" style="padding:32px 40px;color:#ffffff;font-size:16px;line-height:1.7;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;"><strong>${t.heading}</strong></p>
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${t.body(tagName)}</p>
        <div style="padding-bottom:16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td bgcolor="#FAD02C" style="background-color:#FAD02C;padding:14px 32px;">
                <a href="${blogUrl}" style="color:#19304B;font-size:16px;font-weight:bold;text-decoration:none;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${t.cta}</a>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
    <tr>
      <td bgcolor="#19304B" style="padding:24px 40px;text-align:center;font-size:12px;color:#8C97A5;border-top:1px solid #324A65;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:8px;color:#8C97A5;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Fusion Legal</p>
        <p style="margin:0;"><a href="${unsubUrl}" style="color:#8C97A5;text-decoration:underline;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${unsub}</a></p>
      </td>
    </tr>`

  return { subject: t.subject(tagName), html: baseLayout(content, t.preheader(tagName), logoUrl) }
}

export function campaignTemplate(
  subject: string,
  bodyHtml: string,
  unsubscribeToken: string,
  siteUrl: string,
  language: Language = 'es',
  logoUrl?: string,
): string {
  const unsub = i18n.unsubscribe[language]
  const unsubUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`

  const content = `
    <tr>
      <td class="email-cell" bgcolor="#19304B" style="padding:32px 40px;color:#ffffff;font-size:16px;line-height:1.7;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        ${bodyHtml}
      </td>
    </tr>
    <tr>
      <td bgcolor="#19304B" style="padding:24px 40px;text-align:center;font-size:12px;color:#8C97A5;border-top:1px solid #324A65;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:8px;color:#8C97A5;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Fusion Legal</p>
        <p style="margin:0;"><a href="${unsubUrl}" style="color:#8C97A5;text-decoration:underline;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${unsub}</a></p>
      </td>
    </tr>`

  return baseLayout(content, subject, logoUrl)
}

export function blogPostTemplate(
  subject: string,
  preheader: string,
  bodyText: string,
  ctaUrl: string,
  unsubscribeToken: string,
  siteUrl: string,
  language: Language = 'es',
  imageUrl?: string,
  logoUrl?: string,
): string {
  const ctaLabel = i18n.blogPost[language].cta
  const unsub = i18n.unsubscribe[language]
  const unsubUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`

  const imageRow = imageUrl
    ? `<tr>
      <td bgcolor="#19304B" style="padding:0;background-color:#19304B;font-size:0;line-height:0;">
        <img src="${imageUrl}" alt="" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:0;text-decoration:none;" />
      </td>
    </tr>`
    : ''

  const content = `
    ${imageRow}
    <tr>
      <td class="email-cell" bgcolor="#19304B" style="padding:32px 40px;color:#ffffff;font-size:16px;line-height:1.7;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;"><strong>${subject}</strong></p>
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${bodyText}</p>
        <div style="padding-bottom:16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td bgcolor="#FAD02C" style="background-color:#FAD02C;padding:14px 32px;">
                <a href="${ctaUrl}" style="color:#19304B;font-size:16px;font-weight:bold;text-decoration:none;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${ctaLabel}</a>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
    <tr>
      <td bgcolor="#19304B" style="padding:24px 40px;text-align:center;font-size:12px;color:#8C97A5;border-top:1px solid #324A65;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:8px;color:#8C97A5;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Fusion Legal</p>
        <p style="margin:0;"><a href="${unsubUrl}" style="color:#8C97A5;text-decoration:underline;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${unsub}</a></p>
      </td>
    </tr>`

  return baseLayout(content, preheader || subject, logoUrl)
}

export function contactFormTemplate(
  name: string,
  email: string,
  message: string,
  logoUrl?: string,
): { subject: string; html: string } {
  const subject = `Nuevo mensaje de contacto — ${name}`
  const escapedMessage = message.replace(/\n/g, '<br>')

  const content = `
    <tr>
      <td class="email-cell" bgcolor="#19304B" style="padding:32px 40px;color:#ffffff;font-size:16px;line-height:1.7;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;padding-bottom:16px;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;"><strong>Nuevo mensaje desde el formulario de contacto</strong></p>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr>
            <td style="padding:8px 0;color:#9BA6B0;vertical-align:top;width:120px;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Nombre</td>
            <td style="padding:8px 0;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9BA6B0;vertical-align:top;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Correo</td>
            <td style="padding:8px 0;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;"><a href="mailto:${email}" style="color:#FAD02C;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9BA6B0;vertical-align:top;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Mensaje</td>
            <td style="padding:8px 0;color:#ffffff;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${escapedMessage}</td>
          </tr>
        </table>
        <div style="padding-bottom:16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td bgcolor="#FAD02C" style="background-color:#FAD02C;padding:14px 32px;">
                <a href="mailto:${email}" style="color:#19304B;font-size:16px;font-weight:bold;text-decoration:none;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Responder</a>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
    <tr>
      <td bgcolor="#19304B" style="padding:24px 40px;text-align:center;font-size:12px;color:#8C97A5;border-top:1px solid #324A65;background-color:#19304B;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
        <p style="margin:0;color:#8C97A5;font-family:'Nunito Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Fusion Legal</p>
      </td>
    </tr>`

  return { subject, html: baseLayout(content, subject, logoUrl) }
}
