import { siteConfig } from '@/config/site'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Florianópolis',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://instagram.com/jureremais',
      'https://facebook.com/jureremais',
      'https://linkedin.com/company/jureremais',
    ],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteConfig.url}/noticias?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  }
}

export function articleSchema(post: {
  title: string
  excerpt: string
  coverImageUrl?: string
  publishedAt: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/images/logo.png` },
    },
    mainEntityOfPage: `${siteConfig.url}/noticias/${post.slug}`,
  }
}

export function projectSchema(project: {
  name: string
  excerpt: string
  coverImageUrl?: string
  startDate?: string
  endDate?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.name,
    description: project.excerpt,
    url: `${siteConfig.url}/projetos/${project.slug}`,
    image: project.coverImageUrl,
    funder: { '@type': 'Organization', name: siteConfig.name },
    ...(project.startDate ? { startDate: project.startDate } : {}),
    ...(project.endDate ? { endDate: project.endDate } : {}),
  }
}
