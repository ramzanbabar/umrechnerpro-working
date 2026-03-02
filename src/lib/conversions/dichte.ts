/**
 * Dichte-Umrechner (Density Conversion)
 * Umrechnung von Dichteeinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Kilogramm pro Kubikmeter (kg/m³)
 */

export type DensityUnit = 
  | 'kg/m³'    // Kilogramm pro Kubikmeter (Basis)
  | 'g/cm³'    // Gramm pro Kubikzentimeter
  | 'g/mL'     // Gramm pro Milliliter
  | 'mg/mL'    // Milligramm pro Milliliter
  | 'lb/ft³'   // Pfund pro Kubikfuß
  | 'lb/in³'   // Pfund pro Kubikzoll
  | 'lb/gal';  // Pfund pro Gallone (US)

// Umrechnungsfaktoren zur Basis-Einheit kg/m³
export const densityToKgPerM3: Record<DensityUnit, number> = {
  'kg/m³': 1,                    // Kilogramm pro Kubikmeter (Basis)
  'g/cm³': 1000,                 // Gramm pro Kubikzentimeter
  'g/mL': 1000,                  // Gramm pro Milliliter
  'mg/mL': 1,                    // Milligramm pro Milliliter
  'lb/ft³': 16.018463373960138,  // Pfund pro Kubikfuß
  'lb/in³': 27679.904710203122,  // Pfund pro Kubikzoll
  'lb/gal': 119.82642731689663   // Pfund pro Gallone (US)
};

// Deutsche Bezeichnungen
export const densityUnitNames: Record<DensityUnit, string> = {
  'kg/m³': 'Kilogramm pro Kubikmeter',
  'g/cm³': 'Gramm pro Kubikzentimeter',
  'g/mL': 'Gramm pro Milliliter',
  'mg/mL': 'Milligramm pro Milliliter',
  'lb/ft³': 'Pfund pro Kubikfuß',
  'lb/in³': 'Pfund pro Kubikzoll',
  'lb/gal': 'Pfund pro Gallone'
};

// Symbole
export const densityUnitSymbols: Record<DensityUnit, string> = {
  'kg/m³': 'kg/m³',
  'g/cm³': 'g/cm³',
  'g/mL': 'g/mL',
  'mg/mL': 'mg/mL',
  'lb/ft³': 'lb/ft³',
  'lb/in³': 'lb/in³',
  'lb/gal': 'lb/gal'
};

/**
 * Wandelt einen Dichtewert um
 */
export function convertDensity(value: number, from: DensityUnit, to: DensityUnit): number {
  const inKgPerM3 = value * densityToKgPerM3[from];
  return inKgPerM3 / densityToKgPerM3[to];
}

/**
 * Gibt alle verfügbaren Dichteeinheiten zurück
 */
export function getAllDensityUnits(): DensityUnit[] {
  return Object.keys(densityToKgPerM3) as DensityUnit[];
}

/**
 * Referenzwerte für常见 Materialien
 */
export const densityReferenceValues = {
  water: { value: 1000, unit: 'kg/m³' as DensityUnit, name: 'Wasser (4°C)' },
  air: { value: 1.225, unit: 'kg/m³' as DensityUnit, name: 'Luft (Meereshöhe)' },
  iron: { value: 7874, unit: 'kg/m³' as DensityUnit, name: 'Eisen' },
  gold: { value: 19300, unit: 'kg/m³' as DensityUnit, name: 'Gold' }
};
