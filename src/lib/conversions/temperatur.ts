/**
 * Temperatur-Umrechner (Temperature Conversion)
 * Umrechnung von Temperatureinheiten für UmrechnerPro.de
 * 
 * HINWEIS: Temperatur verwendet Formeln statt einfacher Faktoren,
 * da die Skalen unterschiedliche Nullpunkte haben.
 */

// Alle unterstützten Temperatureinheiten
export type TemperatureUnit = 
  | 'C'     // Celsius
  | 'F'     // Fahrenheit
  | 'K'     // Kelvin
  | 'R'     // Rankine
  | 'Ré'    // Réaumur
  | 'Rø'    // Rømer
  | 'N'     // Newton
  | 'De';   // Delisle

// Deutsche Bezeichnungen
export const temperatureUnitNames: Record<TemperatureUnit, string> = {
  C: 'Celsius',
  F: 'Fahrenheit',
  K: 'Kelvin',
  R: 'Rankine',
  Ré: 'Réaumur',
  Rø: 'Rømer',
  N: 'Newton',
  De: 'Delisle'
};

// Symbole
export const temperatureUnitSymbols: Record<TemperatureUnit, string> = {
  C: '°C',
  F: '°F',
  K: 'K',
  R: '°R',
  Ré: '°Ré',
  Rø: '°Rø',
  N: '°N',
  De: '°De'
};

/**
 * Wandelt einen Temperaturwert von einer Einheit in eine andere um
 * Verwendet Zwischenschritt über Celsius als Referenz
 */
export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  // Erst zu Celsius umrechnen
  let celsius: number;
  
  switch (from) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    case 'R':
      celsius = (value - 491.67) * 5 / 9;
      break;
    case 'Ré':
      celsius = value * 1.25;
      break;
    case 'Rø':
      celsius = (value - 7.5) * 40 / 21;
      break;
    case 'N':
      celsius = value * 100 / 33;
      break;
    case 'De':
      celsius = 100 - value * 2 / 3;
      break;
    default:
      celsius = value;
  }
  
  // Dann von Celsius zur Ziel-Einheit
  switch (to) {
    case 'C':
      return celsius;
    case 'F':
      return celsius * 9 / 5 + 32;
    case 'K':
      return celsius + 273.15;
    case 'R':
      return (celsius + 273.15) * 9 / 5;
    case 'Ré':
      return celsius * 0.8;
    case 'Rø':
      return celsius * 21 / 40 + 7.5;
    case 'N':
      return celsius * 33 / 100;
    case 'De':
      return (100 - celsius) * 1.5;
    default:
      return celsius;
  }
}

/**
 * Gibt die Formel für die Anzeige zurück
 */
export function getTemperatureFormula(from: TemperatureUnit, to: TemperatureUnit): string {
  if (from === to) return '1';
  
  const formulas: Record<string, string> = {
    'C-F': '°F = °C × 9/5 + 32',
    'F-C': '°C = (°F - 32) × 5/9',
    'C-K': 'K = °C + 273,15',
    'K-C': '°C = K - 273,15',
    'F-K': 'K = (°F + 459,67) × 5/9',
    'K-F': '°F = K × 9/5 - 459,67'
  };
  
  const key = `${from}-${to}`;
  return formulas[key] || 'Komplexe Umrechnung';
}

/**
 * Gibt alle verfügbaren Temperatureinheiten zurück
 */
export function getAllTemperatureUnits(): TemperatureUnit[] {
  return ['C', 'F', 'K', 'R', 'Ré', 'Rø', 'N', 'De'];
}

/**
 * Gibt die gängigsten Temperatureinheiten zurück
 */
export function getCommonTemperatureUnits(): TemperatureUnit[] {
  return ['C', 'F', 'K'];
}

/**
 * Wichtige Temperatur-Punkte für Referenz
 */
export const temperatureReferencePoints = {
  absoluteZero: { C: -273.15, F: -459.67, K: 0, name: 'Absoluter Nullpunkt' },
  freezingPoint: { C: 0, F: 32, K: 273.15, name: 'Gefrierpunkt von Wasser' },
  bodyTemp: { C: 37, F: 98.6, K: 310.15, name: 'Normale Körpertemperatur' },
  boilingPoint: { C: 100, F: 212, K: 373.15, name: 'Siedepunkt von Wasser' }
};
