import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: 'O Movimento',
  description: 'Conheça a história, missão, visão e valores do Jurerê Mais — o movimento de gestão urbana colaborativa de Jurerê Internacional.',
  path: '/o-movimento',
})

const values = [
  { icon: '🤝', title: 'Colaboração', desc: 'Moradores, empresários e poder público unidos por objetivos comuns.' },
  { icon: '📊', title: 'Transparência', desc: 'Cada real investido prestado de contas publicamente.' },
  { icon: '⚡', title: 'Execução', desc: 'Projetos reais, resultados mensuráveis, prazos cumpridos.' },
  { icon: '🌱', title: 'Sustentabilidade', desc: 'Ações que preservam o que torna Jurerê especial.' },
  { icon: '🏆', title: 'Excelência', desc: 'Padrão de qualidade premium em tudo que fazemos.' },
  { icon: '🔍', title: 'Inovação', desc: 'Tecnologia e gestão inteligente a serviço da comunidade.' },
]

export default async function OMovimentoPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-primary px-6 py-24 text-center lg:py-32">
        <ScrollReveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Desde 2019</p>
          <h1 className="mx-auto mb-6 max-w-3xl font-display text-5xl font-bold text-white">
            Um movimento nascido em Jurerê, para Jurerê
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/70">
            Como um grupo de moradores e empresários decidiu parar de reclamar e começar a agir.
          </p>
        </ScrollReveal>
      </section>

      {/* Sub-nav */}
      <nav className="border-b border-border bg-surface dark:bg-dark dark:border-white/10" aria-label="Seções do movimento">
        <div className="container-premium flex gap-6 overflow-x-auto py-4 text-sm">
          {[
            { label: 'Visão geral', href: '/o-movimento' },
            { label: 'História', href: '/o-movimento/historia' },
            { label: 'Governança', href: '/o-movimento/governanca' },
            { label: 'Manifesto', href: '/o-movimento/manifesto' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 font-medium text-muted transition-colors hover:text-text dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Missão / Visão / Valores */}
      <section className="py-24">
        <div className="container-premium">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: Target,
                label: 'Missão',
                text: 'Articular moradores, empresários e instituições em torno de projetos concretos de segurança, urbanismo e sustentabilidade em Jurerê Internacional, com transparência e prestação de contas.',
              },
              {
                icon: Eye,
                label: 'Visão',
                text: 'Ser o modelo referência de gestão urbana colaborativa no Brasil — uma comunidade que demonstra que é possível transformar uma região quando as pessoas certas se unem com propósito.',
              },
              {
                icon: Heart,
                label: 'Valores',
                text: 'Colaboração, transparência, execução, sustentabilidade, excelência e inovação guiam cada decisão e cada projeto que realizamos.',
              },
            ].map(({ icon: Icon, label, text }, i) => (
              <ScrollReveal key={label} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-surface p-8 dark:bg-dark-surface dark:border-white/10">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="size-6 text-accent" />
                  </div>
                  <h2 className="mb-3 font-display text-xl font-bold text-text dark:text-white">{label}</h2>
                  <p className="text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-surface-alt py-24 dark:bg-dark-surface">
        <div className="container-premium">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-text dark:text-white">Nossos valores</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-surface p-6 dark:bg-dark dark:border-white/10">
                  <span className="mb-3 block text-2xl" aria-hidden>{v.icon}</span>
                  <h3 className="mb-1 font-semibold text-text dark:text-white">{v.title}</h3>
                  <p className="text-sm text-muted">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs para sub-páginas */}
      <section className="py-24">
        <div className="container-premium">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: 'Nossa história', desc: 'De onde viemos e como chegamos até aqui.', href: '/o-movimento/historia' },
              { title: 'Governança', desc: 'Quem lidera e como tomamos decisões.', href: '/o-movimento/governanca' },
              { title: 'Manifesto', desc: 'Por que existimos. Em nossas próprias palavras.', href: '/o-movimento/manifesto' },
            ].map((item, i) => (
              <ScrollReveal key={item.href} delay={i * 0.1}>
                <Link
                  href={item.href}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-dark-surface dark:border-white/10"
                >
                  <h3 className="mb-2 font-display text-lg font-bold text-text group-hover:text-primary dark:text-white">{item.title}</h3>
                  <p className="mb-4 flex-1 text-sm text-muted">{item.desc}</p>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                    Saiba mais <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
