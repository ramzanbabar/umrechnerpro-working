'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { formatCurrency } from '@/lib/conversions/finanzen';

// Deutsche Inflationsraten (historisch)
const inflationRates: Record<string, number> = {
  '2024': 2.4,
  '2023': 6.0,
  '2022': 7.9,
  '2021': 3.2,
  '2020': 0.5,
  '2019': 1.4,
  '2018': 1.9,
  '2017': 1.7,
  '2016': 0.4,
  '2015': 0.1,
};

export function InflationsCalculator() {
  const [betrag, setBetrag] = useState<string>('');
  const [startJahr, setStartJahr] = useState<string>('2020');
  const [endJahr, setEndJahr] = useState<string>('2024');
  const [results, setResults] = useState<{ kaufkraft: number; verlust: number; totalInflation: number } | null>(null);

  const handleCalculate = () => {
    const betragValue = parseGermanNumber(betrag);

    if (isNaN(betragValue) || betragValue <= 0) {
      toast.error('Bitte gültigen Betrag eingeben');
      return;
    }

    const start = parseInt(startJahr);
    const end = parseInt(endJahr);

    if (start >= end) {
      toast.error('Startjahr muss vor Endjahr liegen');
      return;
    }

    // Kumulative Inflation berechnen
    let totalInflation = 0;
    for (let year = start; year < end; year++) {
      const rate = inflationRates[year.toString()] || 2; // Fallback 2%
      totalInflation += rate;
    }

    const kaufkraft = betragValue * (100 / (100 + totalInflation));
    const verlust = betragValue - kaufkraft;

    setResults({ kaufkraft, verlust, totalInflation });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie, wie viel Kaufkraft Ihr Geld durch Inflation verloren hat.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Betrag (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={betrag}
                onChange={(e) => setBetrag(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 10.000"
              />
            </div>
            <div className="space-y-2">
              <Label>Von Jahr</Label>
              <Select value={startJahr} onValueChange={setStartJahr}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(inflationRates).map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Bis Jahr</Label>
              <Select value={endJahr} onValueChange={setEndJahr}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(inflationRates).map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Kaufkraft heute</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(results.kaufkraft)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Kaufkraftverlust: </span>
                  <strong className="text-red-600">{formatCurrency(results.verlust)}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Gesamtinflation: </span>
                  <strong>{formatNumberGerman(results.totalInflation)}%</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
