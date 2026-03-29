import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-article mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-bold text-ink">404</h1>
      <p className="mt-3 text-muted">Denne siden finnes ikke.</p>
      <Link href="/" className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-hair-700 text-white text-sm font-medium hover:bg-hair-800 transition-colors">
        Tilbake til forsiden
      </Link>
    </div>
  )
}
