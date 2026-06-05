import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, DollarSign, Users } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { getProject, getProjects } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'
import { breadcrumbSchema, projectSchema } from '@/lib/seo/jsonld'

export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const data = await getProjects({ limit: 100 })
    return data.docs.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return generatePageMetadata({
    title: project.name,
    description: project.excerpt ?? `Conheça o projeto ${project.name} do Jurerê Mais.`,
    image: project.seo?.ogImage?.url ?? project.coverImage.sizes?.og?.url,
    path: `/projetos/${project.slug}`,
  })
}

const categoryLabels: Record<string, string> = {
  seguranca: 'Segurança',
  sustentabilidade: 'Sustentabilidade',
  urbanismo: 'Urbanismo',
  comunidade: 'Comunidade',
  manutencao: 'Manutenção',
}

const statusLabels: Record<string, string> = {
  'planejamento': 'Planejamento',
  'em-andamento': 'Em andamento',
  'concluido': 'Concluído',
  'pausado': 'Pausado',
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const relatedData = project.relatedProjects?.length
    ? { docs: project.relatedProjects.slice(0, 3) }
    : await getProjects({ category: project.category, limit: 3 })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema({
            name: project.name,
            excerpt: project.excerpt ?? '',
            coverImageUrl: project.coverImage.url,
            startDate: project.startDate,
            endDate: project.endDate,
            slug: project.slug,
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Início', href: '/' },
            { name: 'Projetos', href: '/projetos' },
            { name: project.name, href: `/projetos/${project.slug}` },
          ])),
        }}
      />

      <div className="pt-16">
        {/* Breadcrumb */}
        <nav className="container-premium py-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-text">Início</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/projetos" className="hover:text-text">Projetos</Link></li>
            <li aria-hidden>/</li>
            <li className="truncate text-text dark:text-white">{project.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={project.coverImage.sizes?.hero?.url ?? project.coverImage.url}
            alt={project.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-premium">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white">
                  {categoryLabels[project.category] ?? project.category}
                </span>
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {statusLabels[project.projectStatus] ?? project.projectStatus}
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{project.name}</h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="container-premium py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {project.excerpt && (
                <ScrollReveal>
                  <p className="text-xl leading-relaxed text-muted">{project.excerpt}</p>
                </ScrollReveal>
              )}

              {/* Objectives */}
              {project.objectives && project.objectives.length > 0 && (
                <ScrollReveal>
                  <h2 className="mb-4 font-display text-2xl font-bold text-text dark:text-white">Objetivos</h2>
                  <ul className="space-y-2">
                    {project.objectives.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">{i + 1}</span>
                        {o.objective}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <ScrollReveal>
                  <h2 className="mb-4 font-display text-2xl font-bold text-text dark:text-white">Galeria</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.gallery.slice(0, 6).map((item, i) => (
                      <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={item.image.sizes?.card?.url ?? item.image.url}
                          alt={item.caption ?? item.image.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {/* Timeline */}
              {project.timeline && project.timeline.length > 0 && (
                <ScrollReveal>
                  <h2 className="mb-6 font-display text-2xl font-bold text-text dark:text-white">Timeline</h2>
                  <ol className="relative border-l-2 border-border dark:border-white/10 space-y-6 ml-4">
                    {project.timeline.map((item, i) => (
                      <li key={i} className="pl-6">
                        <span className="absolute -left-2 flex size-4 items-center justify-center rounded-full bg-accent ring-4 ring-surface dark:ring-dark" />
                        <p className="mb-1 font-mono text-xs font-semibold text-accent">{formatDate(item.date)}</p>
                        <h3 className="font-semibold text-text dark:text-white">{item.title}</h3>
                        {item.description && <p className="mt-1 text-sm text-muted">{item.description}</p>}
                      </li>
                    ))}
                  </ol>
                </ScrollReveal>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <ScrollReveal>
                  <h2 className="mb-4 font-display text-2xl font-bold text-text dark:text-white">Resultados alcançados</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.results.map((r, i) => (
                      <div key={i} className="rounded-xl border border-border bg-surface p-4 dark:bg-dark-surface dark:border-white/10">
                        {r.metric && <p className="mb-1 font-mono text-lg font-bold text-accent">{r.metric}</p>}
                        <p className="text-sm text-muted">{r.result}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Investment */}
              {project.investment && (
                <ScrollReveal>
                  <div className="rounded-2xl border border-border bg-surface p-6 dark:bg-dark-surface dark:border-white/10">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                      <DollarSign className="size-4" /> Investimento
                    </div>
                    <p className="font-display text-3xl font-bold text-primary dark:text-white">
                      {formatCurrency(project.investment)}
                    </p>
                    {project.investmentBreakdown && project.investmentBreakdown.length > 0 && (
                      <ul className="mt-4 space-y-2 border-t border-border pt-4 dark:border-white/10">
                        {project.investmentBreakdown.map((item, i) => (
                          <li key={i} className="flex justify-between text-sm">
                            <span className="text-muted">{item.description}</span>
                            <span className="font-mono font-medium text-text dark:text-white">{formatCurrency(item.amount)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              )}

              {/* Dates */}
              {(project.startDate || project.endDate) && (
                <ScrollReveal delay={0.1}>
                  <div className="rounded-2xl border border-border bg-surface p-6 dark:bg-dark-surface dark:border-white/10">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                      <Calendar className="size-4" /> Período
                    </div>
                    {project.startDate && (
                      <p className="text-sm"><span className="text-muted">Início: </span>{formatDate(project.startDate)}</p>
                    )}
                    {project.endDate && (
                      <p className="mt-1 text-sm"><span className="text-muted">Conclusão: </span>{formatDate(project.endDate)}</p>
                    )}
                  </div>
                </ScrollReveal>
              )}

              {/* Partners */}
              {project.partners && project.partners.length > 0 && (
                <ScrollReveal delay={0.2}>
                  <div className="rounded-2xl border border-border bg-surface p-6 dark:bg-dark-surface dark:border-white/10">
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                      <Users className="size-4" /> Parceiros
                    </div>
                    <ul className="space-y-2">
                      {project.partners.map((partner) => (
                        <li key={partner.id}>
                          <Link href={`/parceiros/${partner.slug}`} className="text-sm font-medium text-accent hover:underline">
                            {partner.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              {/* Back */}
              <Link href="/projetos" className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-text dark:hover:text-white">
                <ArrowLeft className="size-4" /> Voltar aos projetos
              </Link>
            </aside>
          </div>
        </div>

        {/* Related */}
        {relatedData.docs.filter((p) => p.slug !== slug).length > 0 && (
          <section className="bg-surface-alt py-16 dark:bg-dark-surface">
            <div className="container-premium">
              <h2 className="mb-8 font-display text-2xl font-bold text-text dark:text-white">Projetos relacionados</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedData.docs.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
