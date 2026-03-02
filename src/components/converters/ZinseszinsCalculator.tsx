'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateCompoundInterest, calculateYears, calculateInterestRate } from '@/lib/conversions/finanzen';
import { formatCurrency } from '@/lib/conversions/finanzen';

export function ZinseszinsCalculator() {
  const [startkapital, setStartkapital] = useState<string>('');
  const [zinssatz, setZinssatz] = useState<string>('');
  const [laufzeit, setLaufzeit] = useState<string>('');
  const [endkapital, setEndkapital] = useState<string>('');
  const [results, setResults] = useState<{ label: string; value: string }[]>([]);

  const handleCalculate = () => {
    const kapital = startkapital ? parseGermanNumber(startkapital) : 0;
    const zins = zinssatz ? parseGermanNumber(zinssatz) : 0;
    const jahre = laufzeit ? parseGermanNumber(laufzeit) : 0;
    const ende = endkapital ? parseGermanNumber(endkapital) : 0;

    // Calculate missing value
    if (kapital > 0 && zins > 0 && jahre > 0 && ende === 0) {
      const result = calculateCompoundInterest(kapital, zins, jahre);
      setResults([
        { label: 'Endkapital', value: formatCurrency(result) },
        { label: 'Zinsen gesamt', value: formatCurrency(result - kapital) },
        { label: 'Gewinn in %', value: formatNumberGerman(((result - kapital) / kapital) * 100) + ' %' },
      ]);
    } else if (kapital > 0 && zins > 0 && ende > 0 && jahre === 0) {
      const years = calculateYears(kapital, ende, zins);
      setResults([
        { label: 'Laufzeit', value: formatNumberGerman(years) + ' Jahre' },
      ]);
    } else if (kapital > 0 && jahre > 0 && ende > 0 && zins === 0) {
      const rate = calculateInterestRate(kapital, ende, jahre);
      setResults([
        { label: 'Zinssatz', value: formatNumberGerman(rate) + ' %' },
      ]);
    } else {
      toast.error('Bitte 3 Werte eingeben, das vierte wird berechnet');
      return;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Geben Sie 3 Werte ein. Der fehlende Wert wird automatisch berechnet.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Anfangskapital (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={startkapital}
                onChange={(e) => setStartkapital(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 10.000"
              />
            </div>
            <div className="space-y-2">
              <Label>Zinssatz (% p.a.)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={zinssatz}
                onChange={(e) => setZinssatz(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 5"
              />
            </div>
            <div className="space-y-2">
              <Label>Laufzeit (Jahre)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={laufzeit}
                onChange={(e) => setLaufzeit(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 10"
              />
            </div>
            <div className="space-y-2">
              <Label>Endkapital (€) [optional]</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={endkapital}
                onChange={(e) => setEndkapital(e.target.value)}
                className="text-lg h-12"
                placeholder="wird berechnet"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results.length > 0 && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              {results.map((result, index) => (
                <div key={index} className="border-b last:border-0 pb-2 last:pb-0">
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                  <div className="text-2xl font-bold text-primary">{result.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
