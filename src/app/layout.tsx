import type { Metadata, Viewport } from 'next';
import '@/styles/tokens.css';
import '@/styles/engine.css';
import '@/styles/site.css';
import '@/styles/redesign.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Motion } from '@/components/Motion';
import { founders, site } from '@/data/site';
import { founderSchemas, organizationSchema, websiteSchema } from '@/lib/seo';

const homeTitle = `${site.name} (GenRec AI) — Websites, software and AI agents studio`;
const homeDescription =
  'GenrecAI (GenRec AI) at genrecai.com: websites, software, AI workflows, AI agents and custom CRM. Founded by Shyamnath Sankar and Jai Samyukth B U.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: homeDescription,
  category: 'technology',
  applicationName: site.name,
  keywords: [
    'GenrecAI',
    'Genrec AI',
    'GenRec AI',
    'genrecai.com',
    'Genrec',
    'Shyamnath Sankar',
    'Jai Samyukth',
    'website design',
    'software development',
    'AI workflows',
    'AI agents',
    'custom CRM',
    'Tabble',
    'LuminaIQ',
    'SelectStar',
    'HailBrowser',
    'Tamil Nadu',
    'India',
  ],
  authors: founders.map((f) => ({ name: f.name, url: f.url })),
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: homeTitle,
    description: homeDescription,
    url: '/',
    locale: 'en_IN',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'GenrecAI, software and AI studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#0b0c0b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema, ...founderSchemas],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <link
          rel="preload"
          href="/fonts/clash-display-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/general-sans-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel" />
          <div className="curtain__needle" />
        </div>


        <Header />

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        <JsonLd data={siteSchema} />
        <Motion />
      </body>
    </html>
  );
}
