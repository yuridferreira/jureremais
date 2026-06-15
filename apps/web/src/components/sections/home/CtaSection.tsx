import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-warm-alt noise" aria-labelledby="cta-title">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-premium py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Texto */}
          <ScrollReveal direction="left">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-text">
              Participe
            </p>
            <h2
              id="cta-title"
              className="mb-5 font-display text-4xl font-bold leading-[1.12] text-primary text-balance sm:text-5xl"
            >
              Faça parte do movimento que transforma Jurerê
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Mais de 68 empresas e centenas de moradores já fazem parte.
              Seja morador, empresário ou instituição — há um espaço aqui para você.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="flex flex-col gap-4">
              <Link
                href="/participar"
                className="group flex items-center justify-between rounded-xl border border-border bg-surface px-7 py-5 text-primary transition-all hover:border-accent/50 hover:shadow-sm"
              >
                <div>
                  <p className="text-xs font-medium text-muted">Para moradores</p>
                  <p className="font-display text-lg font-semibold">Quero participar do movimento</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-text" aria-hidden />
              </Link>

              <Link
                href="/participar/parceiro"
                className="group flex items-center justify-between rounded-xl bg-accent px-7 py-5 text-primary transition-all hover:bg-accent-dark hover:text-white"
              >
                <div>
                  <p className="text-xs font-medium text-primary/60 group-hover:text-white/70">Para empresas e investidores</p>
                  <p className="font-display text-lg font-semibold">Seja parceiro estratégico</p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-primary/50 transition-transform group-hover:translate-x-1 group-hover:text-white" aria-hidden />
              </Link>

              <Link
                href="/transparencia"
                className="group flex items-center justify-between rounded-xl border border-border px-7 py-4 text-muted transition-all hover:border-accent/40 hover:text-primary"
              >
                <p className="text-sm">Conheça nossa transparência financeira</p>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
