import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung gemäß DSGVO - UmrechnerPro.de',
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. 
            Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen 
            (DSGVO, TKG 2003). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten 
            Aspekte der Datenverarbeitung im Rahmen unserer Website.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">1. Verantwortlicher</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              UmrechnerPro<br />
              [Name des Betreibers]<br />
              [Adresse]<br />
              E-Mail: kontakt@umrechnerpro.de
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">2. Erhebung und Speicherung personenbezogener Daten</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h4 className="font-semibold">2.1 Beim Besuch der Website</h4>
            <p>
              Bei jedem Zugriff auf unsere Website werden automatisch folgende Daten erhoben:
            </p>
            <ul>
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
              <li>Verwendeter Browser und ggf. das Betriebssystem</li>
              <li>Name Ihres Access-Providers</li>
            </ul>
            <p>
              Diese Daten werden ausschließlich zur Sicherstellung eines störungsfreien Betriebs der Website 
              sowie zur Verbesserung unseres Angebots ausgewertet. Eine Zuordnung dieser Daten zu einer 
              bestimmten Person ist nicht möglich.
            </p>

            <h4 className="font-semibold mt-6">2.2 Bei Nutzung unserer Dienste</h4>
            <p>
              Unsere Umrechner und Rechner funktionieren vollständig ohne Registrierung. 
              Wir speichern keine eingegebenen Werte oder Berechnungen auf unseren Servern. 
              Alle Berechnungen erfolgen ausschließlich in Ihrem Browser (clientseitig).
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">3. Cookies</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät 
              gespeichert werden und die Ihr Browser speichert.
            </p>

            <h4 className="font-semibold mt-4">3.1 Technisch notwendige Cookies</h4>
            <p>
              Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert 
              werden. Sie speichern:
            </p>
            <ul>
              <li>Ihre Cookie-Präferenzen (Consent-Status)</li>
              <li>Ihre Theme-Einstellung (Hell/Dunkel)</li>
              <li>Ihre Favoriten (lokal im Browser)</li>
              <li>Ihren Umrechnungsverlauf (lokal im Browser)</li>
            </ul>

            <h4 className="font-semibold mt-4">3.2 Statistik-Cookies (Google Analytics)</h4>
            <p>
              Mit Ihrer Einwilligung verwenden wir Google Analytics, um die Nutzung unserer Website 
              zu analysieren. Google Analytics verwendet Cookies, die eine Analyse der Benutzung 
              der Website durch Sie ermöglichen.
            </p>
            <p>
              <strong>Wichtige Datenschutzmaßnahmen:</strong>
            </p>
            <ul>
              <li>IP-Anonymisierung: Wir haben die Funktion IP-Anonymisierung aktiviert</li>
              <li>Keine Übermittlung an Dritte</li>
              <li>Sie können der Erfassung widersprechen</li>
            </ul>

            <h4 className="font-semibold mt-4">3.3 Marketing-Cookies (Google AdSense)</h4>
            <p>
              Mit Ihrer Einwilligung zeigen wir Werbung über Google AdSense an. AdSense verwendet 
              Cookies, um Werbung basierend auf Ihren Interessen anzuzeigen.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">4. Ihre Rechte</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Sie haben folgende Rechte bezüglich Ihrer bei uns gespeicherten personenbezogenen Daten:</p>
            <ul>
              <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können unverzüglich die Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
              <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
              <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können die Herausgabe Ihrer Daten in einem maschinenlesbaren Format verlangen.</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
              <li><strong>Widerruf der Einwilligung:</strong> Sie können Ihre Einwilligung jederzeit widerrufen.</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: kontakt@umrechnerpro.de
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">5. Speicherdauer</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie es für die Erfüllung der 
              jeweiligen Zwecke erforderlich ist oder wie es die gesetzlich vorgeschriebenen 
              Aufbewahrungsfristen vorsehen.
            </p>
            <p>
              Lokal in Ihrem Browser gespeicherte Daten (Favoriten, Verlauf) bleiben so lange 
              gespeichert, bis Sie diese löschen oder Ihren Browser-Datenverlauf bereinigen.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">6. SSL-Verschlüsselung</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung 
              vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung 
              erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf 
              &quot;https://&quot; wechselt und am Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">7. Änderung der Datenschutzerklärung</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung zu ändern, um sie an geänderte 
              Rechtslagen oder bei Änderungen des Dienstes anzupassen. Die aktuelle Version 
              finden Sie stets auf dieser Seite.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Stand: Januar 2026
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/impressum" className="hover:text-primary">Impressum</Link>
            <Link href="/haftungsausschluss" className="hover:text-primary">Haftungsausschluss</Link>
            <Link href="/nutzungsbedingungen" className="hover:text-primary">Nutzungsbedingungen</Link>
            <Link href="/" className="hover:text-primary">Zur Startseite</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
