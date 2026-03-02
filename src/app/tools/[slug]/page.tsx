import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getToolBySlug, getAllTools, getRelatedTools } from '@/lib/tools';
import { getCategoryBySlug } from '@/lib/categories';
import { generateToolMetadata, generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { UnitConverter } from '@/components/tools/UnitConverter';
import { ConversionTable } from '@/components/tools/ConversionTable';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { FaqSection } from '@/components/ui/custom/FaqSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import ALL calculator components
import {
  PercentCalculator,
  BMICalculator,
  BMRCalculator,
  AgeCalculator,
  DateCalculator,
  MwStCalculator,
  GehaltCalculator,
  ZinseszinsCalculator,
  KreditCalculator,
  TrinkgeldCalculator,
  RabattCalculator,
  InflationsCalculator,
  BodyfatCalculator,
  IdealgewichtCalculator,
  SchwangerschaftsCalculator,
  KalorienverbrauchCalculator,
  WasserbedarfCalculator,
  DreisatzCalculator,
  GeometryCalculator,
  PythagorasCalculator,
  QuadratischeGleichungenCalculator,
  BruchCalculator,
  WurzelCalculator,
  LogarithmusCalculator,
  HexCalculator,
  OhmCalculator,
  StromverbrauchCalculator,
  CO2Calculator,
  Base64Calculator,
  IPSubnetzCalculator,
  UnixTimestampCalculator,
  UrlEncoderCalculator,
  NotenCalculator,
  WoerterzaehlerCalculator,
  LaufzeitCalculator,
  FlaechenberechnungCalculator,
  VolumenberechnungCalculator,
  GenericCalculator,
} from '@/components/converters';

// Import conversion functions for the conversion table
import { convertLength } from '@/lib/conversions/laenge';
import { convertWeight } from '@/lib/conversions/gewicht';
import { convertTemperature } from '@/lib/conversions/temperatur';
import { convertArea } from '@/lib/conversions/flaeche';
import { convertVolume } from '@/lib/conversions/volumen';
import { convertTime } from '@/lib/conversions/zeit';
import { convertSpeed, convertFuelConsumption } from '@/lib/conversions/geschwindigkeit';
import { convertPressure } from '@/lib/conversions/druck';
import { convertEnergy } from '@/lib/conversions/energie';
import { convertPower } from '@/lib/conversions/leistung';
import { convertForce } from '@/lib/conversions/kraft';
import { convertAngle } from '@/lib/conversions/winkel';
import { convertData } from '@/lib/conversions/datenspeicher';
import { convertFrequency } from '@/lib/conversions/frequenz';
import { convertDensity } from '@/lib/conversions/dichte';
import { convertAcceleration } from '@/lib/conversions/beschleunigung';
import { convertTorque } from '@/lib/conversions/drehmoment';
import { convertDynamicViscosity } from '@/lib/conversions/viskositaet';
import { convertFlowRate } from '@/lib/conversions/volumenstrom';
import { convertCurrent, convertVoltage, convertResistance } from '@/lib/conversions/strom';
import { convertMagneticFluxDensity } from '@/lib/conversions/magnetismus';
import { convertIlluminance } from '@/lib/conversions/licht';
import { convertRadioactivity } from '@/lib/conversions/strahlung';
import { convertDataTransfer } from '@/lib/conversions/datentransfer';
import { convertShoeSize } from '@/lib/conversions/schuhgroessen';
import { convertDamenSize, convertHerrenSize } from '@/lib/conversions/kleidergroessen';
import { convertCooking } from '@/lib/conversions/kocheinheiten';
import { pxToPt, ptToPx, pxToEm, emToPx } from '@/lib/conversions/typografie';
import { convertNumberSystem } from '@/lib/conversions/zahlen';
import { arabicToRoman, romanToArabic } from '@/lib/conversions/roemische_zahlen';
import { encodeBase64, decodeBase64, textToAscii, asciiToText } from '@/lib/conversions/developer';
import { hexToRgb, rgbToHex, hexToHsl } from '@/lib/conversions/farben';

// Mapping of tool slugs to conversion functions (for ConversionTable)
const conversionFunctions: Record<string, (value: number, from: any, to: any) => number> = {
  // Length & Area & Volume
  'laengen-umrechner': convertLength,
  'flaechen-umrechner': convertArea,
  'volumen-umrechner': convertVolume,
  
  // Weight
  'gewicht-umrechner': convertWeight,
  
  // Temperature
  'temperatur-umrechner': convertTemperature,
  
  // Time
  'zeit-umrechner': convertTime,
  
  // Speed
  'geschwindigkeit-umrechner': convertSpeed,
  'kraftstoffverbrauch-umrechner': convertFuelConsumption,
  
  // Pressure
  'druck-umrechner': convertPressure,
  
  // Energy & Power
  'energie-umrechner': convertEnergy,
  'leistung-umrechner': convertPower,
  
  // Force & Torque
  'kraft-umrechner': convertForce,
  'drehmoment-umrechner': convertTorque,
  
  // Angle
  'winkel-umrechner': convertAngle,
  
  // Data
  'datenspeicher-umrechner': convertData,
  'datentransfer-umrechner': convertDataTransfer,
  
  // Frequency
  'frequenz-umrechner': convertFrequency,
  
  // Density
  'dichte-umrechner': convertDensity,
  
  // Acceleration
  'beschleunigung-umrechner': convertAcceleration,
  
  // Viscosity & Flow
  'viskositaet-umrechner': convertDynamicViscosity,
  'volumenstrom-umrechner': convertFlowRate,
  
  // Electricity
  'strom-umrechner': convertCurrent,
  
  // Magnetism
  'magnetismus-umrechner': convertMagneticFluxDensity,
  
  // Light
  'licht-umrechner': convertIlluminance,
  
  // Radiation
  'strahlung-umrechner': convertRadioactivity,
  
  // Sizes
  'schuhgroesse-umrechner': convertShoeSize,
  'kleidergroesse-umrechner': (value) => value,
  
  // Cooking
  'kocheinheiten-umrechner': convertCooking,
  
  // Typography
  'typografie-umrechner': (value, from, to) => {
    if (from === 'px' && to === 'pt') return pxToPt(value);
    if (from === 'pt' && to === 'px') return ptToPx(value);
    if (from === 'px' && to === 'em') return pxToEm(value);
    if (from === 'em' && to === 'px') return emToPx(value);
    return value;
  },
  
  // Number systems
  'zahlen-umrechner': (value) => value,
  'roemische-zahlen-umrechner': (value) => value,
  
  // Developer tools (pass-through for calculators)
  'developer-umrechner': (value) => value,
  'base64-umrechner': (value) => value,
  'ascii-umrechner': (value) => value,
  'reifengroesse-umrechner': (value) => value,
  
  // Colors
  'farb-umrechner': (value) => value,
  
  // Other pass-through for calculators
  'waehrungs-rechner': (value) => value,
  'kalorienrechner': (value) => value,
  'text-umrechner': (value) => value,
};

// Default conversion function
const defaultConvertFunction = (value: number) => value;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static params for all tools
export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

// Generate metadata for each tool
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    return { title: 'Tool nicht gefunden' };
  }
  
  return generateToolMetadata(tool);
}

