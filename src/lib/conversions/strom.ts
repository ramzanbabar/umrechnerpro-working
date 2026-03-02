/**
 * Elektrische Einheiten-Umrechner (Electrical Units Conversion)
 * Umrechnung von elektrischen Einheiten für UmrechnerPro.de
 */

// === SPANNUNG (Voltage) ===

export type VoltageUnit = 'µV' | 'mV' | 'V' | 'kV' | 'MV' | 'GV';

export const voltageToVolt: Record<VoltageUnit, number> = {
  µV: 1e-6,
  mV: 0.001,
  V: 1,
  kV: 1000,
  MV: 1e6,
  GV: 1e9
};

export const voltageUnitNames: Record<VoltageUnit, string> = {
  µV: 'Mikrovolt',
  mV: 'Millivolt',
  V: 'Volt',
  kV: 'Kilovolt',
  MV: 'Megavolt',
  GV: 'Gigavolt'
};

export function convertVoltage(value: number, from: VoltageUnit, to: VoltageUnit): number {
  const inVolts = value * voltageToVolt[from];
  return inVolts / voltageToVolt[to];
}

// === STROM (Current) ===

export type CurrentUnit = 'µA' | 'mA' | 'A' | 'kA' | 'MA';

export const currentToAmpere: Record<CurrentUnit, number> = {
  µA: 1e-6,
  mA: 0.001,
  A: 1,
  kA: 1000,
  MA: 1e6
};

export const currentUnitNames: Record<CurrentUnit, string> = {
  µA: 'Mikroampere',
  mA: 'Milliampere',
  A: 'Ampere',
  kA: 'Kiloampere',
  MA: 'Megaampere'
};

export function convertCurrent(value: number, from: CurrentUnit, to: CurrentUnit): number {
  const inAmperes = value * currentToAmpere[from];
  return inAmperes / currentToAmpere[to];
}

// === WIDERSTAND (Resistance) ===

export type ResistanceUnit = 'µΩ' | 'mΩ' | 'Ω' | 'kΩ' | 'MΩ' | 'GΩ';

export const resistanceToOhm: Record<ResistanceUnit, number> = {
  µΩ: 1e-6,
  mΩ: 0.001,
  Ω: 1,
  kΩ: 1000,
  MΩ: 1e6,
  GΩ: 1e9
};

export const resistanceUnitNames: Record<ResistanceUnit, string> = {
  µΩ: 'Mikroohm',
  mΩ: 'Milliohm',
  Ω: 'Ohm',
  kΩ: 'Kiloohm',
  MΩ: 'Megaohm',
  GΩ: 'Gigaohm'
};

export function convertResistance(value: number, from: ResistanceUnit, to: ResistanceUnit): number {
  const inOhms = value * resistanceToOhm[from];
  return inOhms / resistanceToOhm[to];
}

// === KAPAZITÄT (Capacitance) ===

export type CapacitanceUnit = 'F' | 'mF' | 'µF' | 'nF' | 'pF' | 'fF';

export const capacitanceToFarad: Record<CapacitanceUnit, number> = {
  F: 1,
  mF: 0.001,
  µF: 1e-6,
  nF: 1e-9,
  pF: 1e-12,
  fF: 1e-15
};

export const capacitanceUnitNames: Record<CapacitanceUnit, string> = {
  F: 'Farad',
  mF: 'Millifarad',
  µF: 'Mikrofarad',
  nF: 'Nanofarad',
  pF: 'Pikofarad',
  fF: 'Femtofarad'
};

export function convertCapacitance(value: number, from: CapacitanceUnit, to: CapacitanceUnit): number {
  const inFarads = value * capacitanceToFarad[from];
  return inFarads / capacitanceToFarad[to];
}

// === INDUKTIVITÄT (Inductance) ===

export type InductanceUnit = 'H' | 'mH' | 'µH' | 'nH' | 'pH';

export const inductanceToHenry: Record<InductanceUnit, number> = {
  H: 1,
  mH: 0.001,
  µH: 1e-6,
  nH: 1e-9,
  pH: 1e-12
};

export const inductanceUnitNames: Record<InductanceUnit, string> = {
  H: 'Henry',
  mH: 'Millihenry',
  µH: 'Mikrohenry',
  nH: 'Nanohenry',
  pH: 'Pikohenry'
};

export function convertInductance(value: number, from: InductanceUnit, to: InductanceUnit): number {
  const inHenrys = value * inductanceToHenry[from];
  return inHenrys / inductanceToHenry[to];
}

// === LADUNG (Charge) ===

export type ChargeUnit = 'C' | 'mC' | 'µC' | 'nC' | 'pC' | 'Ah' | 'mAh';

export const chargeToCoulomb: Record<ChargeUnit, number> = {
  C: 1,
  mC: 0.001,
  µC: 1e-6,
  nC: 1e-9,
  pC: 1e-12,
  Ah: 3600,
  mAh: 3.6
};

export const chargeUnitNames: Record<ChargeUnit, string> = {
  C: 'Coulomb',
  mC: 'Millicoulomb',
  µC: 'Mikrocoulomb',
  nC: 'Nanocoulomb',
  pC: 'Pikocoulomb',
  Ah: 'Amperestunde',
  mAh: 'Milliamperestunde'
};

export function convertCharge(value: number, from: ChargeUnit, to: ChargeUnit): number {
  const inCoulombs = value * chargeToCoulomb[from];
  return inCoulombs / chargeToCoulomb[to];
}
