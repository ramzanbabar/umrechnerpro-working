/**
 * Geschwindigkeits-Umrechner (Speed Conversion)
 * Umrechnung von Geschwindigkeitseinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Meter pro Sekunde (m/s)
 */

export type SpeedUnit = 
  | 'm/s'     // Meter pro Sekunde (Basis)
  | 'km/h'    // Kilometer pro Stunde
  | 'mph'     // Meilen pro Stunde
  | 'kn'      // Knoten
  | 'ft/s'    // Fuß pro Sekunde
  | 'ft/min'  // Fuß pro Minute
  | 'mach'    // Mach (bei Meeresspiegel, 15°C)
  | 'c';      // Lichtgeschwindigkeit

// Umrechnungsfaktoren zur Basis-Einheit m/s
export const speedToMeterPerSecond: Record<SpeedUnit, number> = {
  'm/s': 1,                    // Meter pro Sekunde (Basis)
  'km/h': 0.2777777777777778, // Kilometer pro Stunde
  'mph': 0.44704,              // Meilen pro Stunde
  'kn': 0.5144444444444444,   // Knoten (1 Seemeile/h)
  'ft/s': 0.3048,              // Fuß pro Sekunde
  'ft/min': 0.00508,           // Fuß pro Minute
  'mach': 340.29,              // Mach (Schallgeschwindigkeit bei 15°C)
  'c': 299792458               // Lichtgeschwindigkeit
};

// Deutsche Bezeichnungen
export const speedUnitNames: Record<SpeedUnit, string> = {
  'm/s': 'Meter pro Sekunde',
  'km/h': 'Kilometer pro Stunde',
  'mph': 'Meilen pro Stunde',
  'kn': 'Knoten',
  'ft/s': 'Fuß pro Sekunde',
  'ft/min': 'Fuß pro Minute',
  'mach': 'Mach',
  'c': 'Lichtgeschwindigkeit'
};

// Symbole
export const speedUnitSymbols: Record<SpeedUnit, string> = {
  'm/s': 'm/s',
  'km/h': 'km/h',
  'mph': 'mph',
  'kn': 'kn',
  'ft/s': 'ft/s',
  'ft/min': 'ft/min',
  'mach': 'Mach',
  'c': 'c'
};

/**
 * Wandelt einen Geschwindigkeitswert um
 */
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  const inMeterPerSecond = value * speedToMeterPerSecond[from];
  return inMeterPerSecond / speedToMeterPerSecond[to];
}

/**
 * Gibt alle verfügbaren Geschwindigkeitseinheiten zurück
 */
export function getAllSpeedUnits(): SpeedUnit[] {
  return Object.keys(speedToMeterPerSecond) as SpeedUnit[];
}

/**
 * Gibt die gängigsten Geschwindigkeitseinheiten zurück
 */
export function getCommonSpeedUnits(): SpeedUnit[] {
  return ['m/s', 'km/h', 'mph', 'kn'];
}

/**
 * Formel für Kraftstoffverbrauch (L/100km ↔ mpg)
 */
export function convertFuelConsumption(value: number, from: 'L/100km' | 'mpg_us' | 'mpg_uk' | 'km/L', to: 'L/100km' | 'mpg_us' | 'mpg_uk' | 'km/L'): number {
  // Erst zu L/100km umrechnen
  let litersPer100km: number;
  
  switch (from) {
    case 'L/100km':
      litersPer100km = value;
      break;
    case 'mpg_us':
      litersPer100km = 235.214583 / value;
      break;
    case 'mpg_uk':
      litersPer100km = 282.480936 / value;
      break;
    case 'km/L':
      litersPer100km = 100 / value;
      break;
    default:
      litersPer100km = value;
  }
  
  // Dann zur Zieleinheit
  switch (to) {
    case 'L/100km':
      return litersPer100km;
    case 'mpg_us':
      return 235.214583 / litersPer100km;
    case 'mpg_uk':
      return 282.480936 / litersPer100km;
    case 'km/L':
      return 100 / litersPer100km;
    default:
      return litersPer100km;
  }
}
