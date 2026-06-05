# 02 — Estrutura de Pastas

## Visão macro

```
jureremais/
├── apps/
│   ├── web/          ← Next.js 15 (site público)
│   └── cms/          ← Payload CMS 3 (admin + API)
├── packages/
│   ├── ui/           ← Design system compartilhado
│   ├── types/        ← TypeScript types compartilhados
│   └── utils/        ← Utilitários compartilhados
├── docs/             ← Documentação de arquitetura (este diretório)
├── scripts/          ← Seeds, migrations, utilitários
└── docker-compose.yml
```

> Monorepo gerenciado com **pnpm workspaces** + **Turborepo**.

---

## apps/web — Next.js 15

```
apps/web/
├── src/
│   ├── app/                          ← App Router
│   │   ├── (site)/                   ← Layout público
│   │   │   ├── layout.tsx            ← Root layout com header/footer
│   │   │   ├── page.tsx              ← Home /
│   │   │   │
│   │   │   ├── sobre/                ← /sobre
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── o-movimento/          ← /o-movimento
│   │   │   │   ├── page.tsx
│   │   │   │   ├── historia/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── governanca/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── manifesto/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── projetos/             ← /projetos
│   │   │   │   ├── page.tsx          ← Listagem
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      ← Detalhe do projeto
│   │   │   │
│   │   │   ├── impacto/              ← /impacto
│   │   │   │   └── page.tsx          ← Dashboard de métricas
│   │   │   │
│   │   │   ├── parceiros/            ← /parceiros
│   │   │   │   ├── page.tsx          ← Listagem filtrável
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      ← Perfil do parceiro
│   │   │   │
│   │   │   ├── transparencia/        ← /transparencia
│   │   │   │   ├── page.tsx
│   │   │   │   └── [ano]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── noticias/             ← /noticias
│   │   │   │   ├── page.tsx          ← Blog listagem
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx      ← Post individual
│   │   │   │   └── categoria/
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx  ← Listagem por categoria
│   │   │   │
│   │   │   ├── participar/           ← /participar
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── contato/              ← /contato
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                      ← API Routes
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── membership/
│   │   │   │   └── route.ts
│   │   │   ├── newsletter/
│   │   │   │   └── route.ts
│   │   │   ├── revalidate/
│   │   │   │   └── route.ts          ← Webhook Payload → ISR
│   │   │   └── sitemap-data/
│   │   │       └── route.ts
│   │   │
│   │   ├── sitemap.ts                ← Sitemap dinâmico
│   │   ├── robots.ts                 ← robots.txt dinâmico
│   │   ├── manifest.ts               ← Web App Manifest
│   │   ├── not-found.tsx             ← 404 customizado
│   │   ├── error.tsx                 ← Error boundary global
│   │   └── global-error.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── NavigationMenu.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   └── AnnouncementBar.tsx
│   │   │   ├── footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FooterLinks.tsx
│   │   │   │   └── FooterSocial.tsx
│   │   │   └── PageWrapper.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ManifestoSection.tsx
│   │   │   │   ├── ImpactCountersSection.tsx
│   │   │   │   ├── FeaturedProjectsSection.tsx
│   │   │   │   ├── PartnersSection.tsx
│   │   │   │   └── CtaSection.tsx
│   │   │   ├── movimento/
│   │   │   │   ├── TimelineSection.tsx
│   │   │   │   ├── ValoresSection.tsx
│   │   │   │   ├── GovernancaSection.tsx
│   │   │   │   └── TeamSection.tsx
│   │   │   ├── projetos/
│   │   │   │   ├── ProjectsGrid.tsx
│   │   │   │   ├── ProjectFilters.tsx
│   │   │   │   ├── ProjectHero.tsx
│   │   │   │   ├── ProjectGallery.tsx
│   │   │   │   ├── ProjectTimeline.tsx
│   │   │   │   └── ProjectResults.tsx
│   │   │   ├── impacto/
│   │   │   │   ├── ImpactHero.tsx
│   │   │   │   ├── MetricsGrid.tsx
│   │   │   │   ├── ImpactCharts.tsx
│   │   │   │   └── ImpactTimeline.tsx
│   │   │   ├── parceiros/
│   │   │   │   ├── PartnersGrid.tsx
│   │   │   │   ├── PartnerFilters.tsx
│   │   │   │   └── PartnerHero.tsx
│   │   │   ├── transparencia/
│   │   │   │   ├── ReportsGrid.tsx
│   │   │   │   ├── ReportCard.tsx
│   │   │   │   └── FinancialSummary.tsx
│   │   │   ├── noticias/
│   │   │   │   ├── NewsGrid.tsx
│   │   │   │   ├── NewsFilters.tsx
│   │   │   │   ├── FeaturedPost.tsx
│   │   │   │   └── PostBody.tsx
│   │   │   └── shared/
│   │   │       ├── SectionHeader.tsx
│   │   │       ├── CallToAction.tsx
│   │   │       └── Breadcrumbs.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── PartnerCard.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   ├── ReportCard.tsx
│   │   │   ├── TeamMemberCard.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   └── TestimonialCard.tsx
│   │   │
│   │   ├── charts/
│   │   │   ├── InvestmentChart.tsx
│   │   │   ├── ProjectsTimeline.tsx
│   │   │   ├── CoverageMap.tsx
│   │   │   ├── PartnersDonut.tsx
│   │   │   └── ImpactBar.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── MembershipForm.tsx
│   │   │   ├── PartnershipForm.tsx
│   │   │   └── NewsletterForm.tsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── BackButton.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── CategoryFilter.tsx
│   │   │
│   │   └── ui/
│   │       ├── AnimatedCounter.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── ParallaxImage.tsx
│   │       ├── VideoBackground.tsx
│   │       ├── ImageGallery.tsx
│   │       ├── PDFViewer.tsx
│   │       ├── ShareButton.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── SkipToContent.tsx
│   │
│   ├── lib/
│   │   ├── payload/
│   │   │   ├── client.ts             ← Payload REST client
│   │   │   ├── queries.ts            ← Funções de fetch tipadas
│   │   │   └── types.ts              ← Tipos gerados do CMS
│   │   ├── db/
│   │   │   └── prisma.ts             ← Prisma client singleton
│   │   ├── email/
│   │   │   ├── client.ts             ← Resend client
│   │   │   └── templates/
│   │   │       ├── contact.tsx
│   │   │       ├── membership.tsx
│   │   │       └── partnership.tsx
│   │   ├── analytics/
│   │   │   └── events.ts             ← PostHog event tracking
│   │   ├── seo/
│   │   │   ├── metadata.ts           ← generateMetadata helpers
│   │   │   ├── jsonld.ts             ← JSON-LD schemas
│   │   │   └── og.ts                 ← OG image generation
│   │   ├── security/
│   │   │   ├── rateLimit.ts
│   │   │   └── csrf.ts
│   │   └── utils/
│   │       ├── cn.ts                 ← clsx + tailwind-merge
│   │       ├── formatters.ts         ← datas, moeda, números
│   │       └── slugify.ts
│   │
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMediaQuery.ts
│   │   └── useDebounce.ts
│   │
│   ├── styles/
│   │   ├── globals.css               ← Tailwind base + CSS vars
│   │   └── typography.css            ← Prose styles
│   │
│   ├── types/
│   │   ├── cms.ts                    ← Payload generated types
│   │   ├── forms.ts                  ← Form schemas Zod
│   │   └── global.d.ts
│   │
│   └── config/
│       ├── navigation.ts             ← Links do menu
│       ├── site.ts                   ← Metadados do site
│       └── social.ts                 ← Redes sociais
│
├── public/
│   ├── images/
│   │   ├── og-default.jpg
│   │   └── favicon/
│   └── fonts/
│       └── (subset otimizado Inter + Playfair)
│
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## apps/cms — Payload CMS 3

```
apps/cms/
├── src/
│   ├── collections/
│   │   ├── Projects.ts
│   │   ├── Partners.ts
│   │   ├── News.ts
│   │   ├── Reports.ts
│   │   ├── Pages.ts
│   │   ├── Media.ts
│   │   ├── Testimonials.ts
│   │   ├── ImpactMetrics.ts
│   │   ├── TeamMembers.ts
│   │   ├── Documents.ts
│   │   ├── Categories.ts
│   │   ├── Tags.ts
│   │   └── Users.ts
│   │
│   ├── globals/
│   │   ├── Settings.ts               ← Configurações globais
│   │   ├── Navigation.ts             ← Menu principal
│   │   ├── HomePage.ts               ← Conteúdo home editável
│   │   └── ContactInfo.ts            ← Dados de contato
│   │
│   ├── blocks/                       ← Blocos reutilizáveis (Slate)
│   │   ├── RichTextBlock.ts
│   │   ├── ImageBlock.ts
│   │   ├── VideoBlock.ts
│   │   ├── CalloutBlock.ts
│   │   ├── QuoteBlock.ts
│   │   ├── MetricsBlock.ts
│   │   └── CTABlock.ts
│   │
│   ├── hooks/                        ← Payload hooks
│   │   ├── beforeChange/
│   │   │   ├── slugify.ts
│   │   │   └── setPublishedAt.ts
│   │   └── afterChange/
│   │       └── revalidate.ts         ← Trigger ISR no Next.js
│   │
│   ├── access/                       ← Controle de acesso
│   │   ├── isAdmin.ts
│   │   ├── isEditor.ts
│   │   └── isPublished.ts
│   │
│   └── payload.config.ts
│
├── tsconfig.json
└── package.json
```

---

## packages/

```
packages/
├── ui/
│   ├── src/
│   │   ├── components/         ← Componentes Shadcn customizados
│   │   └── tokens/             ← Design tokens compartilhados
│   └── package.json
│
├── types/
│   ├── src/
│   │   ├── payload.ts          ← Tipos auto-gerados Payload
│   │   └── shared.ts           ← Tipos compartilhados
│   └── package.json
│
└── utils/
    ├── src/
    │   ├── cn.ts
    │   ├── formatters.ts
    │   └── validators.ts
    └── package.json
```
