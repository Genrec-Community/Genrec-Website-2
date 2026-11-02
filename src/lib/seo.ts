import { founders, otherWork, projects, services, site, team, type Project } from '@/data/site';

export const SITE_URL = site.url.replace(/\/$/, '');
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const founderId = (url: string) => `${url.replace(/\/$/, '')}/#person`;

export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const organizationSchema = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORGANIZATION_ID,
  name: site.name,
  alternateName: site.altNames,
  legalName: site.name,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: absoluteUrl('/logo.png'),
    width: 512,
    height: 512,
    caption: site.name,
  },
  image: absoluteUrl('/og.png'),
  description: site.description,
  disambiguatingDescription: `${site.name} is the software and AI studio at ${site.domain}, founded by ${founders
    .map((f) => f.name)
    .join(' and ')}. It makes Tabble, LuminaIQ, SelectStar and HailBrowser.`,
  slogan: 'We build what holds.',
  email: site.email,
  foundingDate: site.foundingDate,
  founder: founders.map((f) => ({ '@id': founderId(f.url) })),
  numberOfEmployees: { '@type': 'QuantitativeValue', value: team.length },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  areaServed: 'Worldwide',
  priceRange: '$$',
  knowsAbout: [
    'Website design and development',
    'Software development',
    'AI workflows',
    'AI agents',
    'Browser agents',
    'Model Context Protocol (MCP)',
    'Retrieval-augmented generation',
    'Custom CRM development',
    'Next.js',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${site.name} services`,
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.text,
        provider: { '@id': ORGANIZATION_ID },
      },
    })),
  },
  owns: projects
    .filter((p) => p.kind !== 'other')
    .map((p) => ({
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/work/${p.slug}#software`,
      name: p.title,
      description: p.summary,
      applicationCategory: p.sector,
      operatingSystem: 'Web',
      ...(p.live ? { url: p.live.href } : {}),
      ...(p.repo ? { sameAs: [p.repo] } : {}),
    })),
  sameAs: site.socials.map((social) => social.href),
  contactPoint: {
    '@type': 'ContactPoint',
    email: site.email,
    contactType: 'sales',
    areaServed: 'Worldwide',
    availableLanguage: ['en', 'ta'],
  },
};

export const founderSchemas = founders.map((f) => ({
  '@type': 'Person',
  '@id': founderId(f.url),
  name: f.name,
  url: f.url,
  jobTitle: `${f.role}, ${site.name}`,
  description: `${f.role} of ${site.name}. ${f.focus}.`,
  worksFor: { '@id': ORGANIZATION_ID },
  affiliation: { '@id': ORGANIZATION_ID },
  sameAs: [f.url, ...(f.github ? [f.github] : [])],
}));

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: site.name,
  alternateName: site.altNames,
  description: site.description,
  publisher: { '@id': ORGANIZATION_ID },
  copyrightHolder: { '@id': ORGANIZATION_ID },
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
      name: `${site.name} (GenRec AI) — Websites, software and AI agents studio`,
      description: site.description,
    }),
    itemListSchema(
      '/',
      projects.map((project) => ({
        name: project.title,
        path: `/work/${project.slug}`,
      })),
    ),
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#services`,
      name: `${site.name} services`,
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
      })),
    },
  ],
};

export const workSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...webPageSchema({
        path: '/work',
        name: `Products and open source — ${site.name}`,
        description:
          'Products, open source and client work by GenrecAI: Tabble, LuminaIQ, SelectStar, HailBrowser, VSB Feedback and Mobile Agent.',
        image: '/og/work.png',
      }),
      '@type': 'CollectionPage',
    },
    itemListSchema(
      '/work',
      [
        ...projects.map((project) => ({
          name: project.title,
          path: `/work/${project.slug}`,
        })),
        ...otherWork.map((item) => ({ name: item.title, path: item.href })),
      ],
    ),
  ],
};

export const studioSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...webPageSchema({
        path: '/studio',
        name: `Studio and founders — ${site.name}`,
        description:
          'GenrecAI is a software and AI studio in Tamil Nadu, India, founded by Shyamnath Sankar and Jai Samyukth B U.',
        image: '/og/studio.png',
      }),
      '@type': 'AboutPage',
    },
    ...team.map((person) => ({
      '@type': 'Person',
      ...(person.url ? { '@id': founderId(person.url), url: person.url } : {}),
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
          name: `${project.title} case study — ${site.name}`,
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
          '@id': `${url}#software`,
          name: project.title,
          description: project.summary,
          applicationCategory: project.sector,
          operatingSystem: 'Web',
          creator: { '@id': ORGANIZATION_ID },
          ...(project.live ? { url: project.live.href } : {}),
          ...(project.repo ? { sameAs: [project.repo] } : {}),
          ...(project.kind === 'open-source' ? { license: 'https://opensource.org/licenses/MIT', isAccessibleForFree: true } : {}),
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
