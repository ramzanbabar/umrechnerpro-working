'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function UnixTimestampCalculator() {
  const [timestamp, setTimestamp] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [results, setResults] = useState<{ date: string; timestamp: number } | null>(null);

  const handleTimestampToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) {
      toast.error('Bitte gültigen Timestamp eingeben');
      return;
    }

    const d = new Date(ts * 1000);
    setResults({
      date: d.toLocaleString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      timestamp: ts
    });
  };

  const handleDateToTimestamp = () => {
    if (!date) {
      toast.error('Bitte Datum eingeben');
      return;
    }

    const d = new Date(date);
    if (isNaN(d.getTime())) {
      toast.error('Ungültiges Datum');
      return;
    }

    const ts = Math.floor(d.getTime() / 1000);
    setResults({
      date: d.toLocaleString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      timestamp: ts
    });
  };

  const now = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(ts.toString());
    handleTimestampToDate();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Konvertieren Sie Unix-Timestamps in Datum und umgekehrt.
          </p>

          <div className="space-y-2">
            <Label>Unix Timestamp (Sekunden seit 01.01.1970)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="text-lg h-12 font-mono"
                placeholder="z.B. 1704067200"
              />
              <Button onClick={now} variant="outline">Jetzt</Button>
            </div>
            <Button onClick={handleTimestampToDate} className="w-full">
              Timestamp → Datum
            </Button>
          </div>

          <div className="text-center text-muted-foreground">— oder —</div>

          <div className="space-y-2">
            <Label>Datum</Label>
            <Input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-lg h-12"
            />
            <Button onClick={handleDateToTimestamp} className="w-full">
              Datum → Timestamp
            </Button>
          </div>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Unix Timestamp</div>
                <div className="text-2xl font-bold text-primary font-mono">
                  {results.timestamp}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Datum/Zeit</div>
                <div className="text-lg font-medium">
                  {results.date}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
