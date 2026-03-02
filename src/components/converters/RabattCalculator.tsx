'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculatePriceAfterDiscount, calculateDiscount } from '@/lib/conversions/prozent';
import { formatCurrency } from '@/lib/conversions/finanzen';

export function RabattCalculator() {
  const [originalPreis, setOriginalPreis] = useState<string>('');
  const [rabatt, setRabatt] = useState<string>('');
  const [results, setResults] = useState<{ ersparnis: number; neuerPreis: number } | null>(null);

  const handleCalculate = () => {
    const preisValue = parseGermanNumber(originalPreis);
    const rabattValue = parseGermanNumber(rabatt);

    if (isNaN(preisValue) || preisValue <= 0) {
      toast.error('Bitte gültigen Originalpreis eingeben');
      return;
    }
    if (isNaN(rabattValue) || rabattValue < 0 || rabattValue > 100) {
      toast.error('Bitte gültigen Rabatt eingeben (0-100%)');
      return;
    }

    const ersparnis = calculateDiscount(preisValue, rabattValue);
    const neuerPreis = calculatePriceAfterDiscount(preisValue, rabattValue);
    setResults({ ersparnis, neuerPreis });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie den reduzierten Preis und Ihre Ersparnis.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Originalpreis (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={originalPreis}
                onChange={(e) => setOriginalPreis(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 99,99"
              />
            </div>
            <div className="space-y-2">
              <Label>Rabatt (%)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={rabatt}
                onChange={(e) => setRabatt(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 20"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {[10, 20, 30, 50].map((p) => (
              <Button
                key={p}
                variant="outline"
                onClick={() => setRabatt(p.toString())}
                className="flex-1"
              >
                {p}%
              </Button>
            ))}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Neuer Preis</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(results.neuerPreis)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Sie sparen</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(results.ersparnis)}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
