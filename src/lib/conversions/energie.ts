/**
 * Energie-Umrechner (Energy Conversion)
 * Umrechnung von Energieeinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Joule (J)
 */

export type EnergyUnit = 
  | 'J'       // Joule (Basis)
  | 'kJ'      // Kilojoule
  | 'MJ'      // Megajoule
  | 'GJ'      // Gigajoule
  | 'Wh'      // Wattstunde
  | 'kWh'     // Kilowattstunde
  | 'MWh'     // Megawattstunde
  | 'cal'     // Kalorie (thermochemisch)
  | 'kcal'    // Kilokalorie
  | 'BTU'     // British Thermal Unit
  | 'eV'      // Elektronenvolt
  | 'keV'     // Kiloelektronenvolt
  | 'MeV'     // Megaelektronenvolt
  | 'erg'     // Erg
  | 'ft_lbf'; // Fuß-Pfund-Kraft

// Umrechnungsfaktoren zur Basis-Einheit Joule
export const energyToJoule: Record<EnergyUnit, number> = {
  J: 1,                        // Joule (Basis)
  kJ: 1000,                    // Kilojoule
  MJ: 1e6,                     // Megajoule
  GJ: 1e9,                     // Gigajoule
  Wh: 3600,                    // Wattstunde
  kWh: 3600000,                // Kilowattstunde
  MWh: 3600000000,             // Megawattstunde
  cal: 4.184,                  // Kalorie (thermochemisch)
  kcal: 4184,                  // Kilokalorie
  BTU: 1055.05585262,          // British Thermal Unit (IT)
  eV: 1.602176634e-19,         // Elektronenvolt
  keV: 1.602176634e-16,        // Kiloelektronenvolt
  MeV: 1.602176634e-13,        // Megaelektronenvolt
  erg: 1e-7,                   // Erg
  ft_lbf: 1.3558179483314004   // Fuß-Pfund-Kraft
};

// Deutsche Bezeichnungen
export const energyUnitNames: Record<EnergyUnit, string> = {
  J: 'Joule',
  kJ: 'Kilojoule',
  MJ: 'Megajoule',
  GJ: 'Gigajoule',
  Wh: 'Wattstunde',
  kWh: 'Kilowattstunde',
  MWh: 'Megawattstunde',
  cal: 'Kalorie',
  kcal: 'Kilokalorie',
  BTU: 'British Thermal Unit',
  eV: 'Elektronenvolt',
  keV: 'Kiloelektronenvolt',
  MeV: 'Megaelektronenvolt',
  erg: 'Erg',
  ft_lbf: 'Fuß-Pfund-Kraft'
};

// Symbole
export const energyUnitSymbols: Record<EnergyUnit, string> = {
  J: 'J',
  kJ: 'kJ',
  MJ: 'MJ',
  GJ: 'GJ',
  Wh: 'Wh',
  kWh: 'kWh',
  MWh: 'MWh',
  cal: 'cal',
  kcal: 'kcal',
  BTU: 'BTU',
  eV: 'eV',
  keV: 'keV',
  MeV: 'MeV',
  erg: 'erg',
  ft_lbf: 'ft·lbf'
};

/**
 * Wandelt einen Energiewert um
 */
export function convertEnergy(value: number, from: EnergyUnit, to: EnergyUnit): number {
  const inJoule = value * energyToJoule[from];
  return inJoule / energyToJoule[to];
}

/**
 * Gibt alle verfügbaren Energieeinheiten zurück
 */
export function getAllEnergyUnits(): EnergyUnit[] {
  return Object.keys(energyToJoule) as EnergyUnit[];
}

/**
 * Gibt die gängigsten Energieeinheiten zurück
 */
export function getCommonEnergyUnits(): EnergyUnit[] {
  return ['J', 'kJ', 'kWh', 'cal', 'kcal', 'BTU'];
}

/**
 * Kalorien ↔ Joule für Ernährung
 */
export function convertCaloriesToJoules(kcal: number): number {
  return kcal * 4184;
}

export function convertJoulesToCalories(joules: number): number {
  return joules / 4184;
}
