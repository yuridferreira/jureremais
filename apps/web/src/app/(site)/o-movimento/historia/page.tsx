import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = generatePageMetadata({
  title: 'Nossa História',
  description: 'Como o Jurerê Mais surgiu — a história de moradores e empresários que decidiram transformar Jurerê Internacional.',
  path: '/o-movimento/historia',
})

const timeline = [
  {
    year: '2019',
    title: 'A semente',
    description:
      'Um grupo de moradores e empresários de Jurerê Internacional se reúne informalmente para discutir a crescente preocupação com segurança e qualidade de vida no bairro.',
  },
  {
    year: '2020',
    title: 'Formalização',
    description:
      'O movimento é formalizado com estatuto, governança e os primeiros parceiros institucionais. Primeiros projetos de segurança são planejados.',
  },
  {
    year: '2021',
    title: 'Primeiras câmeras',
    description:
      'Instalação das primeiras câmeras de monitoramento. A rede de parceiros cresce para mais de 20 empresas e condomínios.',
  },
  {
    year: '2022',
    title: 'Expansão',
    description:
      'Cobertura de monitoramento expande para 60% da orla. Início do projeto de Gestão Integrada da Orla e parceria com a Polícia Militar.',
  },
  {
    year: '2023',
    title: 'Consolidação',
    description:
      'Reforma do posto policial concluída. 247 câmeras ativas, 89% de cobertura. Mais de 50 parceiros ativos. Primeiros relatórios públicos de transparência.',
  },
  {
    year: '2024',
    title: 'Hoje',
    description:
      'R$ 2,4 milhões investidos. 68 parceiros. Referência nacional em gestão urbana colaborativa. Expansão dos projetos de urbanismo e sustentabilidade.',
  },
]

export default function HistoriaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', href: '/' },
              { name: 'O Movimento', href: '/o-movimento' },
              { name: 'História', href: '/o-movimento/historia' },
            ])
          ),
        }}
      />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-primary py-24 noise">
          <div className="container-premium">
            <ScrollReveal>
              <nav className="mb-6 text-sm text-white/50" aria-label="Breadcrumb">
                <a href="/o-movimento" className="hover:text-white">O Movimento</a>
                {' / '}
                <span className="text-white">História</span>
              </nav>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Desde 2019</p>
              <h1 className="mb-4 font-display text-5xl font-bold text-white">Nossa história</h1>
              <p className="max-w-xl text-lg text-white/70">
                Como um grupo de vizinhos decidiu parar de esperar e começar a agir.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24">
          <div className="container-premium">
            <div className="mx-auto max-w-3xl">
              <ol className="relative space-y-12 border-l-2 border-border pl-8 dark:border-white/10">
                {timeline.map((item, i) => (
                  <ScrollReveal key={item.year} delay={i * 0.08}>
                    <li className="relative">
                      {/* Dot */}
                      <span className="absolute -left-[2.65rem] flex size-8 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white ring-4 ring-surface dark:ring-dark">
                        {item.year.slice(2)}
                      </span>

                      <p className="mb-1 font-mono text-sm font-bold text-accent">{item.year}</p>
                      <h2 className="mb-2 font-display text-2xl font-bold text-text dark:text-white">
                        {item.title}
                      </h2>
                      <p className="leading-relaxed text-muted">{item.description}</p>
                    </li>
                  </ScrollReveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-alt py-16 dark:bg-dark-surface">
          <div className="container-premium text-center">
            <ScrollReveal>
              <h2 className="mb-4 font-display text-2xl font-bold text-text dark:text-white">
                Seja parte dessa história
              </h2>
              <p className="mb-8 text-muted">
                A história do Jurerê Mais ainda está sendo escrita. Faça parte dela.
              </p>
              <a
                href="/participar"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Participar do movimento
              </a>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  )
}
