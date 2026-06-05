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

function MarqueeRow({
  partners,
  reverse = false,
}: {
  partners: CMSPartner[]
  reverse?: boolean
}) {
  const doubled = [...partners, ...partners]

  return (
    <div className="relative flex overflow-hidden">
      <div
        className={cn(
          'flex shrink-0 gap-8 py-2',
          reverse ? 'animate-[marquee-reverse_30s_linear_infinite]' : 'animate-[marquee_30s_linear_infinite]'
        )}
        aria-hidden
      >
        {doubled.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="flex h-12 w-32 shrink-0 items-center justify-center rounded-lg border border-border bg-surface px-4 grayscale transition-all hover:grayscale-0 dark:bg-dark-surface dark:border-white/10"
          >
            <Image
              src={partner.logo.url}
              alt={partner.name}
              width={96}
              height={40}
              className="max-h-8 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const half = Math.ceil(partners.length / 2)
  const row1 = partners.slice(0, half)
  const row2 = partners.slice(half)

  return (
    <section className="overflow-hidden bg-surface py-24 dark:bg-dark" aria-labelledby="partners-title">
      <div className="container-premium mb-12">
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
              Nossa rede
            </p>
            <h2
              id="partners-title"
              className="font-display text-3xl font-bold text-text dark:text-white sm:text-4xl"
            >
              Empresas e instituições parceiras
            </h2>
          </div>
          <Link
            href="/parceiros"
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-dark"
          >
            Ver todos os parceiros
            <ArrowRight className="size-4" />
          </Link>
        </ScrollReveal>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4">
        {row1.length > 0 && <MarqueeRow partners={row1} />}
        {row2.length > 0 && <MarqueeRow partners={row2} reverse />}
      </div>
    </section>
  )
}
