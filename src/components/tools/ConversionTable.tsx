import Link from 'next/link';
import type { Tool } from '@/lib/tools';

interface ConversionTableProps {
  tool: Tool;
  convertFunction: (value: number, from: string, to: string) => number;
  baseUnit?: string;
  rows?: number;
}

export function ConversionTable({ tool, convertFunction, baseUnit, rows = 20 }: ConversionTableProps) {
  const units = tool.units || [];
  if (units.length < 2) return null;

  const fromUnit = baseUnit || units[0].value;
  const toUnit = units.find(u => u.value !== fromUnit)?.value || units[1].value;

  // Generate values for the table
  const values: number[] = [];
  for (let i = 0; i < rows; i++) {
    if (i === 0) values.push(1);
    else if (i < 5) values.push(i);
    else if (i < 10) values.push(i * 2);
    else if (i < 15) values.push(i * 10);
    else values.push(i * 100);
  }

  const fromSymbol = units.find(u => u.value === fromUnit)?.symbol || fromUnit;
  const toSymbol = units.find(u => u.value === toUnit)?.symbol || toUnit;
  const toLabel = units.find(u => u.value === toUnit)?.label || toUnit;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left p-3 font-medium border-b">
              {fromSymbol}
            </th>
            <th className="text-left p-3 font-medium border-b">
              {toSymbol} ({toLabel})
            </th>
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            const result = convertFunction(value, fromUnit, toUnit);
            return (
              <tr 
                key={value} 
                className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
              >
                <td className="p-3 border-b font-mono">
                  {value.toLocaleString('de-DE')}
                </td>
                <td className="p-3 border-b font-mono">
                  {result.toLocaleString('de-DE', { maximumFractionDigits: 6 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
