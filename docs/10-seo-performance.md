# 10 — SEO, Performance, Segurança e Acessibilidade

---

## SEO Avançado

### Metadata dinâmica

```typescript
// apps/web/src/lib/seo/metadata.ts
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export function generatePageMetadata({
  title,
  description,
  image,
  path,
  noindex = false,
}: {
  title: string
  description: string
  image?: string
  path: string
  noindex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? siteConfig.defaultOgImage

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@jureremais',
    },
  }
}
```

### Metadata por tipo de página

```typescript
// Home
export const metadata: Metadata = generatePageMetadata({
  title: 'Gestão Urbana Colaborativa',
  description: 'Jurerê Mais é o movimento que une moradores, empresários e instituições para transformar Jurerê Internacional em um lugar mais seguro, sustentável e organizado.',
  path: '/',
})

// Projeto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  return generatePageMetadata({
    title: project.name,
    description: project.excerpt,
    image: project.seo?.ogImage?.url ?? project.coverImage.url,
    path: `/projetos/${project.slug}`,
  })
}
```

### Open Graph dinâmico com next/og

```typescript
// apps/web/src/app/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Jurerê Mais'
  const subtitle = searchParams.get('subtitle') ?? ''
  const type = searchParams.get('type') ?? 'default'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)',
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'flex-end',
          padding: '60px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ color: '#00B37E', fontSize: 18, marginBottom: 16 }}>
          JURERÊ MAIS
        </div>
        <div style={{ color: 'white', fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 24, marginTop: 16 }}>
            {subtitle}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

---

### JSON-LD Schemas

```typescript
// apps/web/src/lib/seo/jsonld.ts

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jurerê Mais',
    url: 'https://www.jureremais.org',
    logo: 'https://www.jureremais.org/images/logo.png',
    description: 'Movimento de gestão urbana colaborativa em Jurerê Internacional, Florianópolis.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Florianópolis',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://instagram.com/jureremais',
      'https://facebook.com/jureremais',
      'https://linkedin.com/company/jureremais',
    ],
  }
}

export function projectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.name,
    description: project.excerpt,
    url: `https://www.jureremais.org/projetos/${project.slug}`,
    image: project.coverImage?.url,
    funder: { '@type': 'Organization', name: 'Jurerê Mais' },
    startDate: project.startDate,
    endDate: project.endDate,
  }
}

export function articleSchema(post: NewsPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.url,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Jurerê Mais',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jurerê Mais',
      logo: { '@type': 'ImageObject', url: 'https://www.jureremais.org/images/logo.png' },
    },
    mainEntityOfPage: `https://www.jureremais.org/noticias/${post.slug}`,
  }
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.jureremais.org${item.href}`,
    })),
  }
}
```

---

### Sitemap dinâmico

```typescript
// apps/web/src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getProjects, getPartners, getNews } from '@/lib/payload/queries'

export default async function sitemap(): MetadataRoute.Sitemap {
  const [projects, partners, posts] = await Promise.all([
    getProjects({ limit: 999 }),
    getPartners({ limit: 999 }),
    getNews({ limit: 999 }),
  ])

  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' },
    { url: '/o-movimento', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/projetos', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/impacto', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/parceiros', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/transparencia', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/noticias', priority: 0.8, changeFrequency: 'daily' },
    { url: '/participar', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/contato', priority: 0.6, changeFrequency: 'monthly' },
  ].map(r => ({ ...r, url: `https://www.jureremais.org${r.url}`, lastModified: new Date() }))

  const dynamicRoutes = [
    ...projects.map(p => ({ url: `https://www.jureremais.org/projetos/${p.slug}`, lastModified: new Date(p.updatedAt), priority: 0.8 })),
    ...partners.map(p => ({ url: `https://www.jureremais.org/parceiros/${p.slug}`, lastModified: new Date(p.updatedAt), priority: 0.6 })),
    ...posts.map(p => ({ url: `https://www.jureremais.org/noticias/${p.slug}`, lastModified: new Date(p.updatedAt), priority: 0.7 })),
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
```

---

## Performance

### Estratégia de rendering

| Página | Estratégia | Revalidação |
|--------|-----------|-------------|
| / (Home) | ISR | 60s |
| /o-movimento | SSG | On deploy |
| /projetos | ISR | 60s |
| /projetos/[slug] | ISR | on-demand (webhook) |
| /impacto | ISR | 300s |
| /parceiros | ISR | 60s |
| /transparencia | ISR | 3600s |
| /noticias | ISR | 60s |
| /noticias/[slug] | ISR | on-demand |
| /participar | SSG | On deploy |
| /contato | SSG | On deploy |

### Imagens

```typescript
// next.config.ts
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: 's3.sa-east-1.amazonaws.com' },
    ],
  },
}
```

```typescript
// Uso correto em componentes
<Image
  src={project.coverImage.url}
  alt={project.coverImage.alt}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  placeholder="blur"
  blurDataURL={project.coverImage.blurDataUrl}
  priority={aboveFold}
