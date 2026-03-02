/**
 * Beschleunigungs-Umrechner (Acceleration Conversion)
 * Umrechnung von Beschleunigungseinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Meter pro Quadratsekunde (m/s²)
 */

export type AccelerationUnit = 
  | 'm/s²'    // Meter pro Quadratsekunde (Basis)
  | 'cm/s²'   // Zentimeter pro Quadratsekunde (Gal)
  | 'ft/s²'   // Fuß pro Quadratsekunde
  | 'in/s²'   // Zoll pro Quadratsekunde
  | 'g'       // Erdbeschleunigung
  | 'Gal';    // Gal

// Umrechnungsfaktoren zur Basis-Einheit m/s²
export const accelerationToMeterPerSecondSquared: Record<AccelerationUnit, number> = {
  'm/s²': 1,                  // Meter pro Quadratsekunde (Basis)
  'cm/s²': 0.01,              // Zentimeter pro Quadratsekunde
  'ft/s²': 0.3048,            // Fuß pro Quadratsekunde
  'in/s²': 0.0254,            // Zoll pro Quadratsekunde
  'g': 9.80665,               // Erdbeschleunigung (Standard)
  'Gal': 0.01                 // Gal (= cm/s²)
};

// Deutsche Bezeichnungen
export const accelerationUnitNames: Record<AccelerationUnit, string> = {
  'm/s²': 'Meter pro Quadratsekunde',
  'cm/s²': 'Zentimeter pro Quadratsekunde',
  'ft/s²': 'Fuß pro Quadratsekunde',
  'in/s²': 'Zoll pro Quadratsekunde',
  'g': 'Erdbeschleunigung (g)',
  'Gal': 'Gal'
};

// Symbole
export const accelerationUnitSymbols: Record<AccelerationUnit, string> = {
  'm/s²': 'm/s²',
  'cm/s²': 'cm/s²',
  'ft/s²': 'ft/s²',
  'in/s²': 'in/s²',
  'g': 'g',
  'Gal': 'Gal'
};

/**
 * Wandelt einen Beschleunigungswert um
 */
export function convertAcceleration(value: number, from: AccelerationUnit, to: AccelerationUnit): number {
  const inMps2 = value * accelerationToMeterPerSecondSquared[from];
  return inMps2 / accelerationToMeterPerSecondSquared[to];
}

/**
 * Gibt alle verfügbaren Einheiten zurück
 */
export function getAllAccelerationUnits(): AccelerationUnit[] {
  return Object.keys(accelerationToMeterPerSecondSquared) as AccelerationUnit[];
}
