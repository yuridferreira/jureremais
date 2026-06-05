# Jurerê Mais — Plataforma Institucional

Plataforma institucional premium do Movimento Jurerê Mais.
**Next.js 15 · Payload CMS 3 · PostgreSQL · TailwindCSS v4**

## Pré-requisitos

- Node.js 18+
- pnpm 11+ (`curl -fsSL https://get.pnpm.io/install.sh | sh -`)
- Docker (para PostgreSQL local)

## Início rápido

```bash
# 1. Subir banco de dados local
docker compose up -d

# 2. Instalar dependências
pnpm install

# 3. Variáveis de ambiente (edite com seus valores reais)
cp .env.example apps/web/.env.local
cp .env.example apps/cms/.env

# 4. Gerar Prisma client e aplicar schema
cd apps/web && pnpm db:generate && pnpm db:push && cd ../..

# 5. Iniciar tudo em paralelo
pnpm dev
```

- Site público: <http://localhost:3000>
- CMS Admin: <http://localhost:3001/admin>

## Estrutura do monorepo

```text
apps/
  web/     ← Next.js 15 App Router (site público)
  cms/     ← Payload CMS 3 (admin + REST API)
docs/      ← Arquitetura completa (10 documentos)
```

## Documentação

- [ARCHITECTURE.md](ARCHITECTURE.md) — Índice master, stack, decisões arquiteturais
- [docs/01-project-overview.md](docs/01-project-overview.md) — Visão, personas, identidade visual
- [docs/02-folder-structure.md](docs/02-folder-structure.md) — Estrutura completa de pastas
- [docs/03-sitemap.md](docs/03-sitemap.md) — Todas as rotas e prioridades
- [docs/04-wireframes.md](docs/04-wireframes.md) — Wireframes textuais de cada página
- [docs/05-cms-modeling.md](docs/05-cms-modeling.md) — Collections Payload CMS com schemas
- [docs/06-database-modeling.md](docs/06-database-modeling.md) — ERD e Prisma schema
- [docs/07-components.md](docs/07-components.md) — Arquitetura de componentes React
- [docs/08-user-flows.md](docs/08-user-flows.md) — Fluxos por persona
- [docs/09-implementation-plan.md](docs/09-implementation-plan.md) — Fases de implementação e roadmap
- [docs/10-seo-performance.md](docs/10-seo-performance.md) — SEO, performance, segurança, LGPD

## Deploy

```text
Web (Next.js)  → Vercel  (conectar repo + env vars)
CMS (Payload)  → Railway (Node.js app)
Database       → Railway PostgreSQL ou Supabase
Storage        → Cloudflare R2 ou AWS S3
```
