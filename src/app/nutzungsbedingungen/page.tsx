import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen',
  description: 'Nutzungsbedingungen für UmrechnerPro.de',
  robots: { index: true, follow: true },
};

export default function NutzungsbedingungenPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Nutzungsbedingungen</h1>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="lead">
            Durch die Nutzung von UmrechnerPro.de stimmen Sie den folgenden Nutzungsbedingungen zu. 
            Bitte lesen Sie diese sorgfältig durch.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">1. Geltungsbereich</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Diese Nutzungsbedingungen gelten für die Website UmrechnerPro.de und alle damit 
              verbundenen Dienste. Mit dem Zugriff auf unsere Website erklären Sie sich mit 
              diesen Nutzungsbedingungen einverstanden.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">2. Nutzung der Dienste</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h4 className="font-semibold">2.1 Erlaubte Nutzung</h4>
            <p>
              Die Nutzung unserer Umrechner und Rechner ist für private und kommerzielle Zwecke 
              kostenlos gestattet, solange:
            </p>
            <ul>
              <li>Die Nutzung nicht gegen geltendes Recht verstößt</li>
              <li>Keine automatisierten Abfragen (Bots, Scraper) ohne unsere Zustimmung erfolgen</li>
              <li>Die Dienste nicht missbräuchlich verwendet werden</li>
              <li>Keine Urheberrechte verletzt werden</li>
            </ul>

            <h4 className="font-semibold mt-6">2.2 Untersagte Nutzung</h4>
            <p>Es ist untersagt:</p>
            <ul>
              <li>Die Website für rechtswidrige Zwecke zu nutzen</li>
              <li>Die Website zu überlasten oder ihre Funktionsfähigkeit zu beeinträchtigen</li>
              <li>Inhalte ohne Genehmigung zu kopieren oder zu verbreiten</li>
              <li>Die Website in einer Weise zu nutzen, die Dritte schädigt</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">3. Haftung</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Die Nutzung unserer Dienste erfolgt auf eigene Verantwortung. Wir übernehmen keine 
              Haftung für:
            </p>
            <ul>
              <li>Die Richtigkeit und Vollständigkeit der Berechnungsergebnisse</li>
              <li>Schäden, die durch die Nutzung unserer Dienste entstehen</li>
              <li>Die Verfügbarkeit der Website</li>
              <li>Datenverluste oder technische Störungen</li>
            </ul>
            <p>
              Insbesondere sind wir nicht haftbar für finanzielle Entscheidungen, die auf 
              Grundlage unserer Rechner getroffen wurden. Für wichtige Entscheidungen sollten 
              Sie stets qualifizierte Fachleute konsultieren.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">4. Geistiges Eigentum</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Alle Inhalte auf UmrechnerPro.de, einschließlich Texte, Grafiken, Logos, Icons 
              und Software, sind urheberrechtlich geschützt. Die Vervielfältigung, Verbreitung 
              oder Veränderung ohne unsere schriftliche Genehmigung ist untersagt.
            </p>
            <p>
              Sie dürfen Inhalte für den privaten Gebrauch herunterladen und ausdrucken. 
              Eine kommerzielle Nutzung bedarf unserer ausdrücklichen Zustimmung.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">5. Externe Links</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Unsere Website enthält Links zu externen Websites. Für deren Inhalte übernehmen 
              wir keine Haftung. Zum Zeitpunkt der Verlinkung wurden die externen Websites 
              auf mögliche Rechtsverstöße überprüft; es waren keine solchen erkennbar.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">6. Änderungen</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Wir behalten uns vor, diese Nutzungsbedingungen jederzeit zu ändern. Die aktuelle 
              Version ist auf dieser Website jederzeit einsehbar. Mit der fortgesetzten Nutzung 
              unserer Dienste nach Änderung der Bedingungen stimmen Sie den geänderten 
              Bedingungen zu.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">7. Anwendbares Recht</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist 
              der Sitz des Betreibers, sofern Sie Unternehmer sind oder keinen allgemeinen 
              Gerichtsstand in Deutschland haben.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">8. Kontakt</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Bei Fragen zu diesen Nutzungsbedingungen erreichen Sie uns unter:
            </p>
            <p>
              E-Mail: kontakt@umrechnerpro.de
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/impressum" className="hover:text-primary">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-primary">Datenschutz</Link>
            <Link href="/haftungsausschluss" className="hover:text-primary">Haftungsausschluss</Link>
            <Link href="/" className="hover:text-primary">Zur Startseite</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
