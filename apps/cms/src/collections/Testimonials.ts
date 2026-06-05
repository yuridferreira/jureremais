import type { CollectionConfig } from 'payload'
import { revalidateNext } from '../hooks/afterChange/revalidate'
import { isAdmin, isEditor } from '../access/roles'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'role', 'context', 'featured'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true, label: 'Citação' },
    { name: 'author', type: 'text', required: true, label: 'Nome do autor' },
    { name: 'role', type: 'text', label: 'Cargo / Empresa' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto do autor' },
    {
      name: 'partner',
      type: 'relationship',
      relationTo: 'partners',
      label: 'Parceiro (se aplicável)',
    },
    {
      name: 'context',
      type: 'select',
      label: 'Onde exibir',
      defaultValue: 'geral',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Impacto', value: 'impacto' },
        { label: 'Participar', value: 'participar' },
        { label: 'Geral (todos)', value: 'geral' },
      ],
    },
    { name: 'featured', type: 'checkbox', label: 'Exibir em destaque', defaultValue: false },
  ],
  hooks: {
    afterChange: [revalidateNext],
  },
}
