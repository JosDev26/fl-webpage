import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'published_date'],
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/increment-views',
      method: 'post',
      handler: async (req) => {
        try {
          const body = await req.json!()
          const slug = body?.slug

          if (!slug || typeof slug !== 'string') {
            return Response.json({ error: 'Slug is required' }, { status: 400 })
          }

          const result = await req.payload.find({
            collection: 'blog-posts',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 0,
          })

          const post = result.docs[0]
          if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 })
          }

          await req.payload.update({
            collection: 'blog-posts',
            id: post.id,
            data: { views: (Number(post.views) || 0) + 1 },
            depth: 0,
          })

          return Response.json({ success: true })
        } catch {
          return Response.json({ error: 'Internal error' }, { status: 500 })
        }
      },
    },
    {
      path: '/stats',
      method: 'get',
      handler: async (req) => {
        try {
          const allPosts = await req.payload.find({
            collection: 'blog-posts',
            limit: 0,
            depth: 1,
          })

          const docs = allPosts.docs as any[]
          const published = docs.filter((d) => d.status === 'published')
          const drafts = docs.filter((d) => d.status === 'draft')
          const totalViews = docs.reduce((sum, d) => sum + (Number(d.views) || 0), 0)

          // Top 5 most viewed
          const topPosts = [...docs]
            .sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0))
            .slice(0, 5)
            .map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              views: Number(d.views) || 0,
              status: d.status,
            }))

          // Posts this month
          const now = new Date()
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
          const thisMonth = published.filter(
            (d) => d.published_date && d.published_date >= startOfMonth,
          )

          // Posts per tag
          const tagCounts: Record<string, number> = {}
          for (const doc of docs) {
            if (doc.tags && Array.isArray(doc.tags)) {
              for (const tag of doc.tags) {
                const name = typeof tag === 'object' ? tag.name : String(tag)
                if (name) tagCounts[name] = (tagCounts[name] || 0) + 1
              }
            }
          }
          const tagsBreakdown = Object.entries(tagCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)

          // Recent 5 posts
          const recent = [...published]
            .sort(
              (a, b) =>
                new Date(b.published_date || 0).getTime() -
                new Date(a.published_date || 0).getTime(),
            )
            .slice(0, 5)
            .map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              published_date: d.published_date,
              views: Number(d.views) || 0,
            }))

          return Response.json({
            totalPosts: docs.length,
            publishedCount: published.length,
            draftCount: drafts.length,
            totalViews,
            topPosts,
            thisMonthCount: thisMonth.length,
            tagsBreakdown,
            recent,
          })
        } catch {
          return Response.json({ error: 'Internal error' }, { status: 500 })
        }
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'URL amigable, ej: mi-primer-articulo',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extracto',
      admin: {
        description: 'Resumen corto para la lista de artículos',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenido',
    },
    {
      name: 'cover_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },
    {
      name: 'published_date',
      type: 'date',
      label: 'Fecha de publicación',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Estado',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Etiquetas',
      admin: {
        description: 'Selecciona una o más etiquetas para este artículo',
      },
    },
    {
      name: 'views',
      type: 'number',
      label: 'Visitas',
      defaultValue: 0,
      admin: {
        description: 'Contador de visitas del artículo',
      },
    },
    {
      name: 'meta_title',
      type: 'text',
      label: 'Meta título (SEO)',
      admin: {
        description: 'Si se deja vacío, se usa el título del artículo',
      },
    },
    {
      name: 'meta_description',
      type: 'textarea',
      label: 'Meta descripción (SEO)',
    },
  ],
}
