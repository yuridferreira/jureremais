# 05 — Modelagem CMS (Payload CMS 3)

## Collections

### 1. Projects

```typescript
// apps/cms/src/collections/Projects.ts
import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'investment', 'publishedAt'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isEditor,
    delete: isAdmin,
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  fields: [
    // Identificação
    { name: 'name', type: 'text', required: true, label: 'Nome do projeto' },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'excerpt', type: 'textarea', label: 'Resumo (para cards)' },

    // Categorização
    {
      name: 'category',
      type: 'select',
      options: ['seguranca', 'sustentabilidade', 'urbanismo', 'comunidade', 'manutencao'],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['planejamento', 'em-andamento', 'concluido', 'pausado'],
      defaultValue: 'em-andamento',
    },

    // Visual
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'gallery', type: 'array', fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'caption', type: 'text' },
    ]},

    // Conteúdo
    { name: 'content', type: 'richText', label: 'Descrição completa' },
    { name: 'objectives', type: 'array', fields: [
      { name: 'objective', type: 'text' },
    ]},
    { name: 'results', type: 'array', fields: [
      { name: 'result', type: 'text' },
      { name: 'metric', type: 'text', label: 'Número/métrica associada' },
    ]},

    // Financeiro
    { name: 'investment', type: 'number', label: 'Investimento total (R$)' },
    { name: 'investmentBreakdown', type: 'array', fields: [
      { name: 'description', type: 'text' },
      { name: 'amount', type: 'number' },
    ]},

    // Timeline
    { name: 'startDate', type: 'date' },
    { name: 'endDate', type: 'date' },
    { name: 'timeline', type: 'array', fields: [
      { name: 'date', type: 'date', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ]},

    // Relacionamentos
    { name: 'partners', type: 'relationship', relationTo: 'partners', hasMany: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true },

    // SEO
    { name: 'seo', type: 'group', fields: [
      { name: 'metaTitle', type: 'text' },
      { name: 'metaDescription', type: 'textarea' },
      { name: 'ogImage', type: 'upload', relationTo: 'media' },
    ]},

    // Meta
    { name: 'featured', type: 'checkbox', label: 'Exibir na home' },
    { name: 'publishedAt', type: 'date', admin: { readOnly: true } },
    { name: 'order', type: 'number', label: 'Ordem de exibição' },
  ],
  hooks: {
    beforeChange: [slugify, setPublishedAt],
    afterChange: [revalidateNext],
  },
}
```

---

### 2. Partners

```typescript
export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'since', 'featured'],
    group: 'Conteúdo',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      options: ['empresa', 'condominio', 'restaurante', 'comercio', 'patrocinador', 'instituicao'],
      required: true,
    },
    { name: 'description', type: 'richText' },
    { name: 'website', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'since', type: 'date', label: 'Parceiro desde' },
    { name: 'featured', type: 'checkbox', label: 'Exibir em destaque' },
    { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true },
    { name: 'testimonial', type: 'group', fields: [
      { name: 'quote', type: 'textarea' },
      { name: 'author', type: 'text' },
      { name: 'role', type: 'text' },
    ]},
    { name: 'seo', type: 'group', fields: [
      { name: 'metaTitle', type: 'text' },
      { name: 'metaDescription', type: 'textarea' },
    ]},
  ],
  hooks: {
    beforeChange: [slugify],
    afterChange: [revalidateNext],
  },
}
```

---

### 3. News (Blog)

```typescript
export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt', '_status'],
    group: 'Conteúdo',
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'author', type: 'relationship', relationTo: 'team-members' },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    { name: 'featured', type: 'checkbox' },
    { name: 'readingTime', type: 'number', admin: { readOnly: true } },
    { name: 'publishedAt', type: 'date' },
    { name: 'seo', type: 'group', fields: [
      { name: 'metaTitle', type: 'text' },
      { name: 'metaDescription', type: 'textarea' },
      { name: 'ogImage', type: 'upload', relationTo: 'media' },
    ]},
  ],
  hooks: {
    beforeChange: [slugify, calculateReadingTime, setPublishedAt],
    afterChange: [revalidateNext],
  },
}
```

---

### 4. Reports (Transparência)

```typescript
export const Reports: CollectionConfig = {
  slug: 'reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year', 'period', 'publishedAt'],
    group: 'Transparência',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    {
      name: 'type',
      type: 'select',
      options: ['relatorio-anual', 'demonstrativo-financeiro', 'relatorio-impacto', 'prestacao-contas', 'outro'],
    },
    { name: 'year', type: 'number', required: true },
    { name: 'period', type: 'select', options: ['anual', 'q1', 'q2', 'q3', 'q4', 'semestral'] },
    { name: 'description', type: 'textarea' },
    { name: 'document', type: 'upload', relationTo: 'media', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'totalInvestment', type: 'number', label: 'Total investido no período (R$)' },
    { name: 'totalRaised', type: 'number', label: 'Total arrecadado no período (R$)' },
    { name: 'highlights', type: 'array', fields: [
      { name: 'highlight', type: 'text' },
    ]},
    { name: 'publishedAt', type: 'date' },
  ],
}
```

---

### 5. ImpactMetrics

```typescript
export const ImpactMetrics: CollectionConfig = {
  slug: 'impact-metrics',
  admin: {
    useAsTitle: 'label',
    group: 'Transparência',
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'number', required: true },
    { name: 'unit', type: 'text', label: 'Unidade (ex: câmeras, R$, %)' },
    { name: 'prefix', type: 'text', label: 'Prefixo (ex: R$, +)' },
    { name: 'suffix', type: 'text', label: 'Sufixo (ex: %, km)' },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text', label: 'Lucide icon name' },
    { name: 'category', type: 'select', options: ['seguranca', 'financeiro', 'parceiros', 'projetos', 'geral'] },
    { name: 'year', type: 'number' },
    { name: 'order', type: 'number' },
    { name: 'featured', type: 'checkbox', label: 'Exibir na home' },
    { name: 'trend', type: 'select', options: ['up', 'down', 'stable'] },
    { name: 'previousValue', type: 'number' },
  ],
}
```

