'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface HeroSectionProps {
  title: string
  subtitle: string
  imageUrl: string | StaticImageData
  imageAlt?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt = 'Jurerê Internacional vista aérea',
  primaryCta = { label: 'Conheça o movimento', href: '/o-movimento' },
  secondaryCta = { label: 'Ver projetos', href: '/projetos' },
}: HeroSectionProps) {
  const reducedMotion = useReducedMotion()

  const container = reducedMotion
    ? {}
    : { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } }

  const item = reducedMotion
    ? {}
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] } } }

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden"
      aria-label="Apresentação do Jurerê Mais"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={88}
        />
        {/* Overlay: degradê natural, menos agressivo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
      </div>

      {/* Conteúdo */}
      <div className="container-premium relative z-10 flex flex-1 flex-col justify-center py-32 pt-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Kicker */}
          <motion.div variants={item} className="mb-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/8 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Gestão Urbana Colaborativa · Jurerê Internacional
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            variants={item}
            className="mb-6 font-display text-[2.6rem] font-bold leading-[1.12] text-white text-balance sm:text-6xl lg:text-[4.5rem]"
          >
            {title}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={item}
            className="mb-10 max-w-lg text-base leading-relaxed text-white/72 sm:text-lg"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className={cn(
                'group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200',
                'bg-accent text-white hover:bg-accent-light hover:gap-3',
                'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
              )}
            >
              {primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={secondaryCta.href}
              className={cn(
                'flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200',
                'border border-white/28 bg-white/8 text-white backdrop-blur-sm',
                'hover:bg-white/16 hover:border-white/44',
                'focus-visible:ring-2 focus-visible:ring-white'
              )}
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      {!reducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex size-9 items-center justify-center rounded-full border border-white/18 bg-white/8 backdrop-blur-sm"
          >
            <ChevronDown className="size-4 text-white/70" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
