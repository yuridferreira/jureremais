import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils/cn'
import type { CMSNewsPost } from '@/types/cms'

const categoryColors: Record<string, string> = {
  seguranca:        'text-blue-700  bg-blue-50',
  sustentabilidade: 'text-emerald-700 bg-emerald-50',
  urbanismo:        'text-amber-700 bg-amber-50',
  comunidade:       'text-violet-700 bg-violet-50',
  eventos:          'text-rose-700  bg-rose-50',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

interface LatestNewsSectionProps {
  posts: CMSNewsPost[]
}

export function LatestNewsSection({ posts }: LatestNewsSectionProps) {
  if (posts.length === 0) return null

  const [featured, ...rest] = posts.slice(0, 3)

  return (
    <section className="bg-warm py-24" aria-labelledby="news-title">
      <div className="container-premium">
        <ScrollReveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
              Últimas notícias
            </p>
            <h2 id="news-title" className="font-display text-3xl font-bold text-primary sm:text-4xl">
              O que acontece em Jurerê
            </h2>
          </div>
          <Link
            href="/noticias"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-text transition-colors hover:text-accent-dark"
          >
            Ver todas as notícias
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-5">
          {featured && (
            <ScrollReveal className="lg:col-span-3">
              <Link
                href={`/noticias/${featured.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:shadow-md"
              >
                <div className="relative h-56 w-full overflow-hidden sm:h-72">
                  <Image
                    src={featured.coverImage.sizes?.card?.url ?? featured.coverImage.url}
                    alt={featured.coverImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', categoryColors[featured.category?.slug ?? ''] ?? 'text-accent-text bg-accent/10')}>
                      {featured.category?.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Calendar className="size-3" aria-hidden />
                      {formatDate(featured.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-accent-text sm:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {rest.length > 0 && (
            <div className="flex flex-col gap-5 lg:col-span-2">
              {rest.map((post, i) => (
                <ScrollReveal key={post.id} delay={0.1 + i * 0.08}>
                  <Link
                    href={`/noticias/${post.slug}`}
                    className="group flex gap-4 overflow-hidden rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/40 hover:shadow-sm"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={post.coverImage.sizes?.thumbnail?.url ?? post.coverImage.url}
                        alt={post.coverImage.alt}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className={cn('inline-block rounded-full px-2 py-px text-[10px] font-medium', categoryColors[post.category?.slug ?? ''] ?? 'text-accent-text bg-accent/10')}>
                        {post.category?.name}
                      </span>
                      <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors group-hover:text-accent-text">
                        {post.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                        <Calendar className="size-3" aria-hidden />
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
