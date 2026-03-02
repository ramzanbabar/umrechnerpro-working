/**
 * Categories Registry
 * Alle Kategorien für UmrechnerPro.de
 */

export type CategorySlug = 
  | 'laenge'
  | 'gewicht'
  | 'temperatur'
  | 'zeit'
  | 'geschwindigkeit'
  | 'druck'
  | 'energie'
  | 'leistung'
  | 'kraft'
  | 'winkel'
  | 'digital'
  | 'technik'
  | 'waerme'
  | 'fluessigkeiten'
  | 'licht'
  | 'elektrizitaet'
  | 'magnetismus'
  | 'strahlung'
  | 'alltag'
  | 'design'
  | 'sonstige'
  | 'mathematik'
  | 'finanzen'
  | 'datum'
  | 'gesundheit'
  | 'energie-rechner'
  | 'bauen'
  | 'developer'
  | 'text'
  | 'kochen'
  | 'geografie'
  | 'schule'
  | 'rechner';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
  toolCount: number;
  popularTools: string[];
  metaTitle: string;
  metaDescription: string;
}

export const categories: Record<CategorySlug, Category> = {
  laenge: {
    slug: 'laenge',
    name: 'Länge & Entfernung',
    description: 'Umrechner für Längeneinheiten wie Meter, Kilometer, Zoll, Fuß und Meilen.',
    icon: '📏',
    color: 'blue',
    toolCount: 3,
    popularTools: ['laengen-umrechner', 'flaechen-umrechner', 'volumen-umrechner'],
    metaTitle: 'Längen-Umrechner – Meter, km, Zoll, Fuß umrechnen',
    metaDescription: 'Kostenlose Längen-Umrechner: Meter, Kilometer, Zoll, Fuß, Meilen und mehr. Präzise Umrechnung auf Deutsch.'
  },
  gewicht: {
    slug: 'gewicht',
    name: 'Gewicht & Masse',
    description: 'Umrechner für Gewichtseinheiten wie Kilogramm, Gramm, Pfund und Unzen.',
    icon: '⚖️',
    color: 'purple',
    toolCount: 1,
    popularTools: ['gewicht-umrechner'],
    metaTitle: 'Gewicht-Umrechner – kg, Gramm, Pfund, Unzen',
    metaDescription: 'Kostenloser Gewicht-Umrechner: Kilogramm, Gramm, Pfund, Unzen und mehr. Auf Deutsch, präzise und schnell.'
  },
  temperatur: {
    slug: 'temperatur',
    name: 'Temperatur',
    description: 'Umrechner für Temperatureinheiten wie Celsius, Fahrenheit und Kelvin.',
    icon: '🌡️',
    color: 'red',
    toolCount: 1,
    popularTools: ['temperatur-umrechner'],
    metaTitle: 'Temperatur-Umrechner – Celsius, Fahrenheit, Kelvin',
    metaDescription: 'Celsius in Fahrenheit umrechnen und mehr. Kostenloser Temperatur-Umrechner auf Deutsch.'
  },
  zeit: {
    slug: 'zeit',
    name: 'Zeit',
    description: 'Umrechner für Zeiteinheiten wie Sekunden, Minuten, Stunden und Tage.',
    icon: '⏱️',
    color: 'cyan',
    toolCount: 1,
    popularTools: ['zeit-umrechner'],
    metaTitle: 'Zeit-Umrechner – Sekunden, Minuten, Stunden, Tage',
    metaDescription: 'Zeit umrechnen: Sekunden in Minuten, Stunden in Tage und mehr. Kostenlos auf Deutsch.'
  },
  geschwindigkeit: {
    slug: 'geschwindigkeit',
    name: 'Geschwindigkeit',
    description: 'Umrechner für Geschwindigkeitseinheiten wie km/h, mph und Knoten.',
    icon: '🚗',
    color: 'orange',
    toolCount: 1,
    popularTools: ['geschwindigkeit-umrechner'],
    metaTitle: 'Geschwindigkeits-Umrechner – km/h, mph, Knoten',
    metaDescription: 'km/h in mph umrechnen und mehr. Kostenloser Geschwindigkeits-Umrechner auf Deutsch.'
  },
  druck: {
    slug: 'druck',
    name: 'Druck',
    description: 'Umrechner für Druckeinheiten wie Pascal, Bar, PSI und Atmosphäre.',
    icon: '🎈',
    color: 'indigo',
    toolCount: 1,
    popularTools: ['druck-umrechner'],
    metaTitle: 'Druck-Umrechner – Bar, PSI, Pascal, Atmosphäre',
    metaDescription: 'Bar in PSI umrechnen und mehr. Kostenloser Druck-Umrechner auf Deutsch.'
  },
  energie: {
    slug: 'energie',
    name: 'Energie & Arbeit',
    description: 'Umrechner für Energieeinheiten wie Joule, kWh, Kalorien und BTU.',
    icon: '⚡',
    color: 'yellow',
    toolCount: 1,
    popularTools: ['energie-umrechner'],
    metaTitle: 'Energie-Umrechner – Joule, kWh, Kalorien, BTU',
    metaDescription: 'Joule in kWh umrechnen, Kalorien in Joule. Kostenloser Energie-Umrechner auf Deutsch.'
  },
  leistung: {
    slug: 'leistung',
    name: 'Leistung',
    description: 'Umrechner für Leistungseinheiten wie Watt, kW, PS und Pferdestärke.',
    icon: '💪',
    color: 'green',
    toolCount: 1,
    popularTools: ['leistung-umrechner'],
    metaTitle: 'Leistungs-Umrechner – Watt, kW, PS, Pferdestärke',
    metaDescription: 'kW in PS umrechnen und mehr. Kostenloser Leistungs-Umrechner auf Deutsch.'
  },
  kraft: {
    slug: 'kraft',
    name: 'Kraft',
    description: 'Umrechner für Krafteinheiten wie Newton, Kilonewton und Kilopond.',
    icon: '🔧',
    color: 'slate',
    toolCount: 1,
    popularTools: ['kraft-umrechner'],
    metaTitle: 'Kraft-Umrechner – Newton, Kilonewton, Kilopond',
    metaDescription: 'Newton in Kilopond umrechnen und mehr. Kostenloser Kraft-Umrechner auf Deutsch.'
  },
  winkel: {
    slug: 'winkel',
    name: 'Winkel',
    description: 'Umrechner für Winkeleinheiten wie Grad, Radiant und Gon.',
    icon: '📐',
    color: 'teal',
    toolCount: 1,
    popularTools: ['winkel-umrechner'],
    metaTitle: 'Winkel-Umrechner – Grad, Radiant, Gon',
    metaDescription: 'Grad in Radiant umrechnen und mehr. Kostenloser Winkel-Umrechner auf Deutsch.'
  },
  digital: {
    slug: 'digital',
    name: 'Digital & Datenspeicher',
    description: 'Umrechner für digitale Einheiten wie Byte, Kilobyte, Megabyte und Gigabyte.',
    icon: '💾',
    color: 'violet',
    toolCount: 4,
    popularTools: ['datenspeicher-umrechner', 'datentransfer-umrechner'],
    metaTitle: 'Datenspeicher-Umrechner – MB, GB, TB umrechnen',
    metaDescription: 'MB in GB umrechnen, Datentransferraten und mehr. Kostenloser Digital-Umrechner auf Deutsch.'
  },
  technik: {
    slug: 'technik',
    name: 'Technik & Engineering',
    description: 'Umrechner für technische Einheiten wie Dichte, Drehmoment und Beschleunigung.',
    icon: '⚙️',
    color: 'gray',
    toolCount: 5,
    popularTools: ['dichte-umrechner', 'drehmoment-umrechner'],
    metaTitle: 'Technik-Umrechner – Dichte, Drehmoment, Beschleunigung',
    metaDescription: 'Technische Einheiten umrechnen. Kostenloser Technik-Umrechner auf Deutsch.'
  },
  waerme: {
    slug: 'waerme',
    name: 'Wärme & Thermodynamik',
    description: 'Umrechner für Wärmeeinheiten und thermische Eigenschaften.',
    icon: '🔥',
    color: 'orange',
    toolCount: 4,
    popularTools: [],
    metaTitle: 'Wärme-Umrechner – Wärmeleitfähigkeit, Wärmewiderstand',
    metaDescription: 'Wärmeeinheiten umrechnen. Kostenloser Wärme-Umrechner auf Deutsch.'
  },
  fluessigkeiten: {
    slug: 'fluessigkeiten',
    name: 'Flüssigkeiten & Strömung',
    description: 'Umrechner für Volumenstrom, Massenstrom und Viskosität.',
    icon: '💧',
    color: 'blue',
    toolCount: 4,
    popularTools: ['volumenstrom-umrechner'],
    metaTitle: 'Volumenstrom-Umrechner – L/min, m³/h, GPM',
    metaDescription: 'Volumenstrom umrechnen. Kostenloser Flüssigkeits-Umrechner auf Deutsch.'
  },
  licht: {
    slug: 'licht',
    name: 'Licht & Optik',
    description: 'Umrechner für Licht- und optische Einheiten.',
    icon: '💡',
    color: 'amber',
    toolCount: 3,
    popularTools: ['frequenz-umrechner'],
    metaTitle: 'Licht-Umrechner – Lux, Candela, Frequenz',
    metaDescription: 'Lichteinheiten umrechnen. Kostenloser Licht-Umrechner auf Deutsch.'
  },
  elektrizitaet: {
    slug: 'elektrizitaet',
    name: 'Elektrizität',
    description: 'Umrechner für elektrische Einheiten wie Volt, Ampere, Ohm und Farad.',
    icon: '🔌',
    color: 'yellow',
    toolCount: 6,
    popularTools: ['spannung-umrechner', 'strom-umrechner'],
    metaTitle: 'Elektrizitäts-Umrechner – Volt, Ampere, Ohm',
    metaDescription: 'Elektrische Einheiten umrechnen. Kostenloser Elektrizitäts-Umrechner auf Deutsch.'
  },
  magnetismus: {
    slug: 'magnetismus',
    name: 'Magnetismus',
    description: 'Umrechner für magnetische Einheiten wie Tesla, Gauss und Weber.',
    icon: '🧲',
    color: 'red',
    toolCount: 2,
    popularTools: [],
    metaTitle: 'Magnetismus-Umrechner – Tesla, Gauss, Weber',
    metaDescription: 'Magnetische Einheiten umrechnen. Kostenloser Magnetismus-Umrechner auf Deutsch.'
  },
  strahlung: {
    slug: 'strahlung',
    name: 'Strahlung',
    description: 'Umrechner für Strahlungseinheiten wie Becquerel, Sievert und Gray.',
    icon: '☢️',
    color: 'lime',
    toolCount: 2,
    popularTools: [],
    metaTitle: 'Strahlungs-Umrechner – Becquerel, Sievert, Gray',
    metaDescription: 'Strahlungseinheiten umrechnen. Kostenloser Strahlungs-Umrechner auf Deutsch.'
  },
  alltag: {
    slug: 'alltag',
    name: 'Alltag & Lifestyle',
    description: 'Praktische Umrechner für den Alltag wie Schuhgrößen und Kleidergrößen.',
    icon: '👔',
    color: 'pink',
    toolCount: 4,
    popularTools: ['schuhgroesse-umrechner', 'kleidergroesse-umrechner'],
    metaTitle: 'Alltags-Umrechner – Schuhgröße, Kleidergröße, Kochen',
    metaDescription: 'Schuhgrößen und Kleidergrößen umrechnen. Kostenloser Alltags-Umrechner auf Deutsch.'
  },
  design: {
    slug: 'design',
    name: 'Design & Typografie',
    description: 'Umrechner für Designer wie px, pt, em und HEX/RGB.',
    icon: '🎨',
    color: 'fuchsia',
    toolCount: 2,
    popularTools: ['typografie-umrechner', 'farb-umrechner'],
    metaTitle: 'Design-Umrechner – px, pt, em, HEX, RGB',
    metaDescription: 'Pixel in Punkt umrechnen, HEX in RGB. Kostenloser Design-Umrechner auf Deutsch.'
  },
  sonstige: {
    slug: 'sonstige',
    name: 'Sonstige Einheiten',
    description: 'Weitere Einheitenumrechner wie römische Zahlen und SI-Präfixe.',
    icon: '📊',
    color: 'stone',
    toolCount: 6,
    popularTools: ['roemische-zahlen-umrechner', 'bmi-rechner'],
    metaTitle: 'Sonstige Umrechner – Römische Zahlen, BMI, Kalorien',
    metaDescription: 'Römische Zahlen und mehr umrechnen. Kostenloser Umrechner auf Deutsch.'
  },
  mathematik: {
    slug: 'mathematik',
    name: 'Prozent & Mathematik',
    description: 'Mathe-Rechner für Prozent, Dreisatz, Pythagoras und mehr.',
    icon: '🧮',
    color: 'blue',
    toolCount: 6,
    popularTools: ['prozent-rechner', 'dreisatz-rechner'],
    metaTitle: 'Mathe-Rechner – Prozent, Dreisatz, Pythagoras',
    metaDescription: 'Prozent berechnen, Dreisatz rechnen. Kostenloser Mathe-Rechner auf Deutsch.'
  },
  finanzen: {
    slug: 'finanzen',
    name: 'Finanzen & Wirtschaft',
    description: 'Finanzrechner für MwSt, Zinsen, Kredite und Gehalt.',
    icon: '💰',
    color: 'emerald',
    toolCount: 6,
    popularTools: ['mehrwertsteuer-rechner', 'gehalt-rechner'],
    metaTitle: 'Finanzrechner – MwSt, Zinsen, Kredit, Gehalt',
    metaDescription: 'Mehrwertsteuer berechnen, Nettogehalt aus Brutto. Kostenloser Finanzrechner auf Deutsch.'
  },
  datum: {
    slug: 'datum',
    name: 'Datum & Zeitrechner',
    description: 'Datumsrechner für Altersberechnung, Datumsdifferenz und Zeitzonen.',
    icon: '📅',
    color: 'sky',
    toolCount: 4,
    popularTools: ['datum-rechner', 'alter-rechner'],
    metaTitle: 'Datumsrechner – Alter, Datumsdifferenz, Zeitzone',
    metaDescription: 'Alter berechnen, Datum differenz. Kostenloser Datumsrechner auf Deutsch.'
  },
  gesundheit: {
    slug: 'gesundheit',
    name: 'Gesundheit & Fitness',
    description: 'Gesundheitsrechner für BMI, Grundumsatz und Körperfett.',
    icon: '❤️',
    color: 'rose',
    toolCount: 4,
    popularTools: ['bmr-rechner', 'koerperfett-rechner'],
    metaTitle: 'Gesundheitsrechner – BMI, Grundumsatz, Körperfett',
    metaDescription: 'BMI berechnen, Kalorienbedarf ermitteln. Kostenloser Gesundheitsrechner auf Deutsch.'
  },
  'energie-rechner': {
    slug: 'energie-rechner',
    name: 'Strom & Energiekosten',
    description: 'Rechner für Stromverbrauch, Kraftstoffkosten und CO₂.',
    icon: '🔋',
    color: 'green',
    toolCount: 4,
    popularTools: ['stromverbrauch-rechner', 'co2-rechner'],
    metaTitle: 'Energiekosten-Rechner – Stromverbrauch, CO₂',
    metaDescription: 'Stromkosten berechnen, CO₂-Fußabdruck. Kostenloser Energiekosten-Rechner auf Deutsch.'
  },
  bauen: {
    slug: 'bauen',
    name: 'Bauen & Wohnen',
    description: 'Baurechner für Fliesen, Tapeten, Farbe und Reifengrößen.',
    icon: '🏠',
    color: 'amber',
    toolCount: 4,
    popularTools: ['fliesen-rechner', 'reifengroesse-umrechner'],
    metaTitle: 'Baurechner – Fliesen, Tapeten, Farbe, Reifen',
    metaDescription: 'Fliesenbedarf berechnen, Farbmenge ermitteln. Kostenloser Baurechner auf Deutsch.'
  },
  developer: {
    slug: 'developer',
    name: 'Developer-Tools',
    description: 'Entwickler-Tools wie Base64, ASCII, IP-Subnetz und Hex.',
    icon: '💻',
    color: 'slate',
    toolCount: 5,
    popularTools: ['base64-umrechner', 'ascii-umrechner'],
    metaTitle: 'Developer-Tools – Base64, ASCII, Hex, IP-Subnetz',
    metaDescription: 'Base64 kodieren, ASCII umrechnen. Kostenloser Developer-Tools auf Deutsch.'
  },
  text: {
    slug: 'text',
    name: 'Text & Wörter',
    description: 'Text-Tools wie Wörterzähler, Zeichenzähler und Textumkehrung.',
    icon: '📝',
    color: 'neutral',
    toolCount: 3,
    popularTools: ['woerterzaehler', 'zeichenzaehler'],
    metaTitle: 'Text-Tools – Wörter zählen, Zeichen zählen',
    metaDescription: 'Wörter und Zeichen zählen. Kostenloser Text-Tools auf Deutsch.'
  },
  kochen: {
    slug: 'kochen',
    name: 'Kochen & Backen',
    description: 'Koch-Umrechner für Einheiten und Rezept-Skalierung.',
    icon: '🍳',
    color: 'orange',
    toolCount: 2,
    popularTools: ['kocheinheiten-umrechner'],
    metaTitle: 'Koch-Umrechner – EL, TL, Cups, ml',
    metaDescription: 'Esslöffel in ml, Cups in Gramm. Kostenloser Koch-Umrechner auf Deutsch.'
  },
  geografie: {
    slug: 'geografie',
    name: 'Geografie & Navigation',
    description: 'Umrechner für Koordinaten und Entfernungen.',
    icon: '🌍',
    color: 'teal',
    toolCount: 2,
    popularTools: ['koordinaten-umrechner'],
    metaTitle: 'Geo-Umrechner – Koordinaten, Entfernung',
    metaDescription: 'GPS-Koordinaten umrechnen, Entfernung berechnen. Kostenloser Geo-Umrechner auf Deutsch.'
  },
  schule: {
    slug: 'schule',
    name: 'Schule & Bildung',
    description: 'Bildungsrechner für Noten, Dreiecke und Binomialkoeffizienten.',
    icon: '📚',
    color: 'indigo',
    toolCount: 3,
    popularTools: ['noten-rechner', 'dreieck-rechner'],
    metaTitle: 'Bildungsrechner – Noten, Mathe, Abitur',
    metaDescription: 'Notendurchschnitt berechnen, Abiturnote. Kostenloser Bildungsrechner auf Deutsch.'
  },
  rechner: {
    slug: 'rechner',
    name: 'Sonstige Rechner',
    description: 'Weitere Rechner wie Trinkgeld, Einheitspreis und Ohmsches Gesetz.',
    icon: '🔢',
    color: 'violet',
    toolCount: 3,
    popularTools: ['trinkgeld-rechner', 'ohm-rechner'],
    metaTitle: 'Sonstige Rechner – Trinkgeld, Einheitspreis',
    metaDescription: 'Trinkgeld berechnen und mehr. Kostenloser Rechner auf Deutsch.'
  }
};

/**
 * Gibt alle Kategorien als Array zurück
 */
export function getAllCategories(): Category[] {
  return Object.values(categories);
}

/**
 * Gibt eine Kategorie anhand ihres Slugs zurück
 */
export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return categories[slug];
}

/**
 * Gibt die beliebtesten Kategorien zurück
 */
export function getPopularCategories(limit: number = 8): Category[] {
  return Object.values(categories)
    .sort((a, b) => b.toolCount - a.toolCount)
    .slice(0, limit);
}
