import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Haftungsausschluss',
  description: 'Haftungsausschluss und rechtliche Hinweise - UmrechnerPro.de',
  robots: { index: true, follow: true },
};

export default function HaftungsausschlussPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Haftungsausschluss</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Haftung für Inhalte</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist 
              jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. 
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte 
              umgehend entfernen.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Haftung für Links</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir 
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p>
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne 
              konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Urheberrecht</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
              Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden 
              die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche 
              gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam 
              werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von 
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Ausschluss der Gewährleistung</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Die auf dieser Website bereitgestellten Umrechner, Rechner und Informationen dienen 
              ausschließlich allgemeinen Informationszwecken. Obwohl wir uns bemühen, genaue und 
              aktuelle Informationen bereitzustellen, übernehmen wir keine Gewähr für die 
              Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Inhalte.
            </p>
            <p>
              Insbesondere weisen wir darauf hin, dass:
            </p>
            <ul>
              <li>
                Alle Berechnungsergebnisse ohne Gewähr sind und nicht als alleinige Grundlage 
                für wichtige Entscheidungen verwendet werden sollten
              </li>
              <li>
                Für finanzielle, medizinische oder andere wichtige Entscheidungen qualifizierte 
                Fachleute konsultiert werden sollten
              </li>
              <li>
                Umrechnungsformeln wissenschaftlichen Standards entsprechen, aber Rundungsunterschiede 
                auftreten können
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Affiliate-Links und Werbung</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Diese Website enthält Affiliate-Links und Werbeanzeigen. Wenn Sie über diese Links 
              Produkte oder Dienstleistungen erwerben, erhalten wir möglicherweise eine Provision. 
              Für Sie entstehen dadurch keine zusätzlichen Kosten.
            </p>
            <p>
              Wir kennzeichnen Werbung und gesponserte Inhalte deutlich gemäß den geltenden 
              Werberichtlinien.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Keine Finanzberatung</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Die auf dieser Website bereitgestellten Finanzrechner (z.B. Zinsrechner, 
              Kreditrechner, Mehrwertsteuerrechner) dienen nur zu Informationszwecken und 
              stellen keine Finanzberatung dar.
            </p>
            <p>
              Für individuelle Finanzentscheidungen sollten Sie sich von qualifizierten 
              Finanzberatern oder Steuerberatern beraten lassen. Die Ergebnisse unserer 
              Rechner können von den tatsächlichen Konditionen Ihrer Bank oder anderer 
              Finanzdienstleister abweichen.
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/impressum" className="hover:text-primary">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-primary">Datenschutz</Link>
            <Link href="/nutzungsbedingungen" className="hover:text-primary">Nutzungsbedingungen</Link>
            <Link href="/" className="hover:text-primary">Zur Startseite</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
