'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

interface NotenInput {
  note: string;
  gewicht: string;
}

export function NotenCalculator() {
  const [noten, setNoten] = useState<NotenInput[]>([
    { note: '', gewicht: '1' },
    { note: '', gewicht: '1' },
  ]);
  const [schnitt, setSchnitt] = useState<number | null>(null);

  const addNote = () => {
    setNoten([...noten, { note: '', gewicht: '1' }]);
  };

  const removeNote = (index: number) => {
    if (noten.length > 1) {
      setNoten(noten.filter((_, i) => i !== index));
    }
  };

  const updateNote = (index: number, field: 'note' | 'gewicht', value: string) => {
    const updated = [...noten];
    updated[index][field] = value;
    setNoten(updated);
  };

  const handleCalculate = () => {
    let summe = 0;
    let gewichtSumme = 0;

    for (const n of noten) {
      const noteValue = parseGermanNumber(n.note);
      const gewichtValue = parseGermanNumber(n.gewicht) || 1;

      if (isNaN(noteValue)) {
        toast.error('Bitte alle Noten ausfüllen');
        return;
      }

      summe += noteValue * gewichtValue;
      gewichtSumme += gewichtValue;
    }

    if (gewichtSumme === 0) {
      toast.error('Ungültige Gewichte');
      return;
    }

    setSchnitt(summe / gewichtSumme);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Ihren Notendurchschnitt mit Gewichtung.
          </p>

          <div className="space-y-3">
            {noten.map((n, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Label>{index + 1}. Note</Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={n.note}
                    onChange={(e) => updateNote(index, 'note', e.target.value)}
                    className="text-lg h-12"
                    placeholder="z.B. 2,3"
                  />
                </div>
                <div className="w-24 space-y-2">
                  <Label>Gewicht</Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={n.gewicht}
                    onChange={(e) => updateNote(index, 'gewicht', e.target.value)}
                    className="text-lg h-12"
                    placeholder="1"
                  />
                </div>
                {noten.length > 1 && (
                  <Button variant="outline" size="icon" onClick={() => removeNote(index)}>
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={addNote} variant="outline" className="flex-1">
              Note hinzufügen
            </Button>
            <Button onClick={handleCalculate} className="flex-1">
              Berechnen
            </Button>
          </div>

          {schnitt !== null && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Notendurchschnitt</div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(schnitt, 2)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
