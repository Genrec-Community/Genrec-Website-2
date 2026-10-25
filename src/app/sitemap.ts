import type { MetadataRoute } from 'next';
import { projects, site } from '@/data/site';

const lastModified = new Date('2026-10-25');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified,
      images: [`${site.url}/og.png`],
    },
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
