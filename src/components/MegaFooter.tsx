import Link from 'next/link'
import { categories } from '@/data/config'
import { getArticlesByCategory } from '@/data/index'
import { logoSvg, categoryIcons } from './Icons'

export function MegaFooter() {
  return (
    <footer className="border-t border-border mt-20 bg-sand/40">
      <div className="max-w-wide mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-hair-700 flex items-center justify-center flex-shrink-0">
                <span className="text-white [&>svg]:w-4 [&>svg]:h-4" dangerouslySetInnerHTML={{ __html: logoSvg }} />
              </div>
              <span className="font-display text-xl font-semibold text-ink">
                hår<span className="text-hair-600">.com</span>
              </span>
            </Link>
            <p className="text-xs text-muted leading-relaxed mb-5">
              Norges kunnskapsportal om hår. Uavhengig informasjon om hårstell, farging, hårvekst, frisyrer og hårproblemer.
            </p>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">Om</h4>
              <Link href="/om-oss/" className="block text-xs text-muted hover:text-ink transition-colors">Om Hår.com</Link>
              <Link href="/personvern/" className="block text-xs text-muted hover:text-ink transition-colors">Personvern</Link>
            </div>
          </div>

          {/* Category columns - show top articles per category */}
          {[
            ['farging', 'hartap'],
            ['harvekst', 'stell'],
            ['frisyrer', 'problemer'],
            ['harfjerning', 'kunnskap'],
          ].map((pair, i) => (
            <div key={i} className="space-y-6">
              {pair.map(slug => {
                const cat = categories.find(c => c.slug === slug)
                if (!cat) return null
                const articles = getArticlesByCategory(slug).slice(0, 4)
                return (
                  <div key={slug}>
                    <Link
                      href={`/kategori/${slug}/`}
                      className="flex items-center gap-1.5 mb-2 group"
                    >
                      <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 text-hair-500" dangerouslySetInnerHTML={{ __html: categoryIcons[slug] || '' }} />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink group-hover:text-hair-700 transition-colors">
                        {cat.name}
                      </h4>
                    </Link>
                    <ul className="space-y-1.5">
                      {articles.map(a => (
                        <li key={a.slug}>
                          <Link href={`/${a.slug}/`} className="text-xs text-muted hover:text-ink transition-colors line-clamp-1">
                            {a.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="max-w-wide mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} hår.com — Innholdet er kun til informasjonsformål og erstatter ikke profesjonell rådgivning.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <Link href="/om-oss/" className="hover:text-ink transition-colors">Om oss</Link>
            <Link href="/personvern/" className="hover:text-ink transition-colors">Personvern</Link>
            <a href="https://it-firma.no" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">IT-Firma.no</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
