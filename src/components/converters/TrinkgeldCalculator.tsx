'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { formatCurrency } from '@/lib/conversions/finanzen';

export function TrinkgeldCalculator() {
  const [rechnung, setRechnung] = useState<string>('');
  const [prozent, setProzent] = useState<string>('10');
  const [personen, setPersonen] = useState<string>('1');
  const [results, setResults] = useState<{ trinkgeld: number; gesamt: number; proPerson: number } | null>(null);

  const handleCalculate = () => {
    const rechnungValue = parseGermanNumber(rechnung);
    const prozentValue = parseGermanNumber(prozent);
    const personenValue = parseGermanNumber(personen);

    if (isNaN(rechnungValue) || rechnungValue <= 0) {
      toast.error('Bitte gültigen Rechnungsbetrag eingeben');
      return;
    }

    const trinkgeld = rechnungValue * (prozentValue / 100);
    const gesamt = rechnungValue + trinkgeld;
    const proPerson = gesamt / personenValue;

    setResults({ trinkgeld, gesamt, proPerson });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie das Trinkgeld und teilen Sie die Rechnung auf.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Rechnung (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={rechnung}
                onChange={(e) => setRechnung(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 85,50"
              />
            </div>
            <div className="space-y-2">
              <Label>Trinkgeld (%)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={prozent}
                onChange={(e) => setProzent(e.target.value)}
                className="text-lg h-12"
                placeholder="10"
              />
            </div>
            <div className="space-y-2">
              <Label>Personen</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={personen}
                onChange={(e) => setPersonen(e.target.value)}
                className="text-lg h-12"
                placeholder="1"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {[5, 10, 15, 20].map((p) => (
              <Button
                key={p}
                variant="outline"
                onClick={() => setProzent(p.toString())}
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
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Trinkgeld</div>
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(results.trinkgeld)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Gesamt</div>
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(results.gesamt)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pro Person</div>
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(results.proPerson)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
