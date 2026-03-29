import { MetadataRoute } from 'next'
import { categories, siteConfig } from '@/data/config'
import { allArticles } from '@/data/index'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const home = { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 }

  const staticPages = [
    { url: `${base}/om-oss/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  const categoryPages = categories.map(cat => ({
    url: `${base}/kategori/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages = allArticles.map(a => ({
    url: `${base}/${a.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: a.slug === 'har-guide' ? 0.9 : 0.7,
  }))

  return [home, ...staticPages, ...categoryPages, ...articlePages]
}
