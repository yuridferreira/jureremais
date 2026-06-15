import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import type { CMSImpactMetric } from '@/types/cms'

interface MetricCardProps {
  metric: CMSImpactMetric
  className?: string
  variant?: 'default' | 'minimal'
}

export function MetricCard({ metric, className, variant = 'default' }: MetricCardProps) {
  const Icon = metric.icon
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[metric.icon]
    : null

  const trendIcon = {
    up:     <TrendingUp className="size-3.5 text-emerald-600" />,
    down:   <TrendingDown className="size-3.5 text-red-500" />,
    stable: <Minus className="size-3.5 text-muted" />,
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('text-center', className)}>
        <AnimatedCounter
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          valueClassName="text-3xl font-display font-bold text-primary"
        />
        <p className="mt-1 text-xs text-muted">{metric.label}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface p-6',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        {Icon && (
          <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
            <Icon className="size-5 text-accent-text" />
          </div>
        )}
        {metric.trend && (
          <div className="flex items-center gap-1 rounded-full bg-surface-alt px-2 py-1">
            {trendIcon[metric.trend]}
          </div>
        )}
      </div>
      <AnimatedCounter
        value={metric.value}
        prefix={metric.prefix}
        suffix={metric.suffix}
        valueClassName="text-3xl font-display font-bold text-primary"
      />
      <p className="mt-1.5 text-sm text-muted">{metric.label}</p>
      {metric.description && (
        <p className="mt-2 text-xs leading-relaxed text-muted/70">{metric.description}</p>
      )}
    </div>
  )
}
