/**
 * Kraft-Umrechner (Force Conversion)
 * Umrechnung von Krafteinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Newton (N)
 */

export type ForceUnit = 
  | 'N'       // Newton (Basis)
  | 'kN'      // Kilonewton
  | 'MN'      // Meganewton
  | 'dyn'     // Dyn
  | 'kp'      // Kilopond
  | 'lbf'     // Pound-force
  | 'ozf'     // Ounce-force
  | 'kgf'     // Kilogram-force (identisch mit kp)
  | 'pdl';    // Poundal

// Umrechnungsfaktoren zur Basis-Einheit Newton
export const forceToNewton: Record<ForceUnit, number> = {
  N: 1,                       // Newton (Basis)
  kN: 1000,                   // Kilonewton
  MN: 1e6,                    // Meganewton
  dyn: 1e-5,                  // Dyn
  kp: 9.80665,                // Kilopond
  lbf: 4.4482216152605,       // Pound-force
  ozf: 0.2780138514745156,    // Ounce-force
  kgf: 9.80665,               // Kilogram-force (= kp)
  pdl: 0.138254954376         // Poundal
};

// Deutsche Bezeichnungen
export const forceUnitNames: Record<ForceUnit, string> = {
  N: 'Newton',
  kN: 'Kilonewton',
  MN: 'Meganewton',
  dyn: 'Dyn',
  kp: 'Kilopond',
  lbf: 'Pfund-Kraft',
  ozf: 'Unzen-Kraft',
  kgf: 'Kilogramm-Kraft',
  pdl: 'Poundal'
};

// Symbole
export const forceUnitSymbols: Record<ForceUnit, string> = {
  N: 'N',
  kN: 'kN',
  MN: 'MN',
  dyn: 'dyn',
  kp: 'kp',
  lbf: 'lbf',
  ozf: 'ozf',
  kgf: 'kgf',
  pdl: 'pdl'
};

/**
 * Wandelt einen Kraftwert um
 */
export function convertForce(value: number, from: ForceUnit, to: ForceUnit): number {
  const inNewton = value * forceToNewton[from];
  return inNewton / forceToNewton[to];
}

/**
 * Gibt alle verfügbaren Krafteinheiten zurück
 */
export function getAllForceUnits(): ForceUnit[] {
  return Object.keys(forceToNewton) as ForceUnit[];
}

/**
 * Gibt die gängigsten Krafteinheiten zurück
 */
export function getCommonForceUnits(): ForceUnit[] {
  return ['N', 'kN', 'kp', 'lbf'];
}
