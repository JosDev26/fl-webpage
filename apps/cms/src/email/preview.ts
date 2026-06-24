/**
 * Email preview generator — run with:
 *   npm run preview:emails   (from apps/cms)
 *
 * Opens a local HTML page with all email templates rendered side-by-side.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  confirmationTemplate,
  newTagTemplate,
  campaignTemplate,
  blogPostTemplate,
  contactFormTemplate,
} from './templates.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../../email-previews')
fs.mkdirSync(outDir, { recursive: true })

// ── Sample data ──────────────────────────────────────────────────────────────
const SITE = 'https://fusionlegal.com'
const TOKEN = 'sample-token-abc123'

const templates: { name: string; html: string }[] = [
  {
    name: '1-confirmacion-es',
    html: confirmationTemplate('es', TOKEN, SITE).html,
  },
  {
    name: '2-confirmacion-en',
    html: confirmationTemplate('en', TOKEN, SITE).html,
  },
  {
    name: '3-nueva-categoria-es',
    html: newTagTemplate('es', 'Derecho Laboral', TOKEN, SITE).html,
  },
  {
    name: '4-nueva-categoria-en',
    html: newTagTemplate('en', 'Labor Law', TOKEN, SITE).html,
  },
  {
    name: '5-blog-post-es',
    html: blogPostTemplate(
      '5 errores que cometen los negocios con sus contratos',
      'Evita estos errores antes de que sea tarde',
      'Muchos dueños de negocios firman contratos sin revisarlos adecuadamente. En este artículo te explicamos los cinco errores más comunes y cómo evitarlos.',
      `${SITE}/blog/5-errores-contratos`,
      TOKEN,
      SITE,
      'es',
    ),
  },
  {
    name: '6-blog-post-en',
    html: blogPostTemplate(
      '5 mistakes businesses make with their contracts',
      'Avoid these mistakes before it is too late',
      'Many business owners sign contracts without reviewing them properly. In this article we explain the five most common mistakes and how to avoid them.',
      `${SITE}/blog/5-contract-mistakes`,
      TOKEN,
      SITE,
      'en',
    ),
  },
  {
    name: '7-campana-es',
    html: campaignTemplate(
      'Novedades de Junio 2026',
      '<p style="margin:0 0 16px;color:#ffffff;">Hola,</p><p style="margin:0 0 16px;color:#ffffff;">Este mes hemos publicado nuevos artículos sobre <strong style="color:#ffffff;">cumplimiento fiscal</strong> y <strong style="color:#ffffff;">contratos comerciales</strong>.</p><p style="margin:0 0 16px;color:#ffffff;">No te pierdas nuestras actualizaciones.</p>',
      TOKEN,
      SITE,
      'es',
    ),
  },
  {
    name: '8-contacto',
    html: contactFormTemplate(
      'Juan Pérez',
      'juan.perez@ejemplo.com',
      'Hola, me gustaría obtener más información sobre sus servicios de asesoría legal para mi negocio. ¿Podrían contactarme esta semana?',
    ).html,
  },
]

// ── Write individual HTML files ───────────────────────────────────────────────
for (const t of templates) {
  fs.writeFileSync(path.join(outDir, `${t.name}.html`), t.html, 'utf8')
}

// ── Write index page with iframes ────────────────────────────────────────────
const iframes = templates
  .map(
    (t) => `
  <section>
    <h2>${t.name}</h2>
    <iframe src="./${t.name}.html" title="${t.name}"></iframe>
  </section>`,
  )
  .join('\n')

const index = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Email Previews — Fusion Legal</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: #1a1a2e; color: #eee; }
    h1 { padding: 24px 32px 0; font-size: 20px; color: #FAD02C; }
    section { padding: 16px 32px 32px; border-bottom: 1px solid #333; }
    h2 { font-size: 13px; color: #FAD02C; letter-spacing: .05em; text-transform: uppercase; margin: 0 0 12px; }
    iframe { width: 100%; height: 700px; border: none; border-radius: 4px; background: #f4f4f4; }
  </style>
</head>
<body>
  <h1>Email Previews — Fusion Legal</h1>
  ${iframes}
</body>
</html>`

const indexPath = path.join(outDir, 'index.html')
fs.writeFileSync(indexPath, index, 'utf8')

console.log(`\nPreviews generados en: ${outDir}`)
console.log(`Abre en tu navegador: file://${indexPath.replace(/\\/g, '/')}\n`)
