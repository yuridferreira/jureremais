import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(20).max(2000),
  website: z.string().optional(), // honeypot
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'

  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: result.error.flatten() }, { status: 422 })
  }

  // Honeypot check
  if (result.data.website) {
    return NextResponse.json({ success: true })
  }

  const { name, email, subject, message } = result.data

  await prisma.contactSubmission.create({
    data: { name, email, subject, message, ipAddress: ip },
  })

  // TODO: Send email via Resend
  // await resend.emails.send(...)

  return NextResponse.json({ success: true })
}
