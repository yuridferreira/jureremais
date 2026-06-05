# 07 — Arquitetura de Componentes

## Princípios

1. **Server Components por padrão** — `'use client'` apenas quando necessário (interatividade, hooks, animações)
2. **Composição sobre herança** — slots e children, não props drilling
3. **Colocação de responsabilidade** — dados no Server Component, UI no Client Component
4. **Zero barrel re-exports** — imports explícitos para tree-shaking
5. **Variantes via CVA** — `class-variance-authority` para variações consistentes

---

## Hierarquia de componentes

```
Server Components (sem 'use client')
├── Layout (Header, Footer, PageWrapper)
├── Sections de conteúdo estático
├── Cards que apenas exibem dados
└── Wrappers de página

Client Components ('use client')
├── Tudo com animações Framer Motion
├── Formulários (React Hook Form)
├── Filtros interativos
├── Gráficos (Recharts)
├── Menu mobile, modais, dropdowns
└── ThemeToggle, Sliders, Carrosseis
```

---

## Layout

### `Header.tsx` (Client — menu interativo)

```typescript
// Props
interface HeaderProps {
  transparent?: boolean // hero com fundo transparente
}

// Responsabilidades
// - Logo com link para home
// - NavigationMenu desktop (Radix)
// - MobileMenu (drawer) para mobile
// - ThemeToggle
// - CTA "Participar" (botão primário)
// - Scroll-aware: muda fundo ao scrollar
// - Active state nos links

// Estado
// - isScrolled: boolean
// - isMobileMenuOpen: boolean
```

### `NavigationMenu.tsx` (Client)

```typescript
// Menu principal com submenus
const navigation = [
  {
    label: 'O Movimento',
    href: '/o-movimento',
    children: [
      { label: 'História', href: '/o-movimento/historia' },
      { label: 'Governança', href: '/o-movimento/governanca' },
      { label: 'Manifesto', href: '/o-movimento/manifesto' },
    ],
  },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Impacto', href: '/impacto' },
  { label: 'Parceiros', href: '/parceiros' },
  { label: 'Transparência', href: '/transparencia' },
  { label: 'Notícias', href: '/noticias' },
]
```

### `Footer.tsx` (Server)

```typescript
// Responsabilidades
// - Logo + missão resumida
// - Links por categoria
// - Redes sociais
// - Newsletter signup (Client component inline)
// - Copyright + links legais
// - "Desenvolvido por [Studio]"
```

---

## Sections — Home

### `HeroSection.tsx` (Client — Framer Motion)

```typescript
interface HeroSectionProps {
  title: string
  subtitle: string
  imageUrl: string
  videoUrl?: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

// Responsabilidades
// - Imagem/vídeo de fundo em fullscreen
// - Overlay gradiente para legibilidade
// - Título com animação de entrada (stagger)
// - Dois CTAs
// - Scroll indicator animado (bounce)
// - Parallax sutil no scroll

// Animações
// - Container: fadeIn 0.8s
// - Título: slideUp + stagger por palavra
// - Subtítulo: fadeIn delay 0.4s
// - CTAs: fadeIn delay 0.6s
// - Scroll indicator: bounce infinito
```

### `ImpactCountersSection.tsx` (Client — AnimatedCounter)

```typescript
interface CounterItem {
  label: string
  value: number
  prefix?: string
  suffix?: string
  icon: string
}

// Responsabilidades
// - Grid 4 colunas (2x2 mobile)
// - Animação de contagem ao entrar no viewport
// - Ícone Lucide por métrica
// - Fundo escuro (azul profundo)
// - Usa IntersectionObserver para trigger da animação

// AnimatedCounter hook
// useCountUp(value, duration=2000, start=0)
```

### `ManifestoSection.tsx` (Client — scroll storytelling)

```typescript
// Responsabilidades
// - Texto grande, tipografia Playfair Display
// - Paragrafos entram progressivamente no scroll
// - Quote destacado com borda esquerda accent
// - CTA para manifesto completo
// - Fundo branco com muito whitespace
```

