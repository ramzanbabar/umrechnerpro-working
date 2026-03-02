import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAllCategories, getPopularCategories } from '@/lib/categories';
import { getFeaturedTools, getAllTools, getAllSubConversions } from '@/lib/tools';
import { generateOrganizationSchema, generateSearchBoxSchema, generateFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
  description: '100+ kostenlose Umrechner und Rechner: Länge, Gewicht, Temperatur, Prozent, MwSt, BMI und mehr. Präzise, sofort, auf Deutsch. Für DACH-Region.',
  openGraph: {
    title: 'UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch',
    description: '100+ kostenlose Umrechner und Rechner für Deutschland, Österreich und Schweiz.',
    url: 'https://umrechnerpro.de',
    type: 'website',
  },
};

// FAQ für Startseite
const homepageFaqs = [
  {
    question: 'Wie rechne ich cm in Zoll um?',
    answer: '1 Zoll entspricht genau 2,54 cm. Um cm in Zoll umzurechnen, teilen Sie den Wert in cm durch 2,54. Beispiel: 10 cm ÷ 2,54 = 3,94 Zoll.'
  },
  {
    question: 'Wie berechne ich die Mehrwertsteuer?',
    answer: 'Für den Bruttobetrag: Netto × 1,19 (bei 19% MwSt). Für den Nettobetrag: Brutto ÷ 1,19. Den MwSt-Betrag erhalten Sie mit: Brutto - Netto.'
  },
  {
    question: 'Was ist der Unterschied zwischen kW und PS?',
    answer: 'PS (Pferdestärke) ist die metrische Einheit, HP (Horsepower) die imperiale. 1 PS = 0,735 kW, 1 HP = 0,746 kW. Für Autos in Deutschland wird meist PS verwendet.'
  },
  {
    question: 'Wie berechne ich meinen BMI?',
    answer: 'Der Body-Mass-Index wird berechnet: BMI = Körpergewicht (kg) ÷ Größe (m)². Ein BMI zwischen 18,5 und 25 gilt als Normalgewicht.'
  },
  {
    question: 'Wie rechne ich Fahrenheit in Celsius um?',
    answer: 'Die Formel lautet: °C = (°F - 32) × 5/9. Beispiel: 100°F = (100 - 32) × 5/9 = 37,8°C. Wasser gefriert bei 32°F (0°C) und siedet bei 212°F (100°C).'
  },
  {
    question: 'Wie viele MB sind ein GB?',
    answer: '1 GB (Gigabyte) = 1000 MB (Megabyte) nach SI-Standard. Nach binärem Standard (IEC) gilt: 1 GiB = 1024 MiB.'
  },
  {
    question: 'Wie rechne ich km/h in mph um?',
    answer: '1 km/h = 0,6214 mph. Für die Umrechnung multiplizieren Sie km/h mit 0,6214. Umgekehrt: 1 mph = 1,609 km/h.'
  },
  {
    question: 'Was ist ein Hektar in m²?',
    answer: '1 Hektar (ha) = 10.000 m² = 100 Ar. Ein Hektar entspricht einem Quadrat mit 100m Seitenlänge. In Deutschland wird Hektar häufig für Grundstücksflächen verwendet.'
  },
  {
    question: 'Wie berechne ich Prozent?',
    answer: 'Grundwert × Prozentsatz ÷ 100 = Prozentwert. Beispiel: 20% von 200 = 200 × 20 ÷ 100 = 40. Für Prozentsteigerung: (Neu - Alt) ÷ Alt × 100.'
  },
  {
    question: 'Wie rechne ich kg in Pfund um?',
    answer: '1 kg = 2,2046 Pfund (lb). Teilen Sie kg durch 0,4536 oder multiplizieren Sie mit 2,2046. Umgekehrt: 1 lb = 0,4536 kg.'
  },
  {
    question: 'Was ist der Dreisatz?',
    answer: 'Der Dreisatz berechnet eine vierte Größe aus drei bekannten. Bei direkter Proportionalität: Je mehr, desto mehr. Bei indirekter: Je mehr, desto weniger.'
  },
  {
    question: 'Wie berechne ich Zinseszins?',
    answer: 'Endkapital = Anfangskapital × (1 + Zinssatz)^(Jahre). Beispiel: 1000€ bei 5% über 10 Jahre = 1000 × 1,05^10 = 1628,89€.'
  },
];

