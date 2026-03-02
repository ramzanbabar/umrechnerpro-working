/**
 * Flächen-Umrechner (Area Conversion)
 * Umrechnung von Flächeneinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Quadratmeter (m²)
 */

export type AreaUnit = 
  | 'mm2'     // Quadratmillimeter
  | 'cm2'     // Quadratzentimeter
  | 'dm2'     // Quadratdezimeter
  | 'm2'      // Quadratmeter (Basis)
  | 'km2'     // Quadratkilometer
  | 'a'       // Ar
  | 'ha'      // Hektar
  | 'in2'     // Quadratzoll
  | 'ft2'     // Quadratfuß
  | 'yd2'     // Quadratyard
  | 'mi2'     // Quadratmeile
  | 'ac'      // Acre
  | 'b';      // Barn (Nuklearphysik)

// Umrechnungsfaktoren zur Basis-Einheit Quadratmeter
export const areaToSquareMeter: Record<AreaUnit, number> = {
  mm2: 1e-6,              // Quadratmillimeter
  cm2: 1e-4,              // Quadratzentimeter
  dm2: 0.01,              // Quadratdezimeter
  m2: 1,                  // Quadratmeter (Basis)
  km2: 1e6,               // Quadratkilometer
  a: 100,                 // Ar (10m × 10m)
  ha: 10000,              // Hektar (100m × 100m)
  in2: 0.00064516,        // Quadratzoll
  ft2: 0.09290304,        // Quadratfuß
  yd2: 0.83612736,        // Quadratyard
  mi2: 2589988.110336,    // Quadratmeile
  ac: 4046.8564224,       // Acre
  b: 1e-28                // Barn
};

// Deutsche Bezeichnungen
export const areaUnitNames: Record<AreaUnit, string> = {
  mm2: 'Quadratmillimeter',
  cm2: 'Quadratzentimeter',
  dm2: 'Quadratdezimeter',
  m2: 'Quadratmeter',
  km2: 'Quadratkilometer',
  a: 'Ar',
  ha: 'Hektar',
  in2: 'Quadratzoll',
  ft2: 'Quadratfuß',
  yd2: 'Quadratyard',
  mi2: 'Quadratmeile',
  ac: 'Acre',
  b: 'Barn'
};

// Symbole für Anzeige
export const areaUnitSymbols: Record<AreaUnit, string> = {
  mm2: 'mm²',
  cm2: 'cm²',
  dm2: 'dm²',
  m2: 'm²',
  km2: 'km²',
  a: 'a',
  ha: 'ha',
  in2: 'in²',
  ft2: 'ft²',
  yd2: 'yd²',
  mi2: 'mi²',
  ac: 'ac',
  b: 'b'
};

/**
 * Wandelt einen Flächenwert um
 */
export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  const inSquareMeters = value * areaToSquareMeter[from];
  return inSquareMeters / areaToSquareMeter[to];
}

/**
 * Gibt alle verfügbaren Flächeneinheiten zurück
 */
export function getAllAreaUnits(): AreaUnit[] {
  return Object.keys(areaToSquareMeter) as AreaUnit[];
}

/**
 * Gibt die gängigsten Flächeneinheiten zurück
 */
export function getCommonAreaUnits(): AreaUnit[] {
  return ['cm2', 'm2', 'km2', 'ha', 'ft2', 'ac'];
}

/**
 * Referenzbeispiele
 */
export const areaExamples = {
  'hektar-in-m2': {
    from: 'ha' as AreaUnit,
    to: 'm2' as AreaUnit,
    example: '1 ha = 10.000 m²'
  },
  'acre-in-hektar': {
    from: 'ac' as AreaUnit,
    to: 'ha' as AreaUnit,
    example: '1 Acre = 0,4047 Hektar'
  }
};
