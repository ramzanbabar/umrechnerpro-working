/**
 * Viskosität-Umrechner (Viscosity Conversion)
 * Umrechnung von Viskositätseinheiten für UmrechnerPro.de
 */

// === DYNAMISCHE VISKOSITÄT ===

export type DynamicViscosityUnit = 
  | 'Pa·s'    // Pascalsekunde (Basis)
  | 'mPa·s'   // Millipascalsekunde
  | 'µPa·s'   // Mikropascalsekunde
  | 'cP'      // Centipoise
  | 'P'       // Poise
  | 'dyn·s/cm²' // Dyn-Sekunde pro Quadratzentimeter
  | 'lbf·s/ft²' // Pound-force-Sekunde pro Quadratfuß
  | 'lb/(ft·s)'; // Pfund pro Fuß-Sekunde

export const dynamicViscosityToPas: Record<DynamicViscosityUnit, number> = {
  'Pa·s': 1,                          // Pascalsekunde (Basis)
  'mPa·s': 0.001,                      // Millipascalsekunde
  'µPa·s': 1e-6,                       // Mikropascalsekunde
  'cP': 0.001,                         // Centipoise (= mPa·s)
  'P': 0.1,                            // Poise
  'dyn·s/cm²': 0.1,                    // Dyn-Sekunde pro cm²
  'lbf·s/ft²': 47.88025898033584,     // lbf·s/ft²
  'lb/(ft·s)': 1.4881639435695542     // lb/(ft·s)
};

export const dynamicViscosityUnitNames: Record<DynamicViscosityUnit, string> = {
  'Pa·s': 'Pascalsekunde',
  'mPa·s': 'Millipascalsekunde',
  'µPa·s': 'Mikropascalsekunde',
  'cP': 'Centipoise',
  'P': 'Poise',
  'dyn·s/cm²': 'Dyn·s/cm²',
  'lbf·s/ft²': 'lbf·s/ft²',
  'lb/(ft·s)': 'lb/(ft·s)'
};

export function convertDynamicViscosity(value: number, from: DynamicViscosityUnit, to: DynamicViscosityUnit): number {
  const inPas = value * dynamicViscosityToPas[from];
  return inPas / dynamicViscosityToPas[to];
}

// === KINEMATISCHE VISKOSITÄT ===

export type KinematicViscosityUnit = 
  | 'm²/s'    // Quadratmeter pro Sekunde (Basis)
  | 'cm²/s'   // Quadratzentimeter pro Sekunde (Stokes)
  | 'mm²/s'   // Quadratmillimeter pro Sekunde (Centistokes)
  | 'ft²/s'   // Quadratfuß pro Sekunde
  | 'in²/s';  // Quadratzoll pro Sekunde

export const kinematicViscosityToM2s: Record<KinematicViscosityUnit, number> = {
  'm²/s': 1,                    // Quadratmeter pro Sekunde (Basis)
  'cm²/s': 1e-4,                // Stokes
  'mm²/s': 1e-6,                // Centistokes
  'ft²/s': 0.09290304,          // Quadratfuß pro Sekunde
  'in²/s': 0.00064516           // Quadratzoll pro Sekunde
};

export const kinematicViscosityUnitNames: Record<KinematicViscosityUnit, string> = {
  'm²/s': 'Quadratmeter pro Sekunde',
  'cm²/s': 'Stokes',
  'mm²/s': 'Centistokes',
  'ft²/s': 'Quadratfuß pro Sekunde',
  'in²/s': 'Quadratzoll pro Sekunde'
};

export function convertKinematicViscosity(value: number, from: KinematicViscosityUnit, to: KinematicViscosityUnit): number {
  const inM2s = value * kinematicViscosityToM2s[from];
  return inM2s / kinematicViscosityToM2s[to];
}
