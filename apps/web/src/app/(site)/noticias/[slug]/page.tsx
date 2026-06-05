import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getNewsPost, getNews } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { articleSchema, breadcrumbSchema } from '@/lib/seo/jsonld'
import { formatDate, formatRelativeDate } from '@/lib/utils/formatters'

export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const data = await getNews({ limit: 100 })
    return data.docs.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getNewsPost(slug)
  if (!post) return {}
  return generatePageMetadata({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    image: post.seo?.ogImage?.url ?? post.coverImage.sizes?.og?.url,
    path: `/noticias/${post.slug}`,
    type: 'article',
    publishedAt: post.publishedAt,
  })
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getNewsPost(slug)
  if (!post) notFound()

  const related = await getNews({ category: post.category.slug, limit: 4 })
  const relatedPosts = related.docs.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              excerpt: post.excerpt,
              coverImageUrl: post.coverImage.url,
              publishedAt: post.publishedAt,
              slug: post.slug,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', href: '/' },
              { name: 'Notícias', href: '/noticias' },
              { name: post.category.name, href: `/noticias?categoria=${post.category.slug}` },
              { name: post.title, href: `/noticias/${post.slug}` },
            ])
          ),
        }}
      />

      <div className="pt-16">
        {/* Hero image */}
        <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
          <Image
            src={post.coverImage.sizes?.hero?.url ?? post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Article */}
        <div className="container-premium py-12">
          <div className="mx-auto max-w-2xl">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
              <Link href="/noticias" className="flex items-center gap-1.5 hover:text-text">
                <ArrowLeft className="size-3.5" /> Notícias
              </Link>
              <span>/</span>
              <Link
                href={`/noticias?categoria=${post.category.slug}`}
                className="hover:text-text"
              >
                {post.category.name}
              </Link>
            </nav>

            {/* Meta */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {post.category.name}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Calendar className="size-3.5" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <Clock className="size-3.5" />
                  {post.readingTime} min de leitura
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-text dark:text-white sm:text-5xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mb-10 border-l-4 border-accent pl-5 text-xl leading-relaxed text-muted">
              {post.excerpt}
            </p>

            {/* Author */}
            {post.author && (
              <div className="mb-10 flex items-center gap-3 border-b border-border pb-8 dark:border-white/10">
                {post.author.photo && (
                  <div className="relative size-10 overflow-hidden rounded-full">
                    <Image
                      src={post.author.photo.url}
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-text dark:text-white">{post.author.name}</p>
                  {post.author.role && <p className="text-xs text-muted">{post.author.role}</p>}
                </div>
              </div>
            )}

            {/* Rich text content placeholder */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted">
                [Conteúdo do post renderizado aqui via Payload Lexical rich text]
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8 dark:border-white/10">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-surface-alt px-3 py-1 text-xs text-muted dark:bg-white/5"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-surface-alt py-16 dark:bg-dark-surface">
            <div className="container-premium">
              <h2 className="mb-8 font-display text-2xl font-bold text-text dark:text-white">
                Continue lendo
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((p) => (
                  <ScrollReveal key={p.id}>
                    <Link
                      href={`/noticias/${p.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:shadow-md dark:bg-dark dark:border-white/10"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={p.coverImage.sizes?.card?.url ?? p.coverImage.url}
                          alt={p.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="mb-1 text-xs font-semibold text-accent">{p.category.name}</p>
                        <h3 className="font-semibold text-text group-hover:text-primary dark:text-white line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted">{formatRelativeDate(p.publishedAt)}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
