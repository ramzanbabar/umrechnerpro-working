'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { calculateTextStatistics, characterLimits, checkCharacterLimit } from '@/lib/conversions/text';

export function WoerterzaehlerCalculator() {
  const [text, setText] = useState<string>('');
  const [selectedLimit, setSelectedLimit] = useState<number>(characterLimits.twitter);

  const stats = useMemo(() => {
    if (!text) return null;
    return calculateTextStatistics(text);
  }, [text]);

  const limitCheck = useMemo(() => {
    if (!text) return null;
    return checkCharacterLimit(text, selectedLimit);
  }, [text, selectedLimit]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Geben Sie Text ein, um Wörter, Zeichen und mehr zu zählen.
          </p>

          <div className="space-y-2">
            <Label>Text eingeben</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] text-lg"
              placeholder="Hier Text eingeben..."
            />
          </div>

          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Zeichen</div>
                <div className="text-2xl font-bold">{stats.characters}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Wörter</div>
                <div className="text-2xl font-bold">{stats.words}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Sätze</div>
                <div className="text-2xl font-bold">{stats.sentences}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Absätze</div>
                <div className="text-2xl font-bold">{stats.paragraphs}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Lesezeit</div>
                <div className="text-2xl font-bold">{stats.readingTime} Min</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Ø Wortlänge</div>
                <div className="text-2xl font-bold">{stats.averageWordLength}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Zeichen (ohne Leer)</div>
                <div className="text-2xl font-bold">{stats.charactersNoSpaces}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Zeilen</div>
                <div className="text-2xl font-bold">{stats.lines}</div>
              </div>
            </div>
          )}

          {limitCheck && (
            <div className={`rounded-lg p-4 ${limitCheck.exceeded ? 'bg-red-100' : 'bg-green-100'}`}>
              <div className="flex justify-between">
                <span>Zeichenlimit: {selectedLimit}</span>
                <span className={limitCheck.exceeded ? 'text-red-600' : 'text-green-600'}>
                  {limitCheck.remaining > 0 ? `${limitCheck.remaining} übrig` : `${Math.abs(limitCheck.remaining)} zu viel`}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
