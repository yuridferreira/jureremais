import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const MembershipRequests: CollectionConfig = {
  slug: 'membership-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'type', 'status', 'createdAt'],
    group: 'CRM',
    listSearchableFields: ['name', 'email', 'organization'],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nome' },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'phone', type: 'text', label: 'Telefone' },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Tipo de participação',
      options: [
        { label: 'Morador', value: 'MORADOR' },
        { label: 'Empresa', value: 'EMPRESA' },
        { label: 'Instituição', value: 'INSTITUICAO' },
        { label: 'Parceiro / Patrocinador', value: 'PARCEIRO' },
      ],
    },
    { name: 'organization', type: 'text', label: 'Empresa / Organização' },
    { name: 'message', type: 'textarea', label: 'Mensagem' },
    {
      name: 'interests',
      type: 'select',
      hasMany: true,
      label: 'Áreas de interesse',
      options: [
        { label: 'Segurança', value: 'seguranca' },
        { label: 'Sustentabilidade', value: 'sustentabilidade' },
        { label: 'Urbanismo', value: 'urbanismo' },
        { label: 'Comunidade', value: 'comunidade' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'NOVO',
      label: 'Status',
      options: [
        { label: 'Novo', value: 'NOVO' },
        { label: 'Em contato', value: 'EM_CONTATO' },
        { label: 'Aprovado', value: 'APROVADO' },
        { label: 'Rejeitado', value: 'REJEITADO' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas internas',
      admin: { description: 'Visível apenas para administradores.' },
    },
    { name: 'utmSource', type: 'text', label: 'UTM Source', admin: { readOnly: true } },
    { name: 'ipAddress', type: 'text', label: 'IP', admin: { readOnly: true } },
  ],
  timestamps: true,
}
