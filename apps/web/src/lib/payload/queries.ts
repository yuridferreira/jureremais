import { safePayloadFetch } from './client'
import type {
  CMSProject,
  CMSPartner,
  CMSNewsPost,
  CMSReport,
  CMSImpactMetric,
  CMSTeamMember,
  CMSTestimonial,
  CMSCategory,
  CMSPaginatedResponse,
} from '@/types/cms'

const empty = <T>(): CMSPaginatedResponse<T> => ({
  docs: [],
  totalDocs: 0,
  totalPages: 0,
  page: 1,
  limit: 10,
  hasNextPage: false,
  hasPrevPage: false,
})

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getFeaturedProjects(): Promise<CMSProject[]> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSProject>>(
    '/projects?where[featured][equals]=true&sort=order&depth=2&limit=6',
    { tags: ['projects'], revalidate: 60 },
    empty<CMSProject>()
  )
  return data.docs
}

export async function getProjects(params?: {
  category?: string
  status?: string
  limit?: number
  page?: number
}): Promise<CMSPaginatedResponse<CMSProject>> {
  const qs = new URLSearchParams({ depth: '2', sort: '-publishedAt', limit: String(params?.limit ?? 12) })
  if (params?.category) qs.set('where[category][equals]', params.category)
  if (params?.status) qs.set('where[projectStatus][equals]', params.status)
  if (params?.page) qs.set('page', String(params.page))

  return safePayloadFetch<CMSPaginatedResponse<CMSProject>>(
    `/projects?${qs.toString()}`,
    { tags: ['projects'], revalidate: 60 },
    empty<CMSProject>()
  )
}

export async function getProject(slug: string): Promise<CMSProject | null> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSProject>>(
    `/projects?where[slug][equals]=${slug}&depth=3&limit=1`,
    { tags: [`project-${slug}`], revalidate: false },
    empty<CMSProject>()
  )
  return data.docs[0] ?? null
}

// ─── Partners ────────────────────────────────────────────────────────────────

export async function getFeaturedPartners(): Promise<CMSPartner[]> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSPartner>>(
    '/partners?where[featured][equals]=true&sort=name&depth=1&limit=30',
    { tags: ['partners'], revalidate: 60 },
    empty<CMSPartner>()
  )
  return data.docs
}

export async function getPartners(params?: {
  category?: string
  limit?: number
  page?: number
}): Promise<CMSPaginatedResponse<CMSPartner>> {
  const qs = new URLSearchParams({ depth: '1', sort: 'name', limit: String(params?.limit ?? 50) })
  if (params?.category) qs.set('where[category][equals]', params.category)
  if (params?.page) qs.set('page', String(params.page))

  return safePayloadFetch<CMSPaginatedResponse<CMSPartner>>(
    `/partners?${qs.toString()}`,
    { tags: ['partners'], revalidate: 60 },
    empty<CMSPartner>()
  )
}

export async function getPartner(slug: string): Promise<CMSPartner | null> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSPartner>>(
    `/partners?where[slug][equals]=${slug}&depth=3&limit=1`,
    { tags: [`partner-${slug}`], revalidate: false },
    empty<CMSPartner>()
  )
  return data.docs[0] ?? null
}

// ─── News ────────────────────────────────────────────────────────────────────

export async function getLatestNews(limit = 3): Promise<CMSNewsPost[]> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSNewsPost>>(
    `/news?where[_status][equals]=published&sort=-publishedAt&depth=2&limit=${limit}`,
    { tags: ['news'], revalidate: 60 },
    empty<CMSNewsPost>()
  )
  return data.docs
}

export async function getNews(params?: {
  category?: string
  limit?: number
  page?: number
}): Promise<CMSPaginatedResponse<CMSNewsPost>> {
  const qs = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '2',
    sort: '-publishedAt',
    limit: String(params?.limit ?? 12),
  })
  if (params?.category) qs.set('where[category.slug][equals]', params.category)
  if (params?.page) qs.set('page', String(params.page))

  return safePayloadFetch<CMSPaginatedResponse<CMSNewsPost>>(
    `/news?${qs.toString()}`,
    { tags: ['news'], revalidate: 60 },
    empty<CMSNewsPost>()
  )
}

export async function getNewsPost(slug: string): Promise<CMSNewsPost | null> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSNewsPost>>(
    `/news?where[slug][equals]=${slug}&depth=3&limit=1`,
    { tags: [`news-${slug}`], revalidate: false },
    empty<CMSNewsPost>()
  )
  return data.docs[0] ?? null
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function getReports(year?: number): Promise<CMSReport[]> {
  const qs = new URLSearchParams({ sort: '-year,-publishedAt', depth: '1', limit: '50' })
  if (year) qs.set('where[year][equals]', String(year))

  const data = await safePayloadFetch<CMSPaginatedResponse<CMSReport>>(
    `/reports?${qs.toString()}`,
    { tags: ['reports'], revalidate: 3600 },
    empty<CMSReport>()
  )
  return data.docs
}

// ─── Impact Metrics ──────────────────────────────────────────────────────────

export async function getFeaturedMetrics(): Promise<CMSImpactMetric[]> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSImpactMetric>>(
    '/impact-metrics?where[featured][equals]=true&sort=order&limit=8',
    { tags: ['metrics'], revalidate: 300 },
    empty<CMSImpactMetric>()
  )
  return data.docs
}

export async function getAllMetrics(year?: number): Promise<CMSImpactMetric[]> {
  const qs = new URLSearchParams({ sort: 'order', limit: '50' })
  if (year) qs.set('where[year][equals]', String(year))

  const data = await safePayloadFetch<CMSPaginatedResponse<CMSImpactMetric>>(
    `/impact-metrics?${qs.toString()}`,
    { tags: ['metrics'], revalidate: 300 },
    empty<CMSImpactMetric>()
  )
  return data.docs
}

// ─── Team Members ────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<CMSTeamMember[]> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSTeamMember>>(
    '/team-members?sort=order&depth=1&limit=50',
    { tags: ['team'], revalidate: 3600 },
    empty<CMSTeamMember>()
  )
  return data.docs
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export async function getTestimonials(context?: string): Promise<CMSTestimonial[]> {
  const qs = new URLSearchParams({ depth: '2', limit: '20' })
  if (context) qs.set('where[context][in]', `${context},geral`)

  const data = await safePayloadFetch<CMSPaginatedResponse<CMSTestimonial>>(
    `/testimonials?${qs.toString()}`,
    { tags: ['testimonials'], revalidate: 3600 },
    empty<CMSTestimonial>()
  )
  return data.docs
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<CMSCategory[]> {
  const data = await safePayloadFetch<CMSPaginatedResponse<CMSCategory>>(
    '/categories?sort=order&limit=20',
    { tags: ['categories'], revalidate: 86400 },
    empty<CMSCategory>()
  )
  return data.docs
}
