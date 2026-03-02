'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateHypotenuse, calculateCathetus } from '@/lib/conversions/geometrie';

export function PythagorasCalculator() {
  const [mode, setMode] = useState<string>('hypotenuse');
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [results, setResults] = useState<{ value: number; label: string } | null>(null);

  const handleCalculate = () => {
    const aValue = parseGermanNumber(a);
    const bValue = parseGermanNumber(b);
    const cValue = parseGermanNumber(c);

    if (mode === 'hypotenuse') {
      if (isNaN(aValue) || aValue <= 0 || isNaN(bValue) || bValue <= 0) {
        toast.error('Bitte gültige Werte für beide Katheten eingeben');
        return;
      }
      const hyp = calculateHypotenuse(aValue, bValue);
      setResults({ value: hyp, label: 'Hypotenuse (c)' });
    } else {
      if (isNaN(cValue) || cValue <= 0) {
        toast.error('Bitte gültige Hypotenuse eingeben');
        return;
      }
      const known = mode === 'katheteA' ? bValue : aValue;
      if (isNaN(known) || known <= 0 || known >= cValue) {
        toast.error('Bitte gültige bekannte Kathete eingeben (muss kleiner als Hypotenuse sein)');
        return;
      }
      const cat = calculateCathetus(cValue, known);
      setResults({ value: cat, label: mode === 'katheteA' ? 'Kathete (a)' : 'Kathete (b)' });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie die fehlende Seite im rechtwinkligen Dreieck.
          </p>

          <div className="space-y-2">
            <Label>Was berechnen?</Label>
            <div className="flex gap-2">
              <Button
                variant={mode === 'hypotenuse' ? 'default' : 'outline'}
                onClick={() => setMode('hypotenuse')}
                className="flex-1"
              >
                Hypotenuse
              </Button>
              <Button
                variant={mode === 'katheteA' ? 'default' : 'outline'}
                onClick={() => setMode('katheteA')}
                className="flex-1"
              >
                Kathete a
              </Button>
              <Button
                variant={mode === 'katheteB' ? 'default' : 'outline'}
                onClick={() => setMode('katheteB')}
                className="flex-1"
              >
                Kathete b
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Kathete a</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 3"
                disabled={mode === 'katheteA'}
              />
            </div>
            <div className="space-y-2">
              <Label>Kathete b</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 4"
                disabled={mode === 'katheteB'}
              />
            </div>
            <div className="space-y-2">
              <Label>Hypotenuse c</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 5"
                disabled={mode === 'hypotenuse'}
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">{results.label}</div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(results.value, 4)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Satz des Pythagoras: a² + b² = c²
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
