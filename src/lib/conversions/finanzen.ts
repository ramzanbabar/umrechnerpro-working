/**
 * Finanz-Rechner (Finance Calculators)
 * Finanzmathematische Berechnungen für UmrechnerPro.de
 */

// === ZINSRECHNER ===

/**
 * Berechnet Zinseszins
 * @param principal - Anfangskapital
 * @param rate - Zinssatz in Prozent (z.B. 5 für 5%)
 * @param years - Laufzeit in Jahren
 * @param compoundFrequency - Zinseszins-Häufigkeit pro Jahr
 */
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  compoundFrequency: number = 1
): number {
  const r = rate / 100;
  return principal * Math.pow(1 + r / compoundFrequency, compoundFrequency * years);
}

/**
 * Berechnet einfache Verzinsung
 */
export function calculateSimpleInterest(principal: number, rate: number, years: number): number {
  return principal * (1 + (rate / 100) * years);
}

/**
 * Berechnet den Zinssatz aus Anfangs- und Endkapital
 */
export function calculateInterestRate(principal: number, finalAmount: number, years: number): number {
  return (Math.pow(finalAmount / principal, 1 / years) - 1) * 100;
}

/**
 * Berechnet die Laufzeit
 */
export function calculateYears(principal: number, finalAmount: number, rate: number): number {
  return Math.log(finalAmount / principal) / Math.log(1 + rate / 100);
}

// === KREDITRECHNER ===

/**
 * Berechnet die monatliche Rate eines Kredits
 * (Annuitäten-Tilgung)
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

/**
 * Berechnet die Gesamtkosten eines Kredits
 */
export function calculateTotalCost(
  principal: number,
  annualRate: number,
  years: number
): { totalPayment: number; totalInterest: number; monthlyPayment: number } {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const totalPayment = monthlyPayment * years * 12;
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment - principal
  };
}

/**
 * Generiert einen Tilgungsplan (erste 12 Monate)
 */
export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  years: number,
  maxMonths: number = 12
): Array<{ month: number; payment: number; principal: number; interest: number; balance: number }> {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const schedule: Array<{ month: number; payment: number; principal: number; interest: number; balance: number }> = [];
  let balance = principal;
  
  for (let month = 1; month <= Math.min(maxMonths, years * 12); month++) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest,
      balance: Math.max(0, balance)
    });
  }
  
  return schedule;
}

// === GEHALTSRECHNER (vereinfacht) ===

/**
 * Deutsche Steuerklassen
 */
export type GermanTaxClass = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Vereinfachte Berechnung des Nettogehalts
 * HINWEIS: Dies ist eine Näherung, keine exakte Berechnung
 */
export function calculateNetSalary(
  grossMonthly: number,
  taxClass: GermanTaxClass = 1,
  hasChildren: boolean = false,
  churchTax: boolean = false,
  healthInsuranceAddOn: number = 1.7, // Durchschnittlicher Zusatzbeitrag
  publicHealthInsurance: boolean = true
): {
  netSalary: number;
  incomeTax: number;
  solidaritySurcharge: number;
  churchTaxAmount: number;
  healthInsurance: number;
  pensionInsurance: number;
  unemploymentInsurance: number;
  nursingCareInsurance: number;
} {
  const yearlyGross = grossMonthly * 12;
  
  // Sozialversicherungsbeiträge (Arbeitnehmeranteil)
  const pensionRate = 0.093; // 9,3%
  const unemploymentRate = 0.013; // 1,3%
  const healthRate = publicHealthInsurance ? (7.3 + healthInsuranceAddOn) / 2 / 100 : 0;
  const nursingRate = hasChildren ? 0.02 : 0.0235; // 2% mit Kindern, 2,35% ohne
  
  // Beitragsbemessungsgrenzen 2024 (vereinfacht)
  const pensionLimit = 90600 / 12;
  const healthLimit = 62100 / 12;
  
  const pensionBase = Math.min(grossMonthly, pensionLimit);
  const healthBase = Math.min(grossMonthly, healthLimit);
  
  const pensionInsurance = pensionBase * pensionRate;
  const unemploymentInsurance = pensionBase * unemploymentRate;
  const healthInsurance = healthBase * healthRate;
  const nursingCareInsurance = healthBase * nursingRate;
  
  // Steuerberechnung (sehr vereinfacht)
  const taxableIncome = yearlyGross - (pensionInsurance * 12);
  let incomeTax = 0;
  
  // Vereinfachte Steuertabelle (nicht exakt!)
  if (taxableIncome <= 11604) {
    incomeTax = 0;
  } else if (taxableIncome <= 17005) {
    incomeTax = (taxableIncome - 11604) * 0.14;
  } else if (taxableIncome <= 66760) {
    incomeTax = 755 + (taxableIncome - 17005) * 0.23;
  } else if (taxableIncome <= 277825) {
    incomeTax = 12201 + (taxableIncome - 66760) * 0.42;
  } else {
    incomeTax = 100727 + (taxableIncome - 277825) * 0.45;
  }
  
  // Steuerklassen-Anpassung (vereinfacht)
  const taxClassFactors: Record<GermanTaxClass, number> = {
    1: 1,
    2: 0.85,
    3: 0.65,
    4: 1,
    5: 1.35,
    6: 1.1
  };
  
  incomeTax *= taxClassFactors[taxClass];
  incomeTax /= 12; // Monatlich
  
  // Solidaritätszuschlag
  const solidaritySurcharge = incomeTax * 0.055;
  
  // Kirchensteuer
  const churchTaxAmount = churchTax ? incomeTax * 0.09 : 0;
  
  // Nettogehalt
  const netSalary = grossMonthly - 
    pensionInsurance - 
    unemploymentInsurance - 
    healthInsurance - 
    nursingCareInsurance - 
    incomeTax - 
    solidaritySurcharge - 
    churchTaxAmount;
  
  return {
    netSalary: Math.max(0, netSalary),
    incomeTax: Math.max(0, incomeTax),
    solidaritySurcharge: Math.max(0, solidaritySurcharge),
    churchTaxAmount: Math.max(0, churchTaxAmount),
    healthInsurance: healthInsurance,
    pensionInsurance: pensionInsurance,
    unemploymentInsurance: unemploymentInsurance,
    nursingCareInsurance: nursingCareInsurance
  };
}

/**
 * Formatierung als Währung
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}
