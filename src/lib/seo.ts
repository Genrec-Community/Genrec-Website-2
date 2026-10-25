import { projects, site, team, type Project } from '@/data/site';

export const SITE_URL = site.url.replace(/\/$/, '');
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: site.name,
  alternateName: site.wordmark,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/logo.png'),
    width: 512,
    height: 512,
  },
  image: absoluteUrl('/og.png'),
  description: site.description,
  email: site.email,
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Product strategy',
    'Interface design',
    'Full-stack engineering',
    'AI systems',
    'Data and infrastructure',
    'Software rescue and handover',
  ],
  sameAs: site.socials.map((social) => social.href),
  contactPoint: {
    '@type': 'ContactPoint',
    email: site.email,
    contactType: 'sales',
    availableLanguage: ['en'],
  },
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: site.name,
  description: site.description,
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'en-IN',
};

export function webPageSchema({
  path,
  name,
  description,
  image = '/og.png',
}: {
  path: string;
  name: string;
  description: string;
  image?: string;
}) {
  const url = absoluteUrl(path);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(image),
    },
    inLanguage: 'en-IN',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const last = items[items.length - 1];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(last.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListSchema(path: string, entries: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#projects`,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(entry.path),
    })),
  };
}

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageSchema({
      path: '/',
      name: 'GenRec AI — Product studio for software that holds',
      description: site.description,
    }),
    itemListSchema(
      '/',
      projects.map((project) => ({
        name: project.title,
        path: `/work/${project.slug}`,
      })),
    ),
  ],
};

export const workSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...webPageSchema({
        path: '/work',
        name: 'Selected builds — GenRec AI case studies',
        description:
          'Four systems built by GenRec AI: SelectStar, LuminaIQ, Tabble and the VSB faculty feedback system.',
        image: '/og/work.png',
      }),
      '@type': 'CollectionPage',
    },
    itemListSchema(
      '/work',
      projects.map((project) => ({
        name: project.title,
        path: `/work/${project.slug}`,
      })),
    ),
  ],
};

export const studioSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...webPageSchema({
        path: '/studio',
        name: 'Studio — GenRec AI',
        description:
          'GenRec AI is a product studio in Tamil Nadu, India. Three people who scope, design and engineer one build at a time.',
        image: '/og/studio.png',
      }),
      '@type': 'AboutPage',
    },
    ...team.map((person) => ({
      '@type': 'Person',
      name: person.name,
      jobTitle: person.role,
      description: person.line,
      worksFor: { '@id': ORGANIZATION_ID },
    })),
  ],
};

export function caseStudySchema(project: Project) {
  const path = `/work/${project.slug}`;
  const url = absoluteUrl(path);
  const image = project.cover?.src ?? `/og/${project.slug}.png`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...webPageSchema({
          path,
          name: `${project.title} case study — GenRec AI`,
          description: project.summary,
          image: `/og/${project.slug}.png`,
        }),
      },
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: `${project.title}: ${project.tagline}`,
        name: `${project.title} case study`,
        description: project.summary,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        image: [absoluteUrl(image)],
        author: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        articleSection: project.sector,
        keywords: [
          project.title,
          project.sector,
          'case study',
          'product design',
          'software engineering',
          ...project.stack.split(' · '),
        ],
        about: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.summary,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          ...(project.live ? { url: project.live.href } : {}),
        },
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en-IN',
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: project.title, path },
      ]),
    ],
  };
}
