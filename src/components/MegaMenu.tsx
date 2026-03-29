'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { categoryIcons, logoSvg } from './Icons'
import { categories } from '@/data/config'
import { getArticlesByCategory } from '@/data/index'

interface MenuCategory {
  slug: string
  name: string
  articles: { title: string; slug: string }[]
}

const menuData: MenuCategory[] = categories.map(cat => ({
  slug: cat.slug,
  name: cat.name,
  articles: getArticlesByCategory(cat.slug).map(a => ({ title: a.title, slug: a.slug })),
}))

export function MegaMenu() {
  const [active, setActive] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function handleEnter(slug: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActive(slug)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setActive(null), 200)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setActive(null); setMobileOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const activeCat = menuData.find(m => m.slug === active)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-wide mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-hair-700 flex items-center justify-center flex-shrink-0">
            <span className="text-white [&>svg]:w-4 [&>svg]:h-4" dangerouslySetInnerHTML={{ __html: logoSvg }} />
          </div>
          <span className="font-display text-xl font-semibold text-ink group-hover:text-hair-700 transition-colors">
            hår<span className="text-hair-600">.com</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menuData.map(item => (
            <div
              key={item.slug}
              onMouseEnter={() => handleEnter(item.slug)}
              onMouseLeave={handleLeave}
            >
              <Link
                href={`/kategori/${item.slug}/`}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  active === item.slug
                    ? 'text-ink bg-sand'
                    : 'text-muted hover:text-ink hover:bg-sand/50'
                }`}
              >
                <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 text-hair-500" dangerouslySetInnerHTML={{ __html: categoryIcons[item.slug] || '' }} />
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted" aria-label="Meny">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>

      {/* Mega dropdown */}
      {activeCat && (
        <div
          className="hidden md:block absolute left-0 right-0 bg-white border-b border-border shadow-lg z-40"
          onMouseEnter={() => handleEnter(activeCat.slug)}
          onMouseLeave={handleLeave}
        >
          <div className="max-w-wide mx-auto px-6 py-6">
            <div className="flex gap-8">
              {/* Article links - 2 columns */}
              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1">
                {activeCat.articles.map(a => (
                  <Link
                    key={a.slug}
                    href={`/${a.slug}/`}
                    onClick={() => setActive(null)}
                    className="flex items-center gap-2 py-2 text-sm text-muted hover:text-ink transition-colors group"
                  >
                    <span className="text-hair-300 group-hover:text-hair-500 transition-colors">→</span>
                    <span className="line-clamp-1">{a.title}</span>
                  </Link>
                ))}
              </div>

              {/* Featured box */}
              <div className="w-56 flex-shrink-0 rounded-lg bg-sand/60 p-4">
                <div className="text-xs font-medium text-hair-500 uppercase tracking-wider mb-2">Anbefalt</div>
                <Link
                  href={`/${activeCat.articles[0]?.slug}/`}
                  onClick={() => setActive(null)}
                  className="block group"
                >
                  <div className="text-sm font-medium text-ink group-hover:text-hair-700 transition-colors leading-snug">
                    {activeCat.articles[0]?.title}
                  </div>
                  <span className="mt-2 inline-block text-xs text-hair-600 group-hover:text-hair-800 transition-colors">
                    Les artikkelen →
                  </span>
                </Link>
              </div>
            </div>

            {/* Category link */}
            <div className="mt-4 pt-3 border-t border-border">
              <Link
                href={`/kategori/${activeCat.slug}/`}
                onClick={() => setActive(null)}
                className="text-xs font-medium text-hair-600 hover:text-ink transition-colors"
              >
                Se alle {activeCat.articles.length} artikler i {activeCat.name} →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {menuData.map(item => (
            <div key={item.slug}>
              <Link
                href={`/kategori/${item.slug}/`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 text-sm font-medium text-ink"
              >
                <span className="[&>svg]:w-4 [&>svg]:h-4 text-hair-500" dangerouslySetInnerHTML={{ __html: categoryIcons[item.slug] || '' }} />
                {item.name}
              </Link>
              <div className="pl-7 space-y-0.5 mb-2">
                {item.articles.slice(0, 4).map(a => (
                  <Link
                    key={a.slug}
                    href={`/${a.slug}/`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 text-xs text-muted hover:text-ink transition-colors"
                  >
                    {a.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-border space-y-2">
            <Link href="/om-oss/" onClick={() => setMobileOpen(false)} className="block py-1 text-sm text-muted hover:text-ink">Om oss</Link>
            <Link href="/personvern/" onClick={() => setMobileOpen(false)} className="block py-1 text-sm text-muted hover:text-ink">Personvern</Link>
          </div>
        </div>
      )}
    </header>
  )
}
