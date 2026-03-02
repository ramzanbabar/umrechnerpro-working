/**
 * Frequenz-Umrechner (Frequency Conversion)
 * Umrechnung von Frequenzeinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Hertz (Hz)
 */

export type FrequencyUnit = 
  | 'Hz'      // Hertz (Basis)
  | 'kHz'     // Kilohertz
  | 'MHz'     // Megahertz
  | 'GHz'     // Gigahertz
  | 'THz'     // Terahertz
  | 'rpm'     // Umdrehungen pro Minute
  | 'rad/s';  // Radiant pro Sekunde

// Umrechnungsfaktoren zur Basis-Einheit Hertz
export const frequencyToHertz: Record<FrequencyUnit, number> = {
  Hz: 1,                      // Hertz (Basis)
  kHz: 1000,                  // Kilohertz
  MHz: 1e6,                   // Megahertz
  GHz: 1e9,                   // Gigahertz
  THz: 1e12,                  // Terahertz
  rpm: 1/60,                  // Umdrehungen pro Minute
  'rad/s': 1/(2*Math.PI)      // Radiant pro Sekunde
};

// Deutsche Bezeichnungen
export const frequencyUnitNames: Record<FrequencyUnit, string> = {
  Hz: 'Hertz',
  kHz: 'Kilohertz',
  MHz: 'Megahertz',
  GHz: 'Gigahertz',
  THz: 'Terahertz',
  rpm: 'Umdrehungen pro Minute',
  'rad/s': 'Radiant pro Sekunde'
};

// Symbole
export const frequencyUnitSymbols: Record<FrequencyUnit, string> = {
  Hz: 'Hz',
  kHz: 'kHz',
  MHz: 'MHz',
  GHz: 'GHz',
  THz: 'THz',
  rpm: 'U/min',
  'rad/s': 'rad/s'
};

/**
 * Wandelt einen Frequenzwert um
 */
export function convertFrequency(value: number, from: FrequencyUnit, to: FrequencyUnit): number {
  const inHertz = value * frequencyToHertz[from];
  return inHertz / frequencyToHertz[to];
}

/**
 * Gibt alle verfügbaren Frequenzeinheiten zurück
 */
export function getAllFrequencyUnits(): FrequencyUnit[] {
  return Object.keys(frequencyToHertz) as FrequencyUnit[];
}

/**
 * Gibt die gängigsten Frequenzeinheiten zurück
 */
export function getCommonFrequencyUnits(): FrequencyUnit[] {
  return ['Hz', 'kHz', 'MHz', 'GHz'];
}
