'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateNetSalary, formatCurrency } from '@/lib/conversions/finanzen';

export function GehaltCalculator() {
  const [brutto, setBrutto] = useState<string>('');
  const [steuerklasse, setSteuerklasse] = useState<string>('1');
  const [hasChildren, setHasChildren] = useState(false);
  const [churchTax, setChurchTax] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof calculateNetSalary> | null>(null);

  const handleCalculate = () => {
    const bruttoValue = parseGermanNumber(brutto);
    if (isNaN(bruttoValue) || bruttoValue <= 0) {
      toast.error('Bitte gültiges Bruttogehalt eingeben');
      return;
    }

    const result = calculateNetSalary(
      bruttoValue,
      parseInt(steuerklasse) as 1 | 2 | 3 | 4 | 5 | 6,
      hasChildren,
      churchTax
    );
    setResults(result);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Ihr Nettogehalt aus dem Bruttogehalt.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bruttogehalt (€/Monat)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={brutto}
                onChange={(e) => setBrutto(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 3000"
              />
            </div>
            <div className="space-y-2">
              <Label>Steuerklasse</Label>
              <Select value={steuerklasse} onValueChange={setSteuerklasse}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Steuerklasse 1</SelectItem>
                  <SelectItem value="2">Steuerklasse 2</SelectItem>
                  <SelectItem value="3">Steuerklasse 3</SelectItem>
                  <SelectItem value="4">Steuerklasse 4</SelectItem>
                  <SelectItem value="5">Steuerklasse 5</SelectItem>
                  <SelectItem value="6">Steuerklasse 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="children" checked={hasChildren} onCheckedChange={(v) => setHasChildren(!!v)} />
              <Label htmlFor="children">Mit Kindern</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="church" checked={churchTax} onCheckedChange={(v) => setChurchTax(!!v)} />
              <Label htmlFor="church">Kirchensteuer</Label>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Nettogehalt</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(results.netSalary)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Lohnsteuer: <strong>{formatCurrency(results.incomeTax)}</strong></div>
                <div>Solidaritätszuschlag: <strong>{formatCurrency(results.solidaritySurcharge)}</strong></div>
                <div>Krankenversicherung: <strong>{formatCurrency(results.healthInsurance)}</strong></div>
                <div>Rentenversicherung: <strong>{formatCurrency(results.pensionInsurance)}</strong></div>
                <div>Arbeitslosenversicherung: <strong>{formatCurrency(results.unemploymentInsurance)}</strong></div>
                <div>Pflegeversicherung: <strong>{formatCurrency(results.nursingCareInsurance)}</strong></div>
                {results.churchTaxAmount > 0 && (
                  <div>Kirchensteuer: <strong>{formatCurrency(results.churchTaxAmount)}</strong></div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
