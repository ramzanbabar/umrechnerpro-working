/**
 * Sub-Conversions Helper
 * Hilfsfunktionen für Sub-Conversions
 */

import type { SubConversion, Tool } from './tools';

// Alle Sub-Conversions
const subConversions: SubConversion[] = [
  // LÄNGE
  { fromUnit: 'cm', toUnit: 'in', fromLabel: 'Zentimeter', toLabel: 'Zoll', slug: 'cm-in-zoll', searchVolume: '500K', h1: 'cm in Zoll umrechnen – Rechner & Tabelle 2026', metaDescription: 'Zentimeter in Zoll umrechnen. 1 cm = 0,3937 Zoll. Mit Tabelle und Formel.', priority: 10 },
  { fromUnit: 'in', toUnit: 'cm', fromLabel: 'Zoll', toLabel: 'Zentimeter', slug: 'zoll-in-cm', searchVolume: '500K', h1: 'Zoll in cm umrechnen – Rechner & Tabelle 2026', metaDescription: 'Zoll in Zentimeter umrechnen. 1 Zoll = 2,54 cm. Mit Tabelle und Formel.', priority: 10 },
  { fromUnit: 'm', toUnit: 'ft', fromLabel: 'Meter', toLabel: 'Fuß', slug: 'meter-in-fuss', searchVolume: '280K', h1: 'Meter in Fuß umrechnen – Rechner & Tabelle 2026', metaDescription: 'Meter in Fuß umrechnen. 1 m = 3,2808 ft. Mit Tabelle und Formel.', priority: 9 },
  { fromUnit: 'ft', toUnit: 'm', fromLabel: 'Fuß', toLabel: 'Meter', slug: 'fuss-in-meter', searchVolume: '200K', h1: 'Fuß in Meter umrechnen – Rechner & Tabelle 2026', metaDescription: 'Fuß in Meter umrechnen. 1 ft = 0,3048 m. Mit Tabelle und Formel.', priority: 9 },
  { fromUnit: 'mm', toUnit: 'in', fromLabel: 'Millimeter', toLabel: 'Zoll', slug: 'mm-in-zoll', searchVolume: '220K', h1: 'mm in Zoll umrechnen – Rechner & Tabelle 2026', metaDescription: 'Millimeter in Zoll umrechnen. 1 mm = 0,03937 Zoll. Mit Tabelle.', priority: 8 },
  { fromUnit: 'in', toUnit: 'mm', fromLabel: 'Zoll', toLabel: 'Millimeter', slug: 'zoll-in-mm', searchVolume: '180K', h1: 'Zoll in mm umrechnen – Rechner & Tabelle 2026', metaDescription: 'Zoll in Millimeter umrechnen. 1 Zoll = 25,4 mm. Mit Tabelle.', priority: 8 },
  { fromUnit: 'km', toUnit: 'mi', fromLabel: 'Kilometer', toLabel: 'Meilen', slug: 'km-in-meilen', searchVolume: '200K', h1: 'Kilometer in Meilen umrechnen – Rechner 2026', metaDescription: 'Kilometer in Meilen umrechnen. 1 km = 0,6214 mi. Mit Tabelle.', priority: 9 },
  { fromUnit: 'mi', toUnit: 'km', fromLabel: 'Meilen', toLabel: 'Kilometer', slug: 'meilen-in-km', searchVolume: '190K', h1: 'Meilen in Kilometer umrechnen – Rechner 2026', metaDescription: 'Meilen in Kilometer umrechnen. 1 mi = 1,609 km. Mit Tabelle.', priority: 9 },
  { fromUnit: 'nmi', toUnit: 'km', fromLabel: 'Seemeilen', toLabel: 'Kilometer', slug: 'seemeilen-in-km', searchVolume: '25K', h1: 'Seemeilen in Kilometer umrechnen – Rechner 2026', metaDescription: 'Seemeilen in Kilometer umrechnen. 1 Seemeile = 1,852 km.', priority: 6 },
  
  // GEWICHT
  { fromUnit: 'kg', toUnit: 'lb', fromLabel: 'Kilogramm', toLabel: 'Pfund', slug: 'kg-in-pfund', searchVolume: '450K', h1: 'kg in Pfund umrechnen – Rechner & Tabelle 2026', metaDescription: 'Kilogramm in Pfund umrechnen. 1 kg = 2,2046 lb. Mit Tabelle.', priority: 10 },
  { fromUnit: 'lb', toUnit: 'kg', fromLabel: 'Pfund', toLabel: 'Kilogramm', slug: 'pfund-in-kg', searchVolume: '380K', h1: 'Pfund in kg umrechnen – Rechner & Tabelle 2026', metaDescription: 'Pfund in Kilogramm umrechnen. 1 lb = 0,4536 kg. Mit Tabelle.', priority: 10 },
  { fromUnit: 'g', toUnit: 'oz', fromLabel: 'Gramm', toLabel: 'Unzen', slug: 'gramm-in-unzen', searchVolume: '120K', h1: 'Gramm in Unzen umrechnen – Rechner & Tabelle 2026', metaDescription: 'Gramm in Unzen umrechnen. 1 g = 0,0353 oz. Mit Tabelle.', priority: 7 },
  { fromUnit: 'oz', toUnit: 'g', fromLabel: 'Unzen', toLabel: 'Gramm', slug: 'unzen-in-gramm', searchVolume: '100K', h1: 'Unzen in Gramm umrechnen – Rechner & Tabelle 2026', metaDescription: 'Unzen in Gramm umrechnen. 1 oz = 28,35 g. Mit Tabelle.', priority: 7 },
  
  // TEMPERATUR
  { fromUnit: 'C', toUnit: 'F', fromLabel: 'Celsius', toLabel: 'Fahrenheit', slug: 'celsius-in-fahrenheit', searchVolume: '400K', h1: 'Celsius in Fahrenheit umrechnen – Rechner 2026', metaDescription: 'Celsius in Fahrenheit umrechnen. Formel: °F = °C × 9/5 + 32. Mit Rechner und Tabelle.', priority: 10 },
  { fromUnit: 'F', toUnit: 'C', fromLabel: 'Fahrenheit', toLabel: 'Celsius', slug: 'fahrenheit-in-celsius', searchVolume: '350K', h1: 'Fahrenheit in Celsius umrechnen – Rechner 2026', metaDescription: 'Fahrenheit in Celsius umrechnen. Formel: °C = (°F - 32) × 5/9. Mit Rechner.', priority: 10 },
  { fromUnit: 'C', toUnit: 'K', fromLabel: 'Celsius', toLabel: 'Kelvin', slug: 'celsius-in-kelvin', searchVolume: '80K', h1: 'Celsius in Kelvin umrechnen – Rechner 2026', metaDescription: 'Celsius in Kelvin umrechnen. 0°C = 273,15 K. Mit Rechner und Tabelle.', priority: 6 },
  { fromUnit: 'K', toUnit: 'C', fromLabel: 'Kelvin', toLabel: 'Celsius', slug: 'kelvin-in-celsius', searchVolume: '70K', h1: 'Kelvin in Celsius umrechnen – Rechner 2026', metaDescription: 'Kelvin in Celsius umrechnen. 0 K = -273,15°C. Mit Rechner.', priority: 6 },
  
  // GESCHWINDIGKEIT
  { fromUnit: 'mph', toUnit: 'km/h', fromLabel: 'mph', toLabel: 'km/h', slug: 'mph-in-kmh', searchVolume: '250K', h1: 'mph in km/h umrechnen – Rechner 2026', metaDescription: 'Meilen pro Stunde in Kilometer pro Stunde. 1 mph = 1,609 km/h.', priority: 9 },
  { fromUnit: 'km/h', toUnit: 'mph', fromLabel: 'km/h', toLabel: 'mph', slug: 'kmh-in-mph', searchVolume: '200K', h1: 'km/h in mph umrechnen – Rechner 2026', metaDescription: 'Kilometer pro Stunde in Meilen pro Stunde. 1 km/h = 0,621 mph.', priority: 9 },
  { fromUnit: 'kn', toUnit: 'km/h', fromLabel: 'Knoten', toLabel: 'km/h', slug: 'knoten-in-kmh', searchVolume: '50K', h1: 'Knoten in km/h umrechnen – Rechner 2026', metaDescription: 'Knoten in km/h umrechnen. 1 Knoten = 1,852 km/h.', priority: 6 },
  
  // LEISTUNG
  { fromUnit: 'kW', toUnit: 'PS', fromLabel: 'Kilowatt', toLabel: 'PS', slug: 'kw-in-ps', searchVolume: '100K', h1: 'kW in PS umrechnen – Rechner 2026', metaDescription: 'Kilowatt in Pferdestärke umrechnen. 1 kW = 1,36 PS. Mit Tabelle.', priority: 8 },
  { fromUnit: 'PS', toUnit: 'kW', fromLabel: 'PS', toLabel: 'Kilowatt', slug: 'ps-in-kw', searchVolume: '90K', h1: 'PS in kW umrechnen – Rechner 2026', metaDescription: 'Pferdestärke in Kilowatt umrechnen. 1 PS = 0,735 kW. Mit Tabelle.', priority: 8 },
  
  // DRUCK
  { fromUnit: 'bar', toUnit: 'psi', fromLabel: 'Bar', toLabel: 'PSI', slug: 'bar-in-psi', searchVolume: '80K', h1: 'Bar in PSI umrechnen – Rechner 2026', metaDescription: 'Bar in PSI umrechnen. 1 bar = 14,5 psi. Mit Tabelle.', priority: 7 },
  { fromUnit: 'psi', toUnit: 'bar', fromLabel: 'PSI', toLabel: 'Bar', slug: 'psi-in-bar', searchVolume: '70K', h1: 'PSI in Bar umrechnen – Rechner 2026', metaDescription: 'PSI in Bar umrechnen. 1 psi = 0,069 bar. Mit Tabelle.', priority: 7 },
  
  // FLÄCHE
  { fromUnit: 'ha', toUnit: 'm²', fromLabel: 'Hektar', toLabel: 'Quadratmeter', slug: 'hektar-in-m2', searchVolume: '150K', h1: 'Hektar in m² umrechnen – Rechner 2026', metaDescription: 'Hektar in Quadratmeter umrechnen. 1 ha = 10.000 m². Mit Tabelle.', priority: 8 },
  { fromUnit: 'm²', toUnit: 'ha', fromLabel: 'Quadratmeter', toLabel: 'Hektar', slug: 'm2-in-hektar', searchVolume: '100K', h1: 'm² in Hektar umrechnen – Rechner 2026', metaDescription: 'Quadratmeter in Hektar umrechnen. 10.000 m² = 1 ha.', priority: 7 },
  
  // VOLUMEN
  { fromUnit: 'L', toUnit: 'gal_us', fromLabel: 'Liter', toLabel: 'Gallonen', slug: 'liter-in-gallonen', searchVolume: '80K', h1: 'Liter in Gallonen umrechnen – Rechner 2026', metaDescription: 'Liter in US Gallonen umrechnen. 1 L = 0,264 gal. Mit Tabelle.', priority: 6 },
  { fromUnit: 'mL', toUnit: 'cup_us', fromLabel: 'Milliliter', toLabel: 'Cups', slug: 'ml-in-cups', searchVolume: '50K', h1: 'ml in Cups umrechnen – Rechner 2026', metaDescription: 'Milliliter in US Cups umrechnen. 1 Cup = 236,6 ml.', priority: 6 },
  
  // ENERGIE
  { fromUnit: 'kcal', toUnit: 'kJ', fromLabel: 'Kalorien', toLabel: 'Kilojoule', slug: 'kcal-in-kj', searchVolume: '85K', h1: 'kcal in kJ umrechnen – Rechner 2026', metaDescription: 'Kalorien in Kilojoule umrechnen. 1 kcal = 4,184 kJ. Mit Tabelle.', priority: 7 },
  { fromUnit: 'kJ', toUnit: 'kcal', fromLabel: 'Kilojoule', toLabel: 'Kalorien', slug: 'kj-in-kcal', searchVolume: '80K', h1: 'kJ in kcal umrechnen – Rechner 2026', metaDescription: 'Kilojoule in Kalorien umrechnen. 1 kJ = 0,239 kcal.', priority: 7 },
  
  // DATENSPEICHER
  { fromUnit: 'MB', toUnit: 'GB', fromLabel: 'Megabyte', toLabel: 'Gigabyte', slug: 'mb-in-gb', searchVolume: '70K', h1: 'MB in GB umrechnen – Rechner 2026', metaDescription: 'Megabyte in Gigabyte umrechnen. 1000 MB = 1 GB. Mit Tabelle.', priority: 6 },
  { fromUnit: 'GB', toUnit: 'TB', fromLabel: 'Gigabyte', toLabel: 'Terabyte', slug: 'gb-in-tb', searchVolume: '50K', h1: 'GB in TB umrechnen – Rechner 2026', metaDescription: 'Gigabyte in Terabyte umrechnen. 1000 GB = 1 TB.', priority: 5 },
];

/**
 * Gibt alle Sub-Conversions zurück
 */
export function getAllSubConversions(): SubConversion[] {
  return subConversions.sort((a, b) => b.priority - a.priority);
}

/**
 * Gibt eine Sub-Conversion anhand ihres Slugs zurück
 */
export function getSubConversionBySlug(slug: string): SubConversion | undefined {
  return subConversions.find(c => c.slug === slug);
}

/**
 * Gibt Sub-Conversions für ein bestimmtes Tool zurück
 */
export function getSubConversionsForTool(units: { value: string }[]): SubConversion[] {
  const unitValues = units.map(u => u.value);
  return subConversions.filter(c => 
    unitValues.includes(c.fromUnit) || unitValues.includes(c.toUnit)
  );
}
