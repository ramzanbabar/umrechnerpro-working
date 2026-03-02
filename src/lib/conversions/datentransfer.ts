/**
 * Datentransfer-Umrechner (Data Transfer Rate Conversion)
 * Umrechnung von Datenübertragungsraten für UmrechnerPro.de
 * 
 * Basis-Einheit: Bit pro Sekunde (bps)
 */

export type DataTransferUnit = 
  | 'bps'     // Bit pro Sekunde (Basis)
  | 'Kbps'    // Kilobit pro Sekunde
  | 'Mbps'    // Megabit pro Sekunde
  | 'Gbps'    // Gigabit pro Sekunde
  | 'Tbps'    // Terabit pro Sekunde
  | 'B/s'     // Byte pro Sekunde
  | 'KB/s'    // Kilobyte pro Sekunde
  | 'MB/s'    // Megabyte pro Sekunde
  | 'GB/s';   // Gigabyte pro Sekunde

// Umrechnungsfaktoren zur Basis-Einheit bps
export const dataTransferToBps: Record<DataTransferUnit, number> = {
  bps: 1,                     // Bit pro Sekunde (Basis)
  Kbps: 1000,                 // Kilobit pro Sekunde
  Mbps: 1e6,                  // Megabit pro Sekunde
  Gbps: 1e9,                  // Gigabit pro Sekunde
  Tbps: 1e12,                 // Terabit pro Sekunde
  'B/s': 8,                   // Byte pro Sekunde
  'KB/s': 8000,               // Kilobyte pro Sekunde
  'MB/s': 8e6,                // Megabyte pro Sekunde
  'GB/s': 8e9                 // Gigabyte pro Sekunde
};

// Deutsche Bezeichnungen
export const dataTransferUnitNames: Record<DataTransferUnit, string> = {
  bps: 'Bit pro Sekunde',
  Kbps: 'Kilobit pro Sekunde',
  Mbps: 'Megabit pro Sekunde',
  Gbps: 'Gigabit pro Sekunde',
  Tbps: 'Terabit pro Sekunde',
  'B/s': 'Byte pro Sekunde',
  'KB/s': 'Kilobyte pro Sekunde',
  'MB/s': 'Megabyte pro Sekunde',
  'GB/s': 'Gigabyte pro Sekunde'
};

// Symbole
export const dataTransferUnitSymbols: Record<DataTransferUnit, string> = {
  bps: 'bps',
  Kbps: 'Kbps',
  Mbps: 'Mbps',
  Gbps: 'Gbps',
  Tbps: 'Tbps',
  'B/s': 'B/s',
  'KB/s': 'KB/s',
  'MB/s': 'MB/s',
  'GB/s': 'GB/s'
};

/**
 * Wandelt eine Datenübertragungsrate um
 */
export function convertDataTransfer(value: number, from: DataTransferUnit, to: DataTransferUnit): number {
  const inBps = value * dataTransferToBps[from];
  return inBps / dataTransferToBps[to];
}

/**
 * Gibt alle verfügbaren Einheiten zurück
 */
export function getAllDataTransferUnits(): DataTransferUnit[] {
  return Object.keys(dataTransferToBps) as DataTransferUnit[];
}

/**
 * Gibt die gängigsten Einheiten zurück
 */
export function getCommonDataTransferUnits(): DataTransferUnit[] {
  return ['Mbps', 'Gbps', 'MB/s', 'KB/s'];
}

/**
 * Berechnet Downloadzeit für eine Dateigröße
 * @param fileSizeMB - Dateigröße in Megabyte
 * @param speedMbps - Geschwindigkeit in Megabit pro Sekunde
 * @returns Zeit in Sekunden
 */
export function calculateDownloadTime(fileSizeMB: number, speedMbps: number): number {
  // MB zu Megabit (× 8), dann durch Mbps teilen
  return (fileSizeMB * 8) / speedMbps;
}
