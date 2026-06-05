import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getPartners } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils/cn'

export const revalidate = 60

export const metadata: Metadata = generatePageMetadata({
  title: 'Parceiros',
  description: 'Conheça as empresas, condomínios, restaurantes e instituições que fazem parte do Jurerê Mais.',
  path: '/parceiros',
})

const categories = [
  { value: '', label: 'Todos' },
  { value: 'empresa', label: 'Empresas' },
  { value: 'condominio', label: 'Condomínios' },
  { value: 'restaurante', label: 'Restaurantes' },
  { value: 'comercio', label: 'Comércio' },
  { value: 'patrocinador', label: 'Patrocinadores' },
  { value: 'instituicao', label: 'Instituições' },
]

interface PageProps {
  searchParams: Promise<{ categoria?: string }>
}

export default async function ParceirosPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoria = params.categoria ?? ''

  const data = await getPartners({ category: categoria || undefined, limit: 100 })

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-surface-alt py-20 dark:bg-dark-surface">
        <div className="container-premium">
          <ScrollReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Nossa rede</p>
            <h1 className="mb-4 font-display text-4xl font-bold text-text dark:text-white sm:text-5xl">
              Parceiros
            </h1>
            <p className="max-w-xl text-lg text-muted">
              {data.totalDocs} empresas e instituições que acreditam e investem no futuro de Jurerê.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <nav className="border-b border-border bg-surface dark:bg-dark dark:border-white/10" aria-label="Filtrar parceiros">
        <div className="container-premium flex flex-wrap gap-2 py-4">
          {categories.map((cat) => (
            <a
              key={cat.value}
              href={`/parceiros${cat.value ? `?categoria=${cat.value}` : ''}`}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                categoria === cat.value
                  ? 'bg-accent text-white'
                  : 'bg-surface-alt text-muted hover:bg-accent/10 hover:text-accent dark:bg-white/5 dark:hover:bg-accent/20'
              )}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Grid */}
      <section className="py-16">
        <div className="container-premium">
          {data.docs.length === 0 ? (
            <p className="py-24 text-center text-muted">Nenhum parceiro encontrado.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {data.docs.map((partner, i) => (
                <ScrollReveal key={partner.id} delay={Math.min(i * 0.04, 0.3)}>
                  <Link
                    href={`/parceiros/${partner.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md dark:bg-dark-surface dark:border-white/10"
                  >
                    <div className="relative flex h-16 w-full items-center justify-center">
                      <Image
                        src={partner.logo.url}
                        alt={partner.name}
                        width={120}
                        height={60}
                        className="max-h-12 w-auto object-contain grayscale transition-all group-hover:grayscale-0"
                      />
                    </div>
                    <p className="text-center text-xs font-medium text-muted group-hover:text-text dark:group-hover:text-white line-clamp-2">
                      {partner.name}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA become partner */}
      <section className="bg-primary py-20 noise">
        <div className="container-premium text-center">
          <ScrollReveal>
            <h2 className="mb-4 font-display text-3xl font-bold text-white">Sua empresa pode fazer parte disso</h2>
            <p className="mx-auto mb-8 max-w-md text-white/70">
              Junte-se a mais de {data.totalDocs} parceiros e contribua para um Jurerê melhor.
            </p>
            <Link
              href="/participar/parceiro"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Quero ser parceiro <ArrowRight className="size-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
