import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-surface px-6 py-24 dark:bg-dark">
      <p className="mb-4 font-mono text-sm font-bold tracking-wider text-accent">404</p>
      <h1 className="mb-4 font-display text-4xl font-bold text-text dark:text-white">
        Página não encontrada
      </h1>
      <p className="mb-10 max-w-md text-center text-muted">
        A página que você procura não existe ou foi removida.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          <Home className="size-4" />
          Voltar ao início
        </Link>
        <Link
          href="/contato"
          className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-surface-alt dark:border-white/10 dark:text-white"
        >
          <ArrowLeft className="size-4" />
          Fale conosco
        </Link>
      </div>
    </div>
  )
}
