/**
 * Master Tools Registry
 * Alle 100+ Umrechner und Rechner für UmrechnerPro.de
 */

import { CategorySlug } from './categories';

// === TYPEN ===

export type UnitDefinition = {
  value: string;
  label: string;
  symbol: string;
};

export type SubConversion = {
  fromUnit: string;
  toUnit: string;
  fromLabel: string;
  toLabel: string;
  slug: string;
  searchVolume: string;
  h1: string;
  metaDescription: string;
  priority: number;
};

export type Tool = {
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  category: CategorySlug;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  units?: UnitDefinition[];
  popularConversions?: SubConversion[];
  baseUnit?: string;
  searchVolumeDE: string;
  difficulty: 'low' | 'medium' | 'high';
  cpcLevel: 'low' | 'medium' | 'high';
  relatedTools: string[];
  lastUpdated: string;
  featured: boolean;
  affiliateId?: string;
  icon: string;
  isCalculator?: boolean;
};

// === WERKZEUGE REGISTRIERUNG ===

export const tools: Record<string, Tool> = {
  // ==========================================
  // === LÄNGE & FLÄCHE & VOLUMEN ===
  // ==========================================
  'laengen-umrechner': {
    slug: 'laengen-umrechner',
    name: 'Längen-Umrechner',
    shortDescription: 'Umrechnen von Längeneinheiten wie Meter, Kilometer, Zoll und Fuß.',
    metaTitle: 'Längen-Umrechner – cm, m, km, Zoll, Fuß & Meilen 2026',
    metaDescription: 'Kostenloser Längen-Umrechner: cm in Zoll, Meter in Fuß und mehr. Präzise, sofort, auf Deutsch.',
    category: 'laenge',
    h1: 'Längen-Umrechner – cm, m, km, Zoll, Fuß & Meilen 2026',
    primaryKeyword: 'längen umrechner',
    secondaryKeywords: ['cm in zoll', 'meter in fuss', 'km in meilen', 'zoll in cm'],
    units: [
      { value: 'mm', label: 'Millimeter', symbol: 'mm' },
      { value: 'cm', label: 'Zentimeter', symbol: 'cm' },
      { value: 'm', label: 'Meter', symbol: 'm' },
      { value: 'km', label: 'Kilometer', symbol: 'km' },
      { value: 'in', label: 'Zoll', symbol: 'in' },
      { value: 'ft', label: 'Fuß', symbol: 'ft' },
      { value: 'yd', label: 'Yard', symbol: 'yd' },
      { value: 'mi', label: 'Meile', symbol: 'mi' },
    ],
    popularConversions: [
      { fromUnit: 'cm', toUnit: 'in', fromLabel: 'Zentimeter', toLabel: 'Zoll', slug: 'cm-in-zoll', searchVolume: '500K', h1: 'cm in Zoll umrechnen – Rechner & Tabelle 2026', metaDescription: 'Zentimeter in Zoll umrechnen. 1 cm = 0,3937 Zoll.', priority: 10 },
      { fromUnit: 'in', toUnit: 'cm', fromLabel: 'Zoll', toLabel: 'Zentimeter', slug: 'zoll-in-cm', searchVolume: '500K', h1: 'Zoll in cm umrechnen – Rechner & Tabelle 2026', metaDescription: 'Zoll in Zentimeter umrechnen. 1 Zoll = 2,54 cm.', priority: 10 },
    ],
    baseUnit: 'm',
    searchVolumeDE: '500K+',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['flaechen-umrechner', 'volumen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📏'
  },
  
  'flaechen-umrechner': {
    slug: 'flaechen-umrechner',
    name: 'Flächen-Umrechner',
    shortDescription: 'Umrechnen von Flächeneinheiten wie Quadratmeter, Hektar und Acre.',
    metaTitle: 'Flächen-Umrechner – m², km², Hektar, Acre 2026',
    metaDescription: 'Kostenloser Flächen-Umrechner: Quadratmeter, Hektar, Acre und mehr.',
    category: 'laenge',
    h1: 'Flächen-Umrechner – m², km², Hektar, Acre & Quadratfuß 2026',
    primaryKeyword: 'flächen umrechner',
    secondaryKeywords: ['hektar in m2', 'm2 in hektar', 'acre in hektar'],
    units: [
      { value: 'mm2', label: 'Quadratmillimeter', symbol: 'mm²' },
      { value: 'cm2', label: 'Quadratzentimeter', symbol: 'cm²' },
      { value: 'm2', label: 'Quadratmeter', symbol: 'm²' },
      { value: 'km2', label: 'Quadratkilometer', symbol: 'km²' },
      { value: 'ha', label: 'Hektar', symbol: 'ha' },
      { value: 'a', label: 'Ar', symbol: 'a' },
      { value: 'ac', label: 'Acre', symbol: 'ac' },
    ],
    baseUnit: 'm2',
    searchVolumeDE: '150K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['laengen-umrechner', 'volumen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📐'
  },
  
  'volumen-umrechner': {
    slug: 'volumen-umrechner',
    name: 'Volumen-Umrechner',
    shortDescription: 'Umrechnen von Volumeneinheiten wie Liter, Milliliter und Gallonen.',
    metaTitle: 'Volumen-Umrechner – Liter, mL, m³, Gallone 2026',
    metaDescription: 'Kostenloser Volumen-Umrechner: Liter, Milliliter, Gallonen und mehr.',
    category: 'laenge',
    h1: 'Volumen-Umrechner – Liter, mL, m³, Gallone & Pint 2026',
    primaryKeyword: 'volumen umrechner',
    secondaryKeywords: ['liter in gallonen', 'ml in liter', 'cups in ml'],
    units: [
      { value: 'mL', label: 'Milliliter', symbol: 'mL' },
      { value: 'L', label: 'Liter', symbol: 'L' },
      { value: 'm3', label: 'Kubikmeter', symbol: 'm³' },
      { value: 'gal_us', label: 'US Gallone', symbol: 'gal' },
      { value: 'cup_us', label: 'US Cup', symbol: 'cup' },
    ],
    baseUnit: 'L',
    searchVolumeDE: '80K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['laengen-umrechner', 'kocheinheiten-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🧊'
  },

  // ==========================================
  // === GEWICHT & MASSE ===
  // ==========================================
  'gewicht-umrechner': {
    slug: 'gewicht-umrechner',
    name: 'Gewicht-Umrechner',
    shortDescription: 'Umrechnen von Gewichtseinheiten wie Kilogramm, Pfund und Unzen.',
    metaTitle: 'Gewicht-Umrechner – kg, Gramm, Pfund, Unzen 2026',
    metaDescription: 'Kostenloser Gewicht-Umrechner: Kilogramm in Pfund, Gramm in Unzen und mehr.',
    category: 'gewicht',
    h1: 'Gewicht-Umrechner – kg, Gramm, Pfund, Unzen & Tonnen 2026',
    primaryKeyword: 'gewicht umrechner',
    secondaryKeywords: ['kg in pfund', 'pfund in kg', 'gramm in unzen'],
    units: [
      { value: 'mg', label: 'Milligramm', symbol: 'mg' },
      { value: 'g', label: 'Gramm', symbol: 'g' },
      { value: 'kg', label: 'Kilogramm', symbol: 'kg' },
      { value: 't', label: 'Tonne', symbol: 't' },
      { value: 'lb', label: 'Pfund', symbol: 'lb' },
      { value: 'oz', label: 'Unze', symbol: 'oz' },
    ],
    popularConversions: [
      { fromUnit: 'kg', toUnit: 'lb', fromLabel: 'Kilogramm', toLabel: 'Pfund', slug: 'kg-in-pfund', searchVolume: '450K', h1: 'kg in Pfund umrechnen – Rechner & Tabelle 2026', metaDescription: 'Kilogramm in Pfund umrechnen. 1 kg = 2,2046 lb.', priority: 10 },
    ],
    baseUnit: 'kg',
    searchVolumeDE: '450K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['kocheinheiten-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⚖️'
  },

  // ==========================================
  // === TEMPERATUR ===
  // ==========================================
  'temperatur-umrechner': {
    slug: 'temperatur-umrechner',
    name: 'Temperatur-Umrechner',
    shortDescription: 'Umrechnen von Temperatureinheiten wie Celsius, Fahrenheit und Kelvin.',
    metaTitle: 'Temperatur-Umrechner – Celsius, Fahrenheit, Kelvin 2026',
    metaDescription: 'Celsius in Fahrenheit umrechnen und mehr. Kostenloser Temperatur-Umrechner.',
    category: 'temperatur',
    h1: 'Temperatur-Umrechner – Celsius, Fahrenheit & Kelvin 2026',
    primaryKeyword: 'temperatur umrechner',
    secondaryKeywords: ['celsius in fahrenheit', 'fahrenheit in celsius', 'celsius in kelvin'],
    units: [
      { value: 'C', label: 'Celsius', symbol: '°C' },
      { value: 'F', label: 'Fahrenheit', symbol: '°F' },
      { value: 'K', label: 'Kelvin', symbol: 'K' },
    ],
    popularConversions: [
      { fromUnit: 'C', toUnit: 'F', fromLabel: 'Celsius', toLabel: 'Fahrenheit', slug: 'celsius-in-fahrenheit', searchVolume: '400K', h1: 'Celsius in Fahrenheit umrechnen – Rechner 2026', metaDescription: 'Celsius in Fahrenheit: °F = °C × 9/5 + 32.', priority: 10 },
    ],
    baseUnit: 'C',
    searchVolumeDE: '400K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['energie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🌡️'
  },

  // ==========================================
  // === ZEIT ===
  // ==========================================
  'zeit-umrechner': {
    slug: 'zeit-umrechner',
    name: 'Zeit-Umrechner',
    shortDescription: 'Sekunden, Minuten, Stunden und Tage umrechnen.',
    metaTitle: 'Zeit-Umrechner – Sekunden, Minuten, Stunden 2026',
    metaDescription: 'Zeit umrechnen: Sekunden in Minuten, Stunden in Tage. Kostenloser Zeit-Umrechner.',
    category: 'zeit',
    h1: 'Zeit-Umrechner – Sekunden, Minuten, Stunden & Tage 2026',
    primaryKeyword: 'zeit umrechner',
    secondaryKeywords: ['sekunden in minuten', 'stunden in minuten', 'tage in stunden'],
    units: [
      { value: 'ms', label: 'Millisekunde', symbol: 'ms' },
      { value: 's', label: 'Sekunde', symbol: 's' },
      { value: 'min', label: 'Minute', symbol: 'min' },
      { value: 'h', label: 'Stunde', symbol: 'h' },
      { value: 'd', label: 'Tag', symbol: 'd' },
      { value: 'w', label: 'Woche', symbol: 'w' },
      { value: 'mo', label: 'Monat', symbol: 'mo' },
      { value: 'y', label: 'Jahr', symbol: 'y' },
    ],
    baseUnit: 's',
    searchVolumeDE: '150K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['datum-rechner', 'alter-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⏱️'
  },

  // ==========================================
  // === GESCHWINDIGKEIT ===
  // ==========================================
  'geschwindigkeit-umrechner': {
    slug: 'geschwindigkeit-umrechner',
    name: 'Geschwindigkeits-Umrechner',
    shortDescription: 'km/h in mph umrechnen, Knoten in km/h.',
    metaTitle: 'Geschwindigkeits-Umrechner – km/h, mph, m/s 2026',
    metaDescription: 'km/h in mph umrechnen, Knoten in km/h. Kostenloser Geschwindigkeits-Umrechner.',
    category: 'geschwindigkeit',
    h1: 'Geschwindigkeits-Umrechner – km/h, mph, m/s & Knoten 2026',
    primaryKeyword: 'geschwindigkeit umrechner',
    secondaryKeywords: ['kmh in mph', 'mph in kmh', 'knoten in kmh'],
    units: [
      { value: 'm/s', label: 'Meter/Sekunde', symbol: 'm/s' },
      { value: 'km/h', label: 'km/h', symbol: 'km/h' },
      { value: 'mph', label: 'mph', symbol: 'mph' },
      { value: 'kn', label: 'Knoten', symbol: 'kn' },
      { value: 'mach', label: 'Mach', symbol: 'Ma' },
    ],
    popularConversions: [
      { fromUnit: 'mph', toUnit: 'km/h', fromLabel: 'mph', toLabel: 'km/h', slug: 'mph-in-kmh', searchVolume: '250K', h1: 'mph in km/h umrechnen – Rechner 2026', metaDescription: 'Meilen pro Stunde in Kilometer pro Stunde.', priority: 9 },
    ],
    baseUnit: 'm/s',
    searchVolumeDE: '250K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['laengen-umrechner', 'zeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🚗'
  },

  // ==========================================
  // === DRUCK ===
  // ==========================================
  'druck-umrechner': {
    slug: 'druck-umrechner',
    name: 'Druck-Umrechner',
    shortDescription: 'Bar, PSI, Pascal und Atmosphäre umrechnen.',
    metaTitle: 'Druck-Umrechner – Pascal, bar, PSI, atm 2026',
    metaDescription: 'Bar in PSI umrechnen und mehr. Kostenloser Druck-Umrechner.',
    category: 'druck',
    h1: 'Druck-Umrechner – Pascal, bar, PSI, atm & kPa 2026',
    primaryKeyword: 'druck umrechner',
    secondaryKeywords: ['bar in psi', 'psi in bar', 'pascal in bar'],
    units: [
      { value: 'Pa', label: 'Pascal', symbol: 'Pa' },
      { value: 'kPa', label: 'Kilopascal', symbol: 'kPa' },
      { value: 'bar', label: 'Bar', symbol: 'bar' },
      { value: 'psi', label: 'PSI', symbol: 'psi' },
      { value: 'atm', label: 'Atmosphäre', symbol: 'atm' },
      { value: 'mmHg', label: 'mmHg', symbol: 'mmHg' },
    ],
    baseUnit: 'Pa',
    searchVolumeDE: '80K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['leistung-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🎈'
  },

  // ==========================================
  // === ENERGIE ===
  // ==========================================
  'energie-umrechner': {
    slug: 'energie-umrechner',
    name: 'Energie-Umrechner',
    shortDescription: 'Joule, kWh, Kalorien und BTU umrechnen.',
    metaTitle: 'Energie-Umrechner – Joule, kWh, kcal, BTU 2026',
    metaDescription: 'Joule in kWh, kcal in kJ umrechnen. Kostenloser Energie-Umrechner.',
    category: 'energie',
    h1: 'Energie-Umrechner – Joule, kWh, kcal, eV & BTU 2026',
    primaryKeyword: 'energie umrechner',
    secondaryKeywords: ['joule in kwh', 'kcal in kj', 'kj in kcal'],
    units: [
      { value: 'J', label: 'Joule', symbol: 'J' },
      { value: 'kJ', label: 'Kilojoule', symbol: 'kJ' },
      { value: 'kWh', label: 'Kilowattstunde', symbol: 'kWh' },
      { value: 'kcal', label: 'Kilokalorie', symbol: 'kcal' },
      { value: 'BTU', label: 'BTU', symbol: 'BTU' },
    ],
    baseUnit: 'J',
    searchVolumeDE: '70K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['kalorienrechner', 'leistung-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⚡'
  },

  // ==========================================
  // === LEISTUNG ===
  // ==========================================
  'leistung-umrechner': {
    slug: 'leistung-umrechner',
    name: 'Leistungs-Umrechner',
    shortDescription: 'kW in PS umrechnen und mehr.',
    metaTitle: 'Leistungs-Umrechner – Watt, kW, PS 2026',
    metaDescription: 'kW in PS umrechnen, Pferdestärke berechnen. Kostenloser Leistungs-Umrechner.',
    category: 'leistung',
    h1: 'Leistungs-Umrechner – Watt, kW, PS & Pferdestärke 2026',
    primaryKeyword: 'leistung umrechner',
    secondaryKeywords: ['kw in ps', 'ps in kw', 'watt in kw'],
    units: [
      { value: 'W', label: 'Watt', symbol: 'W' },
      { value: 'kW', label: 'Kilowatt', symbol: 'kW' },
      { value: 'MW', label: 'Megawatt', symbol: 'MW' },
      { value: 'PS', label: 'Pferdestärke', symbol: 'PS' },
      { value: 'HP', label: 'Horsepower', symbol: 'HP' },
    ],
    popularConversions: [
      { fromUnit: 'kW', toUnit: 'PS', fromLabel: 'Kilowatt', toLabel: 'PS', slug: 'kw-in-ps', searchVolume: '100K', h1: 'kW in PS umrechnen – Rechner 2026', metaDescription: 'Kilowatt in Pferdestärke. 1 kW = 1,36 PS.', priority: 8 },
    ],
    baseUnit: 'W',
    searchVolumeDE: '100K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['energie-umrechner', 'geschwindigkeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💪'
  },

  // ==========================================
  // === KRAFT ===
  // ==========================================
  'kraft-umrechner': {
    slug: 'kraft-umrechner',
    name: 'Kraft-Umrechner',
    shortDescription: 'Newton, Kilonewton, Kilopond und Dyn umrechnen.',
    metaTitle: 'Kraft-Umrechner – Newton, kN, Kilopond 2026',
    metaDescription: 'Newton in Kilopond umrechnen und mehr. Kostenloser Kraft-Umrechner.',
    category: 'kraft',
    h1: 'Kraft-Umrechner – Newton, kN, Kilopond & Dyn 2026',
    primaryKeyword: 'kraft umrechner',
    secondaryKeywords: ['newton in kilopond', 'kn in n', 'kilopond in newton'],
    units: [
      { value: 'N', label: 'Newton', symbol: 'N' },
      { value: 'kN', label: 'Kilonewton', symbol: 'kN' },
      { value: 'kp', label: 'Kilopond', symbol: 'kp' },
      { value: 'lbf', label: 'Pound-force', symbol: 'lbf' },
      { value: 'dyn', label: 'Dyn', symbol: 'dyn' },
    ],
    baseUnit: 'N',
    searchVolumeDE: '40K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['drehmoment-umrechner', 'druck-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔧'
  },

  // ==========================================
  // === WINKEL ===
  // ==========================================
  'winkel-umrechner': {
    slug: 'winkel-umrechner',
    name: 'Winkel-Umrechner',
    shortDescription: 'Grad, Radiant, Gon und Winkelminuten umrechnen.',
    metaTitle: 'Winkel-Umrechner – Grad, Radiant, Gon 2026',
    metaDescription: 'Grad in Radiant umrechnen und mehr. Kostenloser Winkel-Umrechner.',
    category: 'winkel',
    h1: 'Winkel-Umrechner – Grad, Radiant, Gon & Bogenmaß 2026',
    primaryKeyword: 'winkel umrechner',
    secondaryKeywords: ['grad in radiant', 'radiant in grad', 'gon in grad'],
    units: [
      { value: 'deg', label: 'Grad', symbol: '°' },
      { value: 'rad', label: 'Radiant', symbol: 'rad' },
      { value: 'gon', label: 'Gon', symbol: 'gon' },
      { value: 'arcmin', label: 'Winkelminute', symbol: "'" },
      { value: 'arcsec', label: 'Winkelsekunde', symbol: '"' },
    ],
    baseUnit: 'deg',
    searchVolumeDE: '35K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['geometrie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📐'
  },

  // ==========================================
  // === DATENSPEICHER ===
  // ==========================================
  'datenspeicher-umrechner': {
    slug: 'datenspeicher-umrechner',
    name: 'Datenspeicher-Umrechner',
    shortDescription: 'MB, GB, TB und mehr umrechnen.',
    metaTitle: 'Datenspeicher-Umrechner – MB, GB, TB 2026',
    metaDescription: 'MB in GB, GB in TB umrechnen. Kostenloser Datenspeicher-Umrechner.',
    category: 'digital',
    h1: 'Datenspeicher-Umrechner – Byte, KB, MB, GB, TB & PB 2026',
    primaryKeyword: 'datenspeicher umrechner',
    secondaryKeywords: ['mb in gb', 'gb in tb', 'kb in mb'],
    units: [
      { value: 'B', label: 'Byte', symbol: 'B' },
      { value: 'KB', label: 'Kilobyte', symbol: 'KB' },
      { value: 'MB', label: 'Megabyte', symbol: 'MB' },
      { value: 'GB', label: 'Gigabyte', symbol: 'GB' },
      { value: 'TB', label: 'Terabyte', symbol: 'TB' },
      { value: 'PB', label: 'Petabyte', symbol: 'PB' },
    ],
    baseUnit: 'B',
    searchVolumeDE: '70K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['datentransfer-umrechner', 'zahlen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💾'
  },

  'datentransfer-umrechner': {
    slug: 'datentransfer-umrechner',
    name: 'Datentransfer-Umrechner',
    shortDescription: 'Mbps, MB/s, Kbps umrechnen.',
    metaTitle: 'Datentransfer-Umrechner – Mbps, MB/s, Kbps 2026',
    metaDescription: 'Mbps in MB/s umrechnen und mehr. Kostenloser Datentransfer-Umrechner.',
    category: 'digital',
    h1: 'Datentransfer-Umrechner – Mbps, MB/s, Kbps & Gbps 2026',
    primaryKeyword: 'datentransfer umrechner',
    secondaryKeywords: ['mbps in mbs', 'kbps in mbps', 'gbps in mbps'],
    units: [
      { value: 'bps', label: 'Bit/s', symbol: 'bps' },
      { value: 'Kbps', label: 'Kilobit/s', symbol: 'Kbps' },
      { value: 'Mbps', label: 'Megabit/s', symbol: 'Mbps' },
      { value: 'Gbps', label: 'Gigabit/s', symbol: 'Gbps' },
      { value: 'MB/s', label: 'Megabyte/s', symbol: 'MB/s' },
    ],
    baseUnit: 'bps',
    searchVolumeDE: '50K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['datenspeicher-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📶'
  },

  // ==========================================
  // === FREQUENZ ===
  // ==========================================
  'frequenz-umrechner': {
    slug: 'frequenz-umrechner',
    name: 'Frequenz-Umrechner',
    shortDescription: 'Hz, kHz, MHz, GHz umrechnen.',
    metaTitle: 'Frequenz-Umrechner – Hz, kHz, MHz, GHz 2026',
    metaDescription: 'Hertz in Kilohertz umrechnen und mehr. Kostenloser Frequenz-Umrechner.',
    category: 'technik',
    h1: 'Frequenz-Umrechner – Hz, kHz, MHz, GHz & THz 2026',
    primaryKeyword: 'frequenz umrechner',
    secondaryKeywords: ['hz in khz', 'mhz in ghz', 'khz in hz'],
    units: [
      { value: 'Hz', label: 'Hertz', symbol: 'Hz' },
      { value: 'kHz', label: 'Kilohertz', symbol: 'kHz' },
      { value: 'MHz', label: 'Megahertz', symbol: 'MHz' },
      { value: 'GHz', label: 'Gigahertz', symbol: 'GHz' },
      { value: 'THz', label: 'Terahertz', symbol: 'THz' },
      { value: 'rpm', label: 'Umdrehungen/min', symbol: 'rpm' },
    ],
    baseUnit: 'Hz',
    searchVolumeDE: '30K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['zeit-umrechner', 'licht-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📻'
  },

  // ==========================================
  // === DICHTE ===
  // ==========================================
  'dichte-umrechner': {
    slug: 'dichte-umrechner',
    name: 'Dichte-Umrechner',
    shortDescription: 'kg/m³, g/cm³, lb/ft³ umrechnen.',
    metaTitle: 'Dichte-Umrechner – kg/m³, g/cm³, lb/ft³ 2026',
    metaDescription: 'Dichte umrechnen: kg/m³ in g/cm³ und mehr. Kostenloser Dichte-Umrechner.',
    category: 'technik',
    h1: 'Dichte-Umrechner – kg/m³, g/cm³, lb/ft³ & mehr 2026',
    primaryKeyword: 'dichte umrechner',
    secondaryKeywords: ['kg m3 in g cm3', 'dichte umrechnen', 'lb ft3 in kg m3'],
    units: [
      { value: 'kg/m3', label: 'kg/m³', symbol: 'kg/m³' },
      { value: 'g/cm3', label: 'g/cm³', symbol: 'g/cm³' },
      { value: 'g/mL', label: 'g/mL', symbol: 'g/mL' },
      { value: 'lb/ft3', label: 'lb/ft³', symbol: 'lb/ft³' },
      { value: 'lb/gal', label: 'lb/gal', symbol: 'lb/gal' },
    ],
    baseUnit: 'kg/m3',
    searchVolumeDE: '20K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['gewicht-umrechner', 'volumen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🧱'
  },

  // ==========================================
  // === BESCHLEUNIGUNG ===
  // ==========================================
  'beschleunigung-umrechner': {
    slug: 'beschleunigung-umrechner',
    name: 'Beschleunigung-Umrechner',
    shortDescription: 'm/s², g, ft/s² umrechnen.',
    metaTitle: 'Beschleunigung-Umrechner – m/s², g 2026',
    metaDescription: 'Beschleunigung umrechnen: m/s² in g und mehr. Kostenloser Beschleunigungs-Umrechner.',
    category: 'technik',
    h1: 'Beschleunigung-Umrechner – m/s², g, ft/s² & mehr 2026',
    primaryKeyword: 'beschleunigung umrechner',
    secondaryKeywords: ['m s2 in g', 'g erdbeschleunigung', 'ft s2 in m s2'],
    units: [
      { value: 'm/s2', label: 'm/s²', symbol: 'm/s²' },
      { value: 'g', label: 'g (Erdbeschleunigung)', symbol: 'g' },
      { value: 'ft/s2', label: 'ft/s²', symbol: 'ft/s²' },
      { value: 'Gal', label: 'Gal', symbol: 'Gal' },
    ],
    baseUnit: 'm/s2',
    searchVolumeDE: '15K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['geschwindigkeit-umrechner', 'kraft-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🚀'
  },

  // ==========================================
  // === DREHMOMENT ===
  // ==========================================
  'drehmoment-umrechner': {
    slug: 'drehmoment-umrechner',
    name: 'Drehmoment-Umrechner',
    shortDescription: 'Nm, lb-ft, kg-m umrechnen.',
    metaTitle: 'Drehmoment-Umrechner – Nm, lb-ft, kg-m 2026',
    metaDescription: 'Newtonmeter in Pfund-Fuß umrechnen. Kostenloser Drehmoment-Umrechner.',
    category: 'technik',
    h1: 'Drehmoment-Umrechner – Nm, lb-ft, kg-m & mehr 2026',
    primaryKeyword: 'drehmoment umrechner',
    secondaryKeywords: ['nm in lb ft', 'lb ft in nm', 'drehmoment umrechnen'],
    units: [
      { value: 'Nm', label: 'Newtonmeter', symbol: 'Nm' },
      { value: 'kNm', label: 'Kilonewtonmeter', symbol: 'kNm' },
      { value: 'lb-ft', label: 'Pfund-Fuß', symbol: 'lb-ft' },
      { value: 'kg-m', label: 'Kilopondmeter', symbol: 'kg-m' },
    ],
    baseUnit: 'Nm',
    searchVolumeDE: '25K',
    difficulty: 'low',
    cpcLevel: 'medium',
    relatedTools: ['kraft-umrechner', 'leistung-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔩'
  },

  // ==========================================
  // === VISKOSITÄT ===
  // ==========================================
  'viskositaet-umrechner': {
    slug: 'viskositaet-umrechner',
    name: 'Viskosität-Umrechner',
    shortDescription: 'Pa·s, cP, mPa·s umrechnen.',
    metaTitle: 'Viskosität-Umrechner – Pa·s, cP, mPa·s 2026',
    metaDescription: 'Viskosität umrechnen: Pascal-Sekunde in Centipoise und mehr.',
    category: 'fluessigkeiten',
    h1: 'Viskosität-Umrechner – Pa·s, cP, mPa·s & Stokes 2026',
    primaryKeyword: 'viskosität umrechner',
    secondaryKeywords: ['cp in pa s', 'm pa s in cp', 'stokes umrechnen'],
    units: [
      { value: 'Pa-s', label: 'Pascal-Sekunde', symbol: 'Pa·s' },
      { value: 'mPa-s', label: 'MilliPascal-Sekunde', symbol: 'mPa·s' },
      { value: 'cP', label: 'Centipoise', symbol: 'cP' },
      { value: 'P', label: 'Poise', symbol: 'P' },
      { value: 'St', label: 'Stokes', symbol: 'St' },
    ],
    baseUnit: 'Pa-s',
    searchVolumeDE: '15K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['volumenstrom-umrechner', 'dichte-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '💧'
  },

  // ==========================================
  // === VOLUMENSTROM ===
  // ==========================================
  'volumenstrom-umrechner': {
    slug: 'volumenstrom-umrechner',
    name: 'Volumenstrom-Umrechner',
    shortDescription: 'L/min, m³/h, GPM umrechnen.',
    metaTitle: 'Volumenstrom-Umrechner – L/min, m³/h, GPM 2026',
    metaDescription: 'Volumenstrom umrechnen: Liter pro Minute in m³/h und mehr.',
    category: 'fluessigkeiten',
    h1: 'Volumenstrom-Umrechner – L/min, m³/h, GPM & mehr 2026',
    primaryKeyword: 'volumenstrom umrechner',
    secondaryKeywords: ['l min in m3 h', 'gpm in l min', 'm3 h in l min'],
    units: [
      { value: 'L/min', label: 'Liter/Minute', symbol: 'L/min' },
      { value: 'L/s', label: 'Liter/Sekunde', symbol: 'L/s' },
      { value: 'm3/h', label: 'm³/Stunde', symbol: 'm³/h' },
      { value: 'm3/s', label: 'm³/Sekunde', symbol: 'm³/s' },
      { value: 'GPM', label: 'Gallonen/Minute (US)', symbol: 'GPM' },
      { value: 'CFM', label: 'ft³/Minute', symbol: 'CFM' },
    ],
    baseUnit: 'L/s',
    searchVolumeDE: '25K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['volumen-umrechner', 'viskositaet-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🚿'
  },

  // ==========================================
  // === STROM & ELEKTRIZITÄT ===
  // ==========================================
  'strom-umrechner': {
    slug: 'strom-umrechner',
    name: 'Elektrizität-Umrechner',
    shortDescription: 'Ampere, Volt, Watt, Ohm umrechnen.',
    metaTitle: 'Elektrizität-Umrechner – Ampere, Volt, Watt 2026',
    metaDescription: 'Elektrische Einheiten umrechnen: Ampere, Volt, Watt, Ohm und mehr.',
    category: 'elektrizitaet',
    h1: 'Elektrizität-Umrechner – Ampere, Volt, Watt & Ohm 2026',
    primaryKeyword: 'elektrizität umrechner',
    secondaryKeywords: ['ampere in watt', 'volt in watt', 'ohm in kiloohm'],
    units: [
      { value: 'A', label: 'Ampere', symbol: 'A' },
      { value: 'mA', label: 'Milliampere', symbol: 'mA' },
      { value: 'V', label: 'Volt', symbol: 'V' },
      { value: 'W', label: 'Watt', symbol: 'W' },
      { value: 'Ohm', label: 'Ohm', symbol: 'Ω' },
      { value: 'F', label: 'Farad', symbol: 'F' },
    ],
    baseUnit: 'A',
    searchVolumeDE: '40K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['leistung-umrechner', 'ohm-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔌'
  },

  'ohm-rechner': {
    slug: 'ohm-rechner',
    name: 'Ohmsches Gesetz Rechner',
    shortDescription: 'Ohmsches Gesetz berechnen: Spannung, Strom, Widerstand.',
    metaTitle: 'Ohmsches Gesetz Rechner – Spannung, Strom, Widerstand 2026',
    metaDescription: 'Ohmsches Gesetz berechnen: U = R × I. Kostenloser Ohmscher Gesetz Rechner.',
    category: 'elektrizitaet',
    h1: 'Ohmsches Gesetz Rechner – Spannung, Strom & Widerstand 2026',
    primaryKeyword: 'ohmsches gesetz rechner',
    secondaryKeywords: ['ohm berechnen', 'spannung strom widerstand', 'u r i rechner'],
    searchVolumeDE: '60K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['strom-umrechner', 'leistung-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⚡',
    isCalculator: true
  },

  // ==========================================
  // === MAGNETISMUS ===
  // ==========================================
  'magnetismus-umrechner': {
    slug: 'magnetismus-umrechner',
    name: 'Magnetismus-Umrechner',
    shortDescription: 'Tesla, Gauss, Weber umrechnen.',
    metaTitle: 'Magnetismus-Umrechner – Tesla, Gauss, Weber 2026',
    metaDescription: 'Magnetische Einheiten umrechnen: Tesla in Gauss und mehr.',
    category: 'magnetismus',
    h1: 'Magnetismus-Umrechner – Tesla, Gauss, Weber & mehr 2026',
    primaryKeyword: 'magnetismus umrechner',
    secondaryKeywords: ['tesla in gauss', 'gauss in tesla', 'weber umrechnen'],
    units: [
      { value: 'T', label: 'Tesla', symbol: 'T' },
      { value: 'mT', label: 'Millitesla', symbol: 'mT' },
      { value: 'G', label: 'Gauss', symbol: 'G' },
      { value: 'Wb', label: 'Weber', symbol: 'Wb' },
      { value: 'A/m', label: 'Ampere/Meter', symbol: 'A/m' },
    ],
    baseUnit: 'T',
    searchVolumeDE: '15K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['strom-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🧲'
  },

  // ==========================================
  // === LICHT ===
  // ==========================================
  'licht-umrechner': {
    slug: 'licht-umrechner',
    name: 'Licht-Umrechner',
    shortDescription: 'Lux, Candela, Lumen umrechnen.',
    metaTitle: 'Licht-Umrechner – Lux, Candela, Lumen 2026',
    metaDescription: 'Lichteinheiten umrechnen: Lux in Candela und mehr.',
    category: 'licht',
    h1: 'Licht-Umrechner – Lux, Candela, Lumen & mehr 2026',
    primaryKeyword: 'licht umrechner',
    secondaryKeywords: ['lux in lumen', 'candela in lumen', 'lux umrechnen'],
    units: [
      { value: 'lx', label: 'Lux', symbol: 'lx' },
      { value: 'klx', label: 'Kilolux', symbol: 'klx' },
      { value: 'fc', label: 'Footcandle', symbol: 'fc' },
      { value: 'phot', label: 'Phot', symbol: 'phot' },
      { value: 'nox', label: 'Nox', symbol: 'nox' },
    ],
    baseUnit: 'lx',
    searchVolumeDE: '25K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['energie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '💡'
  },

  // ==========================================
  // === STRAHLUNG ===
  // ==========================================
  'strahlung-umrechner': {
    slug: 'strahlung-umrechner',
    name: 'Strahlung-Umrechner',
    shortDescription: 'Becquerel, Sievert, Gray umrechnen.',
    metaTitle: 'Strahlung-Umrechner – Becquerel, Sievert, Gray 2026',
    metaDescription: 'Strahlungseinheiten umrechnen: Becquerel, Sievert, Gray und mehr.',
    category: 'strahlung',
    h1: 'Strahlung-Umrechner – Becquerel, Sievert, Gray & mehr 2026',
    primaryKeyword: 'strahlung umrechner',
    secondaryKeywords: ['becquerel in sievert', 'gray in sievert', 'strahlung umrechnen'],
    units: [
      { value: 'Bq', label: 'Becquerel', symbol: 'Bq' },
      { value: 'Sv', label: 'Sievert', symbol: 'Sv' },
      { value: 'Gy', label: 'Gray', symbol: 'Gy' },
      { value: 'rad', label: 'Rad', symbol: 'rad' },
      { value: 'rem', label: 'Rem', symbol: 'rem' },
    ],
    baseUnit: 'Bq',
    searchVolumeDE: '10K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['energie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '☢️'
  },

  // ==========================================
  // === PROZENT & MATHEMATIK ===
  // ==========================================
  'prozent-rechner': {
    slug: 'prozent-rechner',
    name: 'Prozent-Rechner',
    shortDescription: 'Prozent berechnen: Prozentwert, Prozentsatz, Prozentsteigerung.',
    metaTitle: 'Prozent-Rechner – Prozentwert & Prozentsatz 2026',
    metaDescription: 'Prozent berechnen: X% von Y, Prozentsteigerung, Rabatt. Kostenloser Prozent-Rechner.',
    category: 'mathematik',
    h1: 'Prozent-Rechner – Prozentwert, Prozentsatz & -rechnung 2026',
    primaryKeyword: 'prozent rechner',
    secondaryKeywords: ['prozent berechnen', 'prozentsteigerung', 'prozentsatz'],
    searchVolumeDE: '1.2M',
    difficulty: 'high',
    cpcLevel: 'high',
    relatedTools: ['mehrwertsteuer-rechner', 'dreisatz-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🧮',
    isCalculator: true
  },

  'dreisatz-rechner': {
    slug: 'dreisatz-rechner',
    name: 'Dreisatz-Rechner',
    shortDescription: 'Direkter und indirekter Dreisatz berechnen.',
    metaTitle: 'Dreisatz-Rechner – Direkter & Indirekter Dreisatz 2026',
    metaDescription: 'Dreisatz berechnen: Direkter und indirekter Dreisatz mit Erklärung.',
    category: 'mathematik',
    h1: 'Dreisatz-Rechner – Direkter & Indirekter Dreisatz 2026',
    primaryKeyword: 'dreisatz rechner',
    secondaryKeywords: ['dreisatz berechnen', 'direkter dreisatz', 'indirekter dreisatz'],
    searchVolumeDE: '450K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['prozent-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '➗',
    isCalculator: true
  },

  'zahlen-umrechner': {
    slug: 'zahlen-umrechner',
    name: 'Zahlensystem-Umrechner',
    shortDescription: 'Dezimal, Binär, Hexadezimal, Oktal umrechnen.',
    metaTitle: 'Zahlensystem-Umrechner – Dezimal, Binär, Hex 2026',
    metaDescription: 'Zahlensysteme umrechnen: Dezimal in Binär, Hex in Dezimal und mehr.',
    category: 'mathematik',
    h1: 'Zahlensystem-Umrechner – Dezimal, Binär, Hex & Oktal 2026',
    primaryKeyword: 'zahlensystem umrechner',
    secondaryKeywords: ['dezimal in binär', 'hex in dezimal', 'binär in dezimal'],
    units: [
      { value: 'dec', label: 'Dezimal', symbol: '10' },
      { value: 'bin', label: 'Binär', symbol: '2' },
      { value: 'oct', label: 'Oktal', symbol: '8' },
      { value: 'hex', label: 'Hexadezimal', symbol: '16' },
    ],
    baseUnit: 'dec',
    searchVolumeDE: '100K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['developer-umrechner', 'datenspeicher-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🔢'
  },

  'roemische-zahlen-umrechner': {
    slug: 'roemische-zahlen-umrechner',
    name: 'Römische Zahlen Umrechner',
    shortDescription: 'Römische Zahlen in Arabische und umgekehrt umrechnen.',
    metaTitle: 'Römische Zahlen Umrechner – I, V, X, L, C, D, M 2026',
    metaDescription: 'Römische Zahlen umrechnen: Arabisch in Römisch und umgekehrt.',
    category: 'mathematik',
    h1: 'Römische Zahlen Umrechner – Arabisch ⇄ Römisch 2026',
    primaryKeyword: 'römische zahlen umrechner',
    secondaryKeywords: ['römische zahlen umrechnen', 'arabische in römische', 'römisch arabisch'],
    units: [
      { value: 'arabic', label: 'Arabisch', symbol: '1,2,3...' },
      { value: 'roman', label: 'Römisch', symbol: 'I,II,III...' },
    ],
    searchVolumeDE: '350K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['zahlen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🏛️'
  },

  'geometrie-umrechner': {
    slug: 'geometrie-umrechner',
    name: 'Geometrie-Rechner',
    shortDescription: 'Fläche und Umfang von Kreis, Rechteck, Dreieck berechnen.',
    metaTitle: 'Geometrie-Rechner – Fläche, Umfang, Volumen 2026',
    metaDescription: 'Geometrie berechnen: Kreisfläche, Rechteckfläche, Dreieck und mehr.',
    category: 'mathematik',
    h1: 'Geometrie-Rechner – Fläche, Umfang & Volumen 2026',
    primaryKeyword: 'geometrie rechner',
    secondaryKeywords: ['kreisfläche berechnen', 'rechteck fläche', 'dreieck fläche'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['flaechen-umrechner', 'volumen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📐',
    isCalculator: true
  },

  // ==========================================
  // === FINANZEN ===
  // ==========================================
  'mehrwertsteuer-rechner': {
    slug: 'mehrwertsteuer-rechner',
    name: 'Mehrwertsteuer-Rechner',
    shortDescription: 'MwSt berechnen: Brutto aus Netto, Netto aus Brutto. 19% und 7%.',
    metaTitle: 'Mehrwertsteuer-Rechner – 19% & 7% MwSt berechnen 2026',
    metaDescription: 'MwSt berechnen: Brutto aus Netto, Netto aus Brutto. 19% und 7% Satz.',
    category: 'finanzen',
    h1: 'Mehrwertsteuer-Rechner – 19% & 7% MwSt berechnen 2026',
    primaryKeyword: 'mehrwertsteuer rechner',
    secondaryKeywords: ['mwst berechnen', 'netto aus brutto', 'brutto aus netto'],
    searchVolumeDE: '800K',
    difficulty: 'high',
    cpcLevel: 'high',
    relatedTools: ['prozent-rechner', 'gehalt-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💰',
    isCalculator: true
  },

  'gehalt-rechner': {
    slug: 'gehalt-rechner',
    name: 'Gehalts-Rechner',
    shortDescription: 'Nettogehalt aus Bruttogehalt berechnen.',
    metaTitle: 'Gehalts-Rechner – Nettolohn aus Bruttolohn 2026',
    metaDescription: 'Nettogehalt berechnen: Steuerklassen 1-6, Kirchensteuer, Sozialversicherung.',
    category: 'finanzen',
    h1: 'Gehalts-Rechner – Nettolohn aus Bruttolohn 2026',
    primaryKeyword: 'gehaltsrechner netto brutto',
    secondaryKeywords: ['nettogehalt berechnen', 'brutto netto rechner', 'nettolohn'],
    searchVolumeDE: '600K',
    difficulty: 'high',
    cpcLevel: 'high',
    relatedTools: ['mehrwertsteuer-rechner', 'zinseszins-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💼',
    isCalculator: true
  },

  'zinseszins-rechner': {
    slug: 'zinseszins-rechner',
    name: 'Zinseszins-Rechner',
    shortDescription: 'Zinseszins berechnen: Endkapital, Laufzeit, Zinssatz.',
    metaTitle: 'Zinseszins-Rechner – Zinsen & Zinseszins 2026',
    metaDescription: 'Zinseszins berechnen: Endkapital aus Anfangskapital, Zinssatz und Jahren.',
    category: 'finanzen',
    h1: 'Zinseszins-Rechner – Zinsen & Zinseszins berechnen 2026',
    primaryKeyword: 'zinseszins rechner',
    secondaryKeywords: ['zinseszins berechnen', 'zinsen berechnen', 'endkapital berechnen'],
    searchVolumeDE: '200K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['kredit-rechner', 'gehalt-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📈',
    isCalculator: true
  },

  'kredit-rechner': {
    slug: 'kredit-rechner',
    name: 'Kredit-Rechner',
    shortDescription: 'Kreditrate, Gesamtkosten, Zinsen berechnen.',
    metaTitle: 'Kredit-Rechner – Rate, Zinsen, Laufzeit 2026',
    metaDescription: 'Kredit berechnen: Monatsrate, Gesamtkosten, Zinsen und Tilgung.',
    category: 'finanzen',
    h1: 'Kredit-Rechner – Rate, Zinsen, Laufzeit & Gesamtkosten 2026',
    primaryKeyword: 'kredit rechner',
    secondaryKeywords: ['kreditrate berechnen', 'darlehen rechner', 'zinsen kredit'],
    searchVolumeDE: '400K',
    difficulty: 'high',
    cpcLevel: 'high',
    relatedTools: ['zinseszins-rechner', 'gehalt-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🏦',
    isCalculator: true
  },

  // ==========================================
  // === GESUNDHEIT ===
  // ==========================================
  'bmi-rechner': {
    slug: 'bmi-rechner',
    name: 'BMI-Rechner',
    shortDescription: 'Body-Mass-Index berechnen: Gewicht, Größe, BMI-Kategorie.',
    metaTitle: 'BMI-Rechner – Body-Mass-Index berechnen 2026',
    metaDescription: 'BMI berechnen: Gewicht und Größe eingeben, BMI und Kategorie erhalten.',
    category: 'gesundheit',
    h1: 'BMI-Rechner – Body-Mass-Index berechnen 2026',
    primaryKeyword: 'bmi rechner',
    secondaryKeywords: ['bmi berechnen', 'body mass index', 'idealgewicht'],
    searchVolumeDE: '900K',
    difficulty: 'high',
    cpcLevel: 'high',
    relatedTools: ['bmr-rechner', 'kalorienrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⚖️',
    isCalculator: true
  },

  'bmr-rechner': {
    slug: 'bmr-rechner',
    name: 'Grundumsatz-Rechner (BMR)',
    shortDescription: 'Grundumsatz und Kalorienbedarf berechnen.',
    metaTitle: 'Grundumsatz-Rechner – BMR & Kalorienbedarf 2026',
    metaDescription: 'Grundumsatz (BMR) berechnen: Kalorienbedarf pro Tag ermitteln.',
    category: 'gesundheit',
    h1: 'Grundumsatz-Rechner – BMR & Kalorienbedarf 2026',
    primaryKeyword: 'grundumsatz rechner',
    secondaryKeywords: ['bmr berechnen', 'kalorienbedarf', 'basal metabolic rate'],
    searchVolumeDE: '250K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['bmi-rechner', 'kalorienrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🔥',
    isCalculator: true
  },

  'kalorienrechner': {
    slug: 'kalorienrechner',
    name: 'Kalorien-Umrechner',
    shortDescription: 'Kalorien umrechnen: kcal in kJ, Joule in Kalorien.',
    metaTitle: 'Kalorien-Umrechner – kcal, kJ & Joule 2026',
    metaDescription: 'Kalorien umrechnen: kcal in kJ, kJ in kcal.',
    category: 'gesundheit',
    h1: 'Kalorien-Umrechner – kcal, kJ & Joule 2026',
    primaryKeyword: 'kalorien umrechner',
    secondaryKeywords: ['kcal in kj', 'kj in kcal', 'joule in kalorien'],
    units: [
      { value: 'kcal', label: 'Kilokalorie', symbol: 'kcal' },
      { value: 'kJ', label: 'Kilojoule', symbol: 'kJ' },
      { value: 'cal', label: 'Kalorie', symbol: 'cal' },
      { value: 'J', label: 'Joule', symbol: 'J' },
    ],
    baseUnit: 'kcal',
    searchVolumeDE: '600K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['bmr-rechner', 'energie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🍎'
  },

  // ==========================================
  // === DATUM ===
  // ==========================================
  'datum-rechner': {
    slug: 'datum-rechner',
    name: 'Datum-Rechner',
    shortDescription: 'Tage zwischen Daten berechnen, Datum addieren.',
    metaTitle: 'Datum-Rechner – Tagesdifferenz berechnen 2026',
    metaDescription: 'Tage zwischen zwei Daten berechnen, Datum addieren.',
    category: 'datum',
    h1: 'Datum-Rechner – Tagesdifferenz & Datum berechnen 2026',
    primaryKeyword: 'datumsrechner',
    secondaryKeywords: ['tage zwischen datum', 'datum addieren', 'tage zählen'],
    searchVolumeDE: '350K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['alter-rechner', 'zeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📅',
    isCalculator: true
  },

  'alter-rechner': {
    slug: 'alter-rechner',
    name: 'Alters-Rechner',
    shortDescription: 'Genaues Alter in Jahren, Monaten und Tagen berechnen.',
    metaTitle: 'Alters-Rechner – Genaues Alter berechnen 2026',
    metaDescription: 'Alter berechnen: Geburtsdatum eingeben, Alter in Jahren, Monaten, Tagen erhalten.',
    category: 'datum',
    h1: 'Alters-Rechner – Genaues Alter in Jahren & Tagen 2026',
    primaryKeyword: 'altersrechner',
    secondaryKeywords: ['alter berechnen', 'wie alt bin ich', 'geburtsdatum alter'],
    searchVolumeDE: '400K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['datum-rechner', 'zeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🎂',
    isCalculator: true
  },

  // ==========================================
  // === ALLTAG & LIFESTYLE ===
  // ==========================================
  'schuhgroesse-umrechner': {
    slug: 'schuhgroesse-umrechner',
    name: 'Schuhgröße-Umrechner',
    shortDescription: 'Schuhgrößen EU, UK, US umrechnen.',
    metaTitle: 'Schuhgröße-Umrechner – EU, UK, US & cm 2026',
    metaDescription: 'Schuhgrößen EU in US, UK in EU umrechnen.',
    category: 'alltag',
    h1: 'Schuhgröße-Umrechner – EU, UK, US & cm 2026',
    primaryKeyword: 'schuhgröße umrechner',
    secondaryKeywords: ['schuhgröße eu us', 'schuhgröße umrechnen', 'us in eu schuhgröße'],
    units: [
      { value: 'EU', label: 'EU', symbol: 'EU' },
      { value: 'UK', label: 'UK', symbol: 'UK' },
      { value: 'US_M', label: 'US Männer', symbol: 'US' },
      { value: 'US_W', label: 'US Frauen', symbol: 'US' },
      { value: 'cm', label: 'cm', symbol: 'cm' },
    ],
    searchVolumeDE: '100K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['kleidergroesse-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '👟'
  },

  'kleidergroesse-umrechner': {
    slug: 'kleidergroesse-umrechner',
    name: 'Kleidergröße-Umrechner',
    shortDescription: 'Kleidergrößen EU, UK, US umrechnen.',
    metaTitle: 'Kleidergröße-Umrechner – EU, UK, US, International 2026',
    metaDescription: 'Kleidergrößen EU in US, UK in EU umrechnen.',
    category: 'alltag',
    h1: 'Kleidergröße-Umrechner – EU, UK, US & International 2026',
    primaryKeyword: 'kleidergröße umrechner',
    secondaryKeywords: ['kleidergröße eu us', 'konfektionsgröße umrechnen', 'größentabelle'],
    units: [
      { value: 'EU', label: 'EU', symbol: 'EU' },
      { value: 'UK', label: 'UK', symbol: 'UK' },
      { value: 'US', label: 'US', symbol: 'US' },
      { value: 'IT', label: 'Italien', symbol: 'IT' },
      { value: 'FR', label: 'Frankreich', symbol: 'FR' },
    ],
    searchVolumeDE: '80K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['schuhgroesse-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '👔'
  },

  'kocheinheiten-umrechner': {
    slug: 'kocheinheiten-umrechner',
    name: 'Koch-Umrechner',
    shortDescription: 'Esslöffel, Teelöffel, Cups in Gramm umrechnen.',
    metaTitle: 'Koch-Umrechner – EL, TL, Cups, Gramm 2026',
    metaDescription: 'Koch-Einheiten umrechnen: Esslöffel in Gramm, Cups in ml.',
    category: 'kochen',
    h1: 'Koch-Umrechner – EL, TL, Cups, Gramm & ml 2026',
    primaryKeyword: 'koch umrechner',
    secondaryKeywords: ['esslöffel in gramm', 'cups in gramm', 'teelöffel in gramm'],
    units: [
      { value: 'tsp', label: 'Teelöffel', symbol: 'TL' },
      { value: 'tbsp', label: 'Esslöffel', symbol: 'EL' },
      { value: 'cup', label: 'Cup', symbol: 'cup' },
      { value: 'mL', label: 'Milliliter', symbol: 'mL' },
    ],
    searchVolumeDE: '200K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['volumen-umrechner', 'gewicht-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🍳'
  },

  'kraftstoffverbrauch-umrechner': {
    slug: 'kraftstoffverbrauch-umrechner',
    name: 'Kraftstoffverbrauch-Umrechner',
    shortDescription: 'L/100km in MPG umrechnen.',
    metaTitle: 'Kraftstoffverbrauch-Umrechner – L/100km, MPG 2026',
    metaDescription: 'L/100km in MPG umrechnen und mehr.',
    category: 'alltag',
    h1: 'Kraftstoffverbrauch – L/100km, MPG & km/L 2026',
    primaryKeyword: 'kraftstoffverbrauch umrechner',
    secondaryKeywords: ['l100km in mpg', 'mpg in l100km', 'verbrauch umrechnen'],
    units: [
      { value: 'L/100km', label: 'Liter/100km', symbol: 'L/100km' },
      { value: 'mpg_us', label: 'MPG (US)', symbol: 'mpg' },
      { value: 'mpg_uk', label: 'MPG (UK)', symbol: 'mpg' },
      { value: 'km/L', label: 'km pro Liter', symbol: 'km/L' },
    ],
    searchVolumeDE: '45K',
    difficulty: 'low',
    cpcLevel: 'medium',
    relatedTools: ['geschwindigkeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⛽'
  },

  'reifengroesse-umrechner': {
    slug: 'reifengroesse-umrechner',
    name: 'Reifengröße-Umrechner',
    shortDescription: 'Reifengrößen umrechnen und verstehen.',
    metaTitle: 'Reifengröße-Umrechner – Zoll, mm, Querschnitt 2026',
    metaDescription: 'Reifengrößen umrechnen: Zoll in mm, Querschnitt verstehen.',
    category: 'alltag',
    h1: 'Reifengröße-Umrechner – Zoll, mm & Querschnitt 2026',
    primaryKeyword: 'reifengröße umrechner',
    secondaryKeywords: ['reifengröße umrechnen', 'reifendimension', 'zoll in mm reifen'],
    searchVolumeDE: '50K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['laengen-umrechner', 'geschwindigkeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🛞',
    isCalculator: true
  },

  // ==========================================
  // === DESIGN & TYPOGRAFIE ===
  // ==========================================
  'farb-umrechner': {
    slug: 'farb-umrechner',
    name: 'Farb-Umrechner',
    shortDescription: 'HEX, RGB, HSL Farben umrechnen.',
    metaTitle: 'Farb-Umrechner – HEX, RGB, HSL 2026',
    metaDescription: 'HEX in RGB, RGB in HEX umrechnen.',
    category: 'design',
    h1: 'Farb-Umrechner – HEX, RGB, HSL, HSV & CMYK 2026',
    primaryKeyword: 'farb umrechner',
    secondaryKeywords: ['hex in rgb', 'rgb in hex', 'farben umrechnen'],
    units: [
      { value: 'HEX', label: 'HEX', symbol: '#' },
      { value: 'RGB', label: 'RGB', symbol: 'rgb' },
      { value: 'HSL', label: 'HSL', symbol: 'hsl' },
      { value: 'CMYK', label: 'CMYK', symbol: 'cmyk' },
    ],
    searchVolumeDE: '50K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['typografie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🎨',
    isCalculator: true
  },

  'typografie-umrechner': {
    slug: 'typografie-umrechner',
    name: 'Typografie-Umrechner',
    shortDescription: 'px, pt, em, rem umrechnen.',
    metaTitle: 'Typografie-Umrechner – px, pt, em, rem 2026',
    metaDescription: 'Pixel in Punkt umrechnen, em in px und mehr.',
    category: 'design',
    h1: 'Typografie-Umrechner – px, pt, em, rem & mehr 2026',
    primaryKeyword: 'typografie umrechner',
    secondaryKeywords: ['px in pt', 'pt in px', 'em in px'],
    units: [
      { value: 'px', label: 'Pixel', symbol: 'px' },
      { value: 'pt', label: 'Punkt', symbol: 'pt' },
      { value: 'em', label: 'em', symbol: 'em' },
      { value: 'rem', label: 'rem', symbol: 'rem' },
      { value: 'in', label: 'Zoll', symbol: 'in' },
    ],
    searchVolumeDE: '30K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['farb-umrechner', 'laengen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔤'
  },

  // ==========================================
  // === DEVELOPER TOOLS ===
  // ==========================================
  'developer-umrechner': {
    slug: 'developer-umrechner',
    name: 'Developer-Tools',
    shortDescription: 'Base64, ASCII, Hex, IP-Subnetz umrechnen.',
    metaTitle: 'Developer-Tools – Base64, ASCII, Hex, IP 2026',
    metaDescription: 'Entwickler-Tools: Base64 kodieren, ASCII umrechnen, IP-Subnetz berechnen.',
    category: 'developer',
    h1: 'Developer-Tools – Base64, ASCII, Hex & IP-Subnetz 2026',
    primaryKeyword: 'developer tools',
    secondaryKeywords: ['base64 kodieren', 'ascii umrechnen', 'ip subnetz rechner'],
    units: [
      { value: 'text', label: 'Text', symbol: 'Text' },
      { value: 'base64', label: 'Base64', symbol: 'Base64' },
      { value: 'hex', label: 'Hexadezimal', symbol: 'Hex' },
      { value: 'binary', label: 'Binär', symbol: 'Bin' },
    ],
    searchVolumeDE: '100K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['zahlen-umrechner', 'datenspeicher-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💻'
  },

  'base64-umrechner': {
    slug: 'base64-umrechner',
    name: 'Base64-Kodierer/Deodierer',
    shortDescription: 'Text in Base64 kodieren und dekodieren.',
    metaTitle: 'Base64-Kodierer – Encode & Decode 2026',
    metaDescription: 'Base64 kodieren und dekodieren: Text in Base64 und umgekehrt.',
    category: 'developer',
    h1: 'Base64-Kodierer – Encode & Decode 2026',
    primaryKeyword: 'base64 kodierer',
    secondaryKeywords: ['base64 encode', 'base64 decode', 'base64 online'],
    searchVolumeDE: '80K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['developer-umrechner', 'ascii-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔐'
  },

  'ascii-umrechner': {
    slug: 'ascii-umrechner',
    name: 'ASCII-Umrechner',
    shortDescription: 'ASCII, Hex, Dezimal, Binär umrechnen.',
    metaTitle: 'ASCII-Umrechner – ASCII, Hex, Binär 2026',
    metaDescription: 'ASCII in Hex, Hex in ASCII umrechnen und mehr.',
    category: 'developer',
    h1: 'ASCII-Umrechner – ASCII, Hex, Dezimal & Binär 2026',
    primaryKeyword: 'ascii umrechner',
    secondaryKeywords: ['ascii in hex', 'hex in ascii', 'ascii tabelle'],
    searchVolumeDE: '60K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['developer-umrechner', 'zahlen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔤'
  },

  // ==========================================
  // === ENERGIE-KOSTEN ===
  // ==========================================
  'stromverbrauch-rechner': {
    slug: 'stromverbrauch-rechner',
    name: 'Stromverbrauchs-Rechner',
    shortDescription: 'Stromverbrauch und Kosten berechnen.',
    metaTitle: 'Stromverbrauchs-Rechner – kWh & Kosten 2026',
    metaDescription: 'Stromverbrauch berechnen, kWh-Kosten ermitteln.',
    category: 'energie-rechner',
    h1: 'Stromverbrauchs-Rechner – kWh & Kosten berechnen 2026',
    primaryKeyword: 'stromverbrauch rechner',
    secondaryKeywords: ['kwh kosten berechnen', 'stromkosten rechner', 'energieverbrauch berechnen'],
    searchVolumeDE: '250K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['energie-umrechner', 'co2-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🔋',
    isCalculator: true
  },

  'co2-rechner': {
    slug: 'co2-rechner',
    name: 'CO₂-Fußabdruck-Rechner',
    shortDescription: 'CO₂-Ausstoß berechnen.',
    metaTitle: 'CO₂-Rechner – CO₂-Fußabdruck berechnen 2026',
    metaDescription: 'CO₂-Ausstoß berechnen: Auto, Flug, Haushalt.',
    category: 'energie-rechner',
    h1: 'CO₂-Rechner – CO₂-Fußabdruck berechnen 2026',
    primaryKeyword: 'co2 rechner',
    secondaryKeywords: ['co2 ausstoß berechnen', 'co2 fußabdruck', 'klimabilanz'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['stromverbrauch-rechner', 'kraftstoffverbrauch-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🌱',
    isCalculator: true
  },

  // ==========================================
  // === SCHULE & BILDUNG ===
  // ==========================================
  'noten-rechner': {
    slug: 'noten-rechner',
    name: 'Noten-Durchschnitts-Rechner',
    shortDescription: 'Notendurchschnitt und Abiturnote berechnen.',
    metaTitle: 'Noten-Rechner – Notendurchschnitt & Abiturnote 2026',
    metaDescription: 'Notendurchschnitt berechnen, Abiturnote ermitteln.',
    category: 'schule',
    h1: 'Noten-Rechner – Notendurchschnitt & Abiturnote berechnen 2026',
    primaryKeyword: 'notendurchschnitt rechner',
    secondaryKeywords: ['notendurchschnitt berechnen', 'abiturnote berechnen', 'schnitt berechnen'],
    searchVolumeDE: '400K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['prozent-rechner', 'dreisatz-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📚',
    isCalculator: true
  },

  // ==========================================
  // === TEXT TOOLS ===
  // ==========================================
  'woerterzaehler': {
    slug: 'woerterzaehler',
    name: 'Wörter- & Zeichenzähler',
    shortDescription: 'Wörter, Zeichen, Sätze zählen.',
    metaTitle: 'Wörter-Zähler – Wörter & Zeichen zählen 2026',
    metaDescription: 'Wörter und Zeichen zählen: Textlänge, Satzanzahl, Lesedauer.',
    category: 'text',
    h1: 'Wörter- & Zeichenzähler – Textanalyse 2026',
    primaryKeyword: 'wörter zähler',
    secondaryKeywords: ['wörter zählen', 'zeichen zählen', 'textlänge'],
    searchVolumeDE: '100K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['text-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📝',
    isCalculator: true
  },

  'text-umrechner': {
    slug: 'text-umrechner',
    name: 'Text-Umrechner',
    shortDescription: 'Groß-/Kleinschreibung, Umkehren, Slugify.',
    metaTitle: 'Text-Umrechner – Groß/Klein, Umkehren 2026',
    metaDescription: 'Text umwandeln: Groß-/Kleinschreibung, Text umkehren, Slug generieren.',
    category: 'text',
    h1: 'Text-Umrechner – Groß-/Kleinschreibung & mehr 2026',
    primaryKeyword: 'text umrechner',
    secondaryKeywords: ['text groß klein', 'text umkehren', 'slugify'],
    searchVolumeDE: '50K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['woerterzaehler', 'developer-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '↔️'
  },

  // ==========================================
  // === TRINKGELD & SONTIGE ===
  // ==========================================
  'trinkgeld-rechner': {
    slug: 'trinkgeld-rechner',
    name: 'Trinkgeld-Rechner',
    shortDescription: 'Trinkgeld berechnen und aufteilen.',
    metaTitle: 'Trinkgeld-Rechner – Trinkgeld berechnen 2026',
    metaDescription: 'Trinkgeld berechnen: Prozentsatz, Aufteilung auf mehrere Personen.',
    category: 'finanzen',
    h1: 'Trinkgeld-Rechner – Trinkgeld berechnen & aufteilen 2026',
    primaryKeyword: 'trinkgeld rechner',
    secondaryKeywords: ['trinkgeld berechnen', 'tip rechner', 'rechnung aufteilen'],
    searchVolumeDE: '80K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['prozent-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💵',
    isCalculator: true
  },

  // ==========================================
  // === ADDITIONAL TOOLS TO REACH 100+ ===
  // ==========================================

  'rabatt-rechner': {
    slug: 'rabatt-rechner',
    name: 'Rabatt-Rechner',
    shortDescription: 'Rabatt und reduzierter Preis berechnen.',
    metaTitle: 'Rabatt-Rechner – Rabatt & reduzierter Preis 2026',
    metaDescription: 'Rabatt berechnen: Prozentualer Rabatt, reduzierter Preis, Ersparnis.',
    category: 'finanzen',
    h1: 'Rabatt-Rechner – Rabatt & reduzierter Preis berechnen 2026',
    primaryKeyword: 'rabatt rechner',
    secondaryKeywords: ['rabatt berechnen', 'prozent rabatt', 'preisnachlass'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['prozent-rechner', 'mehrwertsteuer-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🏷️',
    isCalculator: true
  },

  'inflations-rechner': {
    slug: 'inflations-rechner',
    name: 'Inflations-Rechner',
    shortDescription: 'Kaufkraft und Inflation berechnen.',
    metaTitle: 'Inflations-Rechner – Kaufkraft & Inflation 2026',
    metaDescription: 'Inflation berechnen: Kaufkraftverlust, Preissteigerung über die Zeit.',
    category: 'finanzen',
    h1: 'Inflations-Rechner – Kaufkraft & Inflation berechnen 2026',
    primaryKeyword: 'inflations rechner',
    secondaryKeywords: ['kaufkraft berechnen', 'inflation deutschland', 'geldentwertung'],
    searchVolumeDE: '100K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['zinseszins-rechner', 'gehalt-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📈',
    isCalculator: true
  },

  'waehrungs-rechner': {
    slug: 'waehrungs-rechner',
    name: 'Währungs-Umrechner',
    shortDescription: 'Euro, Dollar, Pfund und mehr umrechnen.',
    metaTitle: 'Währungs-Umrechner – Euro, Dollar, Pfund 2026',
    metaDescription: 'Währungen umrechnen: Euro in Dollar, Pfund in Euro und mehr.',
    category: 'finanzen',
    h1: 'Währungs-Umrechner – Euro, Dollar, Pfund & mehr 2026',
    primaryKeyword: 'währungs umrechner',
    secondaryKeywords: ['euro in dollar', 'dollar in euro', 'währung umrechnen'],
    units: [
      { value: 'EUR', label: 'Euro', symbol: '€' },
      { value: 'USD', label: 'US-Dollar', symbol: '$' },
      { value: 'GBP', label: 'Brit. Pfund', symbol: '£' },
      { value: 'CHF', label: 'Schweizer Franken', symbol: 'CHF' },
      { value: 'JPY', label: 'Japan. Yen', symbol: '¥' },
    ],
    searchVolumeDE: '500K',
    difficulty: 'high',
    cpcLevel: 'high',
    relatedTools: ['prozent-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💱'
  },

  'bodyfat-rechner': {
    slug: 'bodyfat-rechner',
    name: 'Körperfett-Rechner',
    shortDescription: 'Körperfettanteil berechnen.',
    metaTitle: 'Körperfett-Rechner – Körperfettanteil berechnen 2026',
    metaDescription: 'Körperfettanteil berechnen: BMI-Methode, US-Navy-Methode.',
    category: 'gesundheit',
    h1: 'Körperfett-Rechner – Körperfettanteil berechnen 2026',
    primaryKeyword: 'körperfett rechner',
    secondaryKeywords: ['körperfettanteil berechnen', 'body fat calculator', 'fettanteil'],
    searchVolumeDE: '200K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['bmi-rechner', 'bmr-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '💪',
    isCalculator: true
  },

  'idealgewicht-rechner': {
    slug: 'idealgewicht-rechner',
    name: 'Idealgewicht-Rechner',
    shortDescription: 'Idealgewicht nach Größe und Geschlecht.',
    metaTitle: 'Idealgewicht-Rechner – Idealgewicht berechnen 2026',
    metaDescription: 'Idealgewicht berechnen: Broca-Formel, BMI-Methode.',
    category: 'gesundheit',
    h1: 'Idealgewicht-Rechner – Idealgewicht berechnen 2026',
    primaryKeyword: 'idealgewicht rechner',
    secondaryKeywords: ['idealgewicht berechnen', 'normalgewicht', 'optimalgewicht'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['bmi-rechner', 'bodyfat-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '⚖️',
    isCalculator: true
  },

  'schwangerschafts-rechner': {
    slug: 'schwangerschafts-rechner',
    name: 'Schwangerschafts-Rechner',
    shortDescription: 'Geburtstermin und SSW berechnen.',
    metaTitle: 'Schwangerschafts-Rechner – Geburtstermin & SSW 2026',
    metaDescription: 'Schwangerschaft berechnen: Geburtstermin, Schwangerschaftswochen.',
    category: 'gesundheit',
    h1: 'Schwangerschafts-Rechner – Geburtstermin & SSW berechnen 2026',
    primaryKeyword: 'schwangerschafts rechner',
    secondaryKeywords: ['geburtstermin berechnen', 'ssw rechner', 'erntetermin'],
    searchVolumeDE: '300K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['datum-rechner', 'alter-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🤰',
    isCalculator: true
  },

  'kalorienverbrauch-rechner': {
    slug: 'kalorienverbrauch-rechner',
    name: 'Kalorienverbrauch-Rechner',
    shortDescription: 'Kalorienverbrauch bei Aktivitäten.',
    metaTitle: 'Kalorienverbrauch-Rechner – Kalorien verbrennen 2026',
    metaDescription: 'Kalorienverbrauch berechnen: Sport, Alltag, Arbeit.',
    category: 'gesundheit',
    h1: 'Kalorienverbrauch-Rechner – Kalorien verbrennen 2026',
    primaryKeyword: 'kalorienverbrauch rechner',
    secondaryKeywords: ['kalorien verbrennen', 'kalorien sport', 'kalorienzählen'],
    searchVolumeDE: '200K',
    difficulty: 'medium',
    cpcLevel: 'medium',
    relatedTools: ['bmr-rechner', 'kalorienrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🏃',
    isCalculator: true
  },

  'wasserbedarf-rechner': {
    slug: 'wasserbedarf-rechner',
    name: 'Wasserbedarf-Rechner',
    shortDescription: 'Täglicher Wasserbedarf berechnen.',
    metaTitle: 'Wasserbedarf-Rechner – Täglich Wasser trinken 2026',
    metaDescription: 'Wasserbedarf berechnen: Wie viel Wasser pro Tag?',
    category: 'gesundheit',
    h1: 'Wasserbedarf-Rechner – Täglicher Wasserbedarf 2026',
    primaryKeyword: 'wasserbedarf rechner',
    secondaryKeywords: ['wasser pro tag', 'flüssigkeitsbedarf', 'wie viel wasser trinken'],
    searchVolumeDE: '80K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['bmr-rechner', 'kalorienrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '💧',
    isCalculator: true
  },

  'laufzeit-rechner': {
    slug: 'laufzeit-rechner',
    name: 'Laufzeit-Rechner',
    shortDescription: 'Laufzeit, Pace, Geschwindigkeit berechnen.',
    metaTitle: 'Laufzeit-Rechner – Pace & Laufzeit 2026',
    metaDescription: 'Laufzeit berechnen: Pace, Geschwindigkeit, Distanz.',
    category: 'gesundheit',
    h1: 'Laufzeit-Rechner – Pace, Geschwindigkeit & Distanz 2026',
    primaryKeyword: 'laufzeit rechner',
    secondaryKeywords: ['pace berechnen', 'lauf pace', 'laufgeschwindigkeit'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['geschwindigkeit-umrechner', 'kalorienverbrauch-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🏃',
    isCalculator: true
  },

  'flaechenberechnung-rechner': {
    slug: 'flaechenberechnung-rechner',
    name: 'Flächenberechnungs-Rechner',
    shortDescription: 'Fläche von Rechteck, Kreis, Dreieck.',
    metaTitle: 'Flächenberechnungs-Rechner – Rechteck, Kreis, Dreieck 2026',
    metaDescription: 'Fläche berechnen: Rechteck, Kreis, Dreieck, Trapez.',
    category: 'mathematik',
    h1: 'Flächenberechnungs-Rechner – Rechteck, Kreis & Dreieck 2026',
    primaryKeyword: 'fläche berechnen',
    secondaryKeywords: ['rechteck fläche', 'kreisfläche', 'dreieck fläche'],
    searchVolumeDE: '200K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['geometrie-umrechner', 'flaechen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📐',
    isCalculator: true
  },

  'volumenberechnung-rechner': {
    slug: 'volumenberechnung-rechner',
    name: 'Volumenberechnungs-Rechner',
    shortDescription: 'Volumen von Würfel, Zylinder, Kugel.',
    metaTitle: 'Volumenberechnungs-Rechner – Würfel, Zylinder, Kugel 2026',
    metaDescription: 'Volumen berechnen: Würfel, Zylinder, Kugel, Kegel.',
    category: 'mathematik',
    h1: 'Volumenberechnungs-Rechner – Würfel, Zylinder & Kugel 2026',
    primaryKeyword: 'volumen berechnen',
    secondaryKeywords: ['zylinder volumen', 'kugel volumen', 'würfel volumen'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['geometrie-umrechner', 'volumen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📦',
    isCalculator: true
  },

  'pythagoras-rechner': {
    slug: 'pythagoras-rechner',
    name: 'Pythagoras-Rechner',
    shortDescription: 'Satz des Pythagoras berechnen.',
    metaTitle: 'Pythagoras-Rechner – Satz des Pythagoras 2026',
    metaDescription: 'Pythagoras berechnen: Hypotenuse, Katheten berechnen.',
    category: 'mathematik',
    h1: 'Pythagoras-Rechner – Satz des Pythagoras berechnen 2026',
    primaryKeyword: 'pythagoras rechner',
    secondaryKeywords: ['pythagoras berechnen', 'hypotenuse berechnen', 'satz des pythagoras'],
    searchVolumeDE: '100K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['geometrie-umrechner', 'winkel-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📐',
    isCalculator: true
  },

  'quadratische-gleichungen-rechner': {
    slug: 'quadratische-gleichungen-rechner',
    name: 'Quadratische Gleichungen Rechner',
    shortDescription: 'Quadratische Gleichungen lösen.',
    metaTitle: 'Quadratische Gleichungen Rechner – abc-Formel 2026',
    metaDescription: 'Quadratische Gleichungen lösen: abc-Formel, p-q-Formel.',
    category: 'mathematik',
    h1: 'Quadratische Gleichungen Rechner – Lösen mit abc-Formel 2026',
    primaryKeyword: 'quadratische gleichungen rechner',
    secondaryKeywords: ['abc formel rechner', 'pq formel', 'gleichung lösen'],
    searchVolumeDE: '80K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['prozent-rechner', 'dreisatz-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '𝑥²',
    isCalculator: true
  },

  'bruch-rechner': {
    slug: 'bruch-rechner',
    name: 'Bruch-Rechner',
    shortDescription: 'Brüche addieren, subtrahieren, multiplizieren.',
    metaTitle: 'Bruch-Rechner – Brüche berechnen 2026',
    metaDescription: 'Brüche berechnen: Addieren, subtrahieren, multiplizieren, dividieren.',
    category: 'mathematik',
    h1: 'Bruch-Rechner – Brüche addieren & kürzen 2026',
    primaryKeyword: 'bruch rechner',
    secondaryKeywords: ['brüche addieren', 'brüche kürzen', 'bruch in dezimal'],
    searchVolumeDE: '200K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['prozent-rechner', 'zahlen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '½',
    isCalculator: true
  },

  'wurzel-rechner': {
    slug: 'wurzel-rechner',
    name: 'Wurzel-Rechner',
    shortDescription: 'Quadratwurzel, Kubikwurzel berechnen.',
    metaTitle: 'Wurzel-Rechner – Quadratwurzel, Kubikwurzel 2026',
    metaDescription: 'Wurzel berechnen: Quadratwurzel, Kubikwurzel, n-te Wurzel.',
    category: 'mathematik',
    h1: 'Wurzel-Rechner – Quadratwurzel & n-te Wurzel 2026',
    primaryKeyword: 'wurzel rechner',
    secondaryKeywords: ['quadratwurzel berechnen', 'wurzel ziehen', 'kubikwurzel'],
    searchVolumeDE: '100K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['prozent-rechner', 'pythagoras-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '√',
    isCalculator: true
  },

  'logarithmus-rechner': {
    slug: 'logarithmus-rechner',
    name: 'Logarithmus-Rechner',
    shortDescription: 'Logarithmen berechnen: ln, log10.',
    metaTitle: 'Logarithmus-Rechner – ln, log10, log2 2026',
    metaDescription: 'Logarithmus berechnen: Natürlicher Logarithmus, Zehnerlogarithmus.',
    category: 'mathematik',
    h1: 'Logarithmus-Rechner – ln, log10 & mehr 2026',
    primaryKeyword: 'logarithmus rechner',
    secondaryKeywords: ['ln berechnen', 'log berechnen', 'natürlicher logarithmus'],
    searchVolumeDE: '60K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['wurzel-rechner', 'zahlen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: 'ln',
    isCalculator: true
  },

  'hex-rechner': {
    slug: 'hex-rechner',
    name: 'Hexadezimal-Rechner',
    shortDescription: 'Hexadezimal addieren, subtrahieren.',
    metaTitle: 'Hexadezimal-Rechner – Hex berechnen 2026',
    metaDescription: 'Hexadezimal rechnen: Addieren, subtrahieren, umrechnen.',
    category: 'developer',
    h1: 'Hexadezimal-Rechner – Hex berechnen & umrechnen 2026',
    primaryKeyword: 'hex rechner',
    secondaryKeywords: ['hexadezimal rechner', 'hex addieren', 'hex in dezimal'],
    searchVolumeDE: '40K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['zahlen-umrechner', 'developer-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '#️⃣'
  },

  'ip-subnetz-rechner': {
    slug: 'ip-subnetz-rechner',
    name: 'IP-Subnetz-Rechner',
    shortDescription: 'IP-Subnetze berechnen.',
    metaTitle: 'IP-Subnetz-Rechner – Subnetzmaske, CIDR 2026',
    metaDescription: 'IP-Subnetz berechnen: Subnetzmaske, CIDR, IP-Bereich.',
    category: 'developer',
    h1: 'IP-Subnetz-Rechner – Subnetzmaske & CIDR berechnen 2026',
    primaryKeyword: 'ip subnetz rechner',
    secondaryKeywords: ['subnetzmaske berechnen', 'cidr rechner', 'ip bereich berechnen'],
    searchVolumeDE: '50K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['developer-umrechner', 'zahlen-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🌐',
    isCalculator: true
  },

  'unix-timestamp-rechner': {
    slug: 'unix-timestamp-rechner',
    name: 'Unix-Timestamp-Rechner',
    shortDescription: 'Unix-Zeitstempel umrechnen.',
    metaTitle: 'Unix-Timestamp-Rechner – Zeitstempel umrechnen 2026',
    metaDescription: 'Unix-Timestamp umrechnen: Zeitstempel in Datum und umgekehrt.',
    category: 'developer',
    h1: 'Unix-Timestamp-Rechner – Zeitstempel umrechnen 2026',
    primaryKeyword: 'unix timestamp rechner',
    secondaryKeywords: ['unix zeit umrechnen', 'timestamp in datum', 'epoch time'],
    searchVolumeDE: '40K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['datum-rechner', 'zeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🕐'
  },

  'regex-tester': {
    slug: 'regex-tester',
    name: 'Regex-Tester',
    shortDescription: 'Reguläre Ausdrücke testen.',
    metaTitle: 'Regex-Tester – Reguläre Ausdrücke testen 2026',
    metaDescription: 'Regex testen: Reguläre Ausdrücke erstellen und validieren.',
    category: 'developer',
    h1: 'Regex-Tester – Reguläre Ausdrücke testen & erstellen 2026',
    primaryKeyword: 'regex tester',
    secondaryKeywords: ['regular expression tester', 'regex online', 'regex prüfen'],
    searchVolumeDE: '60K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['developer-umrechner', 'text-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '.*',
    isCalculator: true
  },

  'json-formatter': {
    slug: 'json-formatter',
    name: 'JSON-Formatter',
    shortDescription: 'JSON formatieren und validieren.',
    metaTitle: 'JSON-Formatter – JSON formatieren 2026',
    metaDescription: 'JSON formatieren: JSON beautify, minify, validieren.',
    category: 'developer',
    h1: 'JSON-Formatter – JSON formatieren & validieren 2026',
    primaryKeyword: 'json formatter',
    secondaryKeywords: ['json formatieren', 'json beautify', 'json validator'],
    searchVolumeDE: '80K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['developer-umrechner', 'base64-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '{ }',
    isCalculator: true
  },

  'url-encoder': {
    slug: 'url-encoder',
    name: 'URL-Encoder/Decoder',
    shortDescription: 'URLs kodieren und dekodieren.',
    metaTitle: 'URL-Encoder – URL kodieren & dekodieren 2026',
    metaDescription: 'URL enkodieren: URL encoding, URL decoding.',
    category: 'developer',
    h1: 'URL-Encoder/Decoder – URL kodieren & dekodieren 2026',
    primaryKeyword: 'url encoder',
    secondaryKeywords: ['url encoding', 'url decode', 'prozentkodierung'],
    searchVolumeDE: '50K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['base64-umrechner', 'developer-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🔗'
  },

  'diff-rechner': {
    slug: 'diff-rechner',
    name: 'Text-Diff-Rechner',
    shortDescription: 'Unterschiede zwischen Texten finden.',
    metaTitle: 'Text-Diff-Rechner – Text vergleichen 2026',
    metaDescription: 'Text vergleichen: Unterschiede zwischen zwei Texten anzeigen.',
    category: 'text',
    h1: 'Text-Diff-Rechner – Unterschiede zwischen Texten finden 2026',
    primaryKeyword: 'diff rechner',
    secondaryKeywords: ['text vergleichen', 'unterschiede finden', 'diff online'],
    searchVolumeDE: '30K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['woerterzaehler', 'text-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '⇄',
    isCalculator: true
  },

  'lorem-ipsum-generator': {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem-Ipsum-Generator',
    shortDescription: 'Blindtext generieren.',
    metaTitle: 'Lorem-Ipsum-Generator – Blindtext generieren 2026',
    metaDescription: 'Lorem Ipsum generieren: Blindtext für Designs erstellen.',
    category: 'text',
    h1: 'Lorem-Ipsum-Generator – Blindtext generieren 2026',
    primaryKeyword: 'lorem ipsum generator',
    secondaryKeywords: ['blindtext generator', 'dummy text', 'platzhalter text'],
    searchVolumeDE: '50K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['woerterzaehler', 'text-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📝',
    isCalculator: true
  },

  'passwort-generator': {
    slug: 'passwort-generator',
    name: 'Passwort-Generator',
    shortDescription: 'Sichere Passwörter generieren.',
    metaTitle: 'Passwort-Generator – Sichere Passwörter 2026',
    metaDescription: 'Passwort generieren: Sichere, zufällige Passwörter erstellen.',
    category: 'developer',
    h1: 'Passwort-Generator – Sichere Passwörter erstellen 2026',
    primaryKeyword: 'passwort generator',
    secondaryKeywords: ['passwort erstellen', 'sicheres passwort', 'zufallspasswort'],
    searchVolumeDE: '300K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['base64-umrechner', 'developer-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🔐',
    isCalculator: true
  },

  'hash-generator': {
    slug: 'hash-generator',
    name: 'Hash-Generator',
    shortDescription: 'MD5, SHA256, SHA1 Hashes generieren.',
    metaTitle: 'Hash-Generator – MD5, SHA256, SHA1 2026',
    metaDescription: 'Hash generieren: MD5, SHA256, SHA1 Hashes erstellen.',
    category: 'developer',
    h1: 'Hash-Generator – MD5, SHA256, SHA1 & mehr 2026',
    primaryKeyword: 'hash generator',
    secondaryKeywords: ['md5 hash', 'sha256 generator', 'sha1 berechnen'],
    searchVolumeDE: '60K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['base64-umrechner', 'passwort-generator'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '#️⃣'
  },

  'einheitspreis-rechner': {
    slug: 'einheitspreis-rechner',
    name: 'Einheitspreis-Rechner',
    shortDescription: 'Preis pro Kilogramm, Liter vergleichen.',
    metaTitle: 'Einheitspreis-Rechner – Preisvergleich 2026',
    metaDescription: 'Einheitspreis berechnen: Preis pro Kilogramm, Liter, Stück.',
    category: 'finanzen',
    h1: 'Einheitspreis-Rechner – Preis pro kg, Liter, Stück 2026',
    primaryKeyword: 'einheitspreis rechner',
    secondaryKeywords: ['preis pro kg berechnen', 'grundpreis', 'preisvergleich'],
    searchVolumeDE: '50K',
    difficulty: 'low',
    cpcLevel: 'medium',
    relatedTools: ['prozent-rechner', 'rabatt-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🛒',
    isCalculator: true
  },

  'splittable-rechner': {
    slug: 'splittable-rechner',
    name: 'Rechnung-teilen-Rechner',
    shortDescription: 'Rechnung auf mehrere Personen aufteilen.',
    metaTitle: 'Rechnung-teilen-Rechner – Kosten aufteilen 2026',
    metaDescription: 'Rechnung teilen: Kosten auf mehrere Personen aufteilen.',
    category: 'finanzen',
    h1: 'Rechnung-teilen-Rechner – Kosten auf mehrere Personen 2026',
    primaryKeyword: 'rechnung teilen rechner',
    secondaryKeywords: ['kosten aufteilen', 'rechnung splitten', 'geteilte rechnung'],
    searchVolumeDE: '40K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['trinkgeld-rechner', 'prozent-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '💸',
    isCalculator: true
  },

  'solarertrag-rechner': {
    slug: 'solarertrag-rechner',
    name: 'Solarertrag-Rechner',
    shortDescription: 'PV-Ertrag und Einsparung berechnen.',
    metaTitle: 'Solarertrag-Rechner – PV-Ertrag berechnen 2026',
    metaDescription: 'Solarertrag berechnen: Photovoltaik-Ertrag und Einsparung.',
    category: 'energie-rechner',
    h1: 'Solarertrag-Rechner – PV-Ertrag & Einsparung 2026',
    primaryKeyword: 'solarertrag rechner',
    secondaryKeywords: ['pv ertrag berechnen', 'photovoltaik rechner', 'solar einsparung'],
    searchVolumeDE: '100K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['stromverbrauch-rechner', 'co2-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '☀️',
    isCalculator: true
  },

  'heizkosten-rechner': {
    slug: 'heizkosten-rechner',
    name: 'Heizkosten-Rechner',
    shortDescription: 'Heizkosten berechnen und vergleichen.',
    metaTitle: 'Heizkosten-Rechner – Heizkosten berechnen 2026',
    metaDescription: 'Heizkosten berechnen: Verbrauch, Kosten pro m².',
    category: 'energie-rechner',
    h1: 'Heizkosten-Rechner – Verbrauch & Kosten berechnen 2026',
    primaryKeyword: 'heizkosten rechner',
    secondaryKeywords: ['heizkosten berechnen', 'heizung kosten', 'heizkosten pro m2'],
    searchVolumeDE: '80K',
    difficulty: 'medium',
    cpcLevel: 'high',
    relatedTools: ['stromverbrauch-rechner', 'energie-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🔥',
    isCalculator: true
  },

  'fliesen-rechner': {
    slug: 'fliesen-rechner',
    name: 'Fliesen-Rechner',
    shortDescription: 'Fliesenbedarf berechnen.',
    metaTitle: 'Fliesen-Rechner – Fliesenbedarf berechnen 2026',
    metaDescription: 'Fliesen berechnen: Anzahl, Bedarf, Verschnitt.',
    category: 'bauen',
    h1: 'Fliesen-Rechner – Fliesenbedarf & Anzahl berechnen 2026',
    primaryKeyword: 'fliesen rechner',
    secondaryKeywords: ['fliesenbedarf berechnen', 'fliesen anzahl', 'fliesen berechnen'],
    searchVolumeDE: '60K',
    difficulty: 'low',
    cpcLevel: 'medium',
    relatedTools: ['flaechenberechnung-rechner', 'farbbedarf-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '🧱',
    isCalculator: true
  },

  'farbbedarf-rechner': {
    slug: 'farbbedarf-rechner',
    name: 'Farbbedarf-Rechner',
    shortDescription: 'Farbmenge für Wand berechnen.',
    metaTitle: 'Farbbedarf-Rechner – Farbmenge berechnen 2026',
    metaDescription: 'Farbbedarf berechnen: Wie viel Farbe für Wand, Zimmer?',
    category: 'bauen',
    h1: 'Farbbedarf-Rechner – Farbmenge für Wand & Zimmer 2026',
    primaryKeyword: 'farbbedarf rechner',
    secondaryKeywords: ['farbmenge berechnen', 'wandfarbe rechner', 'farbe bedarf'],
    searchVolumeDE: '50K',
    difficulty: 'low',
    cpcLevel: 'medium',
    relatedTools: ['flaechenberechnung-rechner', 'fliesen-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🎨',
    isCalculator: true
  },

  'tapeten-rechner': {
    slug: 'tapeten-rechner',
    name: 'Tapeten-Rechner',
    shortDescription: 'Tapetenbedarf berechnen.',
    metaTitle: 'Tapeten-Rechner – Tapetenbedarf berechnen 2026',
    metaDescription: 'Tapeten berechnen: Anzahl Rollen, Bedarf.',
    category: 'bauen',
    h1: 'Tapeten-Rechner – Tapetenbedarf & Rollen berechnen 2026',
    primaryKeyword: 'tapeten rechner',
    secondaryKeywords: ['tapetenbedarf berechnen', 'tapetenrollen', 'wie viele tapeten'],
    searchVolumeDE: '40K',
    difficulty: 'low',
    cpcLevel: 'medium',
    relatedTools: ['farbbedarf-rechner', 'fliesen-rechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📜',
    isCalculator: true
  },

  'kalenderwoche-rechner': {
    slug: 'kalenderwoche-rechner',
    name: 'Kalenderwochen-Rechner',
    shortDescription: 'Kalenderwoche zu Datum und umgekehrt.',
    metaTitle: 'Kalenderwochen-Rechner – KW berechnen 2026',
    metaDescription: 'Kalenderwoche berechnen: KW zu Datum, Datum zu KW.',
    category: 'datum',
    h1: 'Kalenderwochen-Rechner – KW zu Datum 2026',
    primaryKeyword: 'kalenderwoche rechner',
    secondaryKeywords: ['kw berechnen', 'kalenderwoche datum', 'welche kalenderwoche'],
    searchVolumeDE: '150K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['datum-rechner', 'alter-rechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '📆',
    isCalculator: true
  },

  'countdown-rechner': {
    slug: 'countdown-rechner',
    name: 'Countdown-Rechner',
    shortDescription: 'Tage bis zu einem Datum zählen.',
    metaTitle: 'Countdown-Rechner – Tage bis Datum 2026',
    metaDescription: 'Countdown berechnen: Wie viele Tage bis zu einem Datum?',
    category: 'datum',
    h1: 'Countdown-Rechner – Tage bis zum Datum zählen 2026',
    primaryKeyword: 'countdown rechner',
    secondaryKeywords: ['tage bis', 'countdown zählen', 'wie viele tage bis'],
    searchVolumeDE: '100K',
    difficulty: 'low',
    cpcLevel: 'low',
    relatedTools: ['datum-rechner', 'zeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: true,
    icon: '⏳',
    isCalculator: true
  },

  'wochenende-rechner': {
    slug: 'wochenende-rechner',
    name: 'Wochenend-Rechner',
    shortDescription: 'Arbeitstage und Wochenenden berechnen.',
    metaTitle: 'Wochenend-Rechner – Arbeitstage zählen 2026',
    metaDescription: 'Wochenenden berechnen: Arbeitstage, Feiertage.',
    category: 'datum',
    h1: 'Wochenend-Rechner – Arbeitstage & Wochenenden 2026',
    primaryKeyword: 'wochenende rechner',
    secondaryKeywords: ['arbeitstage berechnen', 'arbeitstage zählen', 'feiertage'],
    searchVolumeDE: '40K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['datum-rechner', 'zeit-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '🗓️',
    isCalculator: true
  },

  'umrechnungstabelle': {
    slug: 'umrechnungstabelle',
    name: 'Umrechnungstabelle',
    shortDescription: 'Allgemeine Umrechnungstabellen.',
    metaTitle: 'Umrechnungstabelle – Einheiten umrechnen 2026',
    metaDescription: 'Umrechnungstabellen: Länge, Gewicht, Fläche, Volumen.',
    category: 'sonstige',
    h1: 'Umrechnungstabelle – Alle Einheiten auf einen Blick 2026',
    primaryKeyword: 'umrechnungstabelle',
    secondaryKeywords: ['umrechnungstabelle länge', 'umrechnungstabelle gewicht', 'einheiten tabelle'],
    searchVolumeDE: '200K',
    difficulty: 'medium',
    cpcLevel: 'low',
    relatedTools: ['laengen-umrechner', 'gewicht-umrechner'],
    lastUpdated: '2026-01-01',
    featured: false,
    icon: '📊'
  },
};

/**
 * Gibt alle Tools als Array zurück
 */
export function getAllTools(): Tool[] {
  return Object.values(tools);
}

/**
 * Gibt ein Tool anhand seines Slugs zurück
 */
export function getToolBySlug(slug: string): Tool | undefined {
  return tools[slug];
}

/**
 * Gibt alle Tools einer Kategorie zurück
 */
export function getToolsByCategory(category: CategorySlug): Tool[] {
  return Object.values(tools).filter(tool => tool.category === category);
}

/**
 * Gibt die beliebtesten Tools zurück
 */
export function getFeaturedTools(limit: number = 14): Tool[] {
  return Object.values(tools)
    .filter(tool => tool.featured)
    .slice(0, limit);
}

/**
 * Gibt verwandte Tools zurück
 */
export function getRelatedTools(toolSlug: string, limit: number = 6): Tool[] {
  const tool = tools[toolSlug];
  if (!tool) return [];
  
  return tool.relatedTools
    .map(slug => tools[slug])
    .filter(Boolean)
    .slice(0, limit);
}

/**
 * Sucht nach Tools
 */
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(tools).filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.primaryKeyword.toLowerCase().includes(lowerQuery) ||
    tool.secondaryKeywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
    tool.shortDescription.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Gibt alle Sub-Conversions zurück
 */
export function getAllSubConversions(): SubConversion[] {
  const conversions: SubConversion[] = [];
  
  Object.values(tools).forEach(tool => {
    if (tool.popularConversions) {
      conversions.push(...tool.popularConversions);
    }
  });
  
  return conversions.sort((a, b) => b.priority - a.priority);
}

/**
 * Gibt die Gesamtzahl der Tools zurück
 */
export function getToolsCount(): number {
  return Object.keys(tools).length;
}
