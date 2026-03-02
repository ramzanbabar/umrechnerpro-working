import Link from 'next/link';
import { getAllCategories } from '@/lib/categories';
import { getFeaturedTools } from '@/lib/tools';

export function Footer() {
  const categories = getAllCategories().slice(0, 8);
  const featuredTools = getFeaturedTools(8);

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Tagline */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📏</span>
              <span className="font-bold text-xl">
                UmrechnerPro<span className="text-primary">.de</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              100+ kostenlose Rechner & Umrechner auf Deutsch. Für Deutschland, Österreich und Schweiz.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>🎯</span>
              <span>DSGVO-konform & kostenlos</span>
            </div>
          </div>

          {/* Column 2: Kategorien */}
          <div>
            <h3 className="font-semibold mb-4">Kategorien</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/kategorie/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#kategorien"
                  className="text-sm text-primary hover:underline"
                >
                  Alle Kategorien →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Umrechner */}
          <div>
            <h3 className="font-semibold mb-4">Top Umrechner</h3>
            <ul className="space-y-2">
              {featuredTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tool.icon} {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Rechtliches & Info */}
          <div>
            <h3 className="font-semibold mb-4">Rechtliches & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link
                  href="/haftungsausschluss"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Haftungsausschluss
                </Link>
              </li>
              <li>
                <Link
                  href="/nutzungsbedingungen"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Nutzungsbedingungen
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} UmrechnerPro.de – Alle Rechte vorbehalten.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Kein Ersatz für professionelle Beratung. Alle Angaben ohne Gewähr.
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Made with ❤️ für Deutschland
          </p>
        </div>
      </div>
    </footer>
  );
}