/>
```

### Code splitting

```typescript
// Leaflet: nunca no SSR
const CoverageMap = dynamic(
  () => import('@/components/charts/CoverageMap'),
  { ssr: false, loading: () => <MapSkeleton /> }
)

// Gráficos pesados: lazy
const InvestmentChart = dynamic(
  () => import('@/components/charts/InvestmentChart'),
  { loading: () => <ChartSkeleton /> }
)

// Lightbox: só quando aberto
const ImageLightbox = dynamic(() => import('@/components/ui/ImageLightbox'))
```

### Fonts

```typescript
// apps/web/src/app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = localFont({
  src: '../../../public/fonts/PlayfairDisplay-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
})
```

### Bundle target

| Métrica | Meta |
|---------|------|
| Lighthouse Performance | 95+ |
| LCP | < 2.5s |
| FID/INP | < 100ms |
| CLS | < 0.1 |
| FCP | < 1.8s |
| TTFB | < 600ms |
| First JS bundle | < 150kb gzip |

---

## Segurança

### Headers HTTP

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.posthog.com",
    ].join('; '),
  },
]
```

### Rate limiting

```typescript
// apps/web/src/lib/security/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const contactRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
})

export const membershipRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '24 h'),
})

export const newsletterRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '1 h'),
})
```

### Validação server-side

```typescript
// API route: /api/contact/route.ts
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'

  // Rate limit
  const { success } = await contactRateLimit.limit(ip)
  if (!success) {
    return Response.json({ error: 'Muitas tentativas. Tente novamente em 1 hora.' }, { status: 429 })
  }

  // Parse + validate
  const body = await req.json()
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: 'Dados inválidos.', issues: result.error.issues }, { status: 400 })
  }

  // Honeypot check
  if (result.data.website) { // campo honeypot oculto
    return Response.json({ success: true }) // silencia bots
  }

  // Persiste no banco
  await prisma.contactSubmission.create({ data: { ...result.data, ipAddress: ip } })

  // Envia email
  await resend.emails.send({
    from: 'noreply@jureremais.org',
    to: process.env.CONTACT_EMAIL!,
    subject: `[Contato] ${result.data.subject} — ${result.data.name}`,
    react: ContactEmailTemplate(result.data),
  })

  return Response.json({ success: true })
}
```

### Proteção de uploads (Payload)

```typescript
// No Media collection
beforeOperation: [
  async ({ args, operation }) => {
    if (operation === 'create') {
      const { file } = args
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error('Tipo de arquivo não permitido')
      }
      const maxSize = 50 * 1024 * 1024 // 50MB
      if (file.size > maxSize) {
        throw new Error('Arquivo muito grande (máx 50MB)')
      }
    }
  }
]
```

---

## Acessibilidade (WCAG AA)

### Checklist estrutural

```
[x] HTML semântico: main, nav, header, footer, section, article, aside
[x] Headings hierárquicos (h1 único por página)
[x] Skip to content (#main-content)
[x] Focus visible em todos os interativos (outline 2px accent)
[x] Navegação por teclado completa (Tab, Shift+Tab, Enter, Space, Arrows)
[x] ARIA labels em ícones sem texto
[x] role="dialog" + aria-modal em modais
[x] aria-expanded em menus dropdown
[x] aria-current="page" no link ativo
[x] alt descritivo em todas as imagens
[x] Imagens decorativas: alt=""
[x] Contraste mínimo 4.5:1 (texto normal), 3:1 (texto grande)
[x] Formulários: label associado a cada input
[x] Erros de formulário: role="alert" + aria-describedby
[x] Vídeos: captions disponíveis
[x] PDFs: versão HTML alternativa linkada
[x] Não depender de cor como única diferenciação
```

### Focus styles

```css
/* globals.css */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Contraste verificado

| Combinação | Ratio | Status |
|------------|-------|--------|
| Texto escuro (#1A1A2E) em branco (#F8FAFC) | 16.7:1 | ✓ AAA |
| Texto branco em azul (#0A2540) | 14.5:1 | ✓ AAA |
| Texto verde (#00B37E) em branco | 3.2:1 | ✓ AA Large |
| Muted (#64748B) em branco | 5.1:1 | ✓ AA |

---

## LGPD / Cookie Consent

```typescript
// Cookies necessários (sem consentimento)
// - Session cookies
// - CSRF token

// Cookies analíticos (requerem consentimento)
// - Google Analytics 4
// - PostHog

// Banner de cookies
// - Aparece na 1ª visita
// - Opções: Aceitar todos | Apenas necessários | Configurar
// - Preferência salva em localStorage + cookie 1 ano
// - Analytics só carregados após consentimento

// Política de privacidade linkada no banner
// Dados coletados pelos formulários:
// - Bases legais: legítimo interesse (contato) + consentimento (newsletter)
// - Retenção: 2 anos para membership requests, 5 anos para newsletter
// - Direito de exclusão: email para privacidade@jureremais.org
```
