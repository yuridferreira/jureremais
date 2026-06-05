import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getTeamMembers } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = generatePageMetadata({
  title: 'Governança',
  description: 'Conheça a estrutura organizacional do Jurerê Mais — diretoria, conselho e equipe operacional.',
  path: '/o-movimento/governanca',
})

const departmentLabels: Record<string, string> = {
  'diretoria': 'Diretoria',
  'conselho': 'Conselho',
  'equipe-operacional': 'Equipe Operacional',
  'voluntario': 'Voluntários',
}

const departmentOrder = ['diretoria', 'conselho', 'equipe-operacional', 'voluntario']

export default async function GovernancaPage() {
  const members = await getTeamMembers()

  const byDepartment = departmentOrder.reduce<Record<string, typeof members>>((acc, dept) => {
    const group = members.filter((m) => m.department === dept)
    if (group.length > 0) acc[dept] = group
    return acc
  }, {})

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', href: '/' },
              { name: 'O Movimento', href: '/o-movimento' },
              { name: 'Governança', href: '/o-movimento/governanca' },
            ])
          ),
        }}
      />
      <div className="pt-16">
        {/* Hero */}
        <section className="bg-surface-alt py-20 dark:bg-dark-surface">
          <div className="container-premium">
            <ScrollReveal>
              <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
                <a href="/o-movimento" className="hover:text-text">O Movimento</a>
                {' / '}
                <span className="text-text dark:text-white">Governança</span>
              </nav>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Quem lidera</p>
              <h1 className="mb-4 font-display text-4xl font-bold text-text dark:text-white sm:text-5xl">
                Governança
              </h1>
              <p className="max-w-xl text-lg text-muted">
                Tomadas de decisão transparentes, com representação equilibrada de moradores, empresários e especialistas.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16">
          <div className="container-premium">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: 'Transparência', desc: 'Todas as decisões documentadas e publicadas.' },
                { title: 'Participação', desc: 'Moradores e parceiros com voz nas decisões.' },
                { title: 'Prestação de contas', desc: 'Relatórios financeiros públicos trimestralmente.' },
              ].map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-border bg-surface p-6 dark:bg-dark-surface dark:border-white/10">
                    <h3 className="mb-2 font-display text-lg font-bold text-text dark:text-white">{p.title}</h3>
                    <p className="text-sm text-muted">{p.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team by department */}
        {Object.keys(byDepartment).length > 0 ? (
          Object.entries(byDepartment).map(([dept, deptMembers]) => (
            <section key={dept} className="py-12">
              <div className="container-premium">
                <ScrollReveal className="mb-8">
                  <h2 className="font-display text-2xl font-bold text-text dark:text-white">
                    {departmentLabels[dept] ?? dept}
                  </h2>
                </ScrollReveal>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {deptMembers.map((member, i) => (
                    <ScrollReveal key={member.id} delay={i * 0.06}>
                      <div className="rounded-2xl border border-border bg-surface p-6 text-center dark:bg-dark-surface dark:border-white/10">
                        <div className="relative mx-auto mb-4 size-20 overflow-hidden rounded-full bg-surface-alt">
                          {member.photo ? (
                            <Image
                              src={member.photo.sizes?.thumbnail?.url ?? member.photo.url}
                              alt={member.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-2xl font-bold text-muted">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-text dark:text-white">{member.name}</h3>
                        <p className="mt-0.5 text-sm text-muted">{member.role}</p>
                        {(member.linkedin || member.email) && (
                          <div className="mt-3 flex items-center justify-center gap-2">
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`LinkedIn de ${member.name}`}
                                className="flex size-8 items-center justify-center rounded-full bg-surface-alt text-muted transition-colors hover:text-accent dark:bg-white/5"
                              >
                                <Linkedin className="size-4" />
                              </a>
                            )}
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                aria-label={`Email de ${member.name}`}
                                className="flex size-8 items-center justify-center rounded-full bg-surface-alt text-muted transition-colors hover:text-accent dark:bg-white/5"
                              >
                                <Mail className="size-4" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          ))
        ) : (
          <section className="py-16">
            <div className="container-premium">
              <p className="text-center text-muted">
                Membros da equipe serão exibidos aqui após serem cadastrados no CMS.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
