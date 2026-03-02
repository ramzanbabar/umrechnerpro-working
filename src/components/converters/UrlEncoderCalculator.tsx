'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl } from '@/lib/conversions/developer';

export function UrlEncoderCalculator() {
  const [input, setInput] = useState<string>('');
  const [mode, setMode] = useState<string>('encode');
  const [results, setResults] = useState<string>('');

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Bitte Text eingeben');
      return;
    }

    let result = '';
    if (mode === 'encode') {
      result = encodeUrl(input);
    } else {
      result = decodeUrl(input);
    }

    setResults(result);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(results);
    toast.success('Kopiert!');
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Kodieren oder dekodieren Sie URLs mit Prozentkodierung.
          </p>

          <div className="space-y-2">
            <Label>Modus</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="encode">Kodieren (Encode)</SelectItem>
                <SelectItem value="decode">Dekodieren (Decode)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Eingabe</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] font-mono"
              placeholder={mode === 'encode' ? 'Text zum Kodieren...' : 'Kodierte URL...'}
            />
          </div>

          <Button onClick={handleConvert} className="w-full">
            {mode === 'encode' ? 'Kodieren' : 'Dekodieren'}
          </Button>

          {results && (
            <div className="space-y-2">
              <Label>Ergebnis</Label>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm break-all">
                {results}
              </div>
              <Button onClick={copyResult} variant="outline" className="w-full">
                Kopieren
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
