import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const { email, name } = result.data

  const existing = await prisma.newsletterSubscription.findUnique({ where: { email } })
  if (existing) {
    if (existing.status === 'CONFIRMED') {
      return NextResponse.json({ success: true, already: true })
    }
    // Resend confirmation if PENDING
    // TODO: Send confirmation email
    return NextResponse.json({ success: true })
  }

  await prisma.newsletterSubscription.create({
    data: { email, name, source: req.headers.get('referer') ?? undefined },
  })

  // TODO: Send double opt-in confirmation email via Resend
  // const token = await createConfirmationToken(email)
  // await resend.emails.send(...)

  return NextResponse.json({ success: true })
}
