'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateDreisatz, calculateInverseDreisatz } from '@/lib/conversions/prozent';

export function DreisatzCalculator() {
  const [value1, setValue1] = useState<string>('100');
  const [value2, setValue2] = useState<string>('50');
  const [value3, setValue3] = useState<string>('25');
  const [mode, setMode] = useState<'direct' | 'inverse'>('direct');

  const result = useMemo(() => {
    const v1 = parseGermanNumber(value1);
    const v2 = parseGermanNumber(value2);
    const v3 = parseGermanNumber(value3);
    
    if (isNaN(v1) || isNaN(v2) || isNaN(v3) || v1 === 0) return null;
    
    if (mode === 'direct') {
      return calculateDreisatz(v1, v2, v3);
    } else {
      return calculateInverseDreisatz(v1, v2, v3);
    }
  }, [value1, value2, value3, mode]);

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(`Ergebnis: ${formatNumberGerman(result)}`);
      toast.success('Kopiert!');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-2">
            <Label>Berechnungsart</Label>
            <RadioGroup value={mode} onValueChange={(v) => setMode(v as 'direct' | 'inverse')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="direct" />
                <Label htmlFor="direct" className="cursor-pointer">
                  Direkter Dreisatz (je mehr, desto mehr)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inverse" id="inverse" />
                <Label htmlFor="inverse" className="cursor-pointer">
                  Indirekter Dreisatz (je mehr, desto weniger)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Explanation */}
          <div className="bg-muted rounded-lg p-3 text-sm">
            <strong>Beispiel:</strong> {mode === 'direct' ? '3 Äpfel kosten 1,50 € – was kosten 5 Äpfel?' : '3 Arbeiter brauchen 12 Tage – wie viele Tage brauchen 4 Arbeiter?'}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Wert 1</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="h-12"
                placeholder="z.B. 100"
              />
              <span className="text-xs text-muted-foreground">
                {mode === 'direct' ? 'z.B. 3 Äpfel' : 'z.B. 3 Arbeiter'}
              </span>
            </div>
            <div className="space-y-2">
              <Label>Wert 2</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="h-12"
                placeholder="z.B. 1,50"
              />
              <span className="text-xs text-muted-foreground">
                {mode === 'direct' ? 'z.B. 1,50 €' : 'z.B. 12 Tage'}
              </span>
            </div>
            <div className="space-y-2">
              <Label>Gesuchter Wert</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                className="h-12"
                placeholder="z.B. 5"
              />
              <span className="text-xs text-muted-foreground">
                {mode === 'direct' ? 'z.B. 5 Äpfel' : 'z.B. 4 Arbeiter'}
              </span>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Ergebnis</div>
              <div className="text-4xl font-bold text-primary">{formatNumberGerman(result)}</div>
            </div>
          )}

          {/* Copy Button */}
          <Button onClick={copyResult} variant="outline" className="w-full">
            Ergebnis kopieren
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
