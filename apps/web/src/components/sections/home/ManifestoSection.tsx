'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const manifestoLines = [
  'Jurerê Internacional merece mais do que promessas.',
  'Merece gestão. Organização. Execução.',
  'Merece uma comunidade unida em torno de objetivos concretos.',
]

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-32 dark:bg-dark"
      aria-labelledby="manifesto-title"
    >
      {/* Decorative line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <motion.div style={{ opacity }} className="container-premium">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              Por que existimos
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              id="manifesto-title"
              className="mb-12 font-display text-4xl font-bold leading-tight text-text dark:text-white sm:text-5xl"
            >
              Um movimento de quem vive{' '}
              <em className="not-italic text-accent">Jurerê</em>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {manifestoLines.map((line, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <p className="border-l-2 border-accent pl-6 font-display text-2xl font-medium leading-relaxed text-text dark:text-white/90 sm:text-3xl">
                  {line}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5} className="mt-12">
            <p className="mb-8 text-lg leading-relaxed text-muted">
              Desde 2019, o Jurerê Mais articula moradores, empresários e instituições para
              transformar boas intenções em ações reais — câmeras instaladas, orla preservada,
              segurança reforçada. Com transparência total e governança participativa.
            </p>
            <Link
              href="/o-movimento/manifesto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
            >
              Leia o manifesto completo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </motion.div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  )
}
