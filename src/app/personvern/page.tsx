import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/data/config'

export const metadata: Metadata = {
  title: 'Personvern',
  description: 'Personvernerklæring for Hår.com. Les om hvordan vi behandler informasjonskapsler og anonyme data.',
  alternates: { canonical: `${siteConfig.url}/personvern/` },
  robots: { index: false, follow: true },
}

export default function PersonvernPage() {
  return (
    <div className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink mb-8">Personvernerklæring</h1>

      <div className="prose-custom space-y-6 text-sm text-hair-900/80 leading-relaxed">
        <p>
          Denne personvernerklæringen beskriver hvordan Hår.com samler inn og bruker informasjon
          når du besøker nettsiden vår.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-8 mb-3">Hvem er vi?</h2>
        <p>
          Hår.com er en norsk kunnskapsportal om hår, drevet av IT-Firma.no.
          Nettsiden tilbyr redaksjonelt innhold om hårstell, hårfarging, hårvekst, frisyrer
          og hårproblemer. Vi selger ingen produkter og samler ikke inn personopplysninger.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-8 mb-3">Informasjonskapsler (cookies)</h2>
        <p>
          Vi bruker Google Analytics 4 for å forstå hvordan besøkende bruker nettsiden.
          Google Analytics bruker informasjonskapsler for å samle inn anonym bruksstatistikk
          som sidevisninger, tid på siden og hvilke sider som er mest besøkt.
        </p>
        <p>
          Vi har implementert Google Consent Mode, som betyr at ingen analysecookies
          settes før du aktivt godtar dette via cookie-banneret. Hvis du avslår,
          brukes ingen informasjonskapsler.
        </p>
        <p>
          Vi bruker i tillegg en lokal informasjonskapsel (haar-cookie-consent) for å
          huske ditt samtykkevalg. Denne inneholder ingen personlig informasjon.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-8 mb-3">Hvilke data samles inn?</h2>
        <p>
          Når du godtar informasjonskapsler, samler Google Analytics inn anonymiserte data som
          hvilke sider du besøker, hvor lenge du er på siden, hvilken enhet og nettleser du bruker,
          og hvilket land du besøker fra (ikke nøyaktig lokasjon). IP-adressen din anonymiseres
          automatisk av Google Analytics 4.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-8 mb-3">Tredjeparter</h2>
        <p>
          Vi deler ikke data med tredjeparter utover Google Analytics for trafikkanalyse.
          Vi bruker Google Fonts for typografi, som lastes direkte fra Googles servere.
          Vi har ingen annonser, sporing fra sosiale medier, eller affiliate-lenker.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-8 mb-3">Dine rettigheter</h2>
        <p>
          Du kan når som helst slette informasjonskapsler i nettleseren din. Du kan også
          blokkere informasjonskapsler i nettleserinnstillingene. Etter GDPR har du rett til
          innsyn, retting og sletting av personopplysninger. Siden vi ikke samler inn
          personopplysninger, er dette i praksis ikke relevant for denne nettsiden.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-8 mb-3">Kontakt</h2>
        <p>
          Spørsmål om personvern kan rettes til post@it-firma.no.
        </p>

        <p className="text-xs text-muted mt-10">Sist oppdatert: mars 2026</p>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm text-hair-600 hover:text-ink transition-colors">
          ← Tilbake til forsiden
        </Link>
      </div>
    </div>
  )
}
