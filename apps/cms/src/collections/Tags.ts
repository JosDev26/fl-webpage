import type { CollectionConfig } from 'payload'
import { notifySubscribersAboutNewTag } from './Subscribers'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create' && doc.notifySubscribers) {
          void notifySubscribersAboutNewTag(req.payload, doc.name)
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Nombre',
    },
    {
      name: 'notifySubscribers',
      type: 'checkbox',
      label: 'Notificar suscriptores',
      defaultValue: false,
      admin: {
        description: 'Enviar un correo masivo a todos los suscriptores confirmados al crear esta etiqueta',
      },
    },
  ],
}
