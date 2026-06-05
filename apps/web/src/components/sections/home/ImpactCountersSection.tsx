import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MetricCard } from '@/components/cards/MetricCard'
import type { CMSImpactMetric } from '@/types/cms'

interface ImpactCountersSectionProps {
  metrics: CMSImpactMetric[]
}

export function ImpactCountersSection({ metrics }: ImpactCountersSectionProps) {
  const featured = metrics.filter((m) => m.featured).sort((a, b) => a.order - b.order).slice(0, 4)

  return (
    <section
      className="bg-primary py-20 noise"
      aria-labelledby="impact-title"
    >
      <div className="container-premium">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Números reais
          </p>
          <h2
            id="impact-title"
            className="font-display text-3xl font-bold text-white sm:text-4xl"
          >
            O impacto do movimento
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {featured.map((metric, i) => (
            <ScrollReveal key={metric.id} delay={i * 0.1}>
              <MetricCard metric={metric} variant="dark" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
