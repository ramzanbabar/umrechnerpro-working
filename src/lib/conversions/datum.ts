/**
 * Datum & Zeit-Rechner (Date & Time Calculators)
 * Datumsberechnungen für UmrechnerPro.de
 */

// === ALTERSRECHNER ===

/**
 * Berechnet das genaue Alter
 */
export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: number; // Tage bis zum nächsten Geburtstag
} {
  let years = referenceDate.getFullYear() - birthDate.getFullYear();
  let months = referenceDate.getMonth() - birthDate.getMonth();
  let days = referenceDate.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Gesamtzahl der Tage
  const diffTime = Math.abs(referenceDate.getTime() - birthDate.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Tage bis zum nächsten Geburtstag
  let nextBirthday = new Date(
    referenceDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  
  if (nextBirthday <= referenceDate) {
    nextBirthday = new Date(
      referenceDate.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }
  
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: years * 12 + months,
    nextBirthday: daysUntilBirthday
  };
}

// === DATUMSDIFFERENZ ===

/**
 * Berechnet die Differenz zwischen zwei Daten
 */
export function calculateDateDifference(startDate: Date, endDate: Date): {
  days: number;
  weeks: number;
  months: number;
  years: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Monate und Jahre approximieren
  const start = new Date(Math.min(startDate.getTime(), endDate.getTime()));
  const end = new Date(Math.max(startDate.getTime(), endDate.getTime()));
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  
  let years = Math.floor(months / 12);
  months = months % 12;
  
  return {
    days: diffDays,
    weeks: Math.floor(diffDays / 7),
    months,
    years,
    hours: Math.floor(diffTime / (1000 * 60 * 60)),
    minutes: Math.floor(diffTime / (1000 * 60)),
    seconds: Math.floor(diffTime / 1000)
  };
}

// === DATUM ADDIEREN/SUBTRAHIEREN ===

/**
 * Addiert Tage zu einem Datum
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Addiert Wochen zu einem Datum
 */
export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

/**
 * Addiert Monate zu einem Datum
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Addiert Jahre zu einem Datum
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

// === WOCHENTAG ===

const weekdayNames = [
  'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 
  'Donnerstag', 'Freitag', 'Samstag'
];

const monthNames = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

/**
 * Gibt den Wochentag zurück
 */
export function getWeekday(date: Date): string {
  return weekdayNames[date.getDay()];
}

/**
 * Berechnet die Kalenderwoche
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// === ZEITZONEN ===

/**
 * Wichtige Zeitzonen für DACH
 */
export const timeZoneData = [
  { city: 'Berlin', timezone: 'Europe/Berlin', offset: '+1', dstOffset: '+2' },
  { city: 'Wien', timezone: 'Europe/Vienna', offset: '+1', dstOffset: '+2' },
  { city: 'Zürich', timezone: 'Europe/Zurich', offset: '+1', dstOffset: '+2' },
  { city: 'London', timezone: 'Europe/London', offset: '+0', dstOffset: '+1' },
  { city: 'New York', timezone: 'America/New_York', offset: '-5', dstOffset: '-4' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: '-8', dstOffset: '-7' },
  { city: 'Tokio', timezone: 'Asia/Tokyo', offset: '+9', dstOffset: '+9' },
  { city: 'Sydney', timezone: 'Australia/Sydney', offset: '+10', dstOffset: '+11' },
  { city: 'Dubai', timezone: 'Asia/Dubai', offset: '+4', dstOffset: '+4' },
  { city: 'Moskau', timezone: 'Europe/Moscow', offset: '+3', dstOffset: '+3' }
];

/**
 * Konvertiert Zeit zwischen Zeitzonen
 */
export function convertTimezone(
  date: Date,
  fromTimezone: string,
  toTimezone: string
): Date {
  const fromTime = date.toLocaleString('en-US', { timeZone: fromTimezone });
  const toTime = new Date(fromTime).toLocaleString('en-US', { timeZone: toTimezone });
  return new Date(toTime);
}

/**
 * Formatiert Datum auf Deutsch
 */
export function formatDateGerman(date: Date, format: 'short' | 'long' | 'full' = 'long'): string {
  const optionsMap: Record<'short' | 'long' | 'full', Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  };
  const options = optionsMap[format];
  
  return date.toLocaleDateString('de-DE', options);
}
