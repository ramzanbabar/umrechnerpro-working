import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getFeaturedTools } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404)',
  description: 'Die angeforderte Seite wurde nicht gefunden.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const featuredTools = getFeaturedTools(6);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Graphic */}
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-bold text-muted">404</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Seite nicht gefunden
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Die gesuchte Seite existiert nicht oder wurde verschoben. 
          Vielleicht finden Sie das Gesuchte in unseren beliebten Umrechnern.
        </p>

        {/* Search */}
        <div className="mb-8">
          <Link href="/#umrechner">
            <Button size="lg" className="px-8">
              Alle Umrechner entdecken
            </Button>
          </Link>
        </div>

        {/* Featured Tools */}
        <div className="text-left">
          <h2 className="text-xl font-semibold mb-4 text-center">Beliebte Umrechner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tool.icon}</span>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-1 text-sm">
                      {tool.shortDescription}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Oder gehen Sie zurück zur:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="text-primary hover:underline">
              Startseite
            </Link>
            <Link href="/impressum" className="text-primary hover:underline">
              Impressum
            </Link>
            <Link href="/kontakt" className="text-primary hover:underline">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
