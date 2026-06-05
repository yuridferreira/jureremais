const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001'

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  cache?: RequestCache
  revalidate?: number | false
  tags?: string[]
}

export async function payloadFetch<T>(
  endpoint: string,
  { method = 'GET', body, cache = 'force-cache', revalidate, tags }: FetchOptions = {}
): Promise<T> {
  const url = `${CMS_URL}/api${endpoint}`

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    next: {
      ...(revalidate !== undefined ? { revalidate } : {}),
      ...(tags ? { tags } : {}),
    },
    cache: revalidate !== undefined ? undefined : cache,
  })

  if (!res.ok) {
    throw new Error(`Payload CMS error: ${res.status} ${res.statusText} — ${url}`)
  }

  return res.json() as Promise<T>
}

const emptyPaginated = { docs: [], totalDocs: 0, totalPages: 0, page: 1, limit: 10, hasNextPage: false, hasPrevPage: false }

export async function safePayloadFetch<T>(
  endpoint: string,
  options?: FetchOptions,
  fallback?: T
): Promise<T> {
  try {
    return await payloadFetch<T>(endpoint, options)
  } catch {
    return (fallback ?? emptyPaginated) as T
  }
}
