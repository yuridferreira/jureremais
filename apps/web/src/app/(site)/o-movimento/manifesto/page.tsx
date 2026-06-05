import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = generatePageMetadata({
  title: 'Manifesto',
  description: 'O manifesto do Jurerê Mais — por que existimos, o que acreditamos e para onde vamos.',
  path: '/o-movimento/manifesto',
})

const sections = [
  {
    label: 'O problema',
    title: 'Jurerê merece mais do que promessas.',
    body: `Durante anos, Jurerê Internacional cresceu em fama e valor imobiliário, mas a gestão do espaço público ficou para trás. Câmeras ausentes. Iluminação precária. Segurança dependente exclusivamente do poder público sobrecarregado. Orla degradada. Manutenção negligenciada.

Enquanto Jurerê virava destino de classe mundial, quem vive aqui carregava problemas de bairro comum.`,
  },
  {
    label: 'A decisão',
    title: 'Parar de reclamar. Começar a agir.',
    body: `Em 2019, um grupo de moradores e empresários decidiu que esperar não era opção. A solução não viria de cima para baixo — precisava nascer da própria comunidade.

Não com protestos. Com projetos. Não com críticas. Com execução.

O Jurerê Mais nasceu dessa decisão: assumir a responsabilidade coletiva pelo lugar onde vivemos e trabalhamos.`,
  },
  {
    label: 'O que acreditamos',
    title: 'Gestão urbana é responsabilidade de todos.',
    body: `Acreditamos que uma comunidade organizada pode fazer mais do que qualquer ator isolado — seja um morador, uma empresa, ou até o poder público.

Acreditamos em transparência total: cada real investido prestado de contas publicamente.

Acreditamos em execução: não existimos para fazer estudos ou relatórios bonitos. Existimos para instalar câmeras, reformar postos, manter a orla, iluminar ruas.

Acreditamos em dados: medimos tudo. O que não pode ser medido, não pode ser melhorado.`,
  },
  {
    label: 'O compromisso',
    title: 'Jurerê em 2030.',
    body: `Nossa visão é de um Jurerê Internacional que seja referência nacional não apenas em beleza natural e sofisticação — mas em organização, segurança e qualidade de vida.

Um bairro onde moradores, empresários e visitantes sintam que alguém está cuidando. Onde cada projeto tem um responsável, um prazo e um resultado mensurável.

Isso é o que nos move. Isso é o Jurerê Mais.`,
  },
]

export default function ManifestoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', href: '/' },
              { name: 'O Movimento', href: '/o-movimento' },
              { name: 'Manifesto', href: '/o-movimento/manifesto' },
            ])
          ),
        }}
      />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-primary py-32 noise">
          <div className="container-premium">
            <ScrollReveal>
              <nav className="mb-8 text-sm text-white/50" aria-label="Breadcrumb">
                <a href="/o-movimento" className="hover:text-white">O Movimento</a>
                {' / '}
                <span className="text-white">Manifesto</span>
              </nav>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                Por que existimos
              </p>
              <h1 className="max-w-3xl font-display text-6xl font-bold leading-tight text-white sm:text-7xl">
                Manifesto
              </h1>
            </ScrollReveal>
          </div>
        </section>

        {/* Sections */}
        <div className="divide-y divide-border dark:divide-white/10">
          {sections.map((section) => (
            <section key={section.label} className="py-24">
              <div className="container-premium">
                <ScrollReveal>
                  <div className="mx-auto max-w-3xl">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                      {section.label}
                    </p>
                    <h2 className="mb-8 font-display text-4xl font-bold leading-tight text-text dark:text-white sm:text-5xl">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.body.split('\n\n').map((paragraph) => (
                        <p key={paragraph.slice(0, 30)} className="text-lg leading-relaxed text-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="bg-primary py-24 noise">
          <div className="container-premium text-center">
            <ScrollReveal>
              <p className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
                Você concorda com isso?
              </p>
              <p className="mb-10 text-white/70">Então você já faz parte do movimento.</p>
              <Link
                href="/participar"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:gap-3"
              >
                Quero participar <ArrowRight className="size-4" />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  )
}
