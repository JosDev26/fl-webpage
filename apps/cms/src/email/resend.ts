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

export async function sendEmail(options: {
  to: string
  subject: string
  html: string
}): Promise<{ success: boolean; error?: string }> {
  const from = process.env.FROM_EMAIL
  if (!from) throw new Error('FROM_EMAIL is not set')

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
