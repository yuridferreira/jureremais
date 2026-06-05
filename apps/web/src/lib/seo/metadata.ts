import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageMetadataParams {
  title: string
  description: string
  image?: string
  path: string
  noindex?: boolean
  type?: 'website' | 'article'
  publishedAt?: string
}

export function generatePageMetadata({
  title,
  description,
  image,
  path,
  noindex = false,
  type = 'website',
  publishedAt,
}: PageMetadataParams): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}`

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: siteConfig.locale,
      type,
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
  }
}
