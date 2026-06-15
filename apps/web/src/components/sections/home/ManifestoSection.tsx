'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4])

  const inner = (
    <div className="container-premium">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
            Por que existimos
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h2
            id="manifesto-title"
            className="mb-10 font-display text-4xl font-bold leading-[1.14] text-primary text-balance sm:text-5xl lg:text-[3.25rem]"
          >
            Um movimento de quem{' '}
            <em className="not-italic text-accent-text">vive</em> Jurerê
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p className="mb-8 text-lg leading-relaxed text-muted">
            Desde 2019, o Jurerê Mais articula moradores, empresários e instituições para
            transformar boas intenções em ações concretas. Câmeras instaladas, orla preservada,
            infraestrutura reforçada — com transparência total e governança participativa.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <blockquote className="mb-10 border-l-2 border-accent pl-6">
            <p className="font-display text-2xl font-semibold leading-relaxed text-primary sm:text-3xl">
              "Jurerê merece mais do que promessas.
              Merece gestão, organização e execução real."
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mb-10 flex flex-wrap gap-6 text-sm text-muted">
            <span><strong className="font-semibold text-primary">R$ 2,4M+</strong> investidos</span>
            <span><strong className="font-semibold text-primary">68</strong> parceiros ativos</span>
            <span><strong className="font-semibold text-primary">247</strong> câmeras integradas</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.36}>
          <Link
            href="/o-movimento/manifesto"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition-colors hover:text-accent-dark"
          >
            Leia o manifesto completo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface py-28"
      aria-labelledby="manifesto-title"
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      {reducedMotion ? inner : <motion.div style={{ opacity }}>{inner}</motion.div>}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
