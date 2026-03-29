'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Article, Category } from '@/data/config'
import { categoryIcons, logoSvg } from './Icons'

/* ═══════ HEADER ═══════ */
export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-wide mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-hair-700 flex items-center justify-center flex-shrink-0">
            <span className="text-white [&>svg]:w-4 [&>svg]:h-4" dangerouslySetInnerHTML={{ __html: logoSvg }} />
          </div>
          <span className="font-display text-xl font-semibold text-ink group-hover:text-hair-700 transition-colors">
            hår<span className="text-hair-600">.com</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted hover:text-ink transition-colors">Hjem</Link>
          <Link href="/kategori/farging/" className="text-sm text-muted hover:text-ink transition-colors">Farging</Link>
          <Link href="/kategori/hartap/" className="text-sm text-muted hover:text-ink transition-colors">Hårtap</Link>
          <Link href="/kategori/harvekst/" className="text-sm text-muted hover:text-ink transition-colors">Hårvekst</Link>
          <Link href="/kategori/stell/" className="text-sm text-muted hover:text-ink transition-colors">Stell</Link>
          <Link href="/kategori/frisyrer/" className="text-sm text-muted hover:text-ink transition-colors">Frisyrer</Link>
          <Link href="/kategori/problemer/" className="text-sm text-muted hover:text-ink transition-colors">Problemer</Link>
          <Link href="/kategori/kunnskap/" className="text-sm text-muted hover:text-ink transition-colors">Kunnskap</Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-muted" aria-label="Meny">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-cream px-4 py-4 space-y-3">
          {[
            ['/', 'Hjem'], ['/kategori/farging/', 'Farging'], ['/kategori/hartap/', 'Hårtap'],
            ['/kategori/harvekst/', 'Hårvekst'], ['/kategori/stell/', 'Stell'], ['/kategori/frisyrer/', 'Frisyrer'],
            ['/kategori/problemer/', 'Problemer'], ['/kategori/kunnskap/', 'Kunnskap'],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="block text-sm text-muted hover:text-ink transition-colors">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

/* ═══════ FOOTER ═══════ */
export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-wide mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-display font-semibold text-sm text-ink mb-3">Hårfarging</h4>
            <div className="space-y-2">
              <Link href="/hvordan-farge-haret-hjemme/" className="block text-xs text-muted hover:text-ink transition-colors">Farge håret hjemme</Link>
              <Link href="/fra-morkt-til-lyst-har/" className="block text-xs text-muted hover:text-ink transition-colors">Fra mørkt til lyst</Link>
              <Link href="/blonde-har/" className="block text-xs text-muted hover:text-ink transition-colors">Blonde hår</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-ink mb-3">Hårvekst</h4>
            <div className="space-y-2">
              <Link href="/hvor-fort-vokser-har/" className="block text-xs text-muted hover:text-ink transition-colors">Hvor fort vokser hår</Link>
              <Link href="/hvordan-fa-tykkere-har/" className="block text-xs text-muted hover:text-ink transition-colors">Tykkere hår</Link>
              <Link href="/spare-til-langt-har/" className="block text-xs text-muted hover:text-ink transition-colors">Spare til langt hår</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-ink mb-3">Frisyrer</h4>
            <div className="space-y-2">
              <Link href="/kort-har-dame/" className="block text-xs text-muted hover:text-ink transition-colors">Kort hår dame</Link>
              <Link href="/kort-har-menn/" className="block text-xs text-muted hover:text-ink transition-colors">Kort hår menn</Link>
              <Link href="/frisyrer-tynt-har-kvinner/" className="block text-xs text-muted hover:text-ink transition-colors">Frisyrer tynt hår</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-ink mb-3">Kunnskap</h4>
            <div className="space-y-2">
              <Link href="/har-guide/" className="block text-xs text-muted hover:text-ink transition-colors">Alt om hår</Link>
              <Link href="/hartyper/" className="block text-xs text-muted hover:text-ink transition-colors">Hårtyper</Link>
              <Link href="/gratt-har/" className="block text-xs text-muted hover:text-ink transition-colors">Grått hår</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Hår.com — Norges kunnskapsportal om hår</p>
          <div className="flex items-center gap-4">
            <Link href="/om-oss/" className="text-xs text-muted hover:text-ink transition-colors">Om oss</Link>
            <Link href="/personvern/" className="text-xs text-muted hover:text-ink transition-colors">Personvern</Link>
            <span className="text-xs text-muted">Innholdet er kun til informasjonsformål.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════ BREADCRUMBS ═══════ */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Brødsmuler" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-hair-300">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink transition-colors">{item.label}</Link>
            ) : (
              <span className="text-hair-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ═══════ FAQ ACCORDION ═══════ */
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  if (!items.length) return null

  return (
    <section className="mt-12" id="faq">
      <h2 className="text-2xl font-display font-semibold text-ink mb-6">Vanlige spørsmål</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden" id={`faq-${i}`}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-sand/50 transition-colors"
            >
              <span className="font-medium text-sm text-ink pr-4">{item.q}</span>
              <svg
                className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-4">
                <p className="text-sm text-hair-900/70 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════ TABLE OF CONTENTS ═══════ */
export function TableOfContents({ content, faq }: { content: string; faq: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(false)
  const headings: { text: string; id: string; level: number }[] = []

  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/g
  let match
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '')
    const id = text.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ text, id, level: parseInt(match[1]) })
  }

  if (faq.length) {
    headings.push({ text: 'Vanlige spørsmål', id: 'faq', level: 2 })
  }

  if (headings.length < 3) return null

  return (
    <div className="mb-8 border border-border rounded-lg bg-sand/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-sm font-medium text-ink">Innhold</span>
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 space-y-1.5">
          {headings.map((h, i) => (
            <a
              key={i}
              href={`#${h.id}`}
              className={`block text-xs text-muted hover:text-ink transition-colors ${h.level === 3 ? 'pl-4' : ''}`}
            >
              {h.text}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════ ARTICLE CARD ═══════ */
export function ArticleCard({ article }: { article: Article }) {
  const readTime = Math.max(2, Math.ceil(article.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))
  return (
    <Link href={`/${article.slug}/`} className="group block">
      <article className="p-5 rounded-lg border border-border bg-white hover:border-hair-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-hair-500 font-medium">{article.category}</span>
          <span className="text-xs text-hair-400">{readTime} min</span>
        </div>
        <h3 className="mt-1.5 font-display font-semibold text-ink text-base group-hover:text-hair-700 transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-2">
          {article.shortAnswer}
        </p>
      </article>
    </Link>
  )
}

/* ═══════ CATEGORY CARD ═══════ */
export function CategoryCard({ category }: { category: Category }) {
  const iconHtml = categoryIcons[category.slug] || ''
  return (
    <Link href={`/kategori/${category.slug}/`} className="group block">
      <div className="p-5 rounded-lg border border-border bg-white hover:border-hair-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-hair-100 flex items-center justify-center flex-shrink-0 text-hair-700 [&>svg]:w-5 [&>svg]:h-5" dangerouslySetInnerHTML={{ __html: iconHtml }} />
          <div>
            <h3 className="font-display font-semibold text-ink text-base group-hover:text-hair-700 transition-colors">
              {category.name}
            </h3>
            <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">{category.description}</p>
            <span className="mt-2 inline-block text-xs text-hair-600">{category.articleCount} artikler</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ═══════ RELATED LINKS ═══════ */
export function RelatedLinks({ articles }: { articles: Article[] }) {
  if (!articles.length) return null
  return (
    <section className="mt-12 pt-8 border-t border-border" id="les-ogsa">
      <h2 className="text-lg font-display font-semibold text-ink mb-4">Les også</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {articles.map(a => (
          <Link
            key={a.slug}
            href={`/${a.slug}/`}
            className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-hair-300 hover:bg-sand/30 transition-all group"
          >
            <span className="text-hair-400 mt-0.5 text-sm">→</span>
            <div>
              <span className="text-sm font-medium text-ink group-hover:text-hair-700 transition-colors">{a.title}</span>
              <span className="block text-xs text-muted mt-0.5">{a.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ═══════ SEARCH ═══════ */
const popularSearches = [
  { label: 'Hvordan farge håret hjemme', slug: 'hvordan-farge-haret-hjemme' },
  { label: 'Tynt hår menn', slug: 'tynt-har-menn' },
  { label: 'Hvor fort vokser hår?', slug: 'hvor-fort-vokser-har' },
  { label: 'Shampoo for fett hår', slug: 'shampoo-balsam-fett-har' },
  { label: 'Kort hår dame', slug: 'kort-har-dame' },
  { label: 'Lus i håret', slug: 'lus-i-haret' },
]

export function SearchComponent({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const q = query.toLowerCase()
    const found = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.shortAnswer.toLowerCase().includes(q) ||
      a.keywords.some(k => k.toLowerCase().includes(q))
    ).slice(0, 6)
    setResults(found)
  }, [query, articles])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const showPopular = focused && query.length < 2 && results.length === 0

  return (
    <div ref={ref} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Søk i artikler..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-sm text-ink placeholder:text-hair-400 focus:outline-none focus:border-hair-400 focus:ring-1 focus:ring-hair-200 transition-all"
        />
      </div>
      {/* Popular suggestions when empty */}
      {showPopular && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 border-b border-border">
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Populære søk</span>
          </div>
          {popularSearches.map(s => (
            <Link
              key={s.slug}
              href={`/${s.slug}/`}
              onClick={() => { setFocused(false); setQuery('') }}
              className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand/50 transition-colors border-b border-border last:border-0"
            >
              <svg className="w-3.5 h-3.5 text-hair-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              <span className="text-sm text-ink">{s.label}</span>
            </Link>
          ))}
        </div>
      )}
      {/* Search results */}
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
          {results.map(a => (
            <Link
              key={a.slug}
              href={`/${a.slug}/`}
              onClick={() => { setFocused(false); setQuery('') }}
              className="block px-4 py-3 hover:bg-sand/50 transition-colors border-b border-border last:border-0"
            >
              <span className="text-sm font-medium text-ink">{a.title}</span>
              <span className="block text-xs text-muted mt-0.5">{a.category}</span>
            </Link>
          ))}
        </div>
      )}
      {/* No results */}
      {focused && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-6 text-center">
            <p className="text-sm text-muted">Ingen resultater for "{query}"</p>
            <p className="text-xs text-hair-400 mt-1">Prøv et annet søkeord</p>
          </div>
        </div>
      )}
    </div>
  )
}
