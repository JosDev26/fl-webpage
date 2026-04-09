'use client'

import React, { useMemo } from 'react'
import { useFormFields } from '@payloadcms/ui'

const YELLOW = '#FAD02C'
const DARK_BLUE = '#19304B'

export const EmailPreviewField: React.FC = () => {
  const subject = useFormFields(([fields]) => fields.subject)
  const body = useFormFields(([fields]) => fields.body)
  const status = useFormFields(([fields]) => fields.status)

  const subjectValue = (subject?.value as string) || ''
  const statusValue = (status?.value as string) || 'draft'

  const bodyHtml = useMemo(() => {
    if (!body?.value) return ''
    return lexicalToSimpleHtml(body.value)
  }, [body?.value])

  const previewHtml = useMemo(() => {
    return buildPreviewHtml(subjectValue, bodyHtml)
  }, [subjectValue, bodyHtml])

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.label}>Vista previa del correo</span>
        {statusValue === 'sent' && (
          <span style={styles.sentBadge}>Enviado</span>
        )}
      </div>
      <div style={styles.subjectRow}>
        <span style={styles.subjectLabel}>Asunto:</span>
        <span style={styles.subjectValue}>{subjectValue || '(sin asunto)'}</span>
      </div>
      <iframe
        srcDoc={previewHtml}
        style={styles.iframe}
        sandbox="allow-same-origin"
        title="Email preview"
      />
    </div>
  )
}

function buildPreviewHtml(subject: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .email-wrapper { width: 100%; background: #f4f4f4; padding: 32px 0; }
    .email-container { max-width: 600px; margin: 0 auto; background: ${DARK_BLUE}; }
    .email-header { padding: 28px 36px 20px; text-align: center; border-bottom: 3px solid ${YELLOW}; }
    .email-header h1 { margin: 0; color: ${YELLOW}; font-size: 22px; font-weight: 800; }
    .email-body { padding: 28px 36px; color: #fff; font-size: 15px; line-height: 1.7; }
    .email-body p { margin: 0 0 14px; }
    .email-body a { color: ${YELLOW}; }
    .email-body ul, .email-body ol { padding-left: 20px; }
    .email-body li { margin-bottom: 6px; }
    .email-body blockquote { border-left: 3px solid ${YELLOW}; padding-left: 16px; margin: 12px 0; color: rgba(255,255,255,0.7); }
    .email-footer { padding: 20px 36px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.1); }
    .email-footer a { color: rgba(255,255,255,0.4); text-decoration: underline; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="email-header"><h1>Fusion Legal</h1></div>
      <div class="email-body">${bodyHtml || '<p style="color:rgba(255,255,255,0.3);font-style:italic;">(escribe contenido arriba para ver la vista previa)</p>'}</div>
      <div class="email-footer"><p>Fusion Legal</p><p><a href="#">Desuscribirse</a></p></div>
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function lexicalToSimpleHtml(content: any): string {
  if (!content || typeof content !== 'object' || !content.root) return ''
  return serializeNode(content.root)
}

function serializeNode(node: any): string {
  if (node.type === 'text') {
    let text = escapeHtml(node.text || '')
    const f = node.format || 0
    if (f & 1) text = `<strong>${text}</strong>`
    if (f & 2) text = `<em>${text}</em>`
    if (f & 8) text = `<u>${text}</u>`
    if (f & 4) text = `<s>${text}</s>`
    return text
  }
  if (node.type === 'linebreak') return '<br/>'
  const children = (node.children || []).map(serializeNode).join('')
  switch (node.type) {
    case 'root': return children
    case 'paragraph': return `<p>${children}</p>`
    case 'heading': return `<${node.tag || 'h2'}>${children}</${node.tag || 'h2'}>`
    case 'list': return node.listType === 'number' ? `<ol>${children}</ol>` : `<ul>${children}</ul>`
    case 'listitem': return `<li>${children}</li>`
    case 'quote': return `<blockquote>${children}</blockquote>`
    case 'link':
    case 'autolink': {
      const url = node.fields?.url || node.url || '#'
      return `<a href="${escapeHtml(url)}">${children}</a>`
    }
    default: return children
  }
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 'calc(var(--base) * 1.5)',
    marginBottom: 'calc(var(--base) * 1.5)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: 'calc(var(--base) * 0.8)',
  },
  label: {
    fontSize: 'calc(var(--base) * 0.54)',
    fontWeight: 400,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: YELLOW,
  },
  sentBadge: {
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 8px',
    background: 'rgba(250,208,44,0.15)',
    color: YELLOW,
    borderRadius: '3px',
  },
  subjectRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: 'calc(var(--base) * 0.6)',
    fontSize: '13px',
    color: 'var(--theme-elevation-500)',
  },
  subjectLabel: {
    fontWeight: 700,
    color: 'var(--theme-elevation-400)',
  },
  subjectValue: {
    color: '#fff',
  },
  iframe: {
    width: '100%',
    height: '480px',
    border: `1px solid rgba(250,208,44,0.15)`,
    borderRadius: '2px',
    background: '#f4f4f4',
  },
}
