import Link from 'next/link'
import { categories } from '@/data/config'
import { allArticles } from '@/data/index'
import { generateWebSiteJsonLd } from '@/lib/seo'
import { CategoryCard, ArticleCard, SearchComponent } from '@/components/UI'

const popularSlugs = [
  'hvordan-farge-haret-hjemme', 'tynt-har-menn', 'hvor-fort-vokser-har',
  'shampoo-balsam-fett-har', 'kort-har-dame', 'lus-i-haret',
  'hvorfor-mister-man-haret', 'har-guide',
]

export default function HomePage() {
  const popular = popularSlugs
    .map(slug => allArticles.find(a => a.slug === slug))
    .filter(Boolean) as typeof allArticles

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteJsonLd()) }}
      />

      {/* Hero */}
      <section className="bg-sand border-b border-border">
        <div className="max-w-wide mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight animate-fade-in">
            Alt du trenger å vite om <span className="text-hair-700">hår</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed animate-fade-in-delay-1">
            Norges mest komplette kunnskapsportal om hår. Ekspertguider om hårstell, farging, hårvekst, frisyrer og hårproblemer.
          </p>
          <div className="mt-8">
            <SearchComponent articles={allArticles} />
          </div>
          <p className="mt-4 text-xs text-hair-400">{allArticles.length} artikler fordelt på {categories.length} kategorier</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-wide mx-auto px-4 sm:px-6 py-14">
        <h2 className="font-display text-2xl font-semibold text-ink mb-6">Utforsk kategorier</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(cat => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section className="max-w-wide mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Populære artikler</h2>
          <Link href="/kategori/kunnskap/" className="text-sm text-hair-600 hover:text-ink transition-colors">
            Se alle {allArticles.length} artikler →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* About section for E-E-A-T */}
      <section className="border-t border-border">
        <div className="max-w-article mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Om Hår.com</h2>
          <p className="text-sm text-muted leading-relaxed">
            Hår.com er en uavhengig norsk kunnskapsportal dedikert til å gi deg pålitelig informasjon om hår. 
            Vi dekker alt fra grunnleggende hårvitenskap til praktiske guider om stell, farging og frisyrer. 
            Innholdet vårt er basert på forskning og anerkjente kilder, og er skrevet for å være tilgjengelig for alle.
          </p>
        </div>
      </section>
    </>
  )
}
