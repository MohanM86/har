import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig, getCategoryBySlug } from '@/data/config'
import { allArticles, getArticleBySlug, getRelatedArticles } from '@/data/index'
import { generateArticleJsonLd, generateFAQJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'
import { Breadcrumbs, FAQAccordion, RelatedLinks } from '@/components/UI'
import { ArticleSidebar } from '@/components/ArticleSidebar'

export function generateStaticParams() {
  return allArticles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords.join(', '),
    alternates: { canonical: `${siteConfig.url}/${article.slug}/` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      locale: 'nb_NO',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: ['/og-image.jpg'],
    },
  }
}

function addIdsToContent(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/g, (_, level, attrs, text) => {
    const plain = text.replace(/<[^>]*>/g, '')
    const id = plain.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`
  })
}

function extractHeadings(content: string): { text: string; id: string; level: number }[] {
  const headings: { text: string; id: string; level: number }[] = []
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/g
  let match
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '')
    const id = text.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ text, id, level: parseInt(match[1]) })
  }
  return headings
}

function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(2, Math.ceil(words / 200))
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const category = getCategoryBySlug(article.categorySlug)
  const related = getRelatedArticles(article)
  const contentWithIds = addIdsToContent(article.content)
  const headings = extractHeadings(article.content)
  const readingTime = estimateReadingTime(article.content)
  const faqJsonLd = generateFAQJsonLd(article.faq)

  // Build full TOC items (headings + FAQ questions + Les også)
  const tocItems: { text: string; id: string; level: number }[] = [...headings]
  if (article.faq.length > 0) {
    tocItems.push({ text: 'Vanlige spørsmål', id: 'faq', level: 2 })
    article.faq.forEach((f, i) => {
      tocItems.push({ text: f.q, id: `faq-${i}`, level: 3 })
    })
  }
  if (related.length > 0) {
    tocItems.push({ text: 'Les også', id: 'les-ogsa', level: 2 })
  }

  const breadcrumbs = [
    { name: 'Hjem', url: siteConfig.url },
    { name: article.category, url: `${siteConfig.url}/kategori/${article.categorySlug}/` },
    { name: article.title, url: `${siteConfig.url}/${article.slug}/` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleJsonLd(article)) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs)) }}
      />

      <div className="max-w-wide mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs items={[
          { label: 'Hjem', href: '/' },
          { label: article.category, href: `/kategori/${article.categorySlug}/` },
          { label: article.title },
        ]} />

        <div className="flex gap-10">
          {/* Main content column */}
          <article className="flex-1 min-w-0 max-w-article">
            {/* Category label */}
            <div className="text-xs font-medium uppercase tracking-wider text-hair-600 mb-2">
              {article.category}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
              {article.title}
            </h1>

            {/* Meta: date + reading time */}
            <div className="flex items-center gap-3 mt-3 text-xs text-muted">
              <span>Oppdatert mars 2026</span>
              <span className="text-border">·</span>
              <span>{readingTime} min lesetid</span>
            </div>

            {/* Short answer / featured snippet box */}
            <div className="mt-6 p-5 rounded-lg bg-sand border-l-4 border-hair-400">
              <p className="text-sm font-medium text-hair-800 mb-1">Kort svar</p>
              <p className="text-sm text-hair-900/80 leading-relaxed">{article.shortAnswer}</p>
            </div>

            {/* Mobile TOC (collapsible, hidden on desktop) */}
            <div className="mt-6 lg:hidden">
              <MobileTOC tocItems={tocItems} />
            </div>

            {/* Article body */}
            <div
              className="article-content mt-8"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* FAQ */}
            <FAQAccordion items={article.faq} />

            {/* Related articles */}
            <RelatedLinks articles={related} />

            {/* Back to top */}
            <div className="mt-10 pt-6 border-t border-border">
              <a href="#" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                Tilbake til toppen
              </a>
            </div>
          </article>

          {/* Desktop sticky sidebar TOC */}
          <ArticleSidebar tocItems={tocItems} />
        </div>
      </div>
    </>
  )
}

/* Mobile collapsible TOC */
function MobileTOC({ tocItems }: { tocItems: { text: string; id: string; level: number }[] }) {
  if (tocItems.length < 3) return null
  return (
    <details className="border border-border rounded-lg bg-sand/30">
      <summary className="px-5 py-3.5 text-sm font-medium text-ink cursor-pointer list-none flex items-center justify-between">
        <span>Innhold</span>
        <svg className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
      </summary>
      <div className="px-5 pb-4 space-y-1.5">
        {tocItems.map((h, i) => (
          <a
            key={i}
            href={`#${h.id}`}
            className={`block text-xs transition-colors ${
              h.id === 'les-ogsa'
                ? 'text-green-700 font-semibold hover:text-green-900'
                : h.level === 3
                  ? 'pl-4 text-muted hover:text-ink'
                  : 'text-muted font-medium hover:text-ink'
            }`}
          >
            {h.text}
          </a>
        ))}
      </div>
    </details>
  )
}
