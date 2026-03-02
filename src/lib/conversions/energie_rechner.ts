/**
 * Energie-Rechner (Energy Cost Calculators)
 * Energieverbrauchs-Berechnungen für UmrechnerPro.de
 */

// === STROMVERBRAUCH ===

/**
 * Berechnet den Stromverbrauch in kWh
 * @param watt - Leistung in Watt
 * @param hours - Nutzungsdauer pro Tag in Stunden
 * @param days - Nutzungstage pro Jahr
 */
export function calculateElectricityConsumption(watt: number, hours: number, days: number): number {
  return (watt * hours * days) / 1000; // Watt zu kWh
}

/**
 * Berechnet die Stromkosten
 * @param kwh - Verbrauch in kWh
 * @param pricePerKwh - Preis pro kWh in Euro (Standard: 0,35 €)
 */
export function calculateElectricityCost(kwh: number, pricePerKwh: number = 0.35): number {
  return kwh * pricePerKwh;
}

/**
 * Typische Strompreise in Deutschland (2024)
 */
export const germanElectricityPrices = {
  average: 0.35,    // Durchschnitt
  low: 0.28,        // Günstiger Anbieter
  high: 0.42,       // Teurer Grundversorger
  recommended: 0.35 // Empfehlung für Berechnungen
};

/**
 * Typische Geräte-Leistungen
 */
export const typicalApplianceWattage = {
  kuehlschrank: 150,
  gefrierschrank: 120,
  geschirrspueler: 2200,
  waschmaschine: 2500,
  trockner: 2800,
  herd: 2500,
  backofen: 2500,
  mikrowelle: 1000,
  wasserkocher: 2200,
  toaster: 800,
  kaffeemaschine: 1500,
  fernseher: 120,
  computer: 250,
  laptop: 65,
  monitor: 30,
  ledLampe: 10,
  gluelampe: 60,
  halogenlampe: 40,
  stereoanlage: 100,
  wlanRouter: 10,
  standbyschrank: 5
};

// === KRAFTSTOFFKOSTEN ===

/**
 * Berechnet den Kraftstoffverbrauch für eine Strecke
 * @param distance - Strecke in km
 * @param consumption - Verbrauch in L/100km
 */
export function calculateFuelNeeded(distance: number, consumption: number): number {
  return (distance * consumption) / 100;
}

/**
 * Berechnet die Kraftstoffkosten
 * @param liters - Menge in Litern
 * @param pricePerLiter - Preis pro Liter in Euro
 */
export function calculateFuelCost(liters: number, pricePerLiter: number): number {
  return liters * pricePerLiter;
}

/**
 * Berechnet die Kosten pro Kilometer
 */
export function calculateCostPerKm(consumption: number, pricePerLiter: number): number {
  return (consumption / 100) * pricePerLiter;
}

/**
 * Typische Kraftstoffpreise in Deutschland (2024)
 */
export const germanFuelPrices = {
  superE10: 1.75,
  superE5: 1.80,
  diesel: 1.65,
  autogas: 0.95
};

// === CO₂-RECHNER ===

/**
 * CO₂-Emissionen in kg pro Liter Kraftstoff
 */
export const co2EmissionFactors = {
  benzin: 2.31,    // kg CO₂ pro Liter Benzin
  diesel: 2.65,    // kg CO₂ pro Liter Diesel
  autogas: 1.51,   // kg CO₂ pro Liter Autogas
  kerosin: 2.53    // kg CO₂ pro Liter Kerosin
};

/**
 * Berechnet CO₂-Emissionen für Autofahrt
 */
export function calculateCarCO2(distance: number, consumption: number, fuelType: 'benzin' | 'diesel' | 'autogas'): number {
  const liters = (distance * consumption) / 100;
  return liters * co2EmissionFactors[fuelType];
}

/**
 * Berechnet CO₂-Emissionen für Flug
 * @param distance - Distanz in km
 * @param flightClass - Flugklasse (economy, business, first)
 */
export function calculateFlightCO2(distance: number, flightClass: 'economy' | 'business' | 'first' = 'economy'): number {
  // Vereinfachte Berechnung basierend auf durchschnittlichen Emissionen
  const baseEmissionPerKm = 0.115; // kg CO₂ pro Passagier-km (Economy)
  const classFactors = {
    economy: 1,
    business: 2,
    first: 3
  };
  
  // Berücksichtigung von Start und Landung (höhere Emissionen für Kurzstrecken)
  const shortHaulFactor = distance < 1000 ? 1.2 : 1;
  
  return distance * baseEmissionPerKm * classFactors[flightClass] * shortHaulFactor;
}

/**
 * Berechnet den jährlichen CO₂-Fußabdruck eines Haushalts
 */
export function calculateHouseholdCO2(
  electricityKwh: number,
  gasM3: number,
  carKm: number,
  carConsumption: number,
  fuelType: 'benzin' | 'diesel'
): {
  electricity: number;
  gas: number;
  car: number;
  total: number;
} {
  const electricityCO2 = electricityKwh * 0.4; // kg CO₂/kWh (DE-Mix)
  const gasCO2 = gasM3 * 2.0; // kg CO₂/m³ Erdgas
  const carCO2 = calculateCarCO2(carKm, carConsumption, fuelType);
  
  return {
    electricity: electricityCO2,
    gas: gasCO2,
    car: carCO2,
    total: electricityCO2 + gasCO2 + carCO2
  };
}

// === SOLAR-ERTRAG (vereinfacht) ===

/**
 * Berechnet den geschätzten Solarertrag
 * @param kwp - Anlagenleistung in kWp
 * @param sunHours - Sonnenstunden pro Jahr (Region-abhängig)
 * @param efficiency - Wirkungsgrad (Standard: 0.85)
 */
export function calculateSolarYield(
  kwp: number,
  sunHours: number = 1000, // Durchschnitt Deutschland
  efficiency: number = 0.85
): number {
  return kwp * sunHours * efficiency;
}

/**
 * Durchschnittliche Sonnenstunden in deutschen Regionen
 */
export const germanSunHours = {
  nord: 950,
  mitte: 1000,
  sued: 1100,
  bayern: 1150,
  badenWuerttemberg: 1100
};
