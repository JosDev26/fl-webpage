# Blog Author Feature — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** Add a managed Authors concept end-to-end (CMS collection → BlogPosts relationship → shared types → web author card).

---

## Context

The blog system uses **Payload CMS 3.80** (Next.js 16, Postgres) in `apps/cms` and **Astro 5.x** in `apps/web`, with shared types in `packages/shared`. Today:

- `apps/cms/src/collections/BlogPosts.ts` defines the blog collection; its `fields` array is auto-rendered as the admin create/edit form. **There is no author field.**
- `apps/web/src/pages/blog/[slug].astro` renders a blog post: `header → cover_image → content → </article> → <Footer />`. **No author is displayed.**
- `apps/web/src/lib/payload.ts` `getBlogPost()` fetches with `depth=2`, which already resolves nested relationships (tags, cover_image media).
- `packages/shared/src/index.ts` holds the `BlogPost` and `Media` interfaces consumed by the web app.

**Premise correction:** The original request assumed an existing author section to remove. There is none — this is greenfield for the author concept.

---

## Requirements (confirmed with user)

1. No free-form author text on the blog form — instead a **select dropdown of managed authors**.
2. Authors are managed separately (the user can add authors, then pick one per blog post).
3. Each author has: **name, cargo (title), email, phone, phrase, photo** (all required).
4. On the public blog post, the author card is the **last thing before the footer**.
5. Card layout: **image on the left, info on the right**, ordered cleanly.
6. Single optional author per blog post (0 or 1). Card is hidden when no author is assigned.

---

## Design

### 1. New `Authors` collection (CMS)

**New file:** `apps/cms/src/collections/Authors.ts`

A managed pool of authors. Public read (`read: () => true`) so the web app receives author data through the blog post's `depth=2` fetch; writes are admin-only (Payload default auth).

Fields (all required):
| Field | Type | Notes |
|---|---|---|
| `name` | text | `admin.useAsTitle` — the collection title |
| `cargo` | text | e.g. "Abogado Socio" |
| `email` | email | |
| `phone` | text | |
| `phrase` | textarea | the author's tagline/quote |
| `photo` | upload → `media` | required; same pattern as `cover_image` (`BlogPosts.ts:207-212`) |

Register in `apps/cms/src/payload.config.ts` collections array. Then run `npm run generate:types --workspace=apps/cms` to refresh `apps/cms/src/payload-types.ts`.

### 2. `BlogPosts` — add relationship field (the "select")

In `apps/cms/src/collections/BlogPosts.ts` `fields`, add immediately after `tags` (L235-244):
```ts
{ name: 'author', type: 'relationship', relationTo: 'authors', label: 'Autor' }
```
Single, optional (no `hasMany`). Payload auto-renders relationship fields as a searchable select dropdown in the admin UI — exactly the "select de autores específicos", no custom UI required. No free-form author text is created.

### 3. Types

**`packages/shared/src/index.ts`:**
- Add `Author` interface:
  ```ts
  export interface Author {
    id: string;
    name: string;
    cargo: string;
    email: string;
    phone: string;
    phrase: string;
    photo?: Media;
  }
  ```
- Add `author?: Author;` to `BlogPost`.

**CMS:** `payload-types.ts` regenerates automatically via `generate:types`.

### 4. Web fetch — no change needed

`getBlogPost` already uses `depth=2`, which resolves `author` (depth 1) and `author.photo` → Media (depth 2). Author + photo URL come through for free.

### 5. Web: `BlogAuthor` component + CSS

Per CONVENTIONS.md §2 (1 component = 1 `.astro` + 1 `.css`):

- **`apps/web/src/components/BlogAuthor.astro`** — imports `../styles/blogauthor.css`; takes an `author` prop; renders nothing when absent.
- **`apps/web/src/styles/blogauthor.css`** — `:root` vars, `clamp()` sizing, no `border-radius`, `:focus-visible`, `@media (prefers-reduced-motion: reduce)`.

**Insertion:** in `apps/web/src/pages/blog/[slug].astro`, place `<BlogAuthor author={post.author} />` between `</article>` (L44) and `<Footer />` (L45). Import the component in the frontmatter.

**Layout (image left, info right):**
```
.blog-author-container   (flex; gap clamp; max-width; yellow top-border accent)
  .blog-author-photo    (img; fixed responsive size; yellow border)   ← LEFT
  .blog-author-info                                                        ← RIGHT
    .blog-author-name     (Nunito Sans 800)
    .blog-author-cargo    (yellow accent)
    .blog-author-phrase   (italic, muted)
    .blog-author-contact  (flex row)
      email  → mailto:  + ph ph-envelope
      phone  → tel:     + ph ph-phone
```

Responsive: side-by-side down to ~600px; below that, stack (photo on top). Email and phone are clickable (`mailto:`/`tel:`).

**Image rendering:** plain `<img src={author.photo.url}>` (established pattern for remote S3 data in the blog pages; `astro:assets` `<Image>` is not used for blog imagery).

**Animations:** none — the blog detail page `[slug].astro` has no Anime.js entry animations today; match it (YAGNI).

### 6. Seed — `apps/cms/src/seed.ts`

Add 1-2 sample authors following the existing seed pattern (reviews/services/tags are seeded there today). No blog posts are seeded, so authors stand alone.

### 7. Edge cases

- **Author deleted** → `BlogPost.author` becomes null (Payload default) → card hidden, no broken UI.
- **Draft without author** → never shown on web (web fetches only `status=published`).
- **Missing author on a published post** → card hidden via the `author` prop guard.

---

## Files touched

| File | Change |
|---|---|
| `apps/cms/src/collections/Authors.ts` | **new** — Authors collection config |
| `apps/cms/src/payload.config.ts` | register `Authors` collection |
| `apps/cms/src/collections/BlogPosts.ts` | add `author` relationship field |
| `apps/cms/src/payload-types.ts` | regenerated (no manual edit) |
| `apps/cms/src/seed.ts` | add sample authors |
| `packages/shared/src/index.ts` | add `Author` interface; add `author?` to `BlogPost` |
| `apps/web/src/components/BlogAuthor.astro` | **new** — author card component |
| `apps/web/src/styles/blogauthor.css` | **new** — author card styles |
| `apps/web/src/pages/blog/[slug].astro` | import + render `<BlogAuthor>` before `<Footer>` |

---

## Out of scope

- Multiple authors per post (single optional only).
- Author detail/archive pages on the web (e.g. `/blog/author/:slug`).
- Author social media links.
- Email encryption for author emails (only Subscribers use AES crypto today).
- Entry animations on the author card.