// FAQ templates for different tool types
const faqTemplates: Record<string, Array<{ question: string; answer: string }>> = {
  'laengen-umrechner': [
    { question: 'Wie rechne ich cm in Zoll um?', answer: '1 Zoll entspricht genau 2,54 cm. Um cm in Zoll umzurechnen, teilen Sie den cm-Wert durch 2,54. Beispiel: 10 cm = 10 ÷ 2,54 = 3,94 Zoll.' },
    { question: 'Wie viel ist 1 Meter in Fuß?', answer: '1 Meter entspricht 3,2808 Fuß (ft). Umgekehrt entspricht 1 Fuß 0,3048 Meter.' },
    { question: 'Wie rechne ich km in Meilen um?', answer: '1 Kilometer entspricht 0,6214 Meilen. Teilen Sie km durch 1,609 oder multiplizieren Sie mit 0,6214.' },
  ],
  'gewicht-umrechner': [
    { question: 'Wie rechne ich kg in Pfund um?', answer: '1 Kilogramm entspricht 2,2046 Pfund (lb). Multiplizieren Sie kg mit 2,2046 für das Ergebnis in Pfund.' },
    { question: 'Wie viel Gramm hat eine Unze?', answer: '1 Unze (oz) entspricht 28,3495 Gramm. Umgekehrt entspricht 1 Gramm etwa 0,0353 Unzen.' },
  ],
  'temperatur-umrechner': [
    { question: 'Wie rechne ich Celsius in Fahrenheit um?', answer: 'Verwenden Sie die Formel: °F = °C × 9/5 + 32. Beispiel: 20°C = 20 × 9/5 + 32 = 68°F.' },
    { question: 'Wie viel Grad Fahrenheit sind 0 Grad Celsius?', answer: '0°C entsprechen 32°F. Dies ist der Gefrierpunkt von Wasser.' },
  ],
  'prozent-rechner': [
    { question: 'Wie berechne ich X Prozent von Y?', answer: 'Multiplizieren Sie Y mit X und teilen Sie durch 100. Beispiel: 20% von 200 = 200 × 20 ÷ 100 = 40.' },
    { question: 'Wie berechne ich Prozentsteigerung?', answer: 'Formel: (Neuer Wert - Alter Wert) ÷ Alter Wert × 100.' },
  ],
  'mehrwertsteuer-rechner': [
    { question: 'Wie hoch ist die Mehrwertsteuer in Deutschland?', answer: 'Deutschland hat zwei Mehrwertsteuersätze: 19% Standardsatz und 7% ermäßigter Satz für Lebensmittel, Bücher, etc.' },
    { question: 'Wie berechne ich Brutto aus Netto?', answer: 'Multiplizieren Sie den Nettobetrag mit 1,19 (bei 19% MwSt) oder mit 1,07 (bei 7% MwSt).' },
  ],
  'bmi-rechner': [
    { question: 'Wie wird der BMI berechnet?', answer: 'BMI = Körpergewicht (kg) ÷ Größe (m)². Beispiel: 70kg bei 1,75m = 70 ÷ 1,75² = 22,9.' },
    { question: 'Was ist ein normaler BMI?', answer: 'Ein BMI zwischen 18,5 und 24,9 gilt als Normalgewicht.' },
  ],
};

