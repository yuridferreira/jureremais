import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import type { CMSImpactMetric } from '@/types/cms'

interface MetricCardProps {
  metric: CMSImpactMetric
  className?: string
  variant?: 'default' | 'dark' | 'minimal'
}

export function MetricCard({ metric, className, variant = 'default' }: MetricCardProps) {
  const Icon = metric.icon
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[metric.icon]
    : null

  const trendIcon = {
    up: <TrendingUp className="size-3.5 text-green-500" />,
    down: <TrendingDown className="size-3.5 text-red-500" />,
    stable: <Minus className="size-3.5 text-muted" />,
  }

  if (variant === 'dark') {
    return (
      <div className={cn('flex flex-col items-center text-center', className)}>
        {Icon && (
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-white/10">
            <Icon className="size-6 text-accent" />
          </div>
        )}
        <AnimatedCounter
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          valueClassName="text-4xl lg:text-5xl font-display font-bold text-white"
        />
        <p className="mt-2 text-sm text-white/60">{metric.label}</p>
        {metric.trend && (
          <div className="mt-1 flex items-center gap-1">
            {trendIcon[metric.trend]}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('text-center', className)}>
        <AnimatedCounter
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          valueClassName="text-3xl font-display font-bold text-primary dark:text-white"
        />
        <p className="mt-1 text-xs text-muted">{metric.label}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 dark:bg-dark-surface dark:border-white/10',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        {Icon && (
          <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
            <Icon className="size-5 text-accent" />
          </div>
        )}
        {metric.trend && (
          <div className="flex items-center gap-1 rounded-full bg-surface-alt px-2 py-1 dark:bg-white/5">
            {trendIcon[metric.trend]}
          </div>
        )}
      </div>
      <AnimatedCounter
        value={metric.value}
        prefix={metric.prefix}
        suffix={metric.suffix}
        valueClassName="text-3xl font-display font-bold text-primary dark:text-white"
      />
      <p className="mt-1.5 text-sm text-muted">{metric.label}</p>
      {metric.description && (
        <p className="mt-2 text-xs leading-relaxed text-muted/70">{metric.description}</p>
      )}
    </div>
  )
}