export default function HomePage() {
  const categories = getAllCategories();
  const popularCategories = getPopularCategories(8);
  const featuredTools = getFeaturedTools(14);
  const allTools = getAllTools();
  const subConversions = getAllSubConversions().slice(0, 30);

  // JSON-LD Schemas
  const organizationSchema = generateOrganizationSchema();
  const searchBoxSchema = generateSearchBoxSchema();
  const faqSchema = generateFAQSchema(homepageFaqs);

  return (
    <div className="min-h-screen">
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchBoxSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Kostenlose Einheitenumrechner
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            100+ professionelle Umrechner für Länge, Gewicht, Temperatur, Finanzen, Mathematik und mehr – 
            kostenlos, sofort und auf Deutsch.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm py-1.5 px-3">
              100 Umrechner
            </Badge>
            <Badge variant="secondary" className="text-sm py-1.5 px-3">
              100% Kostenlos
            </Badge>
            <Badge variant="secondary" className="text-sm py-1.5 px-3">
              Keine Anmeldung
            </Badge>
            <Badge variant="secondary" className="text-sm py-1.5 px-3">
              DSGVO-konform
            </Badge>
          </div>

          {/* Quick Converter */}
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Schnellzugriff – Beliebte Umrechnungen:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { slug: 'laengen-umrechner', label: 'cm → Zoll', icon: '📏' },
                { slug: 'gewicht-umrechner', label: 'kg → Pfund', icon: '⚖️' },
                { slug: 'temperatur-umrechner', label: '°C → °F', icon: '🌡️' },
                { slug: 'mehrwertsteuer-rechner', label: 'MwSt', icon: '💰' },
                { slug: 'prozent-rechner', label: 'Prozent', icon: '🧮' },
                { slug: 'bmi-rechner', label: 'BMI', icon: '⚖️' },
                { slug: 'geschwindigkeit-umrechner', label: 'km/h → mph', icon: '🚗' },
                { slug: 'leistung-umrechner', label: 'kW → PS', icon: '💪' },
              ].map((item) => (
                <Link key={item.slug} href={`/tools/${item.slug}`}>
                  <Button variant="outline" className="w-full h-auto py-3 flex flex-col items-center gap-1">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="kategorien" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Alle Kategorien
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Wähle aus 33 Kategorien mit über 100 Umrechnern und Rechnern.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/kategorie/${category.slug}`}>
                <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 group cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {category.description}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">
                      {category.toolCount} {category.toolCount === 1 ? 'Tool' : 'Tools'}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id="umrechner" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Beliebte Umrechner
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Die am häufigsten genutzten Tools auf UmrechnerPro.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featuredTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                        {tool.searchVolumeDE && (
                          <Badge variant="outline" className="text-xs mt-1">
                            🔥 {tool.searchVolumeDE} Suchanfragen/Monat
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {tool.shortDescription}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Conversions Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Beliebteste Umrechnungen
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Direkt zu den meistgesuchten Umrechnungen.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {subConversions.map((conversion) => (
              <Link 
                key={conversion.slug} 
                href={`/umrechnung/${conversion.slug}`}
              >
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <span className="truncate">
                    {conversion.fromLabel} → {conversion.toLabel}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why UmrechnerPro Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Warum UmrechnerPro?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '✅', title: '100 Umrechner & Rechner', desc: 'Von Länge bis BMI, von Prozent bis Zinseszins – alles dabei.' },
              { icon: '🔬', title: 'Wissenschaftlich präzise', desc: 'Alle Formeln basieren auf NIST-Standards. Keine Rundungsfehler.' },
              { icon: '⚡', title: 'Sofortanzeige', desc: 'Echtzeit-Umrechnung ohne Seitenreload. Null Wartezeit.' },
              { icon: '📱', title: 'Mobile-first', desc: 'Optimiert für Smartphone und Tablet. Perfekt für unterwegs.' },
              { icon: '🇩🇪', title: 'Vollständig auf Deutsch', desc: 'Alle Texte, Einheiten und Formate für den DACH-Markt.' },
              { icon: '🔒', title: 'DSGVO-konform & kostenlos', desc: 'Keine Registrierung, keine Daten, keine Kosten.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Einheitenumrechner & Rechner auf Deutsch
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Willkommen auf UmrechnerPro.de – Ihrem kompetenten Partner für alle Einheitenumrechnungen und Berechnungen. 
              Unsere Plattform bietet über 100 verschiedene Umrechner und Rechner, die speziell für deutschsprachige 
              Nutzer in Deutschland, Österreich und der Schweiz entwickelt wurden.
            </p>

            <h3 className="text-xl font-semibold mb-4">Für alle Einheitensysteme</h3>
            <p className="mb-6">
              Ob Sie metrische Einheiten in imperiale umrechnen möchten, SI-Einheiten in angelsächsische, 
              oder einfach nur zwischen verschiedenen Größenordnungen wechseln müssen – UmrechnerPro bietet 
              die passende Lösung. Von alltäglichen Umrechnungen wie cm in Zoll oder kg in Pfund bis hin zu 
              spezialisierten wissenschaftlichen Einheiten wie Tesla, Weber oder Becquerel.
            </p>

            <h3 className="text-xl font-semibold mb-4">Wissenschaftlich korrekte Formeln</h3>
            <p className="mb-6">
              Alle unsere Umrechnungsformeln basieren auf den offiziellen NIST-Standards (National Institute 
              of Standards and Technology). Dies garantiert Ihnen präzise Ergebnisse, egal ob Sie für die 
              Schule, das Studium, den Beruf oder den Alltag rechnen. Bei Temperaturumrechnungen 
              berücksichtigen wir die nicht-linearen Formeln korrekt, und bei Datenmengen erklären wir 
              den Unterschied zwischen dezimalen (SI) und binären (IEC) Präfixen.
            </p>

            <h3 className="text-xl font-semibold mb-4">Rechner für Alltag, Schule & Beruf</h3>
            <p className="mb-6">
              Neben klassischen Einheitenumrechnern finden Sie bei uns praktische Rechner für jeden 
              Anlass: Prozentrechner für Rabatte und Steigerungen, Mehrwertsteuerrechner mit den 
              deutschen Sätzen von 19% und 7%, BMI-Rechner mit WHO-Klassifikation, Zinseszinsrechner 
              für Finanzplanung und viele mehr. Besonders beliebt sind unsere Steuerrechner für 
              Nettolohnberechnungen und Kreditkalkulationen.
            </p>

            <h3 className="text-xl font-semibold mb-4">DACH-Region: Deutschland, Österreich & Schweiz</h3>
            <p>
              UmrechnerPro ist speziell auf die Bedürfnisse der DACH-Region zugeschnitten. Alle Zahlen 
              werden im deutschen Format mit Komma als Dezimaltrennzeichen und Punkt als 
              Tausendertrennzeichen dargestellt. Wir verwenden die in Deutschland üblichen Einheiten 
              und Bezeichnungen und berücksichtigen landesspezifische Besonderheiten wie die deutschen 
              Mehrwertsteuersätze oder die metrische Pferdestärke (PS) im Gegensatz zur imperialen 
              Horsepower (HP).
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Häufig gestellte Fragen
          </h2>
          
          <div className="grid gap-4">
            {homepageFaqs.map((faq, index) => (
              <details key={index} className="group border rounded-lg">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                  {faq.question}
                  <span className="ml-4 text-primary">+</span>
                </summary>
                <div className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Jetzt kostenlos umrechnen
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Keine Registrierung erforderlich. Alle Umrechner sind komplett kostenlos und werbefinanziert.
          </p>
          <Link href="/#umrechner">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Alle Umrechner entdecken
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
