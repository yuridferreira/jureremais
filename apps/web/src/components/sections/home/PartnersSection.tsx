'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils/cn'
import type { CMSPartner } from '@/types/cms'

interface PartnersSectionProps {
  partners: CMSPartner[]
}

function MarqueeRow({ partners, reverse = false }: { partners: CMSPartner[]; reverse?: boolean }) {
  const doubled = [...partners, ...partners]

  return (
    <div className="relative flex overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

      <div
        className={cn(
          'flex shrink-0 gap-6 py-2',
          reverse
            ? 'animate-[marquee-reverse_35s_linear_infinite]'
            : 'animate-[marquee_35s_linear_infinite]'
        )}
        aria-hidden
      >
        {doubled.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="flex h-11 w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-surface px-3 grayscale transition-all duration-300 hover:grayscale-0 hover:shadow-sm"
          >
            <Image
              src={partner.logo.url}
              alt={partner.name}
              width={88}
              height={36}
              className="max-h-7 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  if (partners.length === 0) return null

  const half = Math.ceil(partners.length / 2)
  const row1 = partners.slice(0, half)
  const row2 = partners.slice(half)

  return (
    <section className="overflow-hidden bg-surface py-24" aria-labelledby="partners-title">
      <div className="container-premium mb-12">
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
              Nossa rede
            </p>
            <h2 id="partners-title" className="font-display text-3xl font-bold text-primary sm:text-4xl">
              Empresas e instituições parceiras
            </h2>
          </div>
          <Link
            href="/parceiros"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-text transition-colors hover:text-accent-dark"
          >
            Ver todos os parceiros
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>

      <div className="space-y-5">
        {row1.length > 0 && <MarqueeRow partners={row1} />}
        {row2.length > 0 && <MarqueeRow partners={row2} reverse />}
      </div>
    </section>
  )
}
