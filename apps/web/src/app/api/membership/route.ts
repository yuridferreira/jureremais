import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.enum(['MORADOR', 'EMPRESA', 'INSTITUICAO', 'PARCEIRO']),
  organization: z.string().optional(),
  message: z.string().optional(),
  interests: z.array(z.string()).optional(),
  website: z.string().optional(), // honeypot
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Dados inválidos', issues: result.error.flatten() }, { status: 422 })
  }

  if (result.data.website) {
    return NextResponse.json({ success: true })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website, ...data } = result.data

  await prisma.membershipRequest.create({
    data: {
      ...data,
      interests: data.interests ?? [],
      ipAddress: ip,
      utmSource: req.headers.get('referer') ?? undefined,
    },
  })

  // TODO: Send confirmation email via Resend
  // await resend.emails.send(...)

  return NextResponse.json({ success: true })
}
