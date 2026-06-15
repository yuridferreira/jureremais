'use client'

import { useReducedMotion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import type { CMSImpactMetric } from '@/types/cms'

const FALLBACK_METRICS: CMSImpactMetric[] = [
  { id: '1', label: 'Investido em 2025', value: 2.4, prefix: 'R$', suffix: 'M', order: 1, featured: true },
  { id: '2', label: 'Câmeras integradas', value: 247, suffix: '+', order: 2, featured: true },
  { id: '3', label: 'Cobertura da orla', value: 89, suffix: '%', order: 3, featured: true },
  { id: '4', label: 'Parceiros ativos', value: 68, order: 4, featured: true },
]

interface ImpactCountersSectionProps {
  metrics: CMSImpactMetric[]
}

export function ImpactCountersSection({ metrics }: ImpactCountersSectionProps) {
  const reducedMotion = useReducedMotion()
  const featured = (metrics.length > 0 ? metrics : FALLBACK_METRICS)
    .filter((m) => m.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)

  return (
    <section className="bg-surface-alt py-20" aria-labelledby="impact-title">
      <div className="container-premium">
        <ScrollReveal className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
              Resultados verificáveis
            </p>
            <h2 id="impact-title" className="font-display text-2xl font-bold text-primary sm:text-3xl">
              O impacto do movimento em números
            </h2>
          </div>
          <p className="text-xs text-muted sm:text-right">Dados referentes a 2024–2025</p>
        </ScrollReveal>

        {/* Grid separado por linhas — sem cards, sem ícones-em-círculo */}
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {featured.map((metric, i) => (
            <ScrollReveal
              key={metric.id}
              delay={reducedMotion ? 0 : i * 0.09}
              className="bg-surface-alt px-6 py-10 lg:py-12"
            >
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.value % 1 !== 0 ? 1 : 0}
                valueClassName="font-mono text-4xl font-bold text-primary lg:text-5xl xl:text-6xl tracking-tight tabular-nums"
              />
              <p className="mt-3 text-sm leading-snug text-muted">{metric.label}</p>
              {metric.trend === 'up' && (
                <p className="mt-2 text-[11px] font-medium text-accent-text">↑ Em crescimento</p>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