---

### 6. TeamMembers

```typescript
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    group: 'Organização',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'role', type: 'text', required: true, label: 'Cargo/Função' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'email', type: 'email' },
    { name: 'linkedin', type: 'text' },
    {
      name: 'department',
      type: 'select',
      options: ['diretoria', 'conselho', 'equipe-operacional', 'voluntario'],
    },
    { name: 'order', type: 'number' },
    { name: 'featured', type: 'checkbox' },
  ],
}
```

---

### 7. Testimonials

```typescript
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    group: 'Conteúdo',
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'partner', type: 'relationship', relationTo: 'partners' },
    { name: 'featured', type: 'checkbox' },
    { name: 'context', type: 'select', options: ['home', 'impacto', 'participar', 'geral'] },
  ],
}
```

---

### 8. Documents

```typescript
export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    group: 'Transparência',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'category', type: 'select', options: ['relatorio', 'ata', 'regulamento', 'contrato', 'outro'] },
    { name: 'year', type: 'number' },
    { name: 'public', type: 'checkbox', defaultValue: true },
    { name: 'publishedAt', type: 'date' },
  ],
}
```

---

### 9. Categories

```typescript
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Taxonomia',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text', label: 'Lucide icon name' },
    { name: 'color', type: 'text', label: 'Hex color' },
    { name: 'order', type: 'number' },
  ],
}
```

---

### 10. Tags

```typescript
export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { group: 'Taxonomia' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
  ],
}
```

---

### 11. Media

```typescript
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../uploads',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, crop: 'center' },
      { name: 'card', width: 800, height: 600, crop: 'center' },
      { name: 'hero', width: 1920, height: 1080, crop: 'center' },
      { name: 'og', width: 1200, height: 630, crop: 'center' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text', label: 'Crédito fotográfico' },
  ],
}
```

---

### 12. Users

```typescript
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Administração',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'viewer'],
      defaultValue: 'editor',
    },
  ],
}
```

---

### 13. MembershipRequests (formulário Participar)

```typescript
export const MembershipRequests: CollectionConfig = {
  slug: 'membership-requests',
  admin: {
    useAsTitle: 'name',
    group: 'CRM',
  },
  access: { read: isAdmin, create: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'type',
      type: 'select',
      options: ['morador', 'empresa', 'instituicao', 'parceiro'],
      required: true,
    },
    { name: 'organization', type: 'text', label: 'Empresa/Organização' },
    { name: 'message', type: 'textarea' },
    { name: 'interests', type: 'select', hasMany: true, options: ['seguranca', 'sustentabilidade', 'urbanismo', 'comunidade'] },
    {
      name: 'status',
      type: 'select',
      options: ['novo', 'em-contato', 'aprovado', 'rejeitado'],
      defaultValue: 'novo',
    },
    { name: 'notes', type: 'textarea', label: 'Notas internas' },
    { name: 'createdAt', type: 'date', admin: { readOnly: true } },
  ],
}
```

---

## Globals

### Settings

```typescript
export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: { group: 'Configurações' },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Jurerê Mais' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'logoDark', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'whatsapp', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'instagram', type: 'text' },
    { name: 'facebook', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'youtube', type: 'text' },
    { name: 'googleMapsEmbed', type: 'textarea' },
    { name: 'maintenanceMode', type: 'checkbox', defaultValue: false },
    { name: 'announcementBar', type: 'group', fields: [
      { name: 'enabled', type: 'checkbox' },
      { name: 'text', type: 'text' },
      { name: 'link', type: 'text' },
      { name: 'linkText', type: 'text' },
    ]},
    { name: 'ga4Id', type: 'text', label: 'Google Analytics 4 ID' },
  ],
}
```

### HomePage

```typescript
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroSubtitle', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroVideo', type: 'text', label: 'URL vídeo background (opcional)' },
    { name: 'manifestoTitle', type: 'text' },
    { name: 'manifestoText', type: 'richText' },
    { name: 'featuredProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    { name: 'ctaTitle', type: 'text' },
    { name: 'ctaSubtitle', type: 'textarea' },
  ],
}
```

---

## Controle de acesso

```typescript
// apps/cms/src/access/isAdmin.ts
import { Access } from 'payload'
export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

// apps/cms/src/access/isEditor.ts
export const isEditor: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}

// apps/cms/src/access/isPublished.ts
export const isPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
```

---

## Hook: revalidate ISR

```typescript
// apps/cms/src/hooks/afterChange/revalidate.ts
import { CollectionAfterChangeHook } from 'payload'

export const revalidateNext: CollectionAfterChangeHook = async ({ doc, collection }) => {
  const map: Record<string, string[]> = {
    projects: [`/projetos`, `/projetos/${doc.slug}`, '/'],
    news: [`/noticias`, `/noticias/${doc.slug}`],
    partners: [`/parceiros`, `/parceiros/${doc.slug}`],
    'impact-metrics': ['/impacto', '/'],
  }
  const paths = map[collection.slug] ?? []
  for (const path of paths) {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: 'POST',
      headers: { 'x-revalidate-token': process.env.REVALIDATE_SECRET! },
      body: JSON.stringify({ path }),
    })
  }
}
```
