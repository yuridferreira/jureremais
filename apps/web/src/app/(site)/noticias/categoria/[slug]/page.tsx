import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategories } from '@/lib/payload/queries'
import { generatePageMetadata } from '@/lib/seo/metadata'
import NoticiasPage from '../../page'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}
  return generatePageMetadata({
    title: `Notícias — ${category.name}`,
    description: `Todas as notícias sobre ${category.name} do Jurerê Mais.`,
    path: `/noticias/categoria/${slug}`,
  })
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  // Reutiliza a página de notícias com o filtro de categoria pré-aplicado
  return NoticiasPage({
    searchParams: Promise.resolve({ categoria: slug }),
  })
}
