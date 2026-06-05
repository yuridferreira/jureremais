import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token')

  if (token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { path, tag } = body as { path?: string; tag?: string }

  try {
    if (tag) {
      revalidateTag(tag)
    }
    if (path) {
      revalidatePath(path)
    }

    return NextResponse.json({ revalidated: true, path, tag })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
