import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugifyHook } from '../hooks/beforeChange/slugify'
import { revalidateNext } from '../hooks/afterChange/revalidate'
import { isAdmin, isEditor } from '../access/roles'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'since', 'featured'],
    group: 'Conteúdo',
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
    { name: 'logo', type: 'upload', relationTo: 'media', required: true, label: 'Logo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de capa' },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Empresa', value: 'empresa' },
        { label: 'Condomínio', value: 'condominio' },
        { label: 'Restaurante', value: 'restaurante' },
        { label: 'Comércio', value: 'comercio' },
        { label: 'Patrocinador', value: 'patrocinador' },
        { label: 'Instituição', value: 'instituicao' },
      ],
    },
    { name: 'description', type: 'richText', label: 'Sobre o parceiro', editor: lexicalEditor({}) },
    { name: 'website', type: 'text', label: 'Website' },
    { name: 'instagram', type: 'text', label: 'Instagram (handle)' },
    { name: 'since', type: 'date', label: 'Parceiro desde' },
    { name: 'featured', type: 'checkbox', label: 'Exibir em destaque', defaultValue: false },
    { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true, label: 'Projetos participados' },
    {
      name: 'testimonial',
      type: 'group',
      label: 'Depoimento',
      fields: [
        { name: 'quote', type: 'textarea', label: 'Citação' },
        { name: 'author', type: 'text', label: 'Autor' },
        { name: 'role', type: 'text', label: 'Cargo/Função' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
  hooks: {
    beforeChange: [slugifyHook],
    afterChange: [revalidateNext],
  },
}
