'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

export function QuadratischeGleichungenCalculator() {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [results, setResults] = useState<{ x1: number | null; x2: number | null; discriminant: number } | null>(null);

  const handleCalculate = () => {
    const aValue = parseGermanNumber(a);
    const bValue = parseGermanNumber(b);
    const cValue = parseGermanNumber(c);

    if (isNaN(aValue) || aValue === 0) {
      toast.error('a darf nicht 0 sein (keine quadratische Gleichung)');
      return;
    }
    if (isNaN(bValue) || isNaN(cValue)) {
      toast.error('Bitte alle Koeffizienten eingeben');
      return;
    }

    // abc-Formel: x = (-b ± √(b² - 4ac)) / 2a
    const discriminant = bValue * bValue - 4 * aValue * cValue;

    let x1: number | null = null;
    let x2: number | null = null;

    if (discriminant > 0) {
      x1 = (-bValue + Math.sqrt(discriminant)) / (2 * aValue);
      x2 = (-bValue - Math.sqrt(discriminant)) / (2 * aValue);
    } else if (discriminant === 0) {
      x1 = -bValue / (2 * aValue);
    }

    setResults({ x1, x2, discriminant });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Lösen Sie quadratische Gleichungen der Form ax² + bx + c = 0
          </p>

          <div className="bg-muted rounded-lg p-3 text-center">
            <span className="text-lg font-mono">{a || 'a'}x² + {b || 'b'}x + {c || 'c'} = 0</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>a (x²)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 1"
              />
            </div>
            <div className="space-y-2">
              <Label>b (x)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. -5"
              />
            </div>
            <div className="space-y-2">
              <Label>c</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 6"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Lösen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="text-sm text-muted-foreground">Diskriminante: {formatNumberGerman(results.discriminant, 4)}</div>
              
              {results.discriminant > 0 && results.x1 !== null && results.x2 !== null && (
                <>
                  <div className="border-b pb-2">
                    <div className="text-sm text-muted-foreground">x₁</div>
                    <div className="text-2xl font-bold text-primary">{formatNumberGerman(results.x1, 4)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">x₂</div>
                    <div className="text-2xl font-bold text-primary">{formatNumberGerman(results.x2, 4)}</div>
                  </div>
                </>
              )}
              
              {results.discriminant === 0 && results.x1 !== null && (
                <div>
                  <div className="text-sm text-muted-foreground">x (doppelte Nullstelle)</div>
                  <div className="text-2xl font-bold text-primary">{formatNumberGerman(results.x1, 4)}</div>
                </div>
              )}
              
              {results.discriminant < 0 && (
                <div className="text-red-600">
                  Keine reellen Lösungen (Diskriminante &lt; 0)
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
