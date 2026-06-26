import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'System',
  },
  access: {
    read: () => true, // Make publicly readable so frontend can fetch it
  },
  fields: [
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email de Contacto',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Teléfono Principal',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes Sociales',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL del Perfil',
          required: true,
        },
      ],
    },
  ],
}
