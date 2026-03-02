/**
 * Geometrie-Rechner (Geometry Calculators)
 * Geometrische Berechnungen für UmrechnerPro.de
 */

// === KREIS ===

/**
 * Berechnet den Kreisumfang
 */
export function calculateCircumference(radius: number): number {
  return 2 * Math.PI * radius;
}

/**
 * Berechnet die Kreisfläche
 */
export function calculateCircleArea(radius: number): number {
  return Math.PI * radius * radius;
}

/**
 * Berechnet den Radius aus dem Durchmesser
 */
export function diameterToRadius(diameter: number): number {
  return diameter / 2;
}

/**
 * Berechnet den Radius aus dem Umfang
 */
export function circumferenceToRadius(circumference: number): number {
  return circumference / (2 * Math.PI);
}

/**
 * Berechnet den Radius aus der Fläche
 */
export function areaToRadius(area: number): number {
  return Math.sqrt(area / Math.PI);
}

/**
 * Berechnet die Bogenlänge
 */
export function calculateArcLength(radius: number, angleDegrees: number): number {
  return 2 * Math.PI * radius * (angleDegrees / 360);
}

/**
 * Berechnet den Kreissektor (Fläche)
 */
export function calculateSectorArea(radius: number, angleDegrees: number): number {
  return Math.PI * radius * radius * (angleDegrees / 360);
}

// === DREIECK ===

/**
 * Berechnet die Hypotenuse mit dem Satz des Pythagoras
 */
export function calculateHypotenuse(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

/**
 * Berechnet eine Kathete
 */
export function calculateCathetus(hypotenuse: number, otherCathetus: number): number {
  return Math.sqrt(hypotenuse * hypotenuse - otherCathetus * otherCathetus);
}

/**
 * Berechnet die Dreiecksfläche (Basis × Höhe / 2)
 */
export function calculateTriangleArea(base: number, height: number): number {
  return (base * height) / 2;
}

/**
 * Berechnet die Dreiecksfläche mit der Heronschen Formel
 */
export function calculateTriangleAreaHeron(a: number, b: number, c: number): number {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

/**
 * Berechnet den Umfang eines Dreiecks
 */
export function calculateTrianglePerimeter(a: number, b: number, c: number): number {
  return a + b + c;
}

/**
 * Berechnet alle Winkel eines Dreiecks aus den Seiten
 * Gibt Winkel in Grad zurück
 */
export function calculateTriangleAngles(a: number, b: number, c: number): {
  A: number; // Winkel gegenüber Seite a
  B: number; // Winkel gegenüber Seite b
  C: number; // Winkel gegenüber Seite c
} {
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  const cosC = (a * a + b * b - c * c) / (2 * a * b);
  
  return {
    A: Math.acos(Math.max(-1, Math.min(1, cosA))) * 180 / Math.PI,
    B: Math.acos(Math.max(-1, Math.min(1, cosB))) * 180 / Math.PI,
    C: Math.acos(Math.max(-1, Math.min(1, cosC))) * 180 / Math.PI
  };
}

// === RECHTECK ===

/**
 * Berechnet den Rechteck-Umfang
 */
export function calculateRectanglePerimeter(length: number, width: number): number {
  return 2 * (length + width);
}

/**
 * Berechnet die Rechteck-Fläche
 */
export function calculateRectangleArea(length: number, width: number): number {
  return length * width;
}

/**
 * Berechnet die Diagonale eines Rechtecks
 */
export function calculateRectangleDiagonal(length: number, width: number): number {
  return Math.sqrt(length * length + width * width);
}

// === QUADRAT ===

export function calculateSquarePerimeter(side: number): number {
  return 4 * side;
}

export function calculateSquareArea(side: number): number {
  return side * side;
}

export function calculateSquareDiagonal(side: number): number {
  return side * Math.sqrt(2);
}

// === VOLUMEN ===

export function calculateSphereVolume(radius: number): number {
  return (4 / 3) * Math.PI * Math.pow(radius, 3);
}

export function calculateCubeVolume(side: number): number {
  return Math.pow(side, 3);
}

export function calculateCylinderVolume(radius: number, height: number): number {
  return Math.PI * radius * radius * height;
}

export function calculateConeVolume(radius: number, height: number): number {
  return (1 / 3) * Math.PI * radius * radius * height;
}

export function calculateBoxVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

// === OBERFLÄCHE ===

export function calculateSphereSurface(radius: number): number {
  return 4 * Math.PI * radius * radius;
}

export function calculateCubeSurface(side: number): number {
  return 6 * side * side;
}

export function calculateCylinderSurface(radius: number, height: number): number {
  return 2 * Math.PI * radius * (radius + height);
}

export function calculateBoxSurface(length: number, width: number, height: number): number {
  return 2 * (length * width + length * height + width * height);
}
