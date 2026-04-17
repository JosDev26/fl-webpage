/**
 * Simple Lexical JSON to HTML serializer for Payload CMS rich text fields.
 * Handles the most common Lexical node types.
 */

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  listType?: string
  url?: string
  newTab?: boolean
  value?: { url?: string; alt?: string; width?: number; height?: number }
  fields?: { url?: string; linkType?: string; newTab?: boolean; width?: number }
  direction?: string
  indent?: number
  version?: number
}

interface LexicalRoot {
  root: LexicalNode
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8
const FORMAT_STRIKETHROUGH = 4
const FORMAT_CODE = 16

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function serializeNode(node: LexicalNode): string {
  if (node.type === 'text') {
    let text = escapeHtml(node.text || '')
    const format = node.format || 0
    if (format & FORMAT_BOLD) text = `<strong>${text}</strong>`
    if (format & FORMAT_ITALIC) text = `<em>${text}</em>`
    if (format & FORMAT_UNDERLINE) text = `<u>${text}</u>`
    if (format & FORMAT_STRIKETHROUGH) text = `<s>${text}</s>`
    if (format & FORMAT_CODE) text = `<code>${text}</code>`
    return text
  }

  if (node.type === 'linebreak') return '<br />'

  const children = (node.children || []).map(serializeNode).join('')

  switch (node.type) {
    case 'root':
      return children
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading':
      return `<${node.tag || 'h2'}>${children}</${node.tag || 'h2'}>`
    case 'list':
      return node.listType === 'number'
        ? `<ol>${children}</ol>`
        : `<ul>${children}</ul>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'link':
    case 'autolink': {
      const url = node.fields?.url || node.url || '#'
      const target = node.fields?.newTab || node.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${escapeHtml(url)}"${target}>${children}</a>`
    }
    case 'upload': {
      const imgUrl = node.value?.url || ''
      const alt = node.value?.alt || ''
      const customWidth = node.fields?.width
      const widthAttr = customWidth ? ` width="${customWidth}" style="max-width:${customWidth}px;height:auto;"` : ''
      return `<img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(alt)}"${widthAttr} loading="lazy" />`
    }
    default:
      return children
  }
}

export function lexicalToHtml(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const data = content as LexicalRoot
  if (!data.root) return ''
  return serializeNode(data.root)
}
