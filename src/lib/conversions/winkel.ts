/**
 * Winkel-Umrechner (Angle Conversion)
 * Umrechnung von Winkeleinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Radiant (rad)
 */

export type AngleUnit = 
  | 'deg'     // Grad
  | 'rad'     // Radiant (Basis)
  | 'gon'     // Gon (Neugrad)
  | 'arcmin'  // Bogenminute
  | 'arcsec'  // Bogensekunde
  | 'rev'     // Umdrehung
  | 'mrad';   // Milliradiant

// Umrechnungsfaktoren zur Basis-Einheit Radiant
export const angleToRadian: Record<AngleUnit, number> = {
  deg: Math.PI / 180,         // Grad
  rad: 1,                     // Radiant (Basis)
  gon: Math.PI / 200,         // Gon (Neugrad)
  arcmin: Math.PI / 10800,    // Bogenminute
  arcsec: Math.PI / 648000,   // Bogensekunde
  rev: 2 * Math.PI,           // Umdrehung (360°)
  mrad: 0.001                 // Milliradiant
};

// Deutsche Bezeichnungen
export const angleUnitNames: Record<AngleUnit, string> = {
  deg: 'Grad',
  rad: 'Radiant',
  gon: 'Gon',
  arcmin: 'Bogenminute',
  arcsec: 'Bogensekunde',
  rev: 'Umdrehung',
  mrad: 'Milliradiant'
};

// Symbole
export const angleUnitSymbols: Record<AngleUnit, string> = {
  deg: '°',
  rad: 'rad',
  gon: 'gon',
  arcmin: "'",
  arcsec: '"',
  rev: 'rev',
  mrad: 'mrad'
};

/**
 * Wandelt einen Winkelwert um
 */
export function convertAngle(value: number, from: AngleUnit, to: AngleUnit): number {
  const inRadian = value * angleToRadian[from];
  return inRadian / angleToRadian[to];
}

/**
 * Gibt alle verfügbaren Winkeleinheiten zurück
 */
export function getAllAngleUnits(): AngleUnit[] {
  return Object.keys(angleToRadian) as AngleUnit[];
}

/**
 * Gibt die gängigsten Winkeleinheiten zurück
 */
export function getCommonAngleUnits(): AngleUnit[] {
  return ['deg', 'rad', 'gon'];
}

/**
 * Formel für die Anzeige
 */
export function getAngleFormula(from: AngleUnit, to: AngleUnit): string {
  if (from === to) return '1';
  
  const formulas: Record<string, string> = {
    'deg-rad': 'rad = ° × π/180',
    'rad-deg': '° = rad × 180/π',
    'deg-gon': 'gon = ° × 10/9',
    'gon-deg': '° = gon × 9/10'
  };
  
  const key = `${from}-${to}`;
  return formulas[key] || 'Komplexe Umrechnung';
}
