import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { formatCurrency } from '@/lib/utils/formatters'
import type { CMSProject } from '@/types/cms'

const categoryLabels: Record<string, string> = {
  seguranca:       'Segurança',
  sustentabilidade:'Sustentabilidade',
  urbanismo:       'Urbanismo',
  comunidade:      'Comunidade',
  manutencao:      'Manutenção',
}

const statusLabels: Record<string, string> = {
  'planejamento':  'Planejamento',
  'em-andamento':  'Em andamento',
  'concluido':     'Concluído',
  'pausado':       'Pausado',
}

const statusColors: Record<string, string> = {
  'planejamento': 'bg-sand-light/60 text-sand-dark',
  'em-andamento': 'bg-accent/12 text-accent-text',
  'concluido':    'bg-emerald-50 text-emerald-700',
  'pausado':      'bg-surface-alt text-muted',
}

interface ProjectCardProps {
  project: CMSProject
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export function ProjectCard({ project, variant = 'default', className }: ProjectCardProps) {
  const href = `/projetos/${project.slug}`

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex gap-4 rounded-xl border border-border p-4 transition-all',
          'hover:border-accent/40 hover:shadow-md',
          className
        )}
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={project.coverImage.sizes?.thumbnail?.url ?? project.coverImage.url}
            alt={project.coverImage.alt}
            fill
            sizes="80px"
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-medium text-accent-text">
            {categoryLabels[project.category] ?? project.category}
          </span>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-primary group-hover:text-accent-text">
            {project.name}
          </h3>
          {project.investment && (
            <p className="mt-1 font-mono text-xs text-muted">
              {formatCurrency(project.investment)}
            </p>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all',
        'hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      <div className={cn('relative overflow-hidden', variant === 'featured' ? 'h-64' : 'h-48')}>
        <Image
          src={project.coverImage.sizes?.card?.url ?? project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1 pb-4 text-sm font-medium text-white transition-transform group-hover:translate-y-0">
          Ver projeto <ArrowRight className="size-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-text">
            {categoryLabels[project.category] ?? project.category}
          </span>
          <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', statusColors[project.projectStatus])}>
            {statusLabels[project.projectStatus] ?? project.projectStatus}
          </span>
        </div>

        <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-accent-text">
          {project.name}
        </h3>

        {project.excerpt && (
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
            {project.excerpt}
          </p>
        )}

        {project.investment && (
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted">Investimento</span>
            <span className="font-mono text-sm font-semibold text-primary">
              {formatCurrency(project.investment)}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
