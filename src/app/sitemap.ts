import { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools';
import { getAllCategories } from '@/lib/categories';
import { getAllSubConversions } from '@/lib/sub-conversions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://umrechnerpro.de';
  
  // Get all dynamic content
  const tools = getAllTools();
  const categories = getAllCategories();
  const subConversions = getAllSubConversions();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/haftungsausschluss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/nutzungsbedingungen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/kategorie/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Sub-conversion pages
  const subConversionPages: MetadataRoute.Sitemap = subConversions.map((conversion) => ({
    url: `${baseUrl}/umrechnung/${conversion.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: Math.min(0.8, 0.5 + (conversion.priority / 20)), // Higher priority = higher sitemap priority
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...subConversionPages];
}
