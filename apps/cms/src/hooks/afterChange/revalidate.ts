import type { CollectionAfterChangeHook } from 'payload'

const pathMap: Record<string, (doc: Record<string, unknown>) => string[]> = {
  projects: (doc) => ['/', '/projetos', `/projetos/${doc.slug}`],
  partners: (doc) => ['/parceiros', `/parceiros/${doc.slug}`],
  news: (doc) => ['/', '/noticias', `/noticias/${doc.slug}`],
  reports: () => ['/transparencia'],
  'impact-metrics': () => ['/', '/impacto'],
  'team-members': () => ['/o-movimento'],
  testimonials: () => ['/', '/impacto'],
}

const tagMap: Record<string, string[]> = {
  projects: ['projects'],
  partners: ['partners'],
  news: ['news'],
  reports: ['reports'],
  'impact-metrics': ['metrics'],
  'team-members': ['team'],
  testimonials: ['testimonials'],
  categories: ['categories'],
}

export const revalidateNext: CollectionAfterChangeHook = async ({ doc, collection }) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!appUrl || !secret) return doc

  const paths = pathMap[collection.slug]?.(doc as Record<string, unknown>) ?? []
  const tags = tagMap[collection.slug] ?? []

  const revalidations = [
    ...paths.map((path) =>
      fetch(`${appUrl}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-token': secret },
        body: JSON.stringify({ path }),
      }).catch(() => null)
    ),
    ...tags.map((tag) =>
      fetch(`${appUrl}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-token': secret },
        body: JSON.stringify({ tag }),
      }).catch(() => null)
    ),
  ]

  await Promise.allSettled(revalidations)
  return doc
}
