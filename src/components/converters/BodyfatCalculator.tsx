'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { Gender } from '@/lib/conversions/gesundheit';

export function BodyfatCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const handleCalculate = () => {
    const heightValue = parseGermanNumber(height);
    const waistValue = parseGermanNumber(waist);
    const neckValue = parseGermanNumber(neck);

    if (isNaN(heightValue) || heightValue <= 0) {
      toast.error('Bitte gültige Größe eingeben');
      return;
    }
    if (isNaN(waistValue) || waistValue <= 0) {
      toast.error('Bitte gültigen Taillenumfang eingeben');
      return;
    }
    if (isNaN(neckValue) || neckValue <= 0) {
      toast.error('Bitte gültigen Halsumfang eingeben');
      return;
    }

    // U.S. Navy Methode
    const h = heightValue / 2.54; // zu Zoll
    const w = waistValue / 2.54;
    const n = neckValue / 2.54;

    let bf: number;
    if (gender === 'male') {
      bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      const hipValue = parseGermanNumber(hip);
      if (isNaN(hipValue) || hipValue <= 0) {
        toast.error('Bitte gültigen Hüftumfang eingeben');
        return;
      }
      const hipInch = hipValue / 2.54;
      bf = 163.205 * Math.log10(w + hipInch - n) - 97.684 * Math.log10(h) - 78.387;
    }

    setBodyFat(bf);
  };

  const getBodyFatCategory = (bf: number, gender: Gender) => {
    if (gender === 'male') {
      if (bf < 6) return { category: 'Essentielles Fett', color: 'text-blue-600' };
      if (bf < 14) return { category: 'Athletisch', color: 'text-green-600' };
      if (bf < 18) return { category: 'Fitness', color: 'text-green-500' };
      if (bf < 25) return { category: 'Durchschnitt', color: 'text-yellow-600' };
      return { category: 'Übergewichtig', color: 'text-red-600' };
    } else {
      if (bf < 14) return { category: 'Essentielles Fett', color: 'text-blue-600' };
      if (bf < 21) return { category: 'Athletisch', color: 'text-green-600' };
      if (bf < 25) return { category: 'Fitness', color: 'text-green-500' };
      if (bf < 32) return { category: 'Durchschnitt', color: 'text-yellow-600' };
      return { category: 'Übergewichtig', color: 'text-red-600' };
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Ihren Körperfettanteil mit der U.S. Navy-Methode.
          </p>

          <div className="space-y-2">
            <Label>Geschlecht</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Männlich</SelectItem>
                <SelectItem value="female">Weiblich</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Größe (cm)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 180"
              />
            </div>
            <div className="space-y-2">
              <Label>Taillenumfang (cm)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 85"
              />
            </div>
            <div className="space-y-2">
              <Label>Halsumfang (cm)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 38"
              />
            </div>
            {gender === 'female' && (
              <div className="space-y-2">
                <Label>Hüftumfang (cm)</Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="text-lg h-12"
                  placeholder="z.B. 95"
                />
              </div>
            )}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {bodyFat !== null && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Körperfettanteil</div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(bodyFat, 1)}%
              </div>
              <div className={`text-lg font-medium mt-2 ${getBodyFatCategory(bodyFat, gender).color}`}>
                {getBodyFatCategory(bodyFat, gender).category}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
