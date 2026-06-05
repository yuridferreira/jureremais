# 09 — Plano de Implementação

---

## Fase 1 — Fundação (Semanas 1–4)

**Objetivo:** Infraestrutura, design system e home funcionando.

### Semana 1 — Setup

```
[ ] Monorepo pnpm + Turborepo
[ ] apps/web: Next.js 15 + TypeScript + Tailwind + Shadcn
[ ] apps/cms: Payload CMS 3 + PostgreSQL adapter
[ ] packages/ui, types, utils
[ ] Docker Compose (PostgreSQL local)
[ ] ESLint + Prettier + Husky + lint-staged
[ ] .env.example documentado
[ ] Deploy: Vercel (web) + Railway (cms + db)
[ ] Domínio: jureremais.org → Vercel
[ ] Domínio: cms.jureremais.org → Railway
[ ] GitHub Actions: CI básico (typecheck + lint)
```

### Semana 2 — Design System

```
[ ] Tokens CSS (cores, tipografia, espaçamento, radius)
[ ] Fontes: Inter Variable + Playfair Display (next/font)
[ ] Shadcn: Button, Card, Badge, Dialog, Input, Textarea, Select, Tabs, Separator
[ ] Componentes customizados: AnimatedCounter, ScrollReveal, SkipToContent
[ ] ThemeToggle + next-themes (dark mode)
[ ] globals.css completo
[ ] Storybook (opcional — se escopo permitir)
```

### Semana 3 — CMS Setup

```
[ ] Collections: Projects, Partners, News, Media, Users
[ ] Collections: Reports, ImpactMetrics, TeamMembers, Testimonials
[ ] Collections: Categories, Tags, Documents, MembershipRequests
[ ] Globals: Settings, HomePage, Navigation
[ ] Blocos ricos: RichText, Image, Video, Callout, Quote
[ ] Hooks: slugify, setPublishedAt, revalidateNext
[ ] Upload S3/R2 configurado
[ ] Seeds: categorias, métricas de impacto, dados iniciais
[ ] Usuários admin criados
```

### Semana 4 — Home

```
[ ] Layout: Header (desktop + mobile), Footer
[ ] AnnouncementBar (global, editável no CMS)
[ ] HeroSection (foto aérea Jurerê + animações)
[ ] ImpactCountersSection (animatedCounter + IntersectionObserver)
[ ] ManifestoSection (scroll storytelling)
[ ] FeaturedProjectsSection (3 cards dinâmicos do CMS)
[ ] PillarsSection (5 pilares)
[ ] PartnersSection (carrossel infinito de logos)
[ ] LatestNewsSection (3 posts mais recentes)
[ ] CtaSection (fundo escuro + dois CTAs)
[ ] Metadata da home (OG, Twitter card)
[ ] Lighthouse check: meta 90+
```

**Entregável Fase 1:** Home publicada + CMS admin operacional.

---

## Fase 2 — Conteúdo institucional (Semanas 5–8)

**Objetivo:** O Movimento, Projetos, Parceiros.

### Semana 5 — O Movimento

```
[ ] /o-movimento — page overview
[ ] /o-movimento/historia — timeline interativa
[ ] /o-movimento/governanca — organograma + TeamMemberCards
[ ] /o-movimento/manifesto — scroll storytelling longo
[ ] Seção "Como surgiu" com imagem histórica
[ ] Seção Missão/Visão/Valores
[ ] SEO de cada sub-página
```

### Semana 6 — Projetos

```
[ ] /projetos — listagem com filtros (categoria + status)
[ ] ProjectCard (3 variantes)
[ ] URL params para filtros (estado na URL, sem JS dependência)
[ ] Paginação (ISR friendly)
[ ] /projetos/[slug] — detalhe completo
[ ] ProjectHero (fullwidth image + pill + dados)
[ ] ProjectGallery (lightbox)
[ ] ProjectTimeline
[ ] ProjectResults
[ ] Sidebar com investimento, parceiros, status
[ ] Related projects
[ ] JSON-LD para cada projeto
[ ] Semear projetos reais no CMS
```

### Semana 7 — Parceiros

