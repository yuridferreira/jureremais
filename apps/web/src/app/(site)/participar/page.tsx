import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, Building2, Landmark, Handshake } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Participar',
  description: 'Faça parte do Jurerê Mais como morador, empresa, instituição ou parceiro.',
  path: '/participar',
})

const profiles = [
  {
    icon: Home,
    title: 'Morador',
    description: 'Vive em Jurerê e quer contribuir com o movimento que transforma o bairro.',
    benefits: ['Voz ativa nas decisões', 'Acesso a informações privilegiadas', 'Rede de moradores engajados'],
    href: '/participar/morador',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
  },
  {
    icon: Building2,
    title: 'Empresa',
    description: 'Sua empresa opera em Jurerê e quer visibilidade, networking e impacto real.',
    benefits: ['Logo em materiais do movimento', 'Networking premium', 'Relatório de impacto exclusivo'],
    href: '/participar/empresa',
    color: 'text-accent',
    bg: 'bg-accent/5 dark:bg-accent/10',
  },
  {
    icon: Landmark,
    title: 'Instituição',
    description: 'Organização pública ou do terceiro setor com objetivos alinhados ao movimento.',
    benefits: ['Parceria institucional formal', 'Co-autoria em projetos', 'Visibilidade pública'],
    href: '/participar/instituicao',
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
  },
  {
    icon: Handshake,
    title: 'Patrocinador',
    description: 'Quer patrocinar projetos específicos ou o movimento como um todo.',
    benefits: ['Naming rights em projetos', 'Visibilidade máxima', 'Relatórios dedicados'],
    href: '/participar/parceiro',
    color: 'text-gold',
    bg: 'bg-amber-50 dark:bg-amber-900/10',
  },
]

export default function ParticiparPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-primary py-24 noise text-center">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Junte-se a nós</p>
          <h1 className="mx-auto mb-6 max-w-3xl font-display text-5xl font-bold text-white">
            Faça parte do movimento que transforma Jurerê
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/70">
            Mais de 68 parceiros e centenas de moradores já construíram um Jurerê mais seguro e organizado. Você é o próximo.
          </p>
        </ScrollReveal>
      </section>

      {/* Profile selector */}
      <section className="py-24">
        <div className="container-premium">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-text dark:text-white">Como você quer participar?</h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {profiles.map((profile, i) => {
              const Icon = profile.icon
              return (
                <ScrollReveal key={profile.title} delay={i * 0.1}>
                  <Link
                    href={profile.href}
                    className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-dark-surface dark:border-white/10"
                  >
                    <div className={`mb-5 flex size-14 items-center justify-center rounded-2xl ${profile.bg}`}>
                      <Icon className={`size-7 ${profile.color}`} />
                    </div>
                    <h3 className="mb-2 font-display text-xl font-bold text-text dark:text-white">{profile.title}</h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">{profile.description}</p>
                    <ul className="mb-6 space-y-2">
                      {profile.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-muted">
                          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <span className="flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                      Participar <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
