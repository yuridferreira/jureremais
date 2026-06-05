# Jurerê Mais — Arquitetura Master

> Plataforma institucional premium. Next.js 15 · TypeScript · Payload CMS · PostgreSQL.

---

## Índice

| # | Documento | Descrição |
|---|-----------|-----------|
| 1 | [docs/01-project-overview.md](docs/01-project-overview.md) | Visão, objetivos, público-alvo, pilares |
| 2 | [docs/02-folder-structure.md](docs/02-folder-structure.md) | Estrutura completa de pastas e arquivos |
| 3 | [docs/03-sitemap.md](docs/03-sitemap.md) | Mapa completo do site + rotas |
| 4 | [docs/04-wireframes.md](docs/04-wireframes.md) | Wireframes textuais de todas as páginas |
| 5 | [docs/05-cms-modeling.md](docs/05-cms-modeling.md) | Collections Payload CMS + schemas |
| 6 | [docs/06-database-modeling.md](docs/06-database-modeling.md) | ERD, entidades, relacionamentos, índices |
| 7 | [docs/07-components.md](docs/07-components.md) | Arquitetura de componentes React |
| 8 | [docs/08-user-flows.md](docs/08-user-flows.md) | Fluxos de usuário por persona |
| 9 | [docs/09-implementation-plan.md](docs/09-implementation-plan.md) | Fases de implementação + roadmap |
| 10 | [docs/10-seo-performance.md](docs/10-seo-performance.md) | SEO avançado, performance, segurança |

---

## Stack definitiva

```
Frontend        Next.js 15 (App Router) + TypeScript
Styling         TailwindCSS v4 + Shadcn/UI
Animation       Framer Motion
Icons           Lucide Icons
Forms           React Hook Form + Zod
CMS             Payload CMS 3 (headless, self-hosted)
Database        PostgreSQL 16 + Prisma ORM
Storage         AWS S3 (ou Cloudflare R2)
Auth            NextAuth v5 (painel admin)
Email           Resend
Analytics       Vercel Analytics + PostHog
Deploy          Vercel (frontend) + Railway (Payload + PG)
Search          Algolia (ou Meilisearch self-hosted)
```

---

## Decisões arquiteturais chave

| Decisão | Escolha | Racional |
|---------|---------|---------|
| CMS | Payload CMS 3 | TypeScript-native, self-hosted, flexível, sem lock-in |
| Database | PostgreSQL + Prisma | Relacional, tipagem segura, migrations controladas |
| Rendering | ISR + Server Components | SEO máximo + dados sempre frescos |
| Storage | S3/R2 | CDN global, baixo custo, controle total |
| Deploy | Vercel + Railway | Zero-config CI/CD, escala automática |
| Auth | NextAuth v5 | Integração nativa App Router, múltiplos providers |

---

## Princípios de design

- **Conteúdo primeiro** — hierarquia visual clara, sem ruído
- **Whitespace como luxo** — espaçamento generoso transmite premium
- **Tipografia como identidade** — Inter (corpo) + Playfair Display (títulos institucionais)
- **Fotografia aérea** — Jurerê de drone como elemento visual central
- **Dados visuais** — métricas de impacto como storytelling
- **Motion com propósito** — animações reforçam narrativa, não decoram

---

## Paleta de cores

```
Primary      #0A2540   (azul institucional profundo)
Accent       #00B37E   (verde sustentabilidade)
Surface      #F8FAFC   (fundo premium)
Text         #1A1A2E   (texto principal)
Muted        #64748B   (texto secundário)
Border       #E2E8F0   (separadores sutis)
Gold         #B8860B   (detalhes premium / destaques)
```

---

## Roadmap resumido

```
Fase 1 (4 sem)   Setup + CMS + Design System + Home
Fase 2 (4 sem)   O Movimento + Projetos + Parceiros
Fase 3 (3 sem)   Impacto Dashboard + Transparência
Fase 4 (3 sem)   Notícias + Participar + Contato
Fase 5 (2 sem)   SEO avançado + Performance + QA
Fase 6 (ongoing) Analytics + CRO + Conteúdo
```
