import type { Metadata, Viewport } from 'next';
import '@/styles/tokens.css';
import '@/styles/engine.css';
import '@/styles/site.css';
import '@/styles/redesign.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} / ${site.role}`,
    template: `%s / ${site.name}`,
  },
  description: site.description,
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
    title: `${site.name} / ${site.role}`,
    description: site.description,
    url: site.url,
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} / ${site.role}`,
    description: site.description,
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: site.socials.map((s) => s.href),
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Motion />
      </body>
    </html>
  );
}