### `FeaturedProjectsSection.tsx` (Server + Client)

```typescript
interface FeaturedProjectsSectionProps {
  projects: Project[]
}

// Server: fetch os projetos featured
// Client: grid com hover animations
// - 3 cards em desktop, 1 em mobile (swiper)
// - Cada card: imagem, categoria pill, título, valor investido, status
// - Hover: escala leve + sombra
```

### `PartnersSection.tsx` (Client — carrossel infinito)

```typescript
// Responsabilidades
// - Título da seção
// - Carrossel infinito de logos (marquee)
// - Dois rows: um esquerda-direita, outro direita-esquerda
// - Hover pausa o carrossel
// - CTA "Ver todos os parceiros"
```

---

## Cards

### `ProjectCard.tsx` (Client)

```typescript
interface ProjectCardProps {
  project: {
    name: string
    slug: string
    excerpt: string
    coverImage: Media
    category: string
    status: ProjectStatus
    investment?: number
  }
  variant?: 'default' | 'featured' | 'compact'
}

// Variante default: imagem topo, conteúdo baixo
// Variante featured: imagem grande, texto overlay
// Variante compact: horizontal (imagem + texto lado a lado)

// Hover state: imagem escala 1.05, overlay aparece com link "Ver projeto"
```

### `PartnerCard.tsx` (Client)

```typescript
interface PartnerCardProps {
  partner: {
    name: string
    slug: string
    logo: Media
    category: string
    since?: Date
    featured?: boolean
  }
  variant?: 'grid' | 'logo-only' | 'detailed'
}

// Variante grid: logo centralizado, nome embaixo
// Variante logo-only: apenas logo (para carrossel home)
// Variante detailed: logo + nome + categoria + "parceiro desde X"
```

### `NewsCard.tsx` (Client)

```typescript
interface NewsCardProps {
  post: {
    title: string
    slug: string
    excerpt: string
    coverImage: Media
    category: Category
    publishedAt: Date
    readingTime?: number
  }
  variant?: 'default' | 'featured' | 'minimal'
}
```

### `MetricCard.tsx` (Client — AnimatedCounter)

```typescript
interface MetricCardProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  icon?: string
  description?: string
  trend?: 'up' | 'down' | 'stable'
  previousValue?: number
}
```

### `ReportCard.tsx` (Server)

```typescript
interface ReportCardProps {
  report: {
    title: string
    type: string
    year: number
    description?: string
    documentUrl: string
    fileSize?: string
  }
}
// Ícone de PDF, título, ano, tamanho, botão download
```

### `TeamMemberCard.tsx` (Server)

```typescript
interface TeamMemberCardProps {
  member: {
    name: string
    role: string
    photo?: Media
    bio?: string
    linkedin?: string
  }
  variant?: 'grid' | 'list'
}
```

### `TestimonialCard.tsx` (Client)

```typescript
interface TestimonialCardProps {
  testimonial: {
    quote: string
    author: string
    role?: string
    photo?: Media
    partnerName?: string
    partnerLogo?: Media
  }
}
// Aspas decorativas grandes, foto redonda, nome em destaque
```

---

## Charts

Todos os gráficos são **Client Components** usando **Recharts**.

### `InvestmentChart.tsx`

```typescript
// BarChart com dados por ano
// Tooltip customizado com formatação R$
// Cores por categoria de projeto
// Responsive: recharts ResponsiveContainer

interface InvestmentChartProps {
  data: Array<{
    year: number
    seguranca: number
    sustentabilidade: number
    urbanismo: number
    comunidade: number
  }>
}
```

### `PartnersDonut.tsx`

```typescript
// PieChart/RadialChart com distribuição por categoria
// Legend customizada com count e percentual
// Animação de entrada
```

### `ImpactBar.tsx`

```typescript
// Horizontal BarChart para resultados por projeto
// Exibe nome do projeto + valor investido
// Ordenado por valor desc
```

### `CoverageMap.tsx`

