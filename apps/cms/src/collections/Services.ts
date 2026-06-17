import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon_class', 'position'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título del servicio',
    },
    {
      name: 'icon_class',
      type: 'text',
      required: true,
      label: 'Clase del ícono (Phosphor)',
      admin: {
        description: 'Ejemplo: ph-rocket-launch, ph-buildings, ph-user',
      },
    },
    {
      name: 'link_target',
      type: 'text',
      required: true,
      label: 'Enlace destino',
      admin: {
        description: 'Anchor (#negocio-nuevo) o URL completa',
      },
    },
    {
      name: 'position',
      type: 'number',
      required: true,
      label: 'Posición (orden)',
      defaultValue: 0,
    },
    {
      name: 'is_wide',
      type: 'checkbox',
      label: 'Tarjeta ancha',
      defaultValue: false,
      admin: {
        description: 'Activar para que la tarjeta ocupe todo el ancho del grid',
      },
    },
  ],
}
