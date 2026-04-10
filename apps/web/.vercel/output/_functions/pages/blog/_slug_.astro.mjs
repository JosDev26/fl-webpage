import { c as createComponent, d as renderComponent, r as renderTemplate, e as createAstro, b as addAttribute, u as unescapeHTML, m as maybeRenderHead } from '../../chunks/astro/server_sMJyriu2.mjs';
import 'piccolore';
import { $ as $$Layout, b as $$Footer, a as $$Navbar } from '../../chunks/Footer_2rUtrsMj.mjs';
import { g as getBlogPost } from '../../chunks/payload_DrePLXtL.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_UNDERLINE = 8;
const FORMAT_STRIKETHROUGH = 4;
const FORMAT_CODE = 16;
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function serializeNode(node) {
  if (node.type === "text") {
    let text = escapeHtml(node.text || "");
    const format = node.format || 0;
    if (format & FORMAT_BOLD) text = `<strong>${text}</strong>`;
    if (format & FORMAT_ITALIC) text = `<em>${text}</em>`;
    if (format & FORMAT_UNDERLINE) text = `<u>${text}</u>`;
    if (format & FORMAT_STRIKETHROUGH) text = `<s>${text}</s>`;
    if (format & FORMAT_CODE) text = `<code>${text}</code>`;
    return text;
  }
  if (node.type === "linebreak") return "<br />";
  const children = (node.children || []).map(serializeNode).join("");
  switch (node.type) {
    case "root":
      return children;
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading":
      return `<${node.tag || "h2"}>${children}</${node.tag || "h2"}>`;
    case "list":
      return node.listType === "number" ? `<ol>${children}</ol>` : `<ul>${children}</ul>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote>${children}</blockquote>`;
    case "link":
    case "autolink": {
      const url = node.fields?.url || node.url || "#";
      const target = node.fields?.newTab || node.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(url)}"${target}>${children}</a>`;
    }
    case "upload": {
      const imgUrl = node.value?.url || "";
      const alt = node.value?.alt || "";
      const customWidth = node.fields?.width;
      const widthAttr = customWidth ? ` width="${customWidth}" style="max-width:${customWidth}px;height:auto;"` : "";
      return `<img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(alt)}"${widthAttr} loading="lazy" />`;
    }
    default:
      return children;
  }
}
function lexicalToHtml(content) {
  if (!content || typeof content !== "object") return "";
  const data = content;
  if (!data.root) return "";
  return serializeNode(data.root);
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = await getBlogPost(slug);
  if (!post) {
    return Astro2.redirect("/blog");
  }
  const contentHtml = lexicalToHtml(post.content);
  post.meta_title || post.title;
  post.meta_description || post.excerpt || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", '<article class="blog-post-container"> <header class="blog-post-header"> <a href="/blog" class="blog-post-back"> <i class="ph ph-arrow-left"></i> Volver al blog\n</a> <time class="blog-post-date"', "> ", ' </time> <h1 class="blog-post-title">', "</h1> ", " </header> ", ' <div class="blog-post-content">', "</div> </article> ", " <script", ">\n    (function () {\n      var slug = window.location.pathname.split('/').filter(Boolean).pop();\n      if (!slug) return;\n\n      var key = 'blog-viewed-' + slug;\n      if (sessionStorage.getItem(key)) return;\n\n      var cmsUrl = document.currentScript.getAttribute('data-cms-url');\n      fetch(cmsUrl + '/api/blog-posts/increment-views', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ slug: slug }),\n      })\n        .then(function () { sessionStorage.setItem(key, '1'); })\n        .catch(function () {});\n    })();\n  </script> "])), renderComponent($$result2, "Navbar", $$Navbar, {}), maybeRenderHead(), addAttribute(post.published_date, "datetime"), new Date(post.published_date).toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" }), post.title, post.excerpt && renderTemplate`<p class="blog-post-excerpt">${post.excerpt}</p>`, post.cover_image && renderTemplate`<div class="blog-post-cover"> <img${addAttribute(post.cover_image.url, "src")}${addAttribute(post.cover_image.alt || post.title, "alt")}> </div>`, unescapeHTML(contentHtml), renderComponent($$result2, "Footer", $$Footer, {}), addAttribute("http://localhost:3000", "data-cms-url")) })}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/blog/[slug].astro", void 0);
const $$file = "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