// Get FAQ for a tool
function getFAQsForTool(toolSlug: string): Array<{ question: string; answer: string }> {
  if (faqTemplates[toolSlug]) {
    return faqTemplates[toolSlug];
  }
  return [
    { question: `Wie funktioniert dieser Rechner?`, answer: 'Geben Sie einfach die Werte ein und das Ergebnis wird sofort angezeigt.' },
    { question: 'Sind die Ergebnisse präzise?', answer: 'Ja, alle Berechnungen basieren auf wissenschaftlich genauen Standards und werden mit hoher Präzision berechnet.' },
    { question: 'Kann ich die Ergebnisse kopieren?', answer: 'Ja, klicken Sie auf die Schaltfläche "Kopieren" neben dem Ergebnis.' },
    { question: 'Ist dieser Rechner kostenlos?', answer: 'Ja, alle Rechner auf UmrechnerPro.de sind komplett kostenlos und ohne Registrierung nutzbar.' },
  ];
}

// Server component to render the appropriate calculator
function CalculatorWidget({ slug }: { slug: string }) {
  switch (slug) {
    // Basic calculators
    case 'prozent-rechner':
      return <PercentCalculator toolSlug={slug} />;
    case 'bmi-rechner':
      return <BMICalculator />;
    case 'bmr-rechner':
      return <BMRCalculator />;
    case 'alter-rechner':
      return <AgeCalculator />;
    case 'datum-rechner':
      return <DateCalculator />;
    
    // Finance calculators
    case 'mehrwertsteuer-rechner':
      return <MwStCalculator />;
    case 'gehalt-rechner':
      return <GehaltCalculator />;
    case 'zinseszins-rechner':
      return <ZinseszinsCalculator />;
    case 'kredit-rechner':
      return <KreditCalculator />;
    case 'trinkgeld-rechner':
      return <TrinkgeldCalculator />;
    case 'rabatt-rechner':
      return <RabattCalculator />;
    case 'inflations-rechner':
      return <InflationsCalculator />;
    
    // Health calculators
    case 'bodyfat-rechner':
      return <BodyfatCalculator />;
    case 'idealgewicht-rechner':
      return <IdealgewichtCalculator />;
    case 'schwangerschafts-rechner':
      return <SchwangerschaftsCalculator />;
    case 'kalorienverbrauch-rechner':
      return <KalorienverbrauchCalculator />;
    case 'wasserbedarf-rechner':
      return <WasserbedarfCalculator />;
    
    // Math calculators
    case 'dreisatz-rechner':
      return <DreisatzCalculator />;
    case 'geometrie-umrechner':
      return <GeometryCalculator />;
    case 'pythagoras-rechner':
      return <PythagorasCalculator />;
    case 'quadratische-gleichungen-rechner':
      return <QuadratischeGleichungenCalculator />;
    case 'bruch-rechner':
      return <BruchCalculator />;
    case 'wurzel-rechner':
      return <WurzelCalculator />;
    case 'logarithmus-rechner':
      return <LogarithmusCalculator />;
    case 'hex-rechner':
      return <HexCalculator />;
    
    // Physics/Electrical calculators
    case 'ohm-rechner':
      return <OhmCalculator />;
    case 'stromverbrauch-rechner':
      return <StromverbrauchCalculator />;
    case 'co2-rechner':
      return <CO2Calculator />;
    
    // Developer tools
    case 'base64-umrechner':
      return <Base64Calculator />;
    case 'ascii-umrechner':
      return <Base64Calculator />; // Similar functionality
    case 'ip-subnetz-rechner':
      return <IPSubnetzCalculator />;
    case 'unix-timestamp-rechner':
      return <UnixTimestampCalculator />;
    case 'url-encoder':
      return <UrlEncoderCalculator />;
    
    // Education calculators
    case 'noten-rechner':
      return <NotenCalculator />;
    case 'woerterzaehler':
      return <WoerterzaehlerCalculator />;
    
    // Other calculators
    case 'laufzeit-rechner':
      return <LaufzeitCalculator />;
    case 'flaechenberechnung-rechner':
      return <FlaechenberechnungCalculator />;
    case 'volumenberechnung-rechner':
      return <VolumenberechnungCalculator />;
    
    // Generic fallback for other calculators
    default:
      return <GenericCalculator toolSlug={slug} />;
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  if (!tool) {
    notFound();
  }
  
  const category = getCategoryBySlug(tool.category);
  const relatedTools = getRelatedTools(slug);
  const convertFunction = conversionFunctions[slug] || defaultConvertFunction;
  const faqs = getFAQsForTool(slug);
  const isCalculator = tool.isCalculator;
  
  // Generate JSON-LD schemas
  const webAppSchema = generateWebApplicationSchema(tool);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: 'https://umrechnerpro.de' },
    { name: category?.name || 'Kategorie', url: `https://umrechnerpro.de/kategorie/${tool.category}` },
    { name: tool.name, url: `https://umrechnerpro.de/tools/${slug}` },
  ]);

  return (
    <div className="min-h-screen">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Startseite</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/kategorie/${tool.category}`} className="hover:text-primary">
            {category?.name || 'Kategorie'}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{tool.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Converter/Calculator */}
          <div className="lg:col-span-2 space-y-8">
            {/* H1 and Intro */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{tool.h1}</h1>
              <p className="text-muted-foreground text-lg">
                {tool.shortDescription} Kostenloser Online-Rechner mit sofortiger Anzeige und deutscher Formatierung.
              </p>
            </div>

            {/* Calculator or Converter Widget */}
            {isCalculator ? (
              <CalculatorWidget slug={slug} />
            ) : (
              <UnitConverter tool={tool} />
            )}

            {/* How it Works */}
            <Card>
              <CardHeader>
                <CardTitle>So funktioniert&apos;s</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Geben Sie die Werte ein</li>
                  <li>Das Ergebnis wird sofort berechnet</li>
                  <li>Kopieren Sie das Ergebnis bei Bedarf</li>
                </ol>
              </CardContent>
            </Card>

            {/* Conversion Table (for unit converters only) */}
            {!isCalculator && tool.units && tool.units.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Umrechnungstabelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConversionTable 
                    tool={tool} 
                    convertFunction={convertFunction} 
                    baseUnit={tool.baseUnit}
                    rows={15}
                  />
                </CardContent>
              </Card>
            )}

            {/* SEO Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold">Über den {tool.name}</h2>
              <p>
                Der {tool.name} auf UmrechnerPro.de ermöglicht Ihnen eine schnelle und präzise Berechnung. 
                Alle Berechnungen basieren auf wissenschaftlich genauen Standards und werden in Echtzeit durchgeführt.
              </p>
              {tool.units && tool.units.length > 0 && !isCalculator && (
                <>
                  <h3 className="text-xl font-semibold">Unterstützte Einheiten</h3>
                  <p>
                    Dieser Umrechner unterstützt folgende Einheiten: {tool.units.map(u => u.label).join(', ')}.
                  </p>
                </>
              )}
            </div>

            {/* FAQ Section */}
            <FaqSection faqs={faqs} />

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <RelatedTools currentToolSlug={slug} relatedTools={tool.relatedTools} />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Conversions */}
            {tool.popularConversions && tool.popularConversions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Beliebte Umrechnungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tool.popularConversions.slice(0, 6).map((conv) => (
                    <Link 
                      key={conv.slug}
                      href={`/umrechnung/${conv.slug}`}
                      className="block p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">{conv.fromLabel} → {conv.toLabel}</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Category Info */}
            {category && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{category.icon} {category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Link 
                    href={`/kategorie/${category.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Alle {category.name}-Tools →
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Disclaimer */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">
                  <strong>Hinweis:</strong> Alle Berechnungen erfolgen nach bestem Wissen, 
                  jedoch ohne Gewähr. Für wichtige Berechnungen empfehlen wir eine zusätzliche 
                  Überprüfung der Ergebnisse.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
