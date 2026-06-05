# 06 — Modelagem do Banco de Dados

> **Nota:** O Payload CMS 3 gerencia automaticamente as tabelas das collections via PostgreSQL adapter.
> Este documento cobre as tabelas **suplementares** gerenciadas diretamente pelo Prisma
> (formulários, newsletter, analytics, auditoria) mais o ERD completo.

---

## ERD — Diagrama de Entidades

```
┌─────────────────┐     ┌─────────────────────┐     ┌───────────────┐
│    projects      │────<│  project_partners    │>────│   partners    │
├─────────────────┤     └─────────────────────┘     ├───────────────┤
│ id              │                                   │ id            │
│ name            │     ┌─────────────────────┐      │ name          │
│ slug            │────<│  project_tags        │      │ slug          │
│ category        │     └─────────────────────┘      │ category      │
│ status          │                                   │ logo_url      │
│ investment      │     ┌─────────────────────┐      │ since         │
│ cover_image_id  │────<│  project_timeline    │      │ featured      │
│ start_date      │     ├─────────────────────┤      └───────────────┘
│ end_date        │     │ id                  │
│ featured        │     │ project_id          │      ┌───────────────┐
│ published_at    │     │ date                │      │   news        │
│ created_at      │     │ title               │      ├───────────────┤
│ updated_at      │     │ description         │      │ id            │
└─────────────────┘     └─────────────────────┘      │ title         │
                                                      │ slug          │
┌─────────────────┐     ┌─────────────────────┐      │ category_id   │──┐
│  impact_metrics  │     │   categories        │──────│ author_id     │  │
├─────────────────┤     ├─────────────────────┤      │ published_at  │  │
│ id              │     │ id                  │      │ featured      │  │
│ label           │     │ name                │      └───────────────┘  │
│ value           │     │ slug                │                          │
│ unit            │     │ icon                │  ┌───────────────────────┘
│ category        │     │ color               │  ▼
│ year            │     └─────────────────────┘  ┌───────────────┐
│ trend           │                               │  categories   │
│ order           │     ┌─────────────────────┐  └───────────────┘
│ featured        │     │  team_members       │
└─────────────────┘     ├─────────────────────┤  ┌───────────────────────┐
                        │ id                  │  │  membership_requests  │
┌─────────────────┐     │ name                │  ├───────────────────────┤
│    reports       │     │ role                │  │ id                    │
├─────────────────┤     │ department          │  │ name                  │
│ id              │     │ order               │  │ email                 │
│ title           │     │ featured            │  │ phone                 │
│ type            │     └─────────────────────┘  │ type                  │
│ year            │                               │ organization          │
│ period          │     ┌─────────────────────┐  │ message               │
│ document_url    │     │  testimonials       │  │ interests             │
│ total_investment│     ├─────────────────────┤  │ status                │
│ total_raised    │     │ id                  │  │ utm_source            │
│ published_at    │     │ quote               │  │ utm_medium            │
└─────────────────┘     │ author              │  │ created_at            │
                        │ partner_id          │  └───────────────────────┘
                        │ context             │
                        └─────────────────────┘

┌──────────────────────┐    ┌──────────────────────┐
│  newsletter_subs     │    │  contact_submissions  │
├──────────────────────┤    ├──────────────────────┤
│ id                   │    │ id                   │
│ email                │    │ name                 │
│ name                 │    │ email                │
│ status               │    │ subject              │
│ confirmed_at         │    │ message              │
│ unsubscribed_at      │    │ status               │
│ source               │    │ ip_address           │
│ created_at           │    │ created_at           │
└──────────────────────┘    └──────────────────────┘
```

---

## Schema Prisma completo

