export const siteConfig = {
  name: 'Hår.com',
  domain: 'hår.com',
  url: 'https://xn--hr-eka.com',
  tagline: 'Norges kunnskapsportal om hår',
  description: 'Alt du trenger å vite om hår. Ekspertguider om hårstell, hårfarging, hårvekst, frisyrer og hårproblemer. Norges mest komplette hårkunnskap.',
  ogImage: '/og-image.jpg',
}

export interface Article {
  slug: string
  title: string
  shortAnswer: string
  category: string
  categorySlug: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  content: string
  faq: { q: string; a: string }[]
  relatedSlugs: string[]
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  articleCount: number
}

export const categories: Category[] = [
  { slug: 'farging', name: 'Hårfarging', description: 'Alt om hårfarging hjemme, striping, blondering og fargefjerning. Guider for alle nivåer.', icon: 'farging', articleCount: 7 },
  { slug: 'hartap', name: 'Hårtap', description: 'Forstå hvorfor du mister hår, og hva du kan gjøre med det. Årsaker, vitaminer og løsninger.', icon: 'hartap', articleCount: 6 },
  { slug: 'harvekst', name: 'Hårvekst', description: 'Hvor fort vokser hår? Hvordan få tykkere, lengre hår? Alt om hårvekst og hva som påvirker den.', icon: 'harvekst', articleCount: 7 },
  { slug: 'stell', name: 'Hårstell', description: 'Shampoo, balsam, styling og klipping. Praktiske guider for sunn og pen hårpleie.', icon: 'stell', articleCount: 8 },
  { slug: 'frisyrer', name: 'Frisyrer', description: 'Inspirasjon og guider for kort hår, langt hår, trender og tidløse hårklipp for kvinner og menn.', icon: 'frisyrer', articleCount: 8 },
  { slug: 'problemer', name: 'Hårproblemer', description: 'Lus, flass, fett hår, tørt hår og andre vanlige hårproblemer. Årsaker og behandling.', icon: 'problemer', articleCount: 6 },
  { slug: 'harfjerning', name: 'Hårfjerning', description: 'Laser, IPL, voksing og andre metoder for å fjerne uønsket kroppshår.', icon: 'harfjerning', articleCount: 4 },
  { slug: 'kunnskap', name: 'Hårkunnskap', description: 'Hårtyper, hårvitenskap og grunnleggende kunnskap om hår. Forstå håret ditt bedre.', icon: 'kunnskap', articleCount: 6 },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
