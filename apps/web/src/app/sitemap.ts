import { MetadataRoute } from 'next'
import { getProjects, getPartners, getNews } from '@/lib/payload/queries'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url

  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const [projectsData, partnersData, newsData] = await Promise.all([
      getProjects({ limit: 999 }),
      getPartners({ limit: 999 }),
      getNews({ limit: 999 }),
    ])

    dynamicRoutes = [
      ...projectsData.docs.map((p) => ({
        url: `${base}/projetos/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...partnersData.docs.map((p) => ({
        url: `${base}/parceiros/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...newsData.docs.map((p) => ({
        url: `${base}/noticias/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
    ]
  } catch {
    // CMS offline — return only static routes
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/o-movimento`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/o-movimento/historia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/o-movimento/governanca`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/o-movimento/manifesto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projetos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/impacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/parceiros`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/transparencia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/noticias`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/participar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contato`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