```prisma
// apps/web/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Formulários / CRM ────────────────────────────────────────────────────

model MembershipRequest {
  id           String   @id @default(cuid())
  name         String
  email        String
  phone        String?
  type         MembershipType
  organization String?
  message      String?
  interests    String[] // array de categorias
  status       RequestStatus @default(NOVO)
  notes        String?       @db.Text
  utmSource    String?
  utmMedium    String?
  utmCampaign  String?
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([status])
  @@index([email])
  @@index([type])
  @@index([createdAt])
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  status    ContactStatus @default(NOVO)
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@index([email])
  @@index([createdAt])
}

model NewsletterSubscription {
  id             String    @id @default(cuid())
  email          String    @unique
  name           String?
  status         SubStatus @default(PENDING)
  confirmedAt    DateTime?
  unsubscribedAt DateTime?
  source         String?   // 'footer', 'noticias', 'participar'
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([status])
  @@index([email])
}

// ─── Analytics / Eventos ──────────────────────────────────────────────────

model PageView {
  id        String   @id @default(cuid())
  path      String
  referrer  String?
  userAgent String?
  ipAddress String?
  sessionId String?
  createdAt DateTime @default(now())

  @@index([path])
  @@index([createdAt])
  @@index([sessionId])
}

model DocumentDownload {
  id           String   @id @default(cuid())
  documentSlug String
  documentName String
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())

  @@index([documentSlug])
  @@index([createdAt])
}

// ─── Cache / Performance ──────────────────────────────────────────────────

model RevalidationLog {
  id        String   @id @default(cuid())
  path      String
  triggeredBy String? // payload collection slug
  createdAt DateTime @default(now())

  @@index([path])
  @@index([createdAt])
}

// ─── Enums ────────────────────────────────────────────────────────────────

enum MembershipType {
  MORADOR
  EMPRESA
  INSTITUICAO
  PARCEIRO
}

enum RequestStatus {
  NOVO
  EM_CONTATO
  APROVADO
  REJEITADO
}

enum ContactStatus {
  NOVO
  LIDO
  RESPONDIDO
  ARQUIVADO
}

enum SubStatus {
  PENDING
  CONFIRMED
  UNSUBSCRIBED
}
```

---

## Estratégia de índices

| Tabela | Índice | Justificativa |
|--------|--------|---------------|
| membership_requests | status, email, type, created_at | Filtros de CRM |
| contact_submissions | status, email, created_at | Gestão de contatos |
| newsletter_subscriptions | email (unique), status | Lookup rápido |
| page_views | path, created_at, session_id | Analytics queries |
| document_downloads | document_slug, created_at | Relatórios de acesso |

---

## Estratégia de migrations

```bash
# Criar migration
pnpm prisma migrate dev --name add_membership_requests

# Aplicar em produção
pnpm prisma migrate deploy

# Seeds
pnpm prisma db seed
```

---

## Seeds iniciais

```typescript
// apps/web/prisma/seed.ts
// Dados iniciais baseados no conteúdo existente do site

const categories = [
  { name: 'Segurança', slug: 'seguranca', icon: 'Shield', color: '#0A2540' },
  { name: 'Sustentabilidade', slug: 'sustentabilidade', icon: 'Leaf', color: '#00B37E' },
  { name: 'Urbanismo', slug: 'urbanismo', icon: 'Building2', color: '#6366F1' },
  { name: 'Comunidade', slug: 'comunidade', icon: 'Users', color: '#F59E0B' },
  { name: 'Eventos', slug: 'eventos', icon: 'Calendar', color: '#EC4899' },
]

const impactMetrics = [
  { label: 'Investimento total', value: 2400000, prefix: 'R$', unit: '', featured: true, order: 1 },
  { label: 'Câmeras ativas', value: 247, unit: 'câmeras', featured: true, order: 2 },
  { label: 'Cobertura da orla', value: 89, suffix: '%', featured: true, order: 3 },
  { label: 'Parceiros ativos', value: 68, unit: 'parceiros', featured: true, order: 4 },
  { label: 'Projetos concluídos', value: 6, unit: 'projetos', featured: true, order: 5 },
  { label: 'Anos de atuação', value: 5, unit: 'anos', featured: false, order: 6 },
]
```

---

## Conexão e performance

```typescript
// apps/web/src/lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Variáveis de ambiente

```env
# .env.local (apps/web)
DATABASE_URL="postgresql://user:pass@host:5432/jureremais?schema=public"
PAYLOAD_SECRET="32-char-random-string"
REVALIDATE_SECRET="32-char-random-string"
NEXT_PUBLIC_APP_URL="https://www.jureremais.org"
NEXT_PUBLIC_CMS_URL="https://cms.jureremais.org"

# Email
RESEND_API_KEY="re_..."
CONTACT_EMAIL="contato@jureremais.org"

# Storage
S3_BUCKET="jureremais-media"
S3_REGION="sa-east-1"
S3_ACCESS_KEY="..."
S3_SECRET_KEY="..."
S3_ENDPOINT="https://..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_GA4_ID="G-..."
```
