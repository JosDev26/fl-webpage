import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('RESEND_API_KEY is not set')
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

/** Parse "Display Name <email@domain.com>" or plain "email@domain.com" */
function parseFrom(raw: string): { name: string; email: string } {
  const match = raw.match(/^(.+?)\s*<(.+?)>$/)
  if (match) return { name: match[1].trim(), email: match[2].trim() }
  return { name: 'Fusion Legal', email: raw.trim() }
}

/** Send via Mailtrap Email Testing sandbox (development only) */
async function sendViaMailtrap(options: {
  to: string
  subject: string
  html: string
}): Promise<{ success: boolean; error?: string }> {
  const token = process.env.MAILTRAP_API_TOKEN!
  const inboxId = process.env.MAILTRAP_INBOX_ID
  if (!inboxId) throw new Error('MAILTRAP_INBOX_ID is not set')

  const from = process.env.FROM_EMAIL
  if (!from) throw new Error('FROM_EMAIL is not set')

  try {
    const res = await fetch(`https://sandbox.api.mailtrap.io/api/send/${inboxId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: parseFrom(from),
        to: [{ email: options.to }],
        subject: options.subject,
        html: options.html,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[Mailtrap] Error:', res.status, body)
      return { success: false, error: `Mailtrap ${res.status}: ${body}` }
    }

    console.log(`[Mailtrap] ✓ Sent to ${options.to}: "${options.subject}"`)
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Mailtrap] Failed:', message)
    return { success: false, error: message }
  }
}

export async function sendEmail(options: {
  to: string
  subject: string
  html: string
}): Promise<{ success: boolean; error?: string }> {
  const from = process.env.FROM_EMAIL
  if (!from) throw new Error('FROM_EMAIL is not set')

  // Development override: route all emails to Mailtrap sandbox when token is present
  if (process.env.MAILTRAP_API_TOKEN) {
    return sendViaMailtrap(options)
  }

  try {
    const resend = getResend()
    await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error'
    console.error('[Resend] Failed to send email:', message)
    return { success: false, error: message }
  }
}
