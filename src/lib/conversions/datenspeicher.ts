/**
 * Datenspeicher-Umrechner (Data Storage Conversion)
 * Umrechnung von digitalen Speichereinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Byte (B)
 * 
 * HINWEIS: Unterscheidung zwischen SI-Präfixen (dezimal) und
 * IEC-Präfixen (binär). 1 KB = 1000 B (SI), 1 KiB = 1024 B (IEC)
 */

export type DataUnit = 
  // SI (dezimal)
  | 'B'       // Byte
  | 'KB'      // Kilobyte (1000 Bytes)
  | 'MB'      // Megabyte
  | 'GB'      // Gigabyte
  | 'TB'      // Terabyte
  | 'PB'      // Petabyte
  | 'EB'      // Exabyte
  // IEC (binär)
  | 'KiB'     // Kibibyte (1024 Bytes)
  | 'MiB'     // Mebibyte
  | 'GiB'     // Gibibyte
  | 'TiB'     // Tebibyte
  | 'PiB'     // Pebibyte
  | 'EiB'     // Exbibyte
  // Bit
  | 'bit';    // Bit

// Umrechnungsfaktoren zur Basis-Einheit Byte
export const dataToByte: Record<DataUnit, number> = {
  // SI (dezimal)
  B: 1,                       // Byte (Basis)
  KB: 1000,                   // Kilobyte
  MB: 1e6,                    // Megabyte
  GB: 1e9,                    // Gigabyte
  TB: 1e12,                   // Terabyte
  PB: 1e15,                   // Petabyte
  EB: 1e18,                   // Exabyte
  // IEC (binär)
  KiB: 1024,                  // Kibibyte
  MiB: 1048576,               // Mebibyte (1024²)
  GiB: 1073741824,            // Gibibyte (1024³)
  TiB: 1099511627776,         // Tebibyte (1024⁴)
  PiB: 1125899906842624,      // Pebibyte (1024⁵)
  EiB: 1152921504606847000,   // Exbibyte (1024⁶)
  // Bit
  bit: 0.125                  // Bit (1/8 Byte)
};

// Deutsche Bezeichnungen
export const dataUnitNames: Record<DataUnit, string> = {
  B: 'Byte',
  KB: 'Kilobyte',
  MB: 'Megabyte',
  GB: 'Gigabyte',
  TB: 'Terabyte',
  PB: 'Petabyte',
  EB: 'Exabyte',
  KiB: 'Kibibyte',
  MiB: 'Mebibyte',
  GiB: 'Gibibyte',
  TiB: 'Tebibyte',
  PiB: 'Pebibyte',
  EiB: 'Exbibyte',
  bit: 'Bit'
};

// Symbole
export const dataUnitSymbols: Record<DataUnit, string> = {
  B: 'B',
  KB: 'KB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB',
  PB: 'PB',
  EB: 'EB',
  KiB: 'KiB',
  MiB: 'MiB',
  GiB: 'GiB',
  TiB: 'TiB',
  PiB: 'PiB',
  EiB: 'EiB',
  bit: 'bit'
};

/**
 * Wandelt einen Datenspeicherwert um
 */
export function convertData(value: number, from: DataUnit, to: DataUnit): number {
  const inBytes = value * dataToByte[from];
  return inBytes / dataToByte[to];
}

/**
 * Gibt alle verfügbaren Datenspeichereinheiten zurück
 */
export function getAllDataUnits(): DataUnit[] {
  return Object.keys(dataToByte) as DataUnit[];
}

/**
 * Gibt die gängigsten Datenspeichereinheiten zurück
 */
export function getCommonDataUnits(): DataUnit[] {
  return ['KB', 'MB', 'GB', 'TB'];
}

/**
 * Formatiert Bytes in lesbare Größe
 */
export function formatDataSize(bytes: number): string {
  if (bytes < 1000) return `${bytes} B`;
  if (bytes < 1e6) return `${(bytes / 1000).toFixed(2)} KB`;
  if (bytes < 1e9) return `${(bytes / 1e6).toFixed(2)} MB`;
  if (bytes < 1e12) return `${(bytes / 1e9).toFixed(2)} GB`;
  if (bytes < 1e15) return `${(bytes / 1e12).toFixed(2)} TB`;
  return `${(bytes / 1e15).toFixed(2)} PB`;
}
