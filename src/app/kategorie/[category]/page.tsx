import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import { getToolsByCategory } from '@/lib/tools';
import { generateCategoryMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug as any);
  
  if (!category) {
    return { title: 'Kategorie nicht gefunden' };
  }
  
  return generateCategoryMetadata(category);
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug as any);
  
  if (!category) {
    notFound();
  }
  
  const tools = getToolsByCategory(slug as any);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: 'https://umrechnerpro.de' },
    { name: category.name, url: `https://umrechnerpro.de/kategorie/${slug}` },
  ]);

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
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {category.icon} {category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {category.description} Entdecken Sie {tools.length} Umrechner und Rechner in dieser Kategorie.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {tool.shortDescription}
                  </CardDescription>
                  {tool.searchVolumeDE && (
                    <p className="text-xs text-muted-foreground mt-2">
                      🔥 {tool.searchVolumeDE} Suchanfragen/Monat
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold">Über die Kategorie {category.name}</h2>
          <p>
            In der Kategorie &quot;{category.name}&quot; finden Sie {tools.length} verschiedene Umrechner und Rechner. 
            Alle Tools sind kostenlos, präzise und speziell für deutschsprachige Nutzer optimiert.
          </p>
          <p>
            Die Umrechnungen basieren auf wissenschaftlich anerkannten Standards und Formeln. 
            Ergebnisse werden im deutschen Zahlenformat angezeigt – mit Komma als Dezimaltrennzeichen 
            und Punkt als Tausendertrennzeichen.
          </p>
        </div>

        {/* Related Categories */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Weitere Kategorien</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getAllCategories()
              .filter(cat => cat.slug !== slug)
              .slice(0, 4)
              .map((cat) => (
                <Link key={cat.slug} href={`/kategorie/${cat.slug}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-2">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
