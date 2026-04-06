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
