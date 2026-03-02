/**
 * Leistungs-Umrechner (Power Conversion)
 * Umrechnung von Leistungseinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Watt (W)
 * 
 * WICHTIG: PS (Pferdestärke) ist die metrische Pferdestärke
 * HP (Horsepower) ist die imperiale Pferdestärke
 */

export type PowerUnit = 
  | 'W'       // Watt (Basis)
  | 'kW'      // Kilowatt
  | 'MW'      // Megawatt
  | 'GW'      // Gigawatt
  | 'PS'      // Pferdestärke (metrisch)
  | 'HP'      // Horsepower (imperial)
  | 'BTU/h'   // BTU pro Stunde
  | 'kcal/h'  // Kilokalorie pro Stunde
  | 'ft_lbf/s' // Fuß-Pfund-Kraft pro Sekunde
  | 'erg/s';  // Erg pro Sekunde

// Umrechnungsfaktoren zur Basis-Einheit Watt
export const powerToWatt: Record<PowerUnit, number> = {
  W: 1,                       // Watt (Basis)
  kW: 1000,                   // Kilowatt
  MW: 1e6,                    // Megawatt
  GW: 1e9,                    // Gigawatt
  PS: 735.49875,              // Pferdestärke (metrisch)
  HP: 745.6998715822702,      // Horsepower (imperial/mechanical)
  'BTU/h': 0.2930710701722222, // BTU pro Stunde (IT)
  'kcal/h': 1.163,            // Kilokalorie pro Stunde
  'ft_lbf/s': 1.3558179483314004, // Fuß-Pfund-Kraft pro Sekunde
  'erg/s': 1e-7               // Erg pro Sekunde
};

// Deutsche Bezeichnungen
export const powerUnitNames: Record<PowerUnit, string> = {
  W: 'Watt',
  kW: 'Kilowatt',
  MW: 'Megawatt',
  GW: 'Gigawatt',
  PS: 'Pferdestärke',
  HP: 'Horsepower',
  'BTU/h': 'BTU pro Stunde',
  'kcal/h': 'Kilokalorie pro Stunde',
  'ft_lbf/s': 'Fuß-Pfund/Sekunde',
  'erg/s': 'Erg pro Sekunde'
};

// Symbole
export const powerUnitSymbols: Record<PowerUnit, string> = {
  W: 'W',
  kW: 'kW',
  MW: 'MW',
  GW: 'GW',
  PS: 'PS',
  HP: 'HP',
  'BTU/h': 'BTU/h',
  'kcal/h': 'kcal/h',
  'ft_lbf/s': 'ft·lbf/s',
  'erg/s': 'erg/s'
};

/**
 * Wandelt einen Leistungswert um
 */
export function convertPower(value: number, from: PowerUnit, to: PowerUnit): number {
  const inWatt = value * powerToWatt[from];
  return inWatt / powerToWatt[to];
}

/**
 * Gibt alle verfügbaren Leistungseinheiten zurück
 */
export function getAllPowerUnits(): PowerUnit[] {
  return Object.keys(powerToWatt) as PowerUnit[];
}

/**
 * Gibt die gängigsten Leistungseinheiten zurück
 */
export function getCommonPowerUnits(): PowerUnit[] {
  return ['W', 'kW', 'PS', 'HP'];
}

/**
 * PS ↔ kW Umrechnung (häufig für Autos)
 */
export function psToKw(ps: number): number {
  return ps * 0.73549875;
}

export function kwToPs(kw: number): number {
  return kw / 0.73549875;
}
