'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('haar-cookie-consent')
    if (!consent) {
      setShow(true)
    } else if (consent === 'accepted') {
      grantConsent()
    }
  }, [])

  function grantConsent() {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  function accept() {
    localStorage.setItem('haar-cookie-consent', 'accepted')
    grantConsent()
    setShow(false)
  }

  function decline() {
    localStorage.setItem('haar-cookie-consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm border-t border-hair-800 px-4 sm:px-6 py-4">
      <div className="max-w-wide mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-hair-200 leading-relaxed max-w-2xl">
          Vi bruker informasjonskapsler for å analysere trafikk og forbedre innholdet.
          Ingen personlig informasjon samles inn.{' '}
          <Link href="/personvern/" className="underline text-hair-300 hover:text-white transition-colors">
            Les mer
          </Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={accept}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-hair-700 hover:bg-hair-600 transition-colors"
          >
            Godta
          </button>
          <button
            onClick={decline}
            className="px-5 py-2 rounded-lg text-sm font-medium text-hair-300 border border-hair-600 hover:bg-hair-800 transition-colors"
          >
            Avslå
          </button>
        </div>
      </div>
    </div>
  )
}
