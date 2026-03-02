/**
 * Reifengrößen-Umrechner (Tire Size Conversion)
 * Umrechnung von Reifengrößen für UmrechnerPro.de
 */

export interface TireSize {
  width: number;        // Breite in mm
  aspectRatio: number;  // Querschnittsverhältnis in %
  rimDiameter: number;  // Felgendurchmesser in Zoll
}

export interface TireDimensions {
  width: number;           // Breite in mm
  sidewallHeight: number;  // Seitenwandhöhe in mm
  rimDiameter: number;     // Felgendurchmesser in mm
  overallDiameter: number; // Gesamtdurchmesser in mm
  circumference: number;   // Abrollumfang in mm
  revolutions: number;     // Umdrehungen pro km
}

/**
 * Parst eine Reifengröße aus String (z.B. "205/55 R16")
 */
export function parseTireSize(sizeString: string): TireSize | null {
  const match = sizeString.match(/^(\d{3})\/(\d{2})\s*R(\d{2})$/i);
  if (!match) return null;
  
  return {
    width: parseInt(match[1], 10),
    aspectRatio: parseInt(match[2], 10),
    rimDiameter: parseInt(match[3], 10)
  };
}

/**
 * Berechnet alle Dimensionen eines Reifens
 */
export function calculateTireDimensions(tire: TireSize): TireDimensions {
  // Seitenwandhöhe = Breite × Querschnittsverhältnis / 100
  const sidewallHeight = tire.width * tire.aspectRatio / 100;
  
  // Felgendurchmesser in mm (1 Zoll = 25.4 mm)
  const rimDiameterMm = tire.rimDiameter * 25.4;
  
  // Gesamtdurchmesser = Felgendurchmesser + 2 × Seitenwandhöhe
  const overallDiameter = rimDiameterMm + 2 * sidewallHeight;
  
  // Abrollumfang = π × Durchmesser
  const circumference = Math.PI * overallDiameter;
  
  // Umdrehungen pro km
  const revolutions = 1000000 / circumference;
  
  return {
    width: tire.width,
    sidewallHeight: Math.round(sidewallHeight * 10) / 10,
    rimDiameter: Math.round(rimDiameterMm * 10) / 10,
    overallDiameter: Math.round(overallDiameter * 10) / 10,
    circumference: Math.round(circumference),
    revolutions: Math.round(revolutions)
  };
}

/**
 * Vergleicht zwei Reifengrößen
 */
export function compareTireSizes(tire1: TireSize, tire2: TireSize): {
  diameterDifference: number;    // in mm
  diameterDifferencePercent: number;
  circumferenceDifference: number; // in mm
  speedometerDeviation: number;  // Abweichung bei 100 km/h
  isCompatible: boolean;         // Empfehlung
} {
  const dim1 = calculateTireDimensions(tire1);
  const dim2 = calculateTireDimensions(tire2);
  
  const diameterDiff = dim2.overallDiameter - dim1.overallDiameter;
  const diameterDiffPercent = (diameterDiff / dim1.overallDiameter) * 100;
  const circumferenceDiff = dim2.circumference - dim1.circumference;
  
  // Tachoabweichung bei 100 km/h
  const speedometerDeviation = -diameterDiffPercent;
  
  // Kompatibel wenn Abweichung < 2.5%
  const isCompatible = Math.abs(diameterDiffPercent) < 2.5;
  
  return {
    diameterDifference: Math.round(diameterDiff * 10) / 10,
    diameterDifferencePercent: Math.round(diameterDiffPercent * 100) / 100,
    circumferenceDifference: Math.round(circumferenceDiff),
    speedometerDeviation: Math.round(speedometerDeviation * 100) / 100,
    isCompatible
  };
}

/**
 * Findet alternative Reifengrößen
 */
export function findAlternativeTireSizes(tire: TireSize, tolerance: number = 2): TireSize[] {
  const alternatives: TireSize[] = [];
  const originalDimensions = calculateTireDimensions(tire);
  
  // Gängige Breiten
  const widths = [175, 185, 195, 205, 215, 225, 235, 245, 255, 265];
  // Gängige Querschnitte
  const aspectRatios = [35, 40, 45, 50, 55, 60, 65];
  // Gängige Felgendurchmesser
  const rimDiameters = [14, 15, 16, 17, 18, 19, 20];
  
  for (const width of widths) {
    for (const aspectRatio of aspectRatios) {
      for (const rimDiameter of rimDiameters) {
        const testTire = { width, aspectRatio, rimDiameter };
        const testDimensions = calculateTireDimensions(testTire);
        
        const diffPercent = Math.abs(
          ((testDimensions.overallDiameter - originalDimensions.overallDiameter) / 
           originalDimensions.overallDiameter) * 100
        );
        
        if (diffPercent <= tolerance && diffPercent > 0) {
          alternatives.push(testTire);
        }
      }
    }
  }
  
  return alternatives.slice(0, 10);
}

/**
 * Gängige Reifengrößen
 */
export const commonTireSizes = [
  '195/65 R15',
  '205/55 R16',
  '225/45 R17',
  '225/50 R17',
  '235/45 R18',
  '245/40 R18',
  '255/35 R19',
  '205/60 R16',
  '215/55 R17',
  '225/40 R18'
];
