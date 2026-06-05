import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden bg-primary py-24 noise"
      aria-labelledby="cta-title"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-premium relative z-10 text-center">
        <ScrollReveal>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent/20">
            <Users className="size-6 text-accent" />
          </div>
          <h2
            id="cta-title"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold text-white sm:text-5xl"
          >
            Faça parte do movimento que transforma Jurerê
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/65">
            Mais de 68 empresas e centenas de moradores já fazem parte.
            Junte-se a nós e contribua para um Jurerê mais seguro e organizado.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/participar"
              className="flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:gap-3"
            >
              Quero participar
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/participar/parceiro"
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Seja parceiro
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
