# Blog Multi-Author Feature — Design

**Date:** 2026-07-27
**Status:** Approved
**Scope:** Evolve the existing single-author blog feature into multi-author support on the public blog post page (`/blog/[slug]`), with a clean, responsive vertical card stack.

---

## Context

The repo already ships a single-author feature (commits `772e589` → `b61c8cb`, spec `2026-07-13-blog-author-design.md`):

- `apps/cms/src/collections/Authors.ts` — managed Authors collection (name, cargo, email, phone, phrase, photo). Public read, admin write.
- `apps/cms/src/collections/BlogPosts.ts:246-252` — `author` field: a single (`hasMany` not set) `relationship` to `authors`.
- `packages/shared/src/index.ts:44` — `BlogPost.author?: Author`.
- `apps/web/src/components/BlogAuthor.astro` + `apps/web/src/styles/blogauthor.css` — card component, image-left / info-right layout, stacks below 600px.
- `apps/web/src/pages/blog/[slug].astro:46` — `<BlogAuthor author={post.author} />` between `</article>` and `<Footer />`.

The web fetch (`apps/web/src/lib/payload.ts`) already uses `depth=2`, which resolves the author and its media photo for free. No changes to fetch logic are needed.

Seed (`apps/cms/src/seed.ts`) creates two sample authors and **does not** seed any blog posts. The blog listing page (`apps/web/src/pages/blog/index.astro`) does **not** render authors on cards/carousel/hero today.

---

## Requirements (confirmed with user)

1. A blog post can have **one or more authors** (not just 0 or 1). Order is meaningful: the first selected author is the "principal".
2. Authors are rendered on the **public blog post page only** (`/blog/[slug]`). The blog index (`/blog`) listing is unchanged.
3. Visual layout: **vertical stack of horizontal cards** — one card per author, stacked top-to-bottom, separated by a gap. Each card keeps the current image-left / info-right layout and stacks (photo above info) below ~600px.
4. Code must remain clean and non-spaghetti: the shared type and field name reflect "multiple authors" (plural), not a singular name holding an array.
5. 0 authors → render nothing; 1 author → identical to today; N authors → N cards separated by a gap.
6. Responsive across all screen sizes and resolutions, per CONVENTIONS.md (`clamp()` sizing, `min()` widths, no `border-radius`, `:focus-visible`, `prefers-reduced-motion`).

---

## Design

### 1. CMS — rename `author` → `authors` with `hasMany`

**File:** `apps/cms/src/collections/BlogPosts.ts` (replace the field at lines 246-252).

```ts
{
  name: 'authors',
  type: 'relationship',
  relationTo: 'authors',
  hasMany: true,
  label: 'Autores',
  admin: {
    description: 'Selecciona uno o varios autores. El primero es el principal.',
  },
},
```

Payload auto-renders a `hasMany` relationship as a multi-select with drag-and-drop reordering in the admin UI — the user picks several authors and orders them. No custom admin UI is required. The drag-and-drop order is preserved server-side and returned in that order by the REST API.

**Migration:** There are no published blog posts in the seed, and `git log` shows no production data migration concerns (the field was added in the same feature cycle, `9e9bfd2` → `2a14ce9`). Any manually-assigned `author` value on a dev DB row will be orphaned by the rename — acceptable for this repo at this stage. Production migration is out of scope here. If preservation is later required, run a one-off Payload script that reads the old `author` id and writes `authors: [id]` **before** running the schema change.

**Types regeneration:** Run `npm run generate:types --workspace=apps/cms` to regenerate `apps/cms/src/payload-types.ts` — `BlogPost.author?: ...` becomes `authors?: (Author)[] | null`.

### 2. Shared types

**File:** `packages/shared/src/index.ts` (line 44).

Replace:
```ts
  author?: Author;
```
with:
```ts
  authors?: Author[];
```

The `Author` interface (lines 24-32) is unchanged — it still describes a single author with `id`, `name`, `cargo`, `email`, `phone`, `phrase`, `photo?`.

### 3. Web component — `BlogAuthors.astro` (rename)

**Rename:** `apps/web/src/components/BlogAuthor.astro` → `apps/web/src/components/BlogAuthors.astro`.

