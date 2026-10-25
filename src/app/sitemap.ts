import type { MetadataRoute } from 'next';
import { projects, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: `${site.url}/studio`, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
