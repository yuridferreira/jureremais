import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { getProjects } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils/cn'

export const revalidate = 60

export const metadata: Metadata = generatePageMetadata({
  title: 'Projetos e Ações',
  description: 'Conheça todos os projetos do Jurerê Mais — câmeras de monitoramento, gestão da orla, segurança urbana, manutenção e muito mais.',
  path: '/projetos',
})

const categories = [
  { value: '', label: 'Todos' },
  { value: 'seguranca', label: 'Segurança' },
  { value: 'sustentabilidade', label: 'Sustentabilidade' },
  { value: 'urbanismo', label: 'Urbanismo' },
  { value: 'comunidade', label: 'Comunidade' },
  { value: 'manutencao', label: 'Manutenção' },
]

const statuses = [
  { value: '', label: 'Todos os status' },
  { value: 'concluido', label: 'Concluídos' },
  { value: 'em-andamento', label: 'Em andamento' },
  { value: 'planejamento', label: 'Planejamento' },
]

interface PageProps {
  searchParams: Promise<{ categoria?: string; status?: string; pagina?: string }>
}

export default async function ProjetosPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoria = params.categoria ?? ''
  const status = params.status ?? ''
  const page = Number(params.pagina ?? 1)

  const data = await getProjects({
    category: categoria || undefined,
    status: status || undefined,
    page,
    limit: 12,
  })

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-surface-alt py-20 dark:bg-dark-surface">
        <div className="container-premium">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Execução real</p>
            <h1 className="mb-4 font-display text-4xl font-bold text-text dark:text-white sm:text-5xl">
              Projetos e Ações
            </h1>
            <p className="max-w-xl text-lg text-muted">
              Resultados concretos que transformam Jurerê Internacional. Cada projeto com dados, investimento e impacto documentados.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-surface dark:bg-dark dark:border-white/10">
        <div className="container-premium flex flex-wrap gap-3 py-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
            {categories.map((cat) => (
              <a
                key={cat.value}
                href={`/projetos${cat.value ? `?categoria=${cat.value}` : ''}${status ? `${cat.value ? '&' : '?'}status=${status}` : ''}`}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  categoria === cat.value
                    ? 'bg-accent text-white'
                    : 'bg-surface-alt text-muted hover:bg-accent/10 hover:text-accent dark:bg-white/5 dark:hover:bg-accent/20'
                )}
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex flex-wrap gap-2 sm:ml-auto" role="group" aria-label="Filtrar por status">
            {statuses.map((s) => (
              <a
                key={s.value}
                href={`/projetos${categoria ? `?categoria=${categoria}` : ''}${s.value ? `${categoria ? '&' : '?'}status=${s.value}` : ''}`}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm transition-colors',
                  status === s.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-muted hover:border-accent/30 dark:border-white/10'
                )}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container-premium">
          {data.docs.length === 0 ? (
            <p className="py-24 text-center text-muted">Nenhum projeto encontrado com esses filtros.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.docs.map((project, i) => (
                <ScrollReveal key={project.id} delay={Math.min(i * 0.06, 0.3)}>
                  <ProjectCard project={project} className="h-full" />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginação">
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/projetos?${categoria ? `categoria=${categoria}&` : ''}${status ? `status=${status}&` : ''}pagina=${p}`}
                  aria-current={p === page ? 'page' : undefined}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                    p === page
                      ? 'bg-accent text-white'
                      : 'text-muted hover:bg-surface-alt dark:hover:bg-white/10'
                  )}
                >
                  {p}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>
    </div>
  )
}
