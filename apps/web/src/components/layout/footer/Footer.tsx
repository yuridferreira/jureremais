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
    <footer className="bg-primary text-white/80" role="contentinfo">
      {/* Main footer */}
      <div className="container-premium py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 font-display text-xl font-bold text-white"
            >
              <span>Jurerê</span>
              <span className="rounded bg-accent px-1.5 py-0.5 text-sm">Mais</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/60">
              Movimento de gestão urbana colaborativa que une moradores, empresários e
              instituições pelo futuro de Jurerê Internacional.
            </p>

            {/* Social links */}
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
                    className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-accent hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              O Movimento
            </h3>
            <ul className="space-y-2.5">
              {footerNav.movimento.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Atuação
            </h3>
            <ul className="space-y-2.5">
              {footerNav.atuacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Participe
            </h3>
            <ul className="mb-6 space-y-2.5">
              {footerNav.participe.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter inline */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                Newsletter
              </p>
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {year} Jurerê Mais — Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/40 transition-colors hover:text-white/70"
                >
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
