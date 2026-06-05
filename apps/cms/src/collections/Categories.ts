import type { CollectionConfig } from 'payload'
import { slugifyHook } from '../hooks/beforeChange/slugify'
import { isAdmin, isEditor } from '../access/roles'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'icon', 'order'],
    group: 'Taxonomia',
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
    { name: 'description', type: 'textarea', label: 'Descrição' },
    { name: 'icon', type: 'text', label: 'Ícone Lucide (ex: Shield, Leaf, Building2)' },
    { name: 'color', type: 'text', label: 'Cor hex (ex: #00B37E)' },
    { name: 'order', type: 'number', label: 'Ordem', defaultValue: 99 },
  ],
  hooks: {
    beforeChange: [slugifyHook],
  },
}