```
[ ] /parceiros — grid com filtros por categoria
[ ] Busca client-side (useDebounce + filter)
[ ] PartnerCard (3 variantes)
[ ] /parceiros/[slug] — perfil completo
[ ] Seção depoimento no perfil
[ ] CTA "Seja parceiro" no topo e rodapé da listagem
[ ] Semear parceiros reais no CMS
```

### Semana 8 — Refinamento + QA Fase 2

```
[ ] Testes de rotas e links quebrados
[ ] Responsividade mobile em todas as páginas
[ ] Animações: timing, easing, performance
[ ] Imagens: alt, lazy, tamanhos corretos
[ ] Lighthouse auditoria
[ ] Acessibilidade: teclado, ARIA, contraste
```

**Entregável Fase 2:** Seções institutionais completas e publicadas.

---

## Fase 3 — Dados e Transparência (Semanas 9–11)

**Objetivo:** Dashboard de impacto, transparência, relatórios.

### Semana 9 — Dashboard de Impacto

```
[ ] /impacto — página principal
[ ] ImpactHero com YearSelector
[ ] MetricsGrid (BIG NUMBERS animados)
[ ] InvestmentChart (Recharts BarChart por ano)
[ ] PartnersDonut (PieChart por categoria)
[ ] CoverageMap (Leaflet — dinâmico, sem SSR)
[ ] ImpactBar (projetos × investimento)
[ ] TestimonialsSwiper
[ ] PDF download do relatório de impacto
[ ] Filtro temporal (URL param ?ano=2024)
```

### Semana 10 — Transparência

```
[ ] /transparencia — página principal
[ ] FinancialSummary (resumo do ano atual)
[ ] ReportsGrid com filtro por tipo e ano
[ ] /transparencia/[ano] — arquivo histórico
[ ] Download de documentos (rota assinada S3)
[ ] DocumentDownload tracking
[ ] Tabela investimentos por projeto
[ ] Semear relatórios históricos no CMS
```

### Semana 11 — Refinamento Fase 3

```
[ ] Performance dos charts (lazy + suspense)
[ ] Print CSS para relatórios
[ ] Export to PDF (botão na página de impacto)
[ ] Acessibilidade dos gráficos (aria-label, tabindex)
[ ] Lighthouse 95+ em todas as páginas
```

**Entregável Fase 3:** Dashboard de impacto + transparência online.

---

## Fase 4 — Engajamento (Semanas 12–14)

**Objetivo:** Notícias, Participar, Contato.

### Semana 12 — Blog de Notícias

```
[ ] /noticias — listagem com filtros de categoria
[ ] FeaturedPost (post em destaque no topo)
[ ] NewsGrid (cards em grid)
[ ] Paginação server-side
[ ] /noticias/categoria/[slug] — listagem filtrada
[ ] /noticias/[slug] — post individual
[ ] Rich text rendering (Payload Lexical → HTML)
[ ] TableOfContents (sticky no desktop)
[ ] ShareButtons (WhatsApp, Twitter, cópia de link)
[ ] ReadingTime (calculado no CMS hook)
[ ] AuthorCard
[ ] RelatedPosts
[ ] NewsletterCTA no final de cada post
[ ] Semear posts iniciais no CMS
```

### Semana 13 — Participar + Contato

```
[ ] /participar — seletor de perfil
[ ] MembershipForm multi-step (4 etapas)
[ ] Validação Zod por etapa
[ ] POST /api/membership — salva no Payload + Prisma
[ ] Email de confirmação (Resend template)
[ ] Email de notificação para equipe
[ ] Página de obrigado personalizada por tipo
[ ] /contato — formulário + mapa + info
[ ] ContactForm com honeypot anti-spam
[ ] POST /api/contact com rate limiting
[ ] WhatsApp link direto
[ ] Google Maps embed
```

### Semana 14 — Newsletter + Refinamento

```
[ ] NewsletterForm no footer
[ ] POST /api/newsletter (double opt-in)
[ ] Email de confirmação de newsletter
[ ] /api/newsletter/confirm (token JWT)
[ ] Página de confirmação de newsletter
[ ] Páginas legais: /privacidade, /cookies, /termos, /acessibilidade
[ ] Cookie consent banner (LGPD)
[ ] 404 customizado com sugestões de navegação
[ ] Error boundary global
```