```typescript
// Mapa interativo com Leaflet (dinâmico, sem SSR)
// Overlay de cobertura de câmeras em Jurerê
// Markers para locais de projetos
// Tooltip com informações

// Carregamento dinâmico para evitar SSR:
// const Map = dynamic(() => import('./MapLeaflet'), { ssr: false })
```

---

## Forms

Todos os formulários usam **React Hook Form + Zod**.

### `ContactForm.tsx`

```typescript
// Schema Zod
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.enum(['geral', 'parceria', 'imprensa', 'urgente']),
  message: z.string().min(20).max(2000),
})

// Responsabilidades
// - Validação client-side em tempo real
// - Feedback visual de erro por campo
// - Estado de loading durante submit
// - Toast de sucesso/erro após submit
// - Honeypot anti-spam (campo oculto)
// - Rate limiting server-side (next api route)
```

### `MembershipForm.tsx` (multi-step)

```typescript
// 4 etapas com validação por step
// Step 1: Tipo (morador | empresa | instituição | parceiro)
// Step 2: Dados pessoais/empresa (condicional por tipo)
// Step 3: Áreas de interesse
// Step 4: Revisão + confirmação

// Progresso visual no topo (stepper)
// Volta ao step anterior sem perder dados (useForm persist)
```

### `NewsletterForm.tsx`

```typescript
// Inline, sem modal
// Apenas email (+ nome opcional)
// Double opt-in: envia confirmação por email
// Feedback inline (sem toast)
```

---

## UI Primitivos

### `AnimatedCounter.tsx`

```typescript
// Hook useCountUp + span com número
// Trigger via IntersectionObserver
// Formata número (Intl.NumberFormat)

function AnimatedCounter({
  value, prefix, suffix, duration = 2000
}: AnimatedCounterProps)
```

### `ScrollReveal.tsx`

```typescript
// Wrapper genérico para animação on scroll
// Props: delay, direction (up|down|left|right), distance
// Usa Framer Motion + useInView

function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 24,
}: ScrollRevealProps)
```

### `ImageGallery.tsx` (Client)

```typescript
// Grid de imagens com lightbox
// Thumbnail → fullscreen com navegação
// Swipe em mobile
// Teclado (esc, arrows)
```

### `ThemeToggle.tsx` (Client)

```typescript
// Botão Sun/Moon com next-themes
// Animação de rotação ao trocar
// Respeita prefers-color-scheme
```

### `SkipToContent.tsx`

```typescript
// Link visível apenas no focus
// Pula direto para #main-content
// Acessibilidade WCAG AA
```

---

## Hooks customizados

### `useScrollProgress.ts`

```typescript
// Retorna progresso do scroll 0-1
// Para progress bar no topo de posts
export function useScrollProgress(): number
```

### `useIntersectionObserver.ts`

```typescript
// Wrapper sobre IntersectionObserver
// Retorna isInView: boolean
// Opções: threshold, rootMargin, triggerOnce
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit & { triggerOnce?: boolean }
): boolean
```

### `useMediaQuery.ts`

```typescript
// Breakpoints Tailwind
// sm: 640, md: 768, lg: 1024, xl: 1280
export function useMediaQuery(query: string): boolean
export function useIsDesktop(): boolean
export function useIsMobile(): boolean
```

### `useDebounce.ts`

```typescript
// Para campo de busca de parceiros
export function useDebounce<T>(value: T, delay: number): T
```

---

## Padrão de loading states

```typescript
// Cada section tem skeleton loading
// Usando Shadcn Skeleton component

// Exemplo ProjectCardSkeleton
function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}
```

---

## Design tokens (CSS vars)

```css
/* globals.css */
:root {
  --color-primary: #0A2540;
  --color-accent: #00B37E;
  --color-gold: #B8860B;
  --color-surface: #F8FAFC;
  --color-text: #1A1A2E;
  --color-muted: #64748B;
  --color-border: #E2E8F0;

  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
}

.dark {
  --color-primary: #60A5FA;
  --color-surface: #060D1A;
  --color-text: #F1F5F9;
  --color-muted: #94A3B8;
  --color-border: rgba(255,255,255,0.08);
}
```
