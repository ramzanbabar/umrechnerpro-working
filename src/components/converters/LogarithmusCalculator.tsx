'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

export function LogarithmusCalculator() {
  const [value, setValue] = useState<string>('');
  const [base, setBase] = useState<string>('e');
  const [results, setResults] = useState<{ result: number } | null>(null);

  const handleCalculate = () => {
    const numValue = parseGermanNumber(value);

    if (isNaN(numValue) || numValue <= 0) {
      toast.error('Bitte positive Zahl eingeben (x > 0)');
      return;
    }

    let result: number;

    switch (base) {
      case 'e':
        result = Math.log(numValue); // ln
        break;
      case '10':
        result = Math.log10(numValue); // log10
        break;
      case '2':
        result = Math.log2(numValue); // log2
        break;
      default:
        const baseValue = parseGermanNumber(base);
        if (isNaN(baseValue) || baseValue <= 0 || baseValue === 1) {
          toast.error('Ungültige Basis');
          return;
        }
        result = Math.log(numValue) / Math.log(baseValue);
    }

    setResults({ result });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie natürliche und andere Logarithmen.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Zahl (x)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 100"
              />
            </div>
            <div className="space-y-2">
              <Label>Basis</Label>
              <Select value={base} onValueChange={setBase}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="e">e (natürlicher Log. ln)</SelectItem>
                  <SelectItem value="10">10 (Zehnerlog. log₁₀)</SelectItem>
                  <SelectItem value="2">2 (Binärlog. log₂)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {base === 'e' ? 'ln' : base === '10' ? 'log₁₀' : base === '2' ? 'log₂' : `log${base}`}({value})
              </div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(results.result, 8)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
