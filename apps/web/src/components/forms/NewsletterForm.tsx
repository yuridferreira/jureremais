'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const schema = z.object({
  email: z.string().email('Email inválido'),
})

type FormData = z.infer<typeof schema>

interface NewsletterFormProps {
  variant?: 'default' | 'footer'
}

export function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', variant === 'footer' ? 'text-white/80' : 'text-accent')}>
        <CheckCircle className="size-4" />
        Verifique seu email para confirmar!
      </div>
    )
  }

  const inputClass = cn(
    'flex-1 min-w-0 rounded-l-full px-4 py-2.5 text-sm outline-none transition-colors',
    variant === 'footer'
      ? 'bg-white/10 text-white placeholder-white/40 focus:bg-white/15'
      : 'bg-surface-alt text-text placeholder-muted focus:ring-2 focus:ring-accent border border-border'
  )

  const btnClass = cn(
    'flex items-center gap-1.5 rounded-r-full px-4 py-2.5 text-sm font-medium transition-colors',
    'bg-accent text-white hover:bg-accent-dark disabled:opacity-60'
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex">
        <input
          {...register('email')}
          type="email"
          placeholder="Seu email"
          autoComplete="email"
          aria-label="Email para newsletter"
          aria-describedby={errors.email ? 'newsletter-error' : undefined}
          className={inputClass}
        />
        <button type="submit" disabled={status === 'loading'} className={btnClass}>
          {status === 'loading' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Assinar</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className="mt-1 text-xs text-red-400">
          {errors.email.message}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-1 text-xs text-red-400">
          Erro ao se inscrever. Tente novamente.
        </p>
      )}
    </form>
  )
}
