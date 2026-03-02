'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateVat } from '@/lib/conversions/prozent';

type MwStMode = 'grossFromNet' | 'netFromGross' | 'mwstFromGross';

export function MwStCalculator() {
  const [mode, setMode] = useState<MwStMode>('grossFromNet');
  const [amount, setAmount] = useState<string>('100');
  const [rate, setRate] = useState<19 | 7>(19);

  const result = useMemo(() => {
    const num = parseGermanNumber(amount);
    if (isNaN(num) || num <= 0) return null;

    switch (mode) {
      case 'grossFromNet':
        const mwst1 = calculateVat(num, rate);
        return {
          net: num,
          mwst: mwst1,
          gross: num + mwst1,
        };
      case 'netFromGross':
        const net2 = num / (1 + rate / 100);
        return {
          net: net2,
          mwst: num - net2,
          gross: num,
        };
      case 'mwstFromGross':
        const net3 = num / (1 + rate / 100);
        return {
          net: net3,
          mwst: num - net3,
          gross: num,
        };
      default:
        return null;
    }
  }, [mode, amount, rate]);

  const modeLabels: Record<MwStMode, string> = {
    grossFromNet: 'Brutto aus Netto berechnen',
    netFromGross: 'Netto aus Brutto berechnen',
    mwstFromGross: 'MwSt aus Brutto berechnen',
  };

  const copyResult = () => {
    if (result) {
      const text = `Netto: ${formatNumberGerman(result.net)} € | MwSt (${rate}%): ${formatNumberGerman(result.mwst)} € | Brutto: ${formatNumberGerman(result.gross)} €`;
      navigator.clipboard.writeText(text);
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
            <RadioGroup value={mode} onValueChange={(v) => setMode(v as MwStMode)}>
              {Object.entries(modeLabels).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key} className="cursor-pointer">{label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label>{mode === 'grossFromNet' ? 'Nettobetrag (€)' : 'Bruttobetrag (€)'}</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg h-12"
              placeholder="Betrag eingeben"
            />
          </div>

          {/* Rate Selection */}
          <div className="space-y-2">
            <Label>Mehrwertsteuersatz</Label>
            <div className="flex gap-2">
              <Button
                variant={rate === 19 ? 'default' : 'outline'}
                onClick={() => setRate(19)}
                className="flex-1"
              >
                19%
              </Button>
              <Button
                variant={rate === 7 ? 'default' : 'outline'}
                onClick={() => setRate(7)}
                className="flex-1"
              >
                7%
              </Button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Nettobetrag</span>
                <span className="text-xl font-semibold">{formatNumberGerman(result.net)} €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">MwSt ({rate}%)</span>
                <span className="text-xl font-semibold text-primary">{formatNumberGerman(result.mwst)} €</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-medium">Bruttobetrag</span>
                <span className="text-2xl font-bold">{formatNumberGerman(result.gross)} €</span>
              </div>
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
