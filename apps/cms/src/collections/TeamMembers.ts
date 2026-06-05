import type { CollectionConfig } from 'payload'
import { slugifyHook } from '../hooks/beforeChange/slugify'
import { revalidateNext } from '../hooks/afterChange/revalidate'
import { isAdmin, isEditor } from '../access/roles'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department', 'order', 'featured'],
    group: 'Organização',
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome' },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { readOnly: true } },
    { name: 'role', type: 'text', required: true, label: 'Cargo / Função' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto' },
    { name: 'bio', type: 'textarea', label: 'Mini bio' },
    { name: 'email', type: 'email', label: 'Email (opcional, público)' },
    { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
    {
      name: 'department',
      type: 'select',
      label: 'Área / Departamento',
      options: [
        { label: 'Diretoria', value: 'diretoria' },
        { label: 'Conselho', value: 'conselho' },
        { label: 'Equipe Operacional', value: 'equipe-operacional' },
        { label: 'Voluntário', value: 'voluntario' },
      ],
    },
    { name: 'order', type: 'number', label: 'Ordem de exibição', defaultValue: 99 },
    { name: 'featured', type: 'checkbox', label: 'Exibir em destaque', defaultValue: false },
  ],
  hooks: {
    beforeChange: [slugifyHook],
    afterChange: [revalidateNext],
  },
}
