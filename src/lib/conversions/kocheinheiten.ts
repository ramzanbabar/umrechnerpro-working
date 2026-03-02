/**
 * Kocheinheiten-Umrechner (Cooking Measurements Conversion)
 * Umrechnung von Küchenmaßen für UmrechnerPro.de
 */

export type CookingUnit = 
  | 'mL'
  | 'L'
  | 'TL'      // Teelöffel (5 mL in DE)
  | 'EL'      // Esslöffel (15 mL in DE)
  | 'cup_us'  // US Cup
  | 'cup_metric' // Metrischer Cup (250 mL)
  | 'fl_oz_us' // US Fluid Ounce
  | 'fl_oz_uk' // UK Fluid Ounce
  | 'pt_us'   // US Pint
  | 'pt_uk'   // UK Pint
  | 'qt_us'   // US Quart
  | 'gal_us'; // US Gallone

// Umrechnung zu Milliliter
export const cookingToMl: Record<CookingUnit, number> = {
  mL: 1,
  L: 1000,
  TL: 5,           // Teelöffel (DE-Standard)
  EL: 15,          // Esslöffel (DE-Standard)
  cup_us: 236.5882365,    // US Cup
  cup_metric: 250,         // Metrischer Cup
  fl_oz_us: 29.5735295625, // US Fluid Ounce
  fl_oz_uk: 28.4130625,    // UK Fluid Ounce
  pt_us: 473.176473,       // US Pint
  pt_uk: 568.26125,        // UK Pint
  qt_us: 946.352946,       // US Quart
  gal_us: 3785.411784      // US Gallone
};

// Deutsche Bezeichnungen
export const cookingUnitNames: Record<CookingUnit, string> = {
  mL: 'Milliliter',
  L: 'Liter',
  TL: 'Teelöffel',
  EL: 'Esslöffel',
  cup_us: 'US Cup',
  cup_metric: 'Metrischer Cup',
  fl_oz_us: 'US Fluid Ounce',
  fl_oz_uk: 'UK Fluid Ounce',
  pt_us: 'US Pint',
  pt_uk: 'UK Pint',
  qt_us: 'US Quart',
  gal_us: 'US Gallone'
};

/**
 * Wandelt Kocheinheiten um
 */
export function convertCooking(value: number, from: CookingUnit, to: CookingUnit): number {
  const inMl = value * cookingToMl[from];
  return inMl / cookingToMl[to];
}

/**
 * Praktische Koch-Umrechnungen
 */
export const cookingConversions = {
  // Teelöffel
  '1 TL': { ml: 5, g_wasser: 5 },
  '2 TL': { ml: 10, g_wasser: 10 },
  '3 TL': { ml: 15, g_wasser: 15 },
  
  // Esslöffel
  '1 EL': { ml: 15, g_wasser: 15 },
  '2 EL': { ml: 30, g_wasser: 30 },
  '3 EL': { ml: 45, g_wasser: 45 },
  
  // Cups (US)
  '1/4 cup': { ml: 59, g_wasser: 59 },
  '1/3 cup': { ml: 79, g_wasser: 79 },
  '1/2 cup': { ml: 118, g_wasser: 118 },
  '1 cup': { ml: 237, g_wasser: 237 },
  
  // Weitere
  '1 Pint (US)': { ml: 473, g_wasser: 473 },
  '1 Quart (US)': { ml: 946, g_wasser: 946 },
  '1 Gallone (US)': { ml: 3785, g_wasser: 3785 }
};

/**
 * Zutaten-spezifische Umrechnungen (ungefähre Werte)
 */
export const ingredientDensity = {
  mehl: 0.6,       // g/mL (leicht gepresst)
  zucker: 0.85,    // g/mL
  salz: 1.2,       // g/mL
  butter: 0.91,    // g/mL
  oel: 0.92,       // g/mL
  honig: 1.4,      // g/mL
  milch: 1.03,     // g/mL
  wasser: 1.0      // g/mL
};

/**
 * Wandelt mL in Gramm für eine Zutat um
 */
export function mlToGrams(ml: number, ingredient: keyof typeof ingredientDensity): number {
  return ml * ingredientDensity[ingredient];
}

/**
 * Wandelt Gramm in mL für eine Zutat um
 */
export function gramsToMl(grams: number, ingredient: keyof typeof ingredientDensity): number {
  return grams / ingredientDensity[ingredient];
}
