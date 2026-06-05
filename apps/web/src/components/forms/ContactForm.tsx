'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(100),
  email: z.string().email('Email inválido'),
  subject: z.string().min(2, 'Informe o assunto').max(200),
  message: z.string().min(20, 'Mensagem muito curta (mín. 20 caracteres)').max(2000),
  website: z.string().optional(), // honeypot
})

type FormData = z.infer<typeof schema>

const subjects = [
  { value: 'geral', label: 'Informações gerais' },
  { value: 'parceria', label: 'Parceria / Patrocínio' },
  { value: 'imprensa', label: 'Imprensa / Mídia' },
  { value: 'projetos', label: 'Projetos e ações' },
  { value: 'urgente', label: 'Urgente' },
]

const fieldClass = cn(
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text',
  'placeholder-muted transition-colors outline-none',
  'focus:border-accent focus:ring-2 focus:ring-accent/20',
  'dark:bg-dark-surface dark:border-white/10 dark:text-white dark:placeholder-white/30'
)

const errorClass = 'mt-1 text-xs text-red-500'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-10 text-center dark:border-green-900/30 dark:bg-green-900/10">
        <CheckCircle className="size-12 text-green-600" />
        <h3 className="font-display text-xl font-bold text-text dark:text-white">Mensagem enviada!</h3>
        <p className="text-muted">Retornaremos em até 48 horas em dias úteis.</p>
        <button onClick={() => setStatus('idle')} className="text-sm text-accent hover:underline">
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
      <input type="text" {...register('website')} tabIndex={-1} aria-hidden className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-text dark:text-white">
            Nome <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            aria-invalid={!!errors.name}
            {...register('name')}
            className={fieldClass}
          />
          {errors.name && <p id="cf-name-error" role="alert" className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-text dark:text-white">
            Email <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            aria-invalid={!!errors.email}
            {...register('email')}
            className={fieldClass}
          />
          {errors.email && <p id="cf-email-error" role="alert" className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium text-text dark:text-white">
          Assunto <span aria-hidden className="text-red-500">*</span>
        </label>
        <select
          id="cf-subject"
          aria-describedby={errors.subject ? 'cf-subject-error' : undefined}
          aria-invalid={!!errors.subject}
          {...register('subject')}
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>Selecione o assunto</option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {errors.subject && <p id="cf-subject-error" role="alert" className={errorClass}>{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-text dark:text-white">
          Mensagem <span aria-hidden className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={6}
          placeholder="Como podemos ajudar?"
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          aria-invalid={!!errors.message}
          {...register('message')}
          className={cn(fieldClass, 'resize-none')}
        />
        {errors.message && <p id="cf-message-error" role="alert" className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="size-4 shrink-0" />
          Erro ao enviar. Tente novamente ou use o WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-60"
      >
        {status === 'loading' ? <><Loader2 className="size-4 animate-spin" /> Enviando...</> : 'Enviar mensagem'}
      </button>

      <p className="text-center text-xs text-muted">
        Ao enviar, você concorda com nossa{' '}
        <a href="/privacidade" className="text-accent hover:underline">política de privacidade</a>.
      </p>
    </form>
  )
}
