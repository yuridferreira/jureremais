import type { CollectionConfig } from 'payload'
import { revalidateNext } from '../hooks/afterChange/revalidate'
import { isAdmin, isEditor } from '../access/roles'

export const ImpactMetrics: CollectionConfig = {
  slug: 'impact-metrics',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'value', 'unit', 'year', 'featured', 'order'],
    group: 'Transparência',
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'label', type: 'text', required: true, label: 'Rótulo' },
    { name: 'value', type: 'number', required: true, label: 'Valor' },
    { name: 'unit', type: 'text', label: 'Unidade (ex: câmeras, projetos)' },
    { name: 'prefix', type: 'text', label: 'Prefixo (ex: R$, +)' },
    { name: 'suffix', type: 'text', label: 'Sufixo (ex: %, km)' },
    { name: 'description', type: 'textarea', label: 'Descrição adicional' },
    { name: 'icon', type: 'text', label: 'Ícone Lucide (ex: Shield, Camera, Users)' },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Segurança', value: 'seguranca' },
        { label: 'Financeiro', value: 'financeiro' },
        { label: 'Parceiros', value: 'parceiros' },
        { label: 'Projetos', value: 'projetos' },
        { label: 'Geral', value: 'geral' },
      ],
    },
    { name: 'year', type: 'number', label: 'Ano de referência' },
    { name: 'order', type: 'number', label: 'Ordem de exibição', defaultValue: 99 },
    { name: 'featured', type: 'checkbox', label: 'Exibir na home', defaultValue: false },
    {
      name: 'trend',
      type: 'select',
      label: 'Tendência',
      options: [
        { label: '↑ Subindo', value: 'up' },
        { label: '↓ Caindo', value: 'down' },
        { label: '→ Estável', value: 'stable' },
      ],
    },
    { name: 'previousValue', type: 'number', label: 'Valor anterior (para comparação)' },
  ],
  hooks: {
    afterChange: [revalidateNext],
  },
}
