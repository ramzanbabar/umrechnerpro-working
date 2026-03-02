'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { parseGermanNumber } from '@/lib/formatters';
import { calculateTotalCost, formatCurrency } from '@/lib/conversions/finanzen';

export function KreditCalculator() {
  const [betrag, setBetrag] = useState<string>('');
  const [zinssatz, setZinssatz] = useState<string>('');
  const [laufzeit, setLaufzeit] = useState<string>('');
  const [results, setResults] = useState<{ monthlyPayment: number; totalPayment: number; totalInterest: number } | null>(null);

  const handleCalculate = () => {
    const betragValue = parseGermanNumber(betrag);
    const zinsValue = parseGermanNumber(zinssatz);
    const laufzeitValue = parseGermanNumber(laufzeit);

    if (isNaN(betragValue) || betragValue <= 0) {
      toast.error('Bitte gültigen Kreditbetrag eingeben');
      return;
    }
    if (isNaN(zinsValue) || zinsValue < 0) {
      toast.error('Bitte gültigen Zinssatz eingeben');
      return;
    }
    if (isNaN(laufzeitValue) || laufzeitValue <= 0) {
      toast.error('Bitte gültige Laufzeit eingeben');
      return;
    }

    const result = calculateTotalCost(betragValue, zinsValue, laufzeitValue);
    setResults(result);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie die monatliche Rate und Gesamtkosten Ihres Kredits.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Kreditbetrag (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={betrag}
                onChange={(e) => setBetrag(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 50.000"
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
                placeholder="z.B. 4,5"
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
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Monatliche Rate</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(results.monthlyPayment)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Gesamtbetrag: </span>
                  <strong>{formatCurrency(results.totalPayment)}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Zinsen gesamt: </span>
                  <strong>{formatCurrency(results.totalInterest)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
