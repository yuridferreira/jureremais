import { ScrollReveal } from '@/components/ui/ScrollReveal'

const pillars = [
  {
    number: '01',
    title: 'Segurança',
    description:
      'Monitoramento 24h com mais de 200 câmeras integradas, patrulhamento motorizado e suporte operacional durante a temporada.',
    href: '/projetos?categoria=seguranca',
  },
  {
    number: '02',
    title: 'Sustentabilidade',
    description:
      'Gestão integrada da orla, manejo de resíduos, preservação ambiental e cuidado com os espaços verdes de Jurerê.',
    href: '/projetos?categoria=sustentabilidade',
  },
  {
    number: '03',
    title: 'Urbanismo',
    description:
      'Manutenção de vias, iluminação pública, sinalização, calçadas e infraestrutura urbana em parceria com o poder público.',
    href: '/projetos?categoria=urbanismo',
  },
  {
    number: '04',
    title: 'Comunidade',
    description:
      'Integração entre moradores, empresários, condomínios e instituições através de participação ativa e eventos comunitários.',
    href: '/projetos?categoria=comunidade',
  },
  {
    number: '05',
    title: 'Transparência',
    description:
      'Prestação de contas pública, relatórios periódicos e demonstrativos financeiros acessíveis a todos os parceiros.',
    href: '/transparencia',
  },
]

export function PillarsSection() {
  return (
    <section className="bg-warm py-24" aria-labelledby="pillars-title">
      <div className="container-premium">
        <ScrollReveal className="mb-14 max-w-xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
            Áreas de atuação
          </p>
          <h2
            id="pillars-title"
            className="font-display text-3xl font-bold text-primary sm:text-4xl"
          >
            Cinco frentes.<br />
            Uma só direção.
          </h2>
        </ScrollReveal>

        <div>
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.number} delay={i * 0.07}>
              <a
                href={pillar.href}
                className="group block border-t border-border py-7 transition-colors last:border-b hover:border-accent/50"
              >
                <div className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-8">
                  <span className="font-mono text-sm font-medium text-muted transition-colors group-hover:text-accent-text">
                    {pillar.number}
                  </span>

                  <div>
                    <h3 className="mb-1.5 font-display text-xl font-semibold text-primary transition-colors group-hover:text-accent-text sm:mb-0 sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted sm:hidden">
                      {pillar.description}
                    </p>
                  </div>

                  <p className="hidden max-w-sm text-sm leading-relaxed text-muted sm:block">
                    {pillar.description}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
