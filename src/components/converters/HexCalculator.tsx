'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { convertNumberSystem, NumberSystem } from '@/lib/conversions/zahlen';

export function HexCalculator() {
  const [value, setValue] = useState<string>('');
  const [fromBase, setFromBase] = useState<string>('16');
  const [toBase, setToBase] = useState<string>('10');
  const [results, setResults] = useState<{ result: string } | null>(null);

  const handleCalculate = () => {
    if (!value.trim()) {
      toast.error('Bitte Wert eingeben');
      return;
    }

    const baseMap: Record<string, NumberSystem> = {
      '2': 'binary',
      '8': 'octal',
      '10': 'decimal',
      '16': 'hexadecimal',
    };

    const from = baseMap[fromBase];
    const to = baseMap[toBase];

    if (!from || !to) {
      toast.error('Ungültige Basis');
      return;
    }

    const result = convertNumberSystem(value, from, to);
    setResults({ result });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Rechnen Sie mit Hexadezimalzahlen und anderen Zahlensystemen.
          </p>

          <div className="space-y-2">
            <Label>Wert</Label>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-lg h-12 font-mono"
              placeholder="z.B. FF oder 255"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Von Basis</Label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(e.target.value)}
                className="w-full h-12 rounded-md border px-3"
              >
                <option value="2">Binär (2)</option>
                <option value="8">Oktal (8)</option>
                <option value="10">Dezimal (10)</option>
                <option value="16">Hexadezimal (16)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Zu Basis</Label>
              <select
                value={toBase}
                onChange={(e) => setToBase(e.target.value)}
                className="w-full h-12 rounded-md border px-3"
              >
                <option value="2">Binär (2)</option>
                <option value="8">Oktal (8)</option>
                <option value="10">Dezimal (10)</option>
                <option value="16">Hexadezimal (16)</option>
              </select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Umrechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Ergebnis</div>
              <div className="text-3xl font-bold text-primary font-mono">
                {results.result}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
