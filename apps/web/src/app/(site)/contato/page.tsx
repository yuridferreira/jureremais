import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ContactForm } from '@/components/forms/ContactForm'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contato',
  description: 'Entre em contato com o Jurerê Mais. Formulário, WhatsApp, email e telefone.',
  path: '/contato',
})

export default function ContatoPage() {
  return (
    <div className="pt-16">
      <section className="bg-surface-alt py-16 dark:bg-dark-surface">
        <div className="container-premium">
          <ScrollReveal>
            <h1 className="mb-2 font-display text-4xl font-bold text-text dark:text-white sm:text-5xl">Fale com a gente</h1>
            <p className="text-lg text-muted">Estamos aqui para ouvir, responder e agir.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-premium grid gap-16 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="mb-8 font-display text-2xl font-bold text-text dark:text-white">Envie uma mensagem</h2>
              <ContactForm />
            </ScrollReveal>
          </div>

          {/* Info */}
          <aside>
            <ScrollReveal delay={0.1} className="space-y-6">
              <h2 className="font-display text-xl font-bold text-text dark:text-white">Outras formas de contato</h2>

              <a
                href="https://wa.me/5548999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-4 transition-colors hover:bg-green-100 dark:border-green-900/30 dark:bg-green-900/10"
              >
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-400">WhatsApp</p>
                  <p className="text-sm text-green-700 dark:text-green-500">Resposta rápida em dias úteis</p>
                </div>
              </a>

              {[
                { icon: Mail, label: 'Email', value: 'contato@jureremais.org', href: 'mailto:contato@jureremais.org' },
                { icon: Phone, label: 'Telefone', value: '(48) 9xxxx-xxxx', href: 'tel:+5548999999999' },
                { icon: MapPin, label: 'Localização', value: 'Jurerê Internacional\nFlorianópolis, SC', href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-alt dark:bg-white/5">
                    <Icon className="size-5 text-muted" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 text-sm font-medium text-text hover:text-accent dark:text-white">{value}</a>
                    ) : (
                      <p className="mt-0.5 whitespace-pre-line text-sm text-text dark:text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </div>
  )
}
