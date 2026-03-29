import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig, categories } from '@/data/config'
import { allArticles } from '@/data/index'

export const metadata: Metadata = {
  title: 'Om Hår.com',
  description: 'Hår.com er en uavhengig norsk kunnskapsportal om hår. Les om hvem vi er, vårt redaksjonelle arbeid og våre prinsipper.',
  alternates: { canonical: `${siteConfig.url}/om-oss/` },
}

export default function OmOssPage() {
  return (
    <div className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink mb-8">Om Hår.com</h1>

      <div className="space-y-6 text-sm text-hair-900/80 leading-relaxed">
        <p className="text-base">
          Hår.com er Norges kunnskapsportal om hår. Vi gir deg pålitelig, forskningsbasert informasjon
          om alt fra hårstell og hårfarging til hårvekst, frisyrer og hårproblemer.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-3">Vår misjon</h2>
        <p>
          Vi tror at god informasjon om hår skal være tilgjengelig for alle. Altfor ofte er hårrelatert
          innhold på norsk enten overfladisk, reklamedrevet eller basert på myter. Hår.com er bygget
          for å fylle dette gapet med grundig, nøytral og forskningsbasert kunnskap.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-3">Hva vi dekker</h2>
        <p>
          Portalen dekker {categories.length} hovedkategorier med totalt {allArticles.length} artikler.
          Hver artikkel er skrevet for å gi deg et klart, konkret svar med dybde og nyanser.
          Vi dekker hårfarging og fargeteknikker, hårtap og årsaker, hårvekst og optimalisering,
          praktisk hårstell, frisyretrender og inspirasjon, vanlige hårproblemer, hårfjerningsmetoder,
          og grunnleggende hårvitenskap.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-3">Våre redaksjonelle prinsipper</h2>
        <p>
          Alt innhold på Hår.com er basert på anerkjent forskning, medisinske kilder og fagkunnskap.
          Vi refererer til publiserte studier der det er relevant. Vi har ingen affiliate-lenker,
          produktsalg eller sponset innhold. Informasjonen er nøytral og uavhengig. Vi oppdaterer
          artikler jevnlig for å sikre at innholdet er aktuelt og korrekt.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-3">Viktig forbehold</h2>
        <p>
          Innholdet på Hår.com er utelukkende til informasjonsformål og erstatter ikke profesjonell
          medisinsk rådgivning. Hvis du opplever uvanlig hårtap, hudproblemer i hodebunnen eller andre
          helserelaterte bekymringer, bør du oppsøke lege eller hudlege. Vi anbefaler alltid å
          konsultere en fagperson for individuelle helse- og behandlingsspørsmål.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-3">Hvem står bak?</h2>
        <p>
          Hår.com drives av IT-Firma.no, et norsk digitalt selskap som bygger og drifter
          kunnskapsportaler innen ulike nisjer. Vi har lang erfaring med å produsere
          kvalitetsinnhold for norske lesere.
        </p>

        <h2 className="text-xl font-display font-semibold text-ink mt-10 mb-3">Kontakt</h2>
        <p>
          Har du spørsmål, tilbakemeldinger eller forslag til nye artikler? Ta gjerne kontakt
          på post@it-firma.no. Vi setter pris på alle henvendelser.
        </p>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm text-hair-600 hover:text-ink transition-colors">
          ← Tilbake til forsiden
        </Link>
      </div>
    </div>
  )
}
