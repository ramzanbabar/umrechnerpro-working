import type { Tool, SubConversion } from '@/lib/tools';
import Link from 'next/link';

interface RelatedToolsProps {
  currentToolSlug: string;
  relatedTools: string[];
}

export function RelatedTools({ currentToolSlug, relatedTools }: RelatedToolsProps) {
  if (!relatedTools || relatedTools.length === 0) return null;

  // This would normally fetch from the tools registry
  // For simplicity, we'll create placeholder links
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Ähnliche Umrechner</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.slice(0, 6).map((slug) => (
          <Link
            key={slug}
            href={`/tools/${slug}`}
            className="p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">
              {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Zur Umrechnung →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
