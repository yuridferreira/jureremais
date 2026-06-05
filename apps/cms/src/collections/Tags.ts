import type { CollectionConfig } from 'payload'
import { slugifyHook } from '../hooks/beforeChange/slugify'
import { isAdmin, isEditor } from '../access/roles'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
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
  ],
  hooks: {
    beforeChange: [slugifyHook],
  },
}
