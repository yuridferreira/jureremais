import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Globe, Instagram, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { getPartner, getPartners } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import { formatDate } from '@/lib/utils/formatters'

export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const data = await getPartners({ limit: 200 })
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
  const partner = await getPartner(slug)
  if (!partner) return {}
  return generatePageMetadata({
    title: partner.name,
    description:
      partner.seo?.metaDescription ??
      `${partner.name} é parceiro do Jurerê Mais desde ${partner.since ? new Date(partner.since).getFullYear() : 'o início'}.`,
    path: `/parceiros/${partner.slug}`,
  })
}

const categoryLabels: Record<string, string> = {
  empresa: 'Empresa',
  condominio: 'Condomínio',
  restaurante: 'Restaurante',
  comercio: 'Comércio',
  patrocinador: 'Patrocinador',
  instituicao: 'Instituição',
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const partner = await getPartner(slug)
  if (!partner) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', href: '/' },
              { name: 'Parceiros', href: '/parceiros' },
              { name: partner.name, href: `/parceiros/${partner.slug}` },
            ])
          ),
        }}
      />

      <div className="pt-16">
        {/* Hero */}
        <section className="border-b border-border bg-surface py-16 dark:bg-dark dark:border-white/10">
          <div className="container-premium">
            <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
              <Link href="/parceiros" className="flex w-fit items-center gap-1.5 hover:text-text">
                <ArrowLeft className="size-3.5" /> Parceiros
              </Link>
            </nav>

            <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
              {/* Logo */}
              <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border border-border bg-white p-4 dark:border-white/10">
                <Image
                  src={partner.logo.url}
                  alt={partner.name}
                  width={96}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </div>

              {/* Info */}
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {categoryLabels[partner.category] ?? partner.category}
                  </span>
                  {partner.since && (
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <Calendar className="size-3.5" />
                      Parceiro desde {new Date(partner.since).getFullYear()}
                    </span>
                  )}
                </div>
                <h1 className="mb-2 font-display text-4xl font-bold text-text dark:text-white">
                  {partner.name}
                </h1>
                <div className="flex flex-wrap gap-3">
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <Globe className="size-4" /> Website
                    </a>
                  )}
                  {partner.instagram && (
                    <a
                      href={`https://instagram.com/${partner.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <Instagram className="size-4" /> @{partner.instagram.replace('@', '')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-premium grid gap-12 lg:grid-cols-3">
            {/* Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* Testimonial */}
              {partner.testimonial?.quote && (
                <ScrollReveal>
                  <blockquote className="rounded-2xl border border-border bg-surface-alt p-8 dark:bg-dark-surface dark:border-white/10">
                    <p className="mb-4 font-display text-xl font-medium italic leading-relaxed text-text dark:text-white">
                      &ldquo;{partner.testimonial.quote}&rdquo;
                    </p>
                    {partner.testimonial.author && (
                      <footer className="text-sm text-muted">
                        <strong className="text-text dark:text-white">{partner.testimonial.author}</strong>
                        {partner.testimonial.role && ` — ${partner.testimonial.role}`}
                      </footer>
                    )}
                  </blockquote>
                </ScrollReveal>
              )}

              {/* Projects */}
              {partner.projects && partner.projects.length > 0 && (
                <ScrollReveal>
                  <h2 className="mb-6 font-display text-2xl font-bold text-text dark:text-white">
                    Projetos participados
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {partner.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} variant="compact" />
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-surface p-6 dark:bg-dark-surface dark:border-white/10">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                    Sobre o parceiro
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-muted">Categoria</dt>
                      <dd className="font-medium text-text dark:text-white">
                        {categoryLabels[partner.category] ?? partner.category}
                      </dd>
                    </div>
                    {partner.since && (
                      <div>
                        <dt className="text-muted">Parceiro desde</dt>
                        <dd className="font-medium text-text dark:text-white">
                          {formatDate(partner.since)}
                        </dd>
                      </div>
                    )}
                    {partner.projects && (
                      <div>
                        <dt className="text-muted">Projetos</dt>
                        <dd className="font-medium text-text dark:text-white">
                          {partner.projects.length} projeto{partner.projects.length !== 1 ? 's' : ''}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="mt-6">
                  <Link
                    href="/parceiros"
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-text dark:hover:text-white"
                  >
                    <ArrowLeft className="size-4" /> Ver todos os parceiros
                  </Link>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </section>
      </div>
    </>
  )
}
