/**
 * Gewicht & Masse Umrechner (Weight/Mass Conversion)
 * Umrechnung von Gewichtseinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Kilogramm (kg)
 * Alle Werte basieren auf NIST-Standard
 */

// Alle unterstützten Gewichtseinheiten
export type WeightUnit = 
  | 'µg'    // Mikrogramm
  | 'mg'    // Milligramm
  | 'g'     // Gramm
  | 'kg'    // Kilogramm (Basis)
  | 't'     // Tonne (metrisch)
  | 'kt'    // Kilotonne
  | 'Mt'    // Megatonne
  | 'lb'    // Pfund (Pound)
  | 'oz'    // Unze (Ounce)
  | 'st'    // Stone
  | 'troy_oz' // Feinunze (Troy Ounce)
  | 'gr'    // Grain
  | 'cwt'   // Zentner (US hundredweight)
  | 'cwt_uk'; // Britischer Zentner

// Umrechnungsfaktoren zur Basis-Einheit Kilogramm
export const weightToKilogram: Record<WeightUnit, number> = {
  µg: 1e-9,              // Mikrogramm
  mg: 1e-6,              // Milligramm
  g: 0.001,              // Gramm
  kg: 1,                 // Kilogramm (Basis)
  t: 1000,               // Metrische Tonne
  kt: 1e6,               // Kilotonne
  Mt: 1e9,               // Megatonne
  lb: 0.45359237,        // Pound (exakt definiert)
  oz: 0.028349523125,    // Ounce (1/16 lb)
  st: 6.35029318,        // Stone (14 lb)
  troy_oz: 0.0311034768, // Troy Ounce (Feinunze)
  gr: 6.479891e-5,       // Grain
  cwt: 45.359237,        // US Hundredweight (100 lb)
  cwt_uk: 50.80234544    // UK Hundredweight (112 lb)
};

// Deutsche Bezeichnungen
export const weightUnitNames: Record<WeightUnit, string> = {
  µg: 'Mikrogramm',
  mg: 'Milligramm',
  g: 'Gramm',
  kg: 'Kilogramm',
  t: 'Tonne',
  kt: 'Kilotonne',
  Mt: 'Megatonne',
  lb: 'Pfund',
  oz: 'Unze',
  st: 'Stone',
  troy_oz: 'Feinunze',
  gr: 'Grain',
  cwt: 'Zentner (US)',
  cwt_uk: 'Zentner (UK)'
};

// Symbole
export const weightUnitSymbols: Record<WeightUnit, string> = {
  µg: 'µg',
  mg: 'mg',
  g: 'g',
  kg: 'kg',
  t: 't',
  kt: 'kt',
  Mt: 'Mt',
  lb: 'lb',
  oz: 'oz',
  st: 'st',
  troy_oz: 'oz.tr.',
  gr: 'gr',
  cwt: 'cwt',
  cwt_uk: 'cwt (UK)'
};

/**
 * Wandelt einen Gewichtswert von einer Einheit in eine andere um
 */
export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  const inKilograms = value * weightToKilogram[from];
  return inKilograms / weightToKilogram[to];
}

/**
 * Gibt alle verfügbaren Gewichtseinheiten zurück
 */
export function getAllWeightUnits(): WeightUnit[] {
  return Object.keys(weightToKilogram) as WeightUnit[];
}

/**
 * Gibt die gängigsten Gewichtseinheiten zurück
 */
export function getCommonWeightUnits(): WeightUnit[] {
  return ['mg', 'g', 'kg', 't', 'lb', 'oz'];
}

/**
 * Häufige Umrechnungsbeispiele
 */
export const weightExamples = {
  'kg-in-pfund': {
    from: 'kg' as WeightUnit,
    to: 'lb' as WeightUnit,
    example: '1 kg = 2,2046 Pfund'
  },
  'pfund-in-kg': {
    from: 'lb' as WeightUnit,
    to: 'kg' as WeightUnit,
    example: '1 Pfund = 0,4536 kg'
  },
  'gramm-in-unzen': {
    from: 'g' as WeightUnit,
    to: 'oz' as WeightUnit,
    example: '1 g = 0,0353 Unzen'
  }
};
