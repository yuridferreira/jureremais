import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getNews, getCategories } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { formatRelativeDate } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'

export const revalidate = 60

export const metadata: Metadata = generatePageMetadata({
  title: 'Notícias',
  description: 'Acompanhe as últimas notícias e novidades do Jurerê Mais — segurança, sustentabilidade, urbanismo e comunidade.',
  path: '/noticias',
})

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string }>
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoria = params.categoria ?? ''
  const page = Number(params.pagina ?? 1)

  const [data, categories] = await Promise.all([
    getNews({ category: categoria || undefined, page, limit: 12 }),
    getCategories(),
  ])

  const featured = data.docs.find((p) => p.featured) ?? data.docs[0]
  const rest = data.docs.filter((p) => p.id !== featured?.id)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-surface-alt py-16 dark:bg-dark-surface">
        <div className="container-premium">
          <ScrollReveal>
            <h1 className="mb-2 font-display text-4xl font-bold text-text dark:text-white sm:text-5xl">Notícias</h1>
            <p className="text-lg text-muted">Tudo que acontece em Jurerê, pela perspectiva do movimento.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category filters */}
      <nav className="border-b border-border bg-surface dark:bg-dark dark:border-white/10" aria-label="Categorias">
        <div className="container-premium flex gap-2 overflow-x-auto py-3">
          <Link
            href="/noticias"
            className={cn('shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors', !categoria ? 'bg-accent text-white' : 'text-muted hover:text-text dark:hover:text-white')}
          >
            Todas
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/noticias?categoria=${cat.slug}`}
              className={cn('shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors', categoria === cat.slug ? 'bg-accent text-white' : 'text-muted hover:text-text dark:hover:text-white')}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container-premium py-12">
        {/* Featured post */}
        {featured && (
          <ScrollReveal className="mb-12">
            <Link
              href={`/noticias/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-border bg-surface dark:bg-dark-surface dark:border-white/10 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/9] lg:aspect-auto">
                <Image
                  src={featured.coverImage.sizes?.hero?.url ?? featured.coverImage.url}
                  alt={featured.coverImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {featured.category.name}
                </span>
                <h2 className="mb-3 font-display text-2xl font-bold text-text group-hover:text-primary dark:text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mb-6 text-muted line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock className="size-3.5" />
                    {featured.readingTime && `${featured.readingTime} min · `}
                    {formatRelativeDate(featured.publishedAt)}
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                    Ler mais <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Posts grid */}
        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <ScrollReveal key={post.id} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  href={`/noticias/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-md dark:bg-dark-surface dark:border-white/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage.sizes?.card?.url ?? post.coverImage.url}
                      alt={post.coverImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-xs font-semibold text-accent">{post.category.name}</span>
                    <h3 className="mb-2 flex-1 font-display text-lg font-semibold text-text group-hover:text-primary dark:text-white line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Clock className="size-3" />
                      {post.readingTime && `${post.readingTime} min · `}
                      {formatRelativeDate(post.publishedAt)}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {data.docs.length === 0 && (
          <p className="py-24 text-center text-muted">Nenhuma notícia encontrada.</p>
        )}

        {/* Pagination */}
        {data.totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginação">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/noticias?${categoria ? `categoria=${categoria}&` : ''}pagina=${p}`}
                aria-current={p === page ? 'page' : undefined}
                className={cn('flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors', p === page ? 'bg-accent text-white' : 'text-muted hover:bg-surface-alt dark:hover:bg-white/10')}
              >
                {p}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
