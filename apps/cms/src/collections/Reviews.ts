import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewer_name',
    defaultColumns: ['reviewer_name', 'reviewer_role', 'position'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'reviewer_name',
      type: 'text',
      required: true,
      label: 'Nombre del cliente',
    },
    {
      name: 'reviewer_role',
      type: 'select',
      required: true,
      label: 'Tipo',
      options: [
        { label: 'Cliente', value: 'Cliente' },
        { label: 'Empresa', value: 'Empresa' },
      ],
      defaultValue: 'Cliente',
    },
    {
      name: 'review_text',
      type: 'textarea',
      required: true,
      label: 'Texto de la reseña',
    },
    {
      name: 'position',
      type: 'number',
      required: true,
      label: 'Posición (orden)',
      defaultValue: 0,
      admin: {
        description: 'Número para ordenar las reseñas en el carrusel (menor = primero)',
      },
    },
  ],
}
