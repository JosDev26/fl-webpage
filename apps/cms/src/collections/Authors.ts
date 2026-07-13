import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'cargo'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre',
    },
    {
      name: 'cargo',
      type: 'text',
      required: true,
      label: 'Cargo',
      admin: {
        description: 'Título profesional, ej: Abogado Socio',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Correo',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Teléfono',
    },
    {
      name: 'phrase',
      type: 'textarea',
      required: true,
      label: 'Frase',
      admin: {
        description: 'Frase o lema del autor',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto',
    },
  ],
}