**Entregável Fase 4:** Plataforma completa com todos os fluxos.

---

## Fase 5 — Performance & SEO (Semanas 15–16)

**Objetivo:** Lighthouse 95+, SEO avançado, segurança.

```
[ ] Metadata dinâmica em todas as páginas dinâmicas
[ ] Open Graph images dinâmicas (next/og)
[ ] JSON-LD: Organization, WebSite, Article, BreadcrumbList
[ ] Sitemap.xml dinâmico com todas as rotas
[ ] Robots.txt configurado
[ ] Canonical URLs em todas as páginas
[ ] next/image: blurDataURL, sizes corretos
[ ] Font subsetting (glyphs usados apenas)
[ ] Bundle analysis (next-bundle-analyzer)
[ ] Code splitting agressivo (dynamic imports)
[ ] Headers de segurança (CSP, HSTS, X-Frame-Options)
[ ] Rate limiting nas API routes
[ ] Proteção de uploads (validação MIME server-side)
[ ] Anti-spam avançado nos formulários (Turnstile/hCaptcha)
[ ] Audit Lighthouse final: 95+ em todas as páginas
[ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
[ ] Teste em 3G simulado
[ ] Testes em iOS Safari + Chrome Android
```

---

## Fase 6 — Analytics & Manutenção (Ongoing)

```
[ ] PostHog: eventos de conversão (form submits, downloads, CTAs)
[ ] Google Analytics 4: metas configuradas
[ ] Search Console: sitemap enviado
[ ] Alertas de erros (Sentry ou similar)
[ ] Backup automático PostgreSQL (Railway)
[ ] Monitoramento uptime (UptimeRobot)
[ ] Review trimestral de conteúdo
[ ] Atualização de dependências (Renovate bot)
```

---

## Estimativa de horas por fase

| Fase | Semanas | Horas estimadas |
|------|---------|----------------|
| 1 — Fundação | 1–4 | 80–100h |
| 2 — Conteúdo institucional | 5–8 | 80–100h |
| 3 — Dados e Transparência | 9–11 | 60–80h |
| 4 — Engajamento | 12–14 | 60–80h |
| 5 — Performance & SEO | 15–16 | 40–50h |
| **Total** | **16 sem** | **320–410h** |

---

## Ordem de prioridade MVP (se necessário cortar escopo)

```
P0 (lançamento)
  ✓ Home completa
  ✓ O Movimento
  ✓ Projetos (listagem + detalhe)
  ✓ Parceiros (listagem)
  ✓ Contato
  ✓ CMS operacional

P1 (semana após lançamento)
  ✓ Impacto Dashboard
  ✓ Transparência
  ✓ Participar (formulário)

P2 (mês seguinte)
  ✓ Blog de Notícias
  ✓ Newsletter
  ✓ Perfis individuais de parceiros

P3 (roadmap 6 meses)
  ✓ Mapa de cobertura interativo
  ✓ Multi-idioma (PT + EN)
  ✓ App PWA
  ✓ Portal do parceiro (área logada)
```

---

## Comandos de setup (Fase 1)

```bash
# 1. Criar monorepo
mkdir jureremais && cd jureremais
pnpm init
pnpm add -D turbo

# 2. Criar apps
pnpm create next-app apps/web --typescript --tailwind --app --src-dir --import-alias "@/*"
mkdir apps/cms && cd apps/cms && pnpm init

# 3. Instalar Payload
cd apps/cms
pnpm add payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical

# 4. Instalar dependências web
cd apps/web
pnpm add framer-motion lucide-react @radix-ui/react-navigation-menu
pnpm add react-hook-form @hookform/resolvers zod
pnpm add recharts leaflet react-leaflet
pnpm add next-themes class-variance-authority clsx tailwind-merge
pnpm add resend @auth/core next-auth@beta
pnpm add @prisma/client prisma

# 5. Shadcn UI
npx shadcn@latest init
npx shadcn@latest add button card badge dialog input textarea select tabs separator skeleton toast

# 6. Prisma
pnpm prisma init
pnpm prisma migrate dev --name init
```
