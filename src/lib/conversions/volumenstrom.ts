/**
 * Volumenstrom-Umrechner (Flow Rate Conversion)
 * Umrechnung von Volumenstrom-Einheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Kubikmeter pro Sekunde (m³/s)
 */

export type FlowRateUnit = 
  | 'm³/s'    // Kubikmeter pro Sekunde (Basis)
  | 'm³/min'  // Kubikmeter pro Minute
  | 'm³/h'    // Kubikmeter pro Stunde
  | 'L/s'     // Liter pro Sekunde
  | 'L/min'   // Liter pro Minute
  | 'L/h'     // Liter pro Stunde
  | 'mL/s'    // Milliliter pro Sekunde
  | 'cm³/s'   // Kubikzentimeter pro Sekunde
  | 'ft³/s'   // Kubikfuß pro Sekunde
  | 'ft³/min' // Kubikfuß pro Minute (CFM)
  | 'GPM'     // Gallonen pro Minute (US)
  | 'GPH';    // Gallonen pro Stunde (US)

// Umrechnungsfaktoren zur Basis-Einheit m³/s
export const flowRateToM3PerS: Record<FlowRateUnit, number> = {
  'm³/s': 1,
  'm³/min': 0.016666666666666666,
  'm³/h': 0.0002777777777777778,
  'L/s': 0.001,
  'L/min': 1.6666666666666667e-5,
  'L/h': 2.777777777777778e-7,
  'mL/s': 1e-6,
  'cm³/s': 1e-6,
  'ft³/s': 0.028316846592,
  'ft³/min': 0.0004719474432,
  'GPM': 6.30901964e-5,     // US Gallons per Minute
  'GPH': 1.0515032733333333e-6  // US Gallons per Stunde
};

// Deutsche Bezeichnungen
export const flowRateUnitNames: Record<FlowRateUnit, string> = {
  'm³/s': 'Kubikmeter pro Sekunde',
  'm³/min': 'Kubikmeter pro Minute',
  'm³/h': 'Kubikmeter pro Stunde',
  'L/s': 'Liter pro Sekunde',
  'L/min': 'Liter pro Minute',
  'L/h': 'Liter pro Stunde',
  'mL/s': 'Milliliter pro Sekunde',
  'cm³/s': 'Kubikzentimeter pro Sekunde',
  'ft³/s': 'Kubikfuß pro Sekunde',
  'ft³/min': 'Kubikfuß pro Minute (CFM)',
  'GPM': 'Gallonen pro Minute (US)',
  'GPH': 'Gallonen pro Stunde (US)'
};

// Symbole
export const flowRateUnitSymbols: Record<FlowRateUnit, string> = {
  'm³/s': 'm³/s',
  'm³/min': 'm³/min',
  'm³/h': 'm³/h',
  'L/s': 'L/s',
  'L/min': 'L/min',
  'L/h': 'L/h',
  'mL/s': 'mL/s',
  'cm³/s': 'cm³/s',
  'ft³/s': 'ft³/s',
  'ft³/min': 'CFM',
  'GPM': 'GPM',
  'GPH': 'GPH'
};

/**
 * Wandelt einen Volumenstromwert um
 */
export function convertFlowRate(value: number, from: FlowRateUnit, to: FlowRateUnit): number {
  const inM3PerS = value * flowRateToM3PerS[from];
  return inM3PerS / flowRateToM3PerS[to];
}

/**
 * Gibt alle verfügbaren Einheiten zurück
 */
export function getAllFlowRateUnits(): FlowRateUnit[] {
  return Object.keys(flowRateToM3PerS) as FlowRateUnit[];
}

/**
 * Gibt die gängigsten Einheiten zurück
 */
export function getCommonFlowRateUnits(): FlowRateUnit[] {
  return ['L/min', 'L/s', 'm³/h', 'GPM', 'ft³/min'];
}
