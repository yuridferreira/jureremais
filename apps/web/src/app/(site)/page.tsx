import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { ImpactCountersSection } from '@/components/sections/home/ImpactCountersSection'
import { ManifestoSection } from '@/components/sections/home/ManifestoSection'
import { PillarsSection } from '@/components/sections/home/PillarsSection'
import { FeaturedProjectsSection } from '@/components/sections/home/FeaturedProjectsSection'
import { PartnersSection } from '@/components/sections/home/PartnersSection'
import { LatestNewsSection } from '@/components/sections/home/LatestNewsSection'
import { CtaSection } from '@/components/sections/home/CtaSection'
import {
  getFeaturedProjects,
  getFeaturedPartners,
  getFeaturedMetrics,
  getLatestNews,
} from '@/lib/payload/queries'
import { siteConfig } from '@/config/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: `${siteConfig.name} — Gestão Urbana Colaborativa`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Gestão Urbana Colaborativa`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og/home.jpg`],
  },
}

export default async function HomePage() {
  const [projects, partners, metrics, news] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedPartners(),
    getFeaturedMetrics(),
    getLatestNews(3),
  ])

  return (
    <>
      <HeroSection
        title="Jurerê Mais seguro, sustentável e organizado."
        subtitle="Um movimento que une moradores, empresários e instituições para transformar Jurerê Internacional com gestão, organização e execução real."
        imageUrl="/images/imagem-jurere.jpg"
        imageAlt="Vista aérea de Jurerê Internacional, Florianópolis"
        primaryCta={{ label: 'Conheça o movimento', href: '/o-movimento' }}
        secondaryCta={{ label: 'Ver projetos', href: '/projetos' }}
      />

      <ImpactCountersSection metrics={metrics} />

      <ManifestoSection />

      <PillarsSection />

      <FeaturedProjectsSection projects={projects} />

      <PartnersSection partners={partners} />

      <LatestNewsSection posts={news} />

      <CtaSection />
    </>
  )
}