Two reasons for the rename over keeping the singular file name: (a) it consumes an array; (b) `apps/web/src/pages/blog/[slug].astro:7,46` only imports this in one place, so the rename is a clean one-line delta in the page. Keeping a singular `BlogAuthor.astro` that internally iterates an array would be the kind of quiet spaghetti the user explicitly asked to avoid.

**Component contract:**
- Props: `authors?: Author[] | null`.
- Filters out falsy entries (`a && a.id`).
- Renders nothing if the resulting list is empty.
- Wraps the cards in a `.blog-author-list` section with `aria-label="Autores del artículo"`.
- Iterates with `.map` over the filtered list, rendering one `.blog-author-card` per author (identical inner markup to today's `.blog-author-container`).

**Image rendering:** plain `<img src={author.photo.url}>` (established pattern for remote S3 data; `astro:assets` `<Image>` is not used for blog imagery).

**Animations:** none — the blog detail page `[slug].astro` has no Anime.js entry animations today; match it (YAGNI).

### 4. CSS — vertical stack, single source of truth

**File:** `apps/web/src/styles/blogauthor.css` (kept — filename and `blog-author-*` class prefix remain; CONVENTIONS.md does not require the file name to match the component name, only the 1-component-1-CSS rule).

Refactor:
- **New `.blog-author-list`** wrapper (replaces the layout role of the old `.blog-author-container`):
  - `max-width: 780px`
  - `margin: clamp(2rem, 4vw, 3rem) auto 0`
  - `padding: clamp(1.5rem, 3vw, 2.5rem)`
  - `display: flex; flex-direction: column`
  - `gap: clamp(1.5rem, 3vw, 2rem)` — the visible separation between author cards
  - `border-top: clamp(2px, 0.25vw, 3px) solid var(--yellow-color)` — the same top accent that today's single card had
- **Rename `.blog-author-container` → `.blog-author-card`**: the inner card (image left, info right). Layout, sizing, colors, and contact link patterns are **unchanged** from the current `.blog-author-container`:
  - `display: flex; align-items: center; gap: clamp(1.5rem, 3vw, 2.5rem)`
  - `.blog-author-photo` (image left, fixed responsive size, yellow border) — unchanged
  - `.blog-author-info` (right column, `flex: 1; min-width: 0`) — unchanged
  - `.blog-author-name` / `.blog-author-cargo` / `.blog-author-phrase` / `.blog-author-contact` / `.blog-author-contact-link` — unchanged
- **Responsive:** `@media (max-width: 600px)` — each **card** (`.blog-author-card`) stacks internally (photo above info, centered text), matching today's behavior. The outer `.blog-author-list` is already `flex-direction: column` at all sizes, so no extra rule is needed for the wrapper on mobile.
- **Accessibility:** `:focus-visible` on `.blog-author-contact-link` (already present, unchanged). `prefers-reduced-motion` block at the end (already present, unchanged for the new wrapper's only transition-bearing descendant).

The result: a single author renders identically to today; multiple authors render as the same card repeated vertically with a `gap` between them and one shared top accent.

### 5. Web page wiring

**File:** `apps/web/src/pages/blog/[slug].astro` (lines 7 and 46).

- Line 7 import: `import BlogAuthor from '../../components/BlogAuthor.astro';` → `import BlogAuthors from '../../components/BlogAuthors.astro';`
- Line 46 render: `<BlogAuthor author={post.author} />` → `<BlogAuthors authors={post.authors} />`

Placement is unchanged: between `</article>` (line 44) and `<Footer />` (line 47).

### 6. Edge cases

| Case | Behavior |
|---|---|
| No authors selected | `authors` is `undefined`/`null`/`[]` → component renders nothing; no layout shift beyond the missing block. |
| One author | `.blog-author-list` with a single `.blog-author-card` — visually identical to today's single-card layout (same max-width, padding, top border). |
| Multiple authors | N `.blog-author-card` stacked with `gap`. First card is the principal author (Payload preserves selection order). |
| Author deleted from CMS | That entry comes back as `null` in the array (Payload default for deleted relationships) → filtered out by the `a && a.id` guard. No broken UI. |
| Author photo missing | Card's photo block does not render (existing guard from `b61c8cb`). Info column still shows. |
| Draft without authors | Never reaches the web (web fetches only `status=published`). |

### 7. Responsive behavior summary

| Viewport | Wrapper `.blog-author-list` | Each card `.blog-author-card` |
|---|---|---|
| Desktop ≥ 600px | Vertical stack, `gap` between cards | Horizontal: photo left, info right |
| Mobile < 600px | Vertical stack (unchanged) | Internal stack: photo above info, centered |

Both tiers use `clamp()` for all sizing (font, padding, gap, photo size) per CONVENTIONS.md §6.1-6.2, ensuring fluid scaling across resolutions — not just at the 600px breakpoint.

---

## Files touched

| File | Change |
|---|---|
| `apps/cms/src/collections/BlogPosts.ts` | Rename field `author` → `authors`, add `hasMany: true`, update label/description. |
| `apps/cms/src/payload-types.ts` | Regenerated by `generate:types` (no manual edit). |
| `packages/shared/src/index.ts` | `author?: Author` → `authors?: Author[]` on `BlogPost`. |
| `apps/web/src/components/BlogAuthor.astro` → `BlogAuthors.astro` | **Rename** + iterate the array; render nothing when empty. |
| `apps/web/src/styles/blogauthor.css` | New `.blog-author-list` wrapper; rename `.blog-author-container` → `.blog-author-card`. Card internals unchanged. |
| `apps/web/src/pages/blog/[slug].astro` | Import rename + `<BlogAuthors authors={post.authors} />`. |

Approximate diff size: ~30-50 lines across the web app; ~8 lines in the CMS field; ~2 lines in shared types.

---

## Out of scope

- Showing authors on the blog index (`/blog`): hero, "Últimas entradas", and tag carousel cards remain author-free.
- A dedicated author archive page (e.g. `/blog/autor/[id]`).
- Author social media links.
- Entry animations on the author cards (the detail page has none today; YAGNI).
- A data migration script for existing `author` rows (no published posts exist in the seed; dev-only concern). If a populated dev DB needs preserving, write a one-off Payload script that reads the old singular `author` id and writes `authors: [id]` **before** running the schema change.
- Redesigning the inner card layout (photo size, contact link order, etc.) — this feature preserves the existing card 1:1.
- Tests: the repo has no test runner today and the parent feature (single author) was shipped without one. Adding a framework just for this is out of scope; verification is via `generate:types`, `build:cms`, `build:web`, and manual dev-server checks (per the parent feature plan).

---

## Verification plan (for the implementation phase, not now)

1. `npm run generate:types --workspace=apps/cms` — `payload-types.ts` shows `authors` on `BlogPost`, no `author` field left.
2. `npm run build:cms` — no TypeScript errors.
3. `npm run build:web` — no Astro/TypeScript errors; `post.authors` resolves typed.
4. Manual (dev servers):
   - Payload admin: open a Blog Post → the **Autores** field is a multi-select with drag-and-drop. Pick 2 authors, reorder, save.
   - Web: visit `/blog/<slug>` → see two author cards stacked vertically, separated by the gap, before the footer.
   - Resize to < 600px → each card stacks internally (photo above info, centered).
   - Edit the post to have zero authors → no card block renders.
   - Edit the post to have exactly one author → identical to today's single-card layout.

---

## Architecture notes

- **Why a wrapper + inner card, not a sibling list with separators:** a single `flex-direction: column` wrapper with `gap` is the simplest CSS that scales from 1 to N authors. `gap` handles the separator visually without per-item `:not(:last-child)` rules — fewer lines, less spaghetti.
- **Why rename the component file:** the component now consumes an array. A singular `BlogAuthor.astro` containing an internal `.map` would hide that fact from the call site (`<BlogAuthor author={post.author}>` would be a lie). The rename makes the contract honest.
- **Why keep the CSS file name `blogauthor.css` and class prefix `blog-author-*`:** CONVENTIONS.md §2 requires 1 component → 1 `.css`, but does not require the file or class names to match the component name. The existing classes are already used nowhere else; renaming them would add diff noise without value. The singular `blog-author-` prefix on individual card elements reads naturally (`blog-author-card`, `blog-author-photo`); only the wrapper is plural (`blog-author-list`).
- **Why no new shared util or hook:** the component is a 3-line `.map` after a `.filter`. Extracting it would be speculative abstraction (Ponytail rule #1: no unrequested abstractions).