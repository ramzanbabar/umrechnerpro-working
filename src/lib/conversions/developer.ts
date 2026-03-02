/**
 * Developer-Tools (Developer Conversion Utilities)
 * Entwickler-Werkzeuge für UmrechnerPro.de
 */

// === BASE64 ===

/**
 * Kodiert Text zu Base64
 */
export function encodeBase64(text: string): string {
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(text)));
  }
  return Buffer.from(text, 'utf-8').toString('base64');
}

/**
 * Dekodiert Base64 zu Text
 */
export function decodeBase64(base64: string): string {
  try {
    if (typeof window !== 'undefined') {
      return decodeURIComponent(escape(atob(base64)));
    }
    return Buffer.from(base64, 'base64').toString('utf-8');
  } catch {
    return 'Ungültige Base64-Zeichenkette';
  }
}

/**
 * URL-sichere Base64-Kodierung
 */
export function encodeBase64Url(text: string): string {
  return encodeBase64(text)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// === URL-ENKODIERUNG ===

/**
 * URL-Kodierung
 */
export function encodeUrl(text: string): string {
  return encodeURIComponent(text);
}

/**
 * URL-Dekodierung
 */
export function decodeUrl(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return 'Ungültige URL-Kodierung';
  }
}

// === ASCII ===

/**
 * Text zu ASCII-Code Array
 */
export function textToAscii(text: string): number[] {
  return Array.from(text).map(char => char.charCodeAt(0));
}

/**
 * ASCII-Code Array zu Text
 */
export function asciiToText(asciiCodes: number[]): string {
  return asciiCodes.map(code => String.fromCharCode(code)).join('');
}

/**
 * Erstellt eine ASCII-Tabelle
 */
export function generateAsciiTable(): Array<{ decimal: number; hex: string; char: string; description: string }> {
  const table: Array<{ decimal: number; hex: string; char: string; description: string }> = [];
  
  for (let i = 0; i <= 255; i++) {
    let description = '';
    let char = '';
    
    // Steuerzeichen
    if (i < 32) {
      const controlChars: Record<number, string> = {
        0: 'NUL (Null)', 1: 'SOH (Start of Heading)', 2: 'STX (Start of Text)',
        3: 'ETX (End of Text)', 4: 'EOT (End of Transmission)', 5: 'ENQ (Enquiry)',
        6: 'ACK (Acknowledge)', 7: 'BEL (Bell)', 8: 'BS (Backspace)',
        9: 'HT (Horizontal Tab)', 10: 'LF (Line Feed)', 11: 'VT (Vertical Tab)',
        12: 'FF (Form Feed)', 13: 'CR (Carriage Return)', 14: 'SO (Shift Out)',
        15: 'SI (Shift In)', 16: 'DLE (Data Link Escape)', 17: 'DC1 (Device Control 1)',
        18: 'DC2 (Device Control 2)', 19: 'DC3 (Device Control 3)', 20: 'DC4 (Device Control 4)',
        21: 'NAK (Negative Acknowledge)', 22: 'SYN (Synchronous Idle)', 23: 'ETB (End of Trans. Block)',
        24: 'CAN (Cancel)', 25: 'EM (End of Medium)', 26: 'SUB (Substitute)',
        27: 'ESC (Escape)', 28: 'FS (File Separator)', 29: 'GS (Group Separator)',
        30: 'RS (Record Separator)', 31: 'US (Unit Separator)'
      };
      description = controlChars[i] || '';
      char = '';
    } else if (i === 127) {
      description = 'DEL (Delete)';
      char = '';
    } else {
      char = String.fromCharCode(i);
      if (i >= 32 && i <= 126) {
        description = `Druckbares Zeichen`;
      } else {
        description = `Latin-1 Ergänzung`;
      }
    }
    
    table.push({
      decimal: i,
      hex: i.toString(16).toUpperCase().padStart(2, '0'),
      char,
      description
    });
  }
  
  return table;
}

// === IP-SUBNETZ ===

/**
 * Berechnet Subnetz-Informationen
 */
export function calculateSubnet(ipAddress: string, cidr: number): {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
} | null {
  // IP in Zahl umwandeln
  const octets = ipAddress.split('.').map(Number);
  if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
    return null;
  }
  
  const ipNumber = (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
  
  // Subnetzmaske berechnen
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcard = ~mask >>> 0;
  
  // Netzwerk- und Broadcast-Adresse
  const network = (ipNumber & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  
  // Erster und letzter Host
  const firstHost = network + 1;
  const lastHost = broadcast - 1;
  
  // Anzahl Hosts
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts;
  
  // Hilfsfunktion: Zahl zu IP
  const numberToIp = (num: number): string => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };
  
  return {
    networkAddress: numberToIp(network),
    broadcastAddress: numberToIp(broadcast),
    subnetMask: numberToIp(mask),
    wildcardMask: numberToIp(wildcard),
    firstHost: usableHosts > 0 ? numberToIp(firstHost) : '-',
    lastHost: usableHosts > 0 ? numberToIp(lastHost) : '-',
    totalHosts,
    usableHosts
  };
}

// === OHMSCHES GESETZ ===

/**
 * Berechnet fehlende Werte nach dem Ohmschen Gesetz
 */
export function calculateOhmsLaw(params: {
  voltage?: number;  // U in Volt
  current?: number;  // I in Ampere
  resistance?: number; // R in Ohm
  power?: number;    // P in Watt
}): {
  voltage: number | null;
  current: number | null;
  resistance: number | null;
  power: number | null;
} {
  let { voltage, current, resistance, power } = params;
  
  // U = R × I
  if (voltage === undefined && resistance !== undefined && current !== undefined) {
    voltage = resistance * current;
  }
  // I = U / R
  if (current === undefined && voltage !== undefined && resistance !== undefined) {
    current = voltage / resistance;
  }
  // R = U / I
  if (resistance === undefined && voltage !== undefined && current !== undefined) {
    resistance = voltage / current;
  }
  // P = U × I
  if (power === undefined && voltage !== undefined && current !== undefined) {
    power = voltage * current;
  }
  // P = I² × R
  if (power === undefined && current !== undefined && resistance !== undefined) {
    power = current * current * resistance;
  }
  // P = U² / R
  if (power === undefined && voltage !== undefined && resistance !== undefined) {
    power = (voltage * voltage) / resistance;
  }
  // U = √(P × R)
  if (voltage === undefined && power !== undefined && resistance !== undefined) {
    voltage = Math.sqrt(power * resistance);
  }
  // I = √(P / R)
  if (current === undefined && power !== undefined && resistance !== undefined) {
    current = Math.sqrt(power / resistance);
  }
  // R = U² / P
  if (resistance === undefined && voltage !== undefined && power !== undefined) {
    resistance = (voltage * voltage) / power;
  }
  // U = P / I
  if (voltage === undefined && power !== undefined && current !== undefined) {
    voltage = power / current;
  }
  // I = P / U
  if (current === undefined && power !== undefined && voltage !== undefined) {
    current = power / voltage;
  }
  
  return {
    voltage: voltage ?? null,
    current: current ?? null,
    resistance: resistance ?? null,
    power: power ?? null
  };
}
