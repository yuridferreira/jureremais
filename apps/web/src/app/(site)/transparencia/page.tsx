import type { Metadata } from 'next'
import { Download, FileText } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getReports } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: 'Transparência',
  description: 'Prestação de contas pública do Jurerê Mais — relatórios anuais, demonstrativos financeiros e resultados de todos os projetos.',
  path: '/transparencia',
})

const typeLabels: Record<string, string> = {
  'relatorio-anual': 'Relatório Anual',
  'demonstrativo-financeiro': 'Demonstrativo Financeiro',
  'relatorio-impacto': 'Relatório de Impacto',
  'prestacao-contas': 'Prestação de Contas',
  'outro': 'Documento',
}

export default async function TransparenciaPage() {
  const reports = await getReports()

  const byYear = reports.reduce<Record<number, typeof reports>>((acc, r) => {
    if (!acc[r.year]) acc[r.year] = []
    acc[r.year]!.push(r)
    return acc
  }, {})

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)

  const latestYear = years[0]
  const latestReports = latestYear ? byYear[latestYear] ?? [] : []
  const totalInvestment = latestReports.reduce((sum, r) => sum + (r.totalInvestment ?? 0), 0)
  const totalRaised = latestReports.reduce((sum, r) => sum + (r.totalRaised ?? 0), 0)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-surface-alt py-20 dark:bg-dark-surface">
        <div className="container-premium">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Prestação de contas</p>
            <h1 className="mb-4 font-display text-4xl font-bold text-text dark:text-white sm:text-5xl">
              Transparência
            </h1>
            <p className="max-w-xl text-lg text-muted">
              Cada real investido é prestado de contas publicamente. Acesse relatórios, demonstrativos e documentos.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Financial summary */}
      {latestYear && (totalInvestment > 0 || totalRaised > 0) && (
        <section className="border-b border-border bg-surface py-12 dark:bg-dark dark:border-white/10">
          <div className="container-premium">
            <ScrollReveal className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{latestYear} — Arrecadado</p>
                <p className="mt-1 font-display text-3xl font-bold text-text dark:text-white">
                  {formatCurrency(totalRaised)}
                </p>
              </div>
              <div className="h-12 w-px bg-border dark:bg-white/10" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{latestYear} — Investido</p>
                <p className="mt-1 font-display text-3xl font-bold text-accent">
                  {formatCurrency(totalInvestment)}
                </p>
              </div>
              <div className="h-12 w-px bg-border dark:bg-white/10" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">Documentos públicos</p>
                <p className="mt-1 font-display text-3xl font-bold text-text dark:text-white">{reports.length}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Reports by year */}
      <section className="py-16">
        <div className="container-premium space-y-16">
          {years.map((year) => (
            <ScrollReveal key={year}>
              <h2 className="mb-6 font-display text-2xl font-bold text-text dark:text-white">{year}</h2>
              <div className="space-y-3">
                {(byYear[year] ?? []).map((report) => (
                  <a
                    key={report.id}
                    href={report.document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-md dark:bg-dark-surface dark:border-white/10"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <FileText className="size-5 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-text group-hover:text-primary dark:text-white dark:group-hover:text-accent truncate">
                        {report.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {typeLabels[report.type ?? ''] ?? 'Documento'}
                        {report.publishedAt && ` · ${formatDate(report.publishedAt)}`}
                        {report.totalInvestment && ` · ${formatCurrency(report.totalInvestment)}`}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      <Download className="size-4" />
                      Baixar
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          ))}

          {reports.length === 0 && (
            <p className="py-16 text-center text-muted">Nenhum documento disponível no momento.</p>
          )}
        </div>
      </section>
    </div>
  )
}
