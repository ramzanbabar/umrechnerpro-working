import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getAllSubConversions, getToolBySlug } from '@/lib/tools';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { UnitConverter } from '@/components/tools/UnitConverter';
import { ConversionTable } from '@/components/tools/ConversionTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import conversion functions
import { convertLength } from '@/lib/conversions/laenge';
import { convertWeight } from '@/lib/conversions/gewicht';
import { convertTemperature } from '@/lib/conversions/temperatur';
import { convertArea } from '@/lib/conversions/flaeche';
import { convertVolume } from '@/lib/conversions/volumen';
import { convertSpeed } from '@/lib/conversions/geschwindigkeit';
import { convertPressure } from '@/lib/conversions/druck';
import { convertEnergy } from '@/lib/conversions/energie';
import { convertPower } from '@/lib/conversions/leistung';

const conversionFunctions: Record<string, (value: number, from: any, to: any) => number> = {
  'laengen-umrechner': convertLength,
  'gewicht-umrechner': convertWeight,
  'temperatur-umrechner': convertTemperature,
  'flaechen-umrechner': convertArea,
  'volumen-umrechner': convertVolume,
  'geschwindigkeit-umrechner': convertSpeed,
  'druck-umrechner': convertPressure,
  'energie-umrechner': convertEnergy,
  'leistung-umrechner': convertPower,
};

interface PageProps {
  params: Promise<{ conversion: string }>;
}

export async function generateStaticParams() {
  const conversions = getAllSubConversions();
  return conversions.map((conv) => ({
    conversion: conv.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion: slug } = await params;
  const conversions = getAllSubConversions();
  const conversion = conversions.find(c => c.slug === slug);
  
  if (!conversion) {
    return { title: 'Umrechnung nicht gefunden' };
  }
  
  return {
    title: conversion.h1,
    description: conversion.metaDescription,
    openGraph: {
      title: conversion.h1,
      description: conversion.metaDescription,
      type: 'website',
      locale: 'de_DE',
    },
  };
}

export default async function SubConversionPage({ params }: PageProps) {
  const { conversion: slug } = await params;
  const conversions = getAllSubConversions();
  const conversion = conversions.find(c => c.slug === slug);
  
  if (!conversion) {
    notFound();
  }
  
  // Find the parent tool
  const parentToolSlug = Object.entries({
    'cm-in-zoll': 'laengen-umrechner',
    'zoll-in-cm': 'laengen-umrechner',
    'meter-in-fuss': 'laengen-umrechner',
    'km-in-meilen': 'laengen-umrechner',
    'kg-in-pfund': 'gewicht-umrechner',
    'pfund-in-kg': 'gewicht-umrechner',
    'celsius-in-fahrenheit': 'temperatur-umrechner',
    'fahrenheit-in-celsius': 'temperatur-umrechner',
    'kw-in-ps': 'leistung-umrechner',
    'ps-in-kw': 'leistung-umrechner',
    'bar-in-psi': 'druck-umrechner',
    'psi-in-bar': 'druck-umrechner',
    'mph-in-kmh': 'geschwindigkeit-umrechner',
    'kmh-in-mph': 'geschwindigkeit-umrechner',
  }).find(([key]) => key === slug)?.[1] || 'laengen-umrechner';
  
  const parentTool = getToolBySlug(parentToolSlug);
  const convertFunction = conversionFunctions[parentToolSlug] || ((v: number) => v);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: 'https://umrechnerpro.de' },
    { name: parentTool?.name || 'Umrechner', url: `https://umrechnerpro.de/tools/${parentToolSlug}` },
    { name: `${conversion.fromLabel} in ${conversion.toLabel}`, url: `https://umrechnerpro.de/umrechnung/${slug}` },
  ]);

  // Create a simplified tool object for the converter
  const miniTool = {
    ...parentTool,
    slug: parentToolSlug,
    units: parentTool?.units?.filter(u => 
      u.value === conversion.fromUnit || u.value === conversion.toUnit
    ) || [],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Startseite</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/tools/${parentToolSlug}`} className="hover:text-primary">
            {parentTool?.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{conversion.fromLabel} → {conversion.toLabel}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* H1 */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{conversion.h1}</h1>
              <p className="text-lg text-muted-foreground">
                {conversion.fromLabel} in {conversion.toLabel} umrechnen. Kostenlose und präzise Umrechnung 
                mit sofortiger Anzeige und deutscher Formatierung.
              </p>
            </div>

            {/* Converter */}
            {miniTool.units && miniTool.units.length >= 2 && (
              <UnitConverter tool={miniTool as any} />
            )}

            {/* Conversion Table */}
            <Card>
              <CardHeader>
                <CardTitle>Umrechnungstabelle {conversion.fromLabel} → {conversion.toLabel}</CardTitle>
              </CardHeader>
              <CardContent>
                <ConversionTable 
                  tool={{
                    ...miniTool,
                    units: miniTool.units,
                  } as any}
                  convertFunction={convertFunction}
                  rows={20}
                />
              </CardContent>
            </Card>

            {/* SEO Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold">
                {conversion.fromLabel} in {conversion.toLabel} umrechnen
              </h2>
              <p>
                Auf dieser Seite können Sie {conversion.fromLabel} einfach und präzise in {conversion.toLabel} umrechnen. 
                Die Umrechnung erfolgt in Echtzeit basierend auf wissenschaftlich anerkannten NIST-Standards.
              </p>
              
              <h3 className="text-xl font-semibold">So funktioniert die Umrechnung</h3>
              <p>
                Geben Sie einfach den Wert in {conversion.fromLabel} ein, und das Ergebnis in {conversion.toLabel} 
                wird sofort angezeigt. Sie können auch die Richtung der Umrechnung ändern, indem Sie die 
                Einheiten austauschen.
              </p>
              
              <h3 className="text-xl font-semibold">Häufige Werte</h3>
              <p>
                Die Umrechnungstabelle oben zeigt häufige Werte für die Umrechnung von {conversion.fromLabel} 
                in {conversion.toLabel}. Diese Werte können als Referenz für schnelle Schätzungen dienen.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Conversions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ähnliche Umrechnungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversions
                  .filter(c => c.slug !== slug && c.priority >= 7)
                  .slice(0, 8)
                  .map((conv) => (
                    <Link 
                      key={conv.slug}
                      href={`/umrechnung/${conv.slug}`}
                      className="block p-2 rounded hover:bg-muted transition-colors text-sm"
                    >
                      {conv.fromLabel} → {conv.toLabel}
                    </Link>
                  ))}
              </CardContent>
            </Card>

            {/* Parent Tool Link */}
            {parentTool && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{parentTool.icon} {parentTool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {parentTool.shortDescription}
                  </p>
                  <Link 
                    href={`/tools/${parentToolSlug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Zum vollständigen Umrechner →
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
