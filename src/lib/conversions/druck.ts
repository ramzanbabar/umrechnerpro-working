/**
 * Druck-Umrechner (Pressure Conversion)
 * Umrechnung von Druckeinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Pascal (Pa)
 */

export type PressureUnit = 
  | 'Pa'      // Pascal (Basis)
  | 'hPa'     // Hektopascal
  | 'kPa'     // Kilopascal
  | 'MPa'     // Megapascal
  | 'GPa'     // Gigapascal
  | 'bar'     // Bar
  | 'mbar'    // Millibar
  | 'psi'     // Pound per Square Inch
  | 'atm'     // Atmosphäre
  | 'at'      // Technische Atmosphäre
  | 'Torr'    // Torr
  | 'mmHg'    // Millimeter Quecksilbersäule
  | 'cmH2O'   // Zentimeter Wassersäule
  | 'inHg'    // Zoll Quecksilbersäule
  | 'inH2O';  // Zoll Wassersäule

// Umrechnungsfaktoren zur Basis-Einheit Pascal
export const pressureToPascal: Record<PressureUnit, number> = {
  Pa: 1,                      // Pascal (Basis)
  hPa: 100,                   // Hektopascal
  kPa: 1000,                  // Kilopascal
  MPa: 1e6,                   // Megapascal
  GPa: 1e9,                   // Gigapascal
  bar: 100000,                // Bar
  mbar: 100,                  // Millibar
  psi: 6894.757293168,        // Pound per Square Inch
  atm: 101325,                // Standardatmosphäre
  at: 98066.5,                // Technische Atmosphäre (kgf/cm²)
  Torr: 133.322368421053,     // Torr
  mmHg: 133.322,              // Millimeter Quecksilbersäule
  cmH2O: 98.0665,             // Zentimeter Wassersäule
  inHg: 3386.389,             // Zoll Quecksilbersäule
  inH2O: 249.089              // Zoll Wassersäule
};

// Deutsche Bezeichnungen
export const pressureUnitNames: Record<PressureUnit, string> = {
  Pa: 'Pascal',
  hPa: 'Hektopascal',
  kPa: 'Kilopascal',
  MPa: 'Megapascal',
  GPa: 'Gigapascal',
  bar: 'Bar',
  mbar: 'Millibar',
  psi: 'Pfund pro Quadratzoll',
  atm: 'Atmosphäre',
  at: 'Technische Atmosphäre',
  Torr: 'Torr',
  mmHg: 'mmHg',
  cmH2O: 'cm Wassersäule',
  inHg: 'Zoll Quecksilbersäule',
  inH2O: 'Zoll Wassersäule'
};

// Symbole
export const pressureUnitSymbols: Record<PressureUnit, string> = {
  Pa: 'Pa',
  hPa: 'hPa',
  kPa: 'kPa',
  MPa: 'MPa',
  GPa: 'GPa',
  bar: 'bar',
  mbar: 'mbar',
  psi: 'psi',
  atm: 'atm',
  at: 'at',
  Torr: 'Torr',
  mmHg: 'mmHg',
  cmH2O: 'cmH₂O',
  inHg: 'inHg',
  inH2O: 'inH₂O'
};

/**
 * Wandelt einen Druckwert um
 */
export function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  const inPascal = value * pressureToPascal[from];
  return inPascal / pressureToPascal[to];
}

/**
 * Gibt alle verfügbaren Druckeinheiten zurück
 */
export function getAllPressureUnits(): PressureUnit[] {
  return Object.keys(pressureToPascal) as PressureUnit[];
}

/**
 * Gibt die gängigsten Druckeinheiten zurück
 */
export function getCommonPressureUnits(): PressureUnit[] {
  return ['Pa', 'kPa', 'bar', 'mbar', 'psi', 'atm'];
}
