import type { MetadataRoute } from 'next';
import { projects, services, site } from '@/data/site';

const lastModified = new Date('2026-11-02');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${site.url}/og.png`],
    },
    {
      url: `${site.url}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/work`,
      lastModified,
      images: [`${site.url}/og/work.png`],
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified,
      images: project.cover
        ? [`${site.url}${project.cover.src}`]
        : [`${site.url}/og/${project.slug}.png`],
    })),
    {
      url: `${site.url}/studio`,
      lastModified,
      images: [`${site.url}/og/studio.png`],
    },
  ];
}
