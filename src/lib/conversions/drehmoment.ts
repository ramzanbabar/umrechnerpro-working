/**
 * Drehmoment-Umrechner (Torque Conversion)
 * Umrechnung von Drehmomenteinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Newtonmeter (N·m)
 */

export type TorqueUnit = 
  | 'N·m'     // Newtonmeter (Basis)
  | 'kN·m'    // Kilonewtonmeter
  | 'kgf·m'   // Kilopondmeter
  | 'kgf·cm'  // Kilopondzentimeter
  | 'lbf·ft'  // Pound-foot
  | 'lbf·in'  // Pound-inch
  | 'dyn·cm'; // Dyn-Zentimeter

// Umrechnungsfaktoren zur Basis-Einheit N·m
export const torqueToNewtonMeter: Record<TorqueUnit, number> = {
  'N·m': 1,                         // Newtonmeter (Basis)
  'kN·m': 1000,                      // Kilonewtonmeter
  'kgf·m': 9.80665,                  // Kilopondmeter
  'kgf·cm': 0.0980665,               // Kilopondzentimeter
  'lbf·ft': 1.3558179483314004,     // Pound-foot
  'lbf·in': 0.1129848290276167,     // Pound-inch
  'dyn·cm': 1e-7                     // Dyn-Zentimeter
};

// Deutsche Bezeichnungen
export const torqueUnitNames: Record<TorqueUnit, string> = {
  'N·m': 'Newtonmeter',
  'kN·m': 'Kilonewtonmeter',
  'kgf·m': 'Kilopondmeter',
  'kgf·cm': 'Kilopondzentimeter',
  'lbf·ft': 'Pfund-Fuß',
  'lbf·in': 'Pfund-Zoll',
  'dyn·cm': 'Dyn-Zentimeter'
};

// Symbole
export const torqueUnitSymbols: Record<TorqueUnit, string> = {
  'N·m': 'N·m',
  'kN·m': 'kN·m',
  'kgf·m': 'kgf·m',
  'kgf·cm': 'kgf·cm',
  'lbf·ft': 'lbf·ft',
  'lbf·in': 'lbf·in',
  'dyn·cm': 'dyn·cm'
};

/**
 * Wandelt einen Drehmomentwert um
 */
export function convertTorque(value: number, from: TorqueUnit, to: TorqueUnit): number {
  const inNewtonMeter = value * torqueToNewtonMeter[from];
  return inNewtonMeter / torqueToNewtonMeter[to];
}

/**
 * Gibt alle verfügbaren Einheiten zurück
 */
export function getAllTorqueUnits(): TorqueUnit[] {
  return Object.keys(torqueToNewtonMeter) as TorqueUnit[];
}

/**
 * Gibt die gängigsten Einheiten zurück
 */
export function getCommonTorqueUnits(): TorqueUnit[] {
  return ['N·m', 'kN·m', 'lbf·ft', 'kgf·m'];
}
