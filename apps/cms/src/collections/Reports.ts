import type { CollectionConfig } from 'payload'
import { isAdmin, isEditor } from '../access/roles'

export const Reports: CollectionConfig = {
  slug: 'reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year', 'period', 'publishedAt'],
    group: 'Transparência',
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título' },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo',
      options: [
        { label: 'Relatório Anual', value: 'relatorio-anual' },
        { label: 'Demonstrativo Financeiro', value: 'demonstrativo-financeiro' },
        { label: 'Relatório de Impacto', value: 'relatorio-impacto' },
        { label: 'Prestação de Contas', value: 'prestacao-contas' },
        { label: 'Outro', value: 'outro' },
      ],
    },
    { name: 'year', type: 'number', required: true, label: 'Ano' },
    {
      name: 'period',
      type: 'select',
      label: 'Período',
      options: [
        { label: 'Anual', value: 'anual' },
        { label: '1º Trimestre', value: 'q1' },
        { label: '2º Trimestre', value: 'q2' },
        { label: '3º Trimestre', value: 'q3' },
        { label: '4º Trimestre', value: 'q4' },
        { label: 'Semestral', value: 'semestral' },
      ],
    },
    { name: 'description', type: 'textarea', label: 'Descrição' },
    { name: 'document', type: 'upload', relationTo: 'media', required: true, label: 'Arquivo PDF' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Imagem de capa' },
    { name: 'totalInvestment', type: 'number', label: 'Total investido no período (R$)' },
    { name: 'totalRaised', type: 'number', label: 'Total arrecadado no período (R$)' },
    {
      name: 'highlights',
      type: 'array',
      label: 'Destaques do período',
      fields: [{ name: 'highlight', type: 'text', required: true }],
    },
    { name: 'publishedAt', type: 'date', label: 'Data de publicação' },
  ],
}
