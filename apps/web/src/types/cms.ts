export type ProjectCategory =
  | 'seguranca'
  | 'sustentabilidade'
  | 'urbanismo'
  | 'comunidade'
  | 'manutencao'

export type ProjectStatus = 'planejamento' | 'em-andamento' | 'concluido' | 'pausado'

export type PartnerCategory =
  | 'empresa'
  | 'condominio'
  | 'restaurante'
  | 'comercio'
  | 'patrocinador'
  | 'instituicao'

export type NewsCategory =
  | 'seguranca'
  | 'sustentabilidade'
  | 'urbanismo'
  | 'comunidade'
  | 'eventos'

export interface CMSMedia {
  id: string
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
  mimeType?: string
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    hero?: { url: string; width: number; height: number }
    og?: { url: string; width: number; height: number }
  }
}

export interface CMSCategory {
  id: string
  name: string
  slug: string
  icon?: string
  color?: string
}

export interface CMSProject {
  id: string
  name: string
  slug: string
  excerpt?: string
  category: ProjectCategory
  projectStatus: ProjectStatus
  coverImage: CMSMedia
  gallery?: Array<{ image: CMSMedia; caption?: string }>
  content?: unknown
  objectives?: Array<{ objective: string }>
  results?: Array<{ result: string; metric?: string }>
  investment?: number
  investmentBreakdown?: Array<{ description: string; amount: number }>
  startDate?: string
  endDate?: string
  timeline?: Array<{ date: string; title: string; description?: string }>
  partners?: CMSPartner[]
  tags?: CMSTag[]
  relatedProjects?: CMSProject[]
  featured: boolean
  publishedAt?: string
  order?: number
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: CMSMedia }
  updatedAt: string
}

export interface CMSPartner {
  id: string
  name: string
  slug: string
  logo: CMSMedia
  coverImage?: CMSMedia
  category: PartnerCategory
  description?: unknown
  website?: string
  instagram?: string
  since?: string
  featured: boolean
  projects?: CMSProject[]
  testimonial?: { quote?: string; author?: string; role?: string }
  seo?: { metaTitle?: string; metaDescription?: string }
  updatedAt: string
}

export interface CMSNewsPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: CMSMedia
  content: unknown
  category: CMSCategory
  tags?: CMSTag[]
  author?: CMSTeamMember
  relatedProjects?: CMSProject[]
  featured: boolean
  readingTime?: number
  publishedAt: string
  updatedAt: string
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: CMSMedia }
}

export interface CMSReport {
  id: string
  title: string
  slug: string
  type: string
  year: number
  period?: string
  description?: string
  document: CMSMedia
  coverImage?: CMSMedia
  totalInvestment?: number
  totalRaised?: number
  highlights?: Array<{ highlight: string }>
  publishedAt: string
}

export interface CMSImpactMetric {
  id: string
  label: string
  value: number
  unit?: string
  prefix?: string
  suffix?: string
  description?: string
  icon?: string
  category?: string
  year?: number
  order: number
  featured: boolean
  trend?: 'up' | 'down' | 'stable'
  previousValue?: number
}

export interface CMSTeamMember {
  id: string
  name: string
  slug?: string
  role: string
  photo?: CMSMedia
  bio?: string
  email?: string
  linkedin?: string
  department?: string
  order: number
  featured: boolean
}

export interface CMSTestimonial {
  id: string
  quote: string
  author: string
  role?: string
  photo?: CMSMedia
  partner?: CMSPartner
  featured: boolean
  context?: string
}

export interface CMSTag {
  id: string
  name: string
  slug: string
}

export interface CMSPaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage?: number
  prevPage?: number
}
