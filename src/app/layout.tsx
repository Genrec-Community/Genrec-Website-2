import type { Metadata, Viewport } from 'next';
import '@/styles/tokens.css';
import '@/styles/engine.css';
import '@/styles/site.css';
import '@/styles/redesign.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role} for software that holds`,
    template: `%s / ${site.name}`,
  },
  description:
    'GenRec AI is a product studio in Tamil Nadu. We design and engineer AI products, web apps and internal tools for teams that cannot afford a bad day.',
  category: 'technology',
  applicationName: site.name,
  keywords: [
    'product studio',
    'product design',
    'web engineering',
    'AI systems',
    'India',
    'GenRec AI',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.role} for software that holds`,
    description:
      'A product studio in Tamil Nadu designing and engineering AI products, web apps and internal tools for teams that cannot afford a bad day.',
    url: '/',
    locale: 'en_IN',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'GenRec AI, product studio for software that holds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role} for software that holds`,
    description:
      'A product studio in Tamil Nadu designing and engineering AI products, web apps and internal tools for teams that cannot afford a bad day.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0c0b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
