import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, siteConfig } from '@/data/config'
import { getArticlesByCategory } from '@/data/index'
import { generateBreadcrumbJsonLd } from '@/lib/seo'
import { Breadcrumbs, ArticleCard } from '@/components/UI'
import { categoryIcons } from '@/components/Icons'

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} — Guider og artikler`,
    description: cat.description,
    alternates: { canonical: `${siteConfig.url}/kategori/${cat.slug}/` },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const articles = getArticlesByCategory(cat.slug)

  const breadcrumbs = [
    { name: 'Hjem', url: siteConfig.url },
    { name: cat.name, url: `${siteConfig.url}/kategori/${cat.slug}/` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs)) }}
      />

      <div className="max-w-wide mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs items={[
          { label: 'Hjem', href: '/' },
          { label: cat.name },
        ]} />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-hair-100 flex items-center justify-center flex-shrink-0 text-hair-700 [&>svg]:w-6 [&>svg]:h-6" dangerouslySetInnerHTML={{ __html: categoryIcons[cat.slug] || '' }} />
            <h1 className="font-display text-3xl font-bold text-ink">{cat.name}</h1>
          </div>
          <p className="text-base text-muted max-w-2xl leading-relaxed">{cat.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  )
}
