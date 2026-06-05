import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MetricCard } from '@/components/cards/MetricCard'
import { getAllMetrics, getReports } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { Download } from 'lucide-react'

export const revalidate = 300

export const metadata: Metadata = generatePageMetadata({
  title: 'Dashboard de Impacto',
  description: 'Números reais do Jurerê Mais — investimentos, câmeras, cobertura, parceiros e projetos. Transparência total sobre nosso impacto.',
  path: '/impacto',
})

interface PageProps {
  searchParams: Promise<{ ano?: string }>
}

const years = [2021, 2022, 2023, 2024]

export default async function ImpactoPage({ searchParams }: PageProps) {
  const params = await searchParams
  const ano = params.ano ? Number(params.ano) : undefined

  const [metrics, reports] = await Promise.all([
    getAllMetrics(ano),
    getReports(),
  ])

  const latestReport = reports[0]
  const featured = metrics.filter((m) => m.featured).sort((a, b) => a.order - b.order)
  const all = metrics.sort((a, b) => a.order - b.order)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-primary py-20 noise">
        <div className="container-premium">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Resultados reais</p>
            <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
              Dashboard de Impacto
            </h1>
            <p className="mb-8 max-w-xl text-lg text-white/70">
              Cada número aqui representa uma ação real. Transparência total sobre o que construímos juntos.
            </p>

            {/* Year filter */}
            <nav className="flex flex-wrap gap-2" aria-label="Filtrar por ano">
              <a
                href="/impacto"
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!ano ? 'bg-accent text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                Todos os anos
              </a>
              {years.map((y) => (
                <a
                  key={y}
                  href={`/impacto?ano=${y}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${ano === y ? 'bg-accent text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  {y}
                </a>
              ))}
            </nav>
          </ScrollReveal>
        </div>
      </section>

      {/* Big Numbers */}
      <section className="bg-primary-light py-16">
        <div className="container-premium">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {featured.slice(0, 8).map((metric, i) => (
              <ScrollReveal key={metric.id} delay={i * 0.08}>
                <MetricCard metric={metric} variant="dark" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* All metrics grid */}
      <section className="py-20">
        <div className="container-premium">
          <ScrollReveal className="mb-10">
            <h2 className="font-display text-3xl font-bold text-text dark:text-white">Indicadores completos</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {all.map((metric, i) => (
              <ScrollReveal key={metric.id} delay={Math.min(i * 0.05, 0.3)}>
                <MetricCard metric={metric} variant="default" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Report download CTA */}
      {latestReport && (
        <section className="bg-surface-alt py-16 dark:bg-dark-surface">
          <div className="container-premium">
            <ScrollReveal className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-10 text-center dark:bg-dark dark:border-white/10 sm:flex-row sm:text-left">
              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Baixe agora</p>
                <h2 className="mb-2 font-display text-2xl font-bold text-text dark:text-white">
                  Relatório de Impacto {latestReport.year}
                </h2>
                <p className="text-muted">{latestReport.description ?? 'Relatório completo com todos os dados, investimentos e resultados do ano.'}</p>
              </div>
              <a
                href={latestReport.document.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                <Download className="size-4" />
                Baixar PDF
              </a>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  )
}
