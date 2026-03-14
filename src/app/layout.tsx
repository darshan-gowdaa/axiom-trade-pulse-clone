import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { HeaderSkeleton } from '@/components/skeletons';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const Header = dynamic(
  () => import('@/components/organisms/Header').then(mod => ({ default: mod.Header })),
  { loading: () => <HeaderSkeleton />, ssr: true }
);

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#06070b',
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://axiom.trade';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Mobula - Pulse | Real-time Solana Token Tracker',
    template: '%s | Mobula Pulse'
  },
  description: 'Real-time token discovery, trading platform, and analytics on Solana. Track live prices, liquidity, and volume of Solana tokens.',
  keywords: ['Solana', 'DEX', 'Token', 'Trading', 'DeFi', 'Crypto', 'Analytics', 'Live Tracker', 'Pulse'],
  applicationName: 'Mobula Pulse',
  authors: [{ name: 'Mobula Team', url: 'https://mobula.io' }],
  creator: 'Mobula',
  publisher: 'Mobula',
  openGraph: {
    title: 'Mobula - Pulse | Real-time Solana Token Tracker',
    description: 'Real-time token discovery, trading platform, and analytics on Solana. Track live prices, liquidity, and volume.',
    url: baseUrl,
    siteName: 'Mobula Pulse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobula - Pulse | Real-time Solana Token Tracker',
    description: 'Live token discovery and trading analytics for Solana.',
    creator: '@MobulaIO',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mobula Pulse',
    url: baseUrl,
    description: 'Real-time token discovery and trading platform on Solana',
    publisher: {
      '@type': 'Organization',
      name: 'Mobula',
      url: 'https://mobula.io',
      logo: `${baseUrl}/favicon.ico`,
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://axiom.trade" />
        <link rel="dns-prefetch" href="https://axiom.trade" />
        <link rel="preconnect" href="https://api.mobula.io" />
        <link rel="dns-prefetch" href="https://api.mobula.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-screen max-h-screen overflow-hidden flex flex-col bg-[#06070b]`}>
        <Providers>
          <div className="shrink-0" style={{ zoom: 1.20 }}>
            <Suspense fallback={<HeaderSkeleton />}>
              <Header />
            </Suspense>
          </div>
          <main className="flex-1 flex flex-col overflow-hidden min-h-0" style={{ zoom: 1.33 }}>
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
