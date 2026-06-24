'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'

const TEMPLATES = [
  { id: 'confirmation-es', label: 'Confirmación de suscripción (ES)' },
  { id: 'confirmation-en', label: 'Subscription confirmation (EN)' },
  { id: 'new-tag-es', label: 'Nueva categoría (ES)' },
  { id: 'new-tag-en', label: 'New category (EN)' },
  { id: 'blog-post-es', label: 'Nuevo artículo del blog (ES)' },
  { id: 'blog-post-en', label: 'New blog post (EN)' },
  { id: 'campaign-es', label: 'Campaña de correo (ES)' },
  { id: 'contact', label: 'Formulario de contacto' },
]

export default function EmailPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  const [selected, setSelected] = useState(TEMPLATES[0].id)
  const [sendTo, setSendTo] = useState('')
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ ok: boolean; msg: string } | null>(null)

  async function handleSendTest() {
    if (!sendTo) return
    setSending(true)
    setSendResult(null)
    try {
      const res = await fetch('/email-preview/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: selected, to: sendTo }),
      })
      const data = await res.json()
      if (res.ok) {
        setSendResult({ ok: true, msg: `✓ Enviado a ${data.to}` })
      } else {
        setSendResult({ ok: false, msg: data.error ?? 'Error desconocido' })
      }
    } catch (e) {
      setSendResult({ ok: false, msg: 'Error de red' })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f1117; }
        .ep-root { background: #0f1117; color: #eee; font-family: system-ui, sans-serif; min-height: 100vh; }
        .ep-header { padding: 20px 32px; border-bottom: 1px solid #222; }
        .ep-header h1 { font-size: 16px; color: #FAD02C; font-weight: 700; letter-spacing: .04em; }
        .ep-nav { display: flex; gap: 8px; flex-wrap: wrap; padding: 16px 32px; border-bottom: 1px solid #222; }
        .ep-btn { padding: 6px 14px; background: #1e2230; border: none; border-radius: 4px; font-size: 13px; color: #ccc; cursor: pointer; }
        .ep-btn:hover { background: #2a2f42; }
        .ep-btn.active { background: #FAD02C; color: #0f1117; font-weight: 600; }
        .ep-main { padding: 24px 32px; }
        .ep-label { font-size: 12px; color: #FAD02C; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px; }
        .ep-frame { width: 100%; height: 80vh; border: none; border-radius: 6px; background: #f4f4f4; }
        .ep-send { display: flex; gap: 8px; align-items: center; padding: 12px 32px; border-bottom: 1px solid #222; flex-wrap: wrap; }
        .ep-send input { flex: 1; min-width: 200px; padding: 7px 12px; background: #1e2230; border: 1px solid #333; border-radius: 4px; color: #eee; font-size: 13px; outline: none; }
        .ep-send input:focus { border-color: #FAD02C; }
        .ep-send button { padding: 7px 18px; background: #FAD02C; color: #0f1117; border: none; border-radius: 4px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; }
        .ep-send button:disabled { opacity: 0.5; cursor: not-allowed; }
        .ep-result { font-size: 12px; padding: 2px 6px; border-radius: 3px; }
        .ep-result.ok { color: #4ade80; }
        .ep-result.err { color: #f87171; }
      `}</style>
      <div className="ep-root">
        <div className="ep-header">
          <h1>Email Previews — Fusion Legal</h1>
        </div>
        <nav className="ep-nav">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`ep-btn${selected === t.id ? ' active' : ''}`}
              onClick={() => setSelected(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="ep-send">
          <input
            type="email"
            placeholder="correo@destino.com"
            value={sendTo}
            onChange={(e) => { setSendTo(e.target.value); setSendResult(null) }}
            onKeyDown={(e) => e.key === 'Enter' && handleSendTest()}
          />
          <button onClick={handleSendTest} disabled={sending || !sendTo}>
            {sending ? 'Enviando…' : 'Enviar prueba →'}
          </button>
          {sendResult && (
            <span className={`ep-result ${sendResult.ok ? 'ok' : 'err'}`}>{sendResult.msg}</span>
          )}
        </div>
        <div className="ep-main">
          <p className="ep-label">{TEMPLATES.find((t) => t.id === selected)?.label}</p>
          <iframe
            key={selected}
            className="ep-frame"
            src={`/email-preview/${selected}`}
            title="email preview"
          />
        </div>
      </div>
    </>
  )
}
