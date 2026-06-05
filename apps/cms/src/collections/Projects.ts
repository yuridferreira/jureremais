import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { slugifyHook } from '../hooks/beforeChange/slugify'
import { revalidateNext } from '../hooks/afterChange/revalidate'
import { isAdmin, isEditor, isPublished } from '../access/roles'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'investment', 'featured', 'publishedAt'],
    group: 'Conteúdo',
    listSearchableFields: ['name', 'excerpt'],
  },
  access: {
    read: isPublished,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [
    // ── Identificação
    { name: 'name', type: 'text', required: true, label: 'Nome do projeto' },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true, description: 'Gerado automaticamente a partir do nome.' },
    },
    { name: 'excerpt', type: 'textarea', label: 'Resumo (para cards e SEO)' },

    // ── Categorização
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Segurança', value: 'seguranca' },
        { label: 'Sustentabilidade', value: 'sustentabilidade' },
        { label: 'Urbanismo', value: 'urbanismo' },
        { label: 'Comunidade', value: 'comunidade' },
        { label: 'Manutenção', value: 'manutencao' },
      ],
    },
    {
      name: 'projectStatus',
      type: 'select',
      defaultValue: 'em-andamento',
      label: 'Status do projeto',
      options: [
        { label: 'Planejamento', value: 'planejamento' },
        { label: 'Em andamento', value: 'em-andamento' },
        { label: 'Concluído', value: 'concluido' },
        { label: 'Pausado', value: 'pausado' },
      ],
    },

    // ── Visual
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true, label: 'Imagem de capa' },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeria de fotos',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', label: 'Legenda' },
      ],
    },

    // ── Conteúdo
    { name: 'content', type: 'richText', label: 'Descrição completa', editor: lexicalEditor({}) },
    {
      name: 'objectives',
      type: 'array',
      label: 'Objetivos do projeto',
      fields: [{ name: 'objective', type: 'text', required: true }],
    },
    {
      name: 'results',
      type: 'array',
      label: 'Resultados alcançados',
      fields: [
        { name: 'result', type: 'text', required: true },
        { name: 'metric', type: 'text', label: 'Número/métrica (ex: 247 câmeras)' },
      ],
    },

    // ── Financeiro
    { name: 'investment', type: 'number', label: 'Investimento total (R$)' },
    {
      name: 'investmentBreakdown',
      type: 'array',
      label: 'Detalhamento do investimento',
      fields: [
        { name: 'description', type: 'text', required: true },
        { name: 'amount', type: 'number', required: true },
      ],
    },

    // ── Timeline
    { name: 'startDate', type: 'date', label: 'Início do projeto' },
    { name: 'endDate', type: 'date', label: 'Conclusão do projeto' },
    {
      name: 'timeline',
      type: 'array',
      label: 'Timeline de marcos',
      fields: [
        { name: 'date', type: 'date', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },

    // ── Relacionamentos
    { name: 'partners', type: 'relationship', relationTo: 'partners', hasMany: true, label: 'Parceiros envolvidos' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true, label: 'Projetos relacionados' },

    // ── SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Título (SEO)' },
        { name: 'metaDescription', type: 'textarea', label: 'Descrição (SEO)' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Imagem Open Graph' },
      ],
    },

    // ── Meta
    { name: 'featured', type: 'checkbox', label: 'Exibir em destaque na home', defaultValue: false },
    { name: 'order', type: 'number', label: 'Ordem de exibição', defaultValue: 99 },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { readOnly: true, description: 'Definido automaticamente na publicação.' },
    },
  ],
  hooks: {
    beforeChange: [slugifyHook],
    afterChange: [revalidateNext],
  },
}
