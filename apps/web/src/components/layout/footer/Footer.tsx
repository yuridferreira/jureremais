import Link from 'next/link'
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle } from 'lucide-react'
import { footerNav } from '@/config/navigation'
import { socialLinks } from '@/config/social'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-alt border-t border-border" role="contentinfo">
      <div className="container-premium py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 font-display text-xl font-bold text-primary"
            >
              <span>Jurerê</span>
              <span className="rounded bg-accent px-1.5 py-0.5 text-sm text-primary">Mais</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted">
              Movimento de gestão urbana colaborativa que une moradores, empresários e
              instituições pelo futuro de Jurerê Internacional.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon]
                return Icon ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:bg-accent hover:text-primary hover:border-accent"
                  >
                    <Icon className="size-4" />
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* O Movimento */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              O Movimento
            </h3>
            <ul className="space-y-2.5">
              {footerNav.movimento.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atuação */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Atuação
            </h3>
            <ul className="space-y-2.5">
              {footerNav.atuacao.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Participe + Newsletter */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Participe
            </h3>
            <ul className="mb-6 space-y-2.5">
              {footerNav.participe.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Newsletter
              </p>
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-border bg-warm-alt">
        <div className="container-premium flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} Jurerê Mais — Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-muted transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
