/**
 * Volumen-Umrechner (Volume Conversion)
 * Umrechnung von Volumeneinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Liter (L)
 */

export type VolumeUnit = 
  | 'mm3'     // Kubikmillimeter
  | 'cm3'     // Kubikzentimeter
  | 'mL'      // Milliliter
  | 'cL'      // Zentiliter
  | 'dL'      // Deziliter
  | 'L'       // Liter (Basis)
  | 'm3'      // Kubikmeter
  | 'in3'     // Kubikzoll
  | 'ft3'     // Kubikfuß
  | 'yd3'     // Kubikyard
  | 'gal_us'  // US Gallone
  | 'gal_uk'  // UK Gallone
  | 'qt_us'   // US Quart
  | 'qt_uk'   // UK Quart
  | 'pt_us'   // US Pint
  | 'pt_uk'   // UK Pint
  | 'fl_oz_us' // US Fluid Ounce
  | 'fl_oz_uk' // UK Fluid Ounce
  | 'cup_us'  // US Cup
  | 'tbsp'    // Esslöffel (US)
  | 'tsp';    // Teelöffel (US)

// Umrechnungsfaktoren zur Basis-Einheit Liter
export const volumeToLiter: Record<VolumeUnit, number> = {
  mm3: 1e-6,              // Kubikmillimeter
  cm3: 0.001,             // Kubikzentimeter = 1 mL
  mL: 0.001,              // Milliliter
  cL: 0.01,               // Zentiliter
  dL: 0.1,                // Deziliter
  L: 1,                   // Liter (Basis)
  m3: 1000,               // Kubikmeter
  in3: 0.016387064,       // Kubikzoll
  ft3: 28.316846592,      // Kubikfuß
  yd3: 764.554857984,     // Kubikyard
  gal_us: 3.785411784,    // US Gallone
  gal_uk: 4.54609,        // UK Gallone
  qt_us: 0.946352946,     // US Quart
  qt_uk: 1.1365225,       // UK Quart
  pt_us: 0.473176473,     // US Pint
  pt_uk: 0.56826125,      // UK Pint
  fl_oz_us: 0.0295735295625, // US Fluid Ounce
  fl_oz_uk: 0.0284130625,    // UK Fluid Ounce
  cup_us: 0.2365882365,   // US Cup
  tbsp: 0.01478676478125, // US Esslöffel
  tsp: 0.00492892159375   // US Teelöffel
};

// Deutsche Bezeichnungen
export const volumeUnitNames: Record<VolumeUnit, string> = {
  mm3: 'Kubikmillimeter',
  cm3: 'Kubikzentimeter',
  mL: 'Milliliter',
  cL: 'Zentiliter',
  dL: 'Deziliter',
  L: 'Liter',
  m3: 'Kubikmeter',
  in3: 'Kubikzoll',
  ft3: 'Kubikfuß',
  yd3: 'Kubikyard',
  gal_us: 'US Gallone',
  gal_uk: 'UK Gallone',
  qt_us: 'US Quart',
  qt_uk: 'UK Quart',
  pt_us: 'US Pint',
  pt_uk: 'UK Pint',
  fl_oz_us: 'US Fluid Ounce',
  fl_oz_uk: 'UK Fluid Ounce',
  cup_us: 'US Cup',
  tbsp: 'Esslöffel',
  tsp: 'Teelöffel'
};

// Symbole für Anzeige
export const volumeUnitSymbols: Record<VolumeUnit, string> = {
  mm3: 'mm³',
  cm3: 'cm³',
  mL: 'mL',
  cL: 'cL',
  dL: 'dL',
  L: 'L',
  m3: 'm³',
  in3: 'in³',
  ft3: 'ft³',
  yd3: 'yd³',
  gal_us: 'gal (US)',
  gal_uk: 'gal (UK)',
  qt_us: 'qt (US)',
  qt_uk: 'qt (UK)',
  pt_us: 'pt (US)',
  pt_uk: 'pt (UK)',
  fl_oz_us: 'fl oz (US)',
  fl_oz_uk: 'fl oz (UK)',
  cup_us: 'cup',
  tbsp: 'EL',
  tsp: 'TL'
};

/**
 * Wandelt einen Volumenwert um
 */
export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  const inLiters = value * volumeToLiter[from];
  return inLiters / volumeToLiter[to];
}

/**
 * Gibt alle verfügbaren Volumeneinheiten zurück
 */
export function getAllVolumeUnits(): VolumeUnit[] {
  return Object.keys(volumeToLiter) as VolumeUnit[];
}

/**
 * Gibt die gängigsten Volumeneinheiten zurück
 */
export function getCommonVolumeUnits(): VolumeUnit[] {
  return ['mL', 'L', 'm3', 'gal_us', 'cup_us', 'fl_oz_us'];
}

/**
 * Beispiele
 */
export const volumeExamples = {
  'liter-in-gallonen': {
    from: 'L' as VolumeUnit,
    to: 'gal_us' as VolumeUnit,
    example: '1 L = 0,2642 US Gallonen'
  },
  'ml-in-cups': {
    from: 'mL' as VolumeUnit,
    to: 'cup_us' as VolumeUnit,
    example: '240 mL ≈ 1 US Cup'
  }
};
