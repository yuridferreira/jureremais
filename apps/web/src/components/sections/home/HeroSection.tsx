'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface HeroSectionProps {
  title: string
  subtitle: string
  imageUrl: string
  imageAlt?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt = 'Jurerê Internacional vista aérea',
  primaryCta = { label: 'Conheça o movimento', href: '/o-movimento' },
  secondaryCta = { label: 'Ver projetos', href: '/projetos' },
}: HeroSectionProps) {
  return (
    <section
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
      aria-label="Apresentação do Jurerê Mais"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-primary/30" />
      </div>

      {/* Content */}
      <div className="container-premium relative z-10 flex flex-col items-start justify-center py-24 pt-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Label pill */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Gestão Urbana Colaborativa · Jurerê Internacional
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-display text-5xl font-bold leading-tight text-white text-balance sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-xl text-lg leading-relaxed text-white/75 text-pretty"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className={cn(
                'flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all',
                'bg-accent text-white hover:bg-accent-dark hover:gap-3 focus-visible:ring-2 focus-visible:ring-white'
              )}
            >
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={secondaryCta.href}
              className={cn(
                'flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all',
                'border border-white/30 bg-white/10 text-white backdrop-blur-sm',
                'hover:bg-white/20 hover:border-white/50'
              )}
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
        >
          <ChevronDown className="size-4 text-white/80" />
        </motion.div>
      </motion.div>
    </section>
  )
}
