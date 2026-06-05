import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugifyHook } from '../hooks/beforeChange/slugify'
import { revalidateNext } from '../hooks/afterChange/revalidate'
import { isAdmin, isEditor, isPublished } from '../access/roles'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt', '_status'],
    group: 'Conteúdo',
  },
  access: {
    read: isPublished,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { readOnly: true } },
    { name: 'excerpt', type: 'textarea', required: true, label: 'Resumo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true, label: 'Imagem de capa' },
    { name: 'content', type: 'richText', required: true, label: 'Conteúdo', editor: lexicalEditor({}) },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true, label: 'Categoria' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'author', type: 'relationship', relationTo: 'team-members', label: 'Autor' },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true, label: 'Projetos relacionados' },
    { name: 'featured', type: 'checkbox', label: 'Post em destaque', defaultValue: false },
    { name: 'readingTime', type: 'number', label: 'Tempo de leitura (min)', admin: { readOnly: true } },
    { name: 'publishedAt', type: 'date', label: 'Data de publicação' },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
  hooks: {
    beforeChange: [slugifyHook],
    afterChange: [revalidateNext],
  },
}
