'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  text: string
  id: string
  level: number
}

export function ArticleSidebar({ tocItems }: { tocItems: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  if (tocItems.length < 3) return null

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <nav aria-label="Innholdsfortegnelse">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
            Innhold
          </div>
          <ol className="space-y-0.5 border-l border-border">
            {tocItems.map((h, i) => {
              const isActive = activeId === h.id
              const isSection = h.level === 2
              const isLesOgsa = h.id === 'les-ogsa'
              const isFaqQuestion = h.level === 3 && h.id.startsWith('faq-')

              return (
                <li key={i}>
                  <a
                    href={`#${h.id}`}
                    className={`block transition-colors ${
                      isLesOgsa
                        ? `text-xs font-semibold pl-3 py-1.5 border-l-2 -ml-px ${
                            isActive
                              ? 'border-green-600 text-green-800'
                              : 'border-green-400 text-green-700 hover:text-green-900'
                          }`
                        : isSection
                          ? `text-xs font-medium pl-3 py-1.5 border-l-2 -ml-px ${
                              isActive
                                ? 'border-hair-600 text-ink'
                                : 'border-transparent text-muted hover:text-ink hover:border-hair-300'
                            }`
                          : `text-xs pl-6 py-1 ${
                              isActive
                                ? 'text-hair-800'
                                : 'text-hair-400 hover:text-hair-700'
                            }`
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </aside>
  )
}
