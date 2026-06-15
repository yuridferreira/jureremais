import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ProjectCard } from '@/components/cards/ProjectCard'
import type { CMSProject } from '@/types/cms'

interface FeaturedProjectsSectionProps {
  projects: CMSProject[]
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section className="bg-surface-alt py-24" aria-labelledby="projects-title">
      <div className="container-premium">
        <ScrollReveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
              Em ação
            </p>
            <h2 id="projects-title" className="font-display text-3xl font-bold text-primary sm:text-4xl">
              Projetos em destaque
            </h2>
          </div>
          <Link
            href="/projetos"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-text transition-colors hover:text-accent-dark"
          >
            Ver todos os projetos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard
                project={project}
                variant={i === 0 ? 'featured' : 'default'}
                className="h-full"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
