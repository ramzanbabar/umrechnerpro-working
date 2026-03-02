/**
 * Gesundheits-Rechner (Health Calculators)
 * Gesundheitsbezogene Berechnungen für UmrechnerPro.de
 */

// === BMI-RECHNER ===

/**
 * Berechnet den Body-Mass-Index
 */
export function calculateBMI(weight: number, height: number): number {
  // Größe in cm zu m umrechnen
  const heightInM = height / 100;
  return weight / (heightInM * heightInM);
}

/**
 * BMI-Kategorien nach WHO
 */
export function getBMICategory(bmi: number): { category: string; description: string; color: string } {
  if (bmi < 16) {
    return { category: 'Starkes Untergewicht', description: 'Medizinische Behandlung empfohlen', color: 'red' };
  } else if (bmi < 17) {
    return { category: 'Mäßiges Untergewicht', description: 'Gewichtszunahme empfohlen', color: 'orange' };
  } else if (bmi < 18.5) {
    return { category: 'Leichtes Untergewicht', description: 'Leichte Gewichtszunahme empfohlen', color: 'yellow' };
  } else if (bmi < 25) {
    return { category: 'Normalgewicht', description: 'Gesunder Gewichtsbereich', color: 'green' };
  } else if (bmi < 30) {
    return { category: 'Übergewicht', description: 'Gewichtsreduktion empfohlen', color: 'yellow' };
  } else if (bmi < 35) {
    return { category: 'Adipositas Grad I', description: 'Erhöhte Gesundheitsrisiken', color: 'orange' };
  } else if (bmi < 40) {
    return { category: 'Adipositas Grad II', description: 'Starke Gesundheitsrisiken', color: 'red' };
  } else {
    return { category: 'Adipositas Grad III', description: 'Sehr starke Gesundheitsrisiken', color: 'darkred' };
  }
}

/**
 * Berechnet das Idealgewicht (nach Broca-Index)
 */
export function calculateIdealWeightBroca(height: number): { min: number; max: number; ideal: number } {
  // Broca-Index: Größe in cm - 100 = Normalgewicht
  const normal = height - 100;
  const ideal = normal * 0.9; // -10% als Idealgewicht
  const min = normal * 0.9;
  const max = normal * 1.1;
  
  return { min, max, ideal };
}

// === GRUNDUMSATZ (BMR) ===

export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

/**
 * Berechnet den Grundumsatz (BMR) nach Mifflin-St Jeor
 */
export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Berechnet den Gesamtumsatz (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const factors: Record<ActivityLevel, number> = {
    sedentary: 1.2,      // Sitzend, wenig oder kein Training
    light: 1.375,        // Leicht aktiv, 1-3 Tage/Woche
    moderate: 1.55,      // Moderat aktiv, 3-5 Tage/Woche
    active: 1.725,       // Sehr aktiv, 6-7 Tage/Woche
    veryActive: 1.9      // Extrem aktiv, körperliche Arbeit
  };
  
  return bmr * factors[activityLevel];
}

/**
 * Berechnet die Kalorien für ein Ziel
 */
export function calculateCalorieGoal(tdee: number, goal: 'lose' | 'maintain' | 'gain'): number {
  switch (goal) {
    case 'lose': return tdee - 500; // Ca. 0,5 kg/Woche
    case 'maintain': return tdee;
    case 'gain': return tdee + 300; // Moderate Gewichtszunahme
  }
}

/**
 * Aktivitätslevel-Beschreibungen
 */
export const activityLevelDescriptions: Record<ActivityLevel, string> = {
  sedentary: 'Sitzend (Bürojob, kein Sport)',
  light: 'Leicht aktiv (1-3 Tage Sport/Woche)',
  moderate: 'Moderat aktiv (3-5 Tage Sport/Woche)',
  active: 'Sehr aktiv (6-7 Tage Sport/Woche)',
  veryActive: 'Extrem aktiv (körperliche Arbeit + Training)'
};

// === KÖRPERFETTANTEIL ===

/**
 * Berechnet den Körperfettanteil nach der U.S. Navy-Methode
 * @param gender - Geschlecht
 * @param height - Größe in cm
 * @param waist - Taillenumfang in cm (auf Höhe des Bauchnabels)
 * @param neck - Halsumfang in cm
 * @param hip - Hüftumfang in cm (nur für Frauen)
 */
export function calculateBodyFatNavy(
  gender: Gender,
  height: number,
  waist: number,
  neck: number,
  hip?: number
): number {
  // Umrechnung zu Zoll für die Formel
  const h = height / 2.54;
  const w = waist / 2.54;
  const n = neck / 2.54;
  
  if (gender === 'male') {
    return 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
  } else {
    const hipInch = (hip || 0) / 2.54;
    return 163.205 * Math.log10(w + hipInch - n) - 97.684 * Math.log10(h) - 78.387;
  }
}

/**
 * Körperfett-Kategorien
 */
export function getBodyFatCategory(bodyFat: number, gender: Gender): { category: string; description: string } {
  if (gender === 'male') {
    if (bodyFat < 6) return { category: 'Essentielles Fett', description: 'Notwendiges Körperfett' };
    if (bodyFat < 14) return { category: 'Athletisch', description: 'Sehr athletisch' };
    if (bodyFat < 18) return { category: 'Fitness', description: 'Fit und sportlich' };
    if (bodyFat < 25) return { category: 'Durchschnitt', description: 'Normalgewichtig' };
    return { category: 'Übergewichtig', description: 'Reduzierung empfohlen' };
  } else {
    if (bodyFat < 14) return { category: 'Essentielles Fett', description: 'Notwendiges Körperfett' };
    if (bodyFat < 21) return { category: 'Athletisch', description: 'Sehr athletisch' };
    if (bodyFat < 25) return { category: 'Fitness', description: 'Fit und sportlich' };
    if (bodyFat < 32) return { category: 'Durchschnitt', description: 'Normalgewichtig' };
    return { category: 'Übergewichtig', description: 'Reduzierung empfohlen' };
  }
}

// === TAILLE-HÜFT-VERHÄLTNIS (WHR) ===

/**
 * Berechnet das Taille-Hüft-Verhältnis
 */
export function calculateWHR(waist: number, hip: number): number {
  return waist / hip;
}

/**
 * WHR-Risikokategorie nach WHO
 */
export function getWHRCategory(whr: number, gender: Gender): { risk: string; description: string } {
  if (gender === 'male') {
    if (whr < 0.9) return { risk: 'Niedrig', description: 'Geringes gesundheitliches Risiko' };
    if (whr < 1.0) return { risk: 'Moderat', description: 'Erhöhtes Risiko' };
    return { risk: 'Hoch', description: 'Hohes gesundheitliches Risiko' };
  } else {
    if (whr < 0.8) return { risk: 'Niedrig', description: 'Geringes gesundheitliches Risiko' };
    if (whr < 0.85) return { risk: 'Moderat', description: 'Erhöhtes Risiko' };
    return { risk: 'Hoch', description: 'Hohes gesundheitliches Risiko' };
  }
}
