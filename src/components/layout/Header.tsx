'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  ChevronDown,
  Ruler,
  Scale,
  Thermometer,
  Calculator,
  Palette,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllCategories, type CategorySlug } from '@/lib/categories';

// Quick links für Header
const quickLinks = [
  { slug: 'laengen-umrechner', label: 'cm → Zoll', keyword: 'cm in zoll' },
  { slug: 'gewicht-umrechner', label: 'kg → Pfund', keyword: 'kg in pfund' },
  { slug: 'temperatur-umrechner', label: '°C → °F', keyword: 'celsius in fahrenheit' },
  { slug: 'mehrwertsteuer-rechner', label: 'MwSt', keyword: 'mwst berechnen' },
];

// Fallback icons
const Clock = () => <span className="h-4 w-4">⏱️</span>;
const Gauge = () => <span className="h-4 w-4">🎈</span>;
const Zap = () => <span className="h-4 w-4">⚡</span>;
const Wrench = () => <span className="h-4 w-4">🔧</span>;
const AngleIcon = () => <span className="h-4 w-4">📐</span>;
const Droplet = () => <span className="h-4 w-4">💧</span>;
const Magnet = () => <span className="h-4 w-4">🧲</span>;
const RadiationIcon = () => <span className="h-4 w-4">☢️</span>;
const Shirt = () => <span className="h-4 w-4">👔</span>;
const DollarSign = () => <span className="h-4 w-4">💰</span>;
const Calendar = () => <span className="h-4 w-4">📅</span>;
const Heart = () => <span className="h-4 w-4">❤️</span>;
const Home = () => <span className="h-4 w-4">🏠</span>;
const Code = () => <span className="h-4 w-4">💻</span>;
const FileText = () => <span className="h-4 w-4">📝</span>;
const ChefHat = () => <span className="h-4 w-4">🍳</span>;
const Globe = () => <span className="h-4 w-4">🌍</span>;
const GraduationCap = () => <span className="h-4 w-4">📚</span>;

// Category Icons
const categoryIcons: Record<CategorySlug, React.ReactNode> = {
  laenge: <Ruler className="h-4 w-4" />,
  gewicht: <Scale className="h-4 w-4" />,
  temperatur: <Thermometer className="h-4 w-4" />,
  zeit: <Clock />,
  geschwindigkeit: <Gauge />,
  druck: <Gauge />,
  energie: <Zap />,
  leistung: <Zap />,
  kraft: <Wrench />,
  winkel: <AngleIcon />,
  digital: <Database className="h-4 w-4" />,
  technik: <Wrench />,
  waerme: <Thermometer className="h-4 w-4" />,
  fluessigkeiten: <Droplet />,
  licht: <Sun className="h-4 w-4" />,
  elektrizitaet: <Zap />,
  magnetismus: <Magnet />,
  strahlung: <RadiationIcon />,
  alltag: <Shirt />,
  design: <Palette className="h-4 w-4" />,
  sonstige: <Calculator className="h-4 w-4" />,
  mathematik: <Calculator className="h-4 w-4" />,
  finanzen: <DollarSign />,
  datum: <Calendar />,
  gesundheit: <Heart />,
  'energie-rechner': <Zap />,
  bauen: <Home />,
  developer: <Code />,
  text: <FileText />,
  kochen: <ChefHat />,
  geografie: <Globe />,
  schule: <GraduationCap />,
  rechner: <Calculator className="h-4 w-4" />,
};

// Helper for hydration-safe mounted state
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const categories = getAllCategories();
  
  // Hydration-safe mounted check
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📏</span>
            <span className="font-bold text-xl hidden sm:inline-block">
              UmrechnerPro<span className="text-primary">.de</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/#umrechner" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
              Alle Umrechner
            </Link>
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium">
                  Kategorien
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link href={`/kategorie/${category.slug}`} className="flex items-center gap-2 cursor-pointer">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/ueber-uns" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
              Über uns
            </Link>
          </nav>

          {/* Quick Links (Desktop) */}
          <div className="hidden xl:flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Beliebt:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/tools/${link.slug}`}
                className="px-2 py-1 text-primary hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search (Desktop) */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Suchen..."
                  className="pl-8 w-40 lg:w-56"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Theme wechseln"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span className="text-2xl">📏</span>
                    UmrechnerPro
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Umrechner suchen..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/#umrechner"
                      className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Alle Umrechner
                    </Link>
                    <Link
                      href="/ueber-uns"
                      className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Über uns
                    </Link>
                    <Link
                      href="/kontakt"
                      className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Kontakt
                    </Link>
                  </nav>

                  {/* Mobile Categories */}
                  <div>
                    <h3 className="px-3 text-sm font-semibold text-muted-foreground mb-2">
                      Kategorien
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {categories.slice(0, 12).map((category) => (
                        <Link
                          key={category.slug}
                          href={`/kategorie/${category.slug}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{category.icon}</span>
                          <span className="truncate">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="px-3 text-sm font-semibold text-muted-foreground mb-2">
                      Beliebte Umrechnungen
                    </h3>
                    <div className="flex flex-col space-y-1">
                      {quickLinks.map((link) => (
                        <Link
                          key={link.slug}
                          href={`/tools/${link.slug}`}
                          className="px-3 py-2 text-sm hover:bg-muted rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
