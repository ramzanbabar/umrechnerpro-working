'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

// GCD for fractions
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function simplifyFraction(num: number, den: number): { num: number; den: number } {
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

export function BruchCalculator() {
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [operation, setOperation] = useState<string>('add');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');
  const [results, setResults] = useState<{ num: number; den: number; decimal: number } | null>(null);

  const handleCalculate = () => {
    const n1 = parseGermanNumber(num1);
    const d1 = parseGermanNumber(den1);
    const n2 = parseGermanNumber(num2);
    const d2 = parseGermanNumber(den2);

    if (isNaN(n1) || isNaN(d1) || d1 === 0 || isNaN(n2) || isNaN(d2) || d2 === 0) {
      toast.error('Bitte gültige Brüche eingeben (Nenner ≠ 0)');
      return;
    }

    let resultNum = 0;
    let resultDen = 1;

    switch (operation) {
      case 'add':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'subtract':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'multiply':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case 'divide':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    const decimal = simplified.num / simplified.den;

    setResults({ num: simplified.num, den: simplified.den, decimal });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Rechnen Sie mit Brüchen: Addieren, Subtrahieren, Multiplizieren, Dividieren.
          </p>

          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <Input
                type="text"
                inputMode="decimal"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="text-lg h-12 w-24 text-center"
                placeholder="Zähler"
              />
              <div className="border-t-2 border-black my-1" />
              <Input
                type="text"
                inputMode="decimal"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                className="text-lg h-12 w-24 text-center"
                placeholder="Nenner"
              />
            </div>

            <div className="space-y-2">
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="w-16 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">+</SelectItem>
                  <SelectItem value="subtract">−</SelectItem>
                  <SelectItem value="multiply">×</SelectItem>
                  <SelectItem value="divide">÷</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-center">
              <Input
                type="text"
                inputMode="decimal"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="text-lg h-12 w-24 text-center"
                placeholder="Zähler"
              />
              <div className="border-t-2 border-black my-1" />
              <Input
                type="text"
                inputMode="decimal"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                className="text-lg h-12 w-24 text-center"
                placeholder="Nenner"
              />
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {results.num}/{results.den}
                </div>
                <div className="text-lg text-muted-foreground mt-2">
                  = {formatNumberGerman(results.decimal, 6)}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
