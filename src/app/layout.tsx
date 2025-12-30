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

export const metadata: Metadata = {
  title: 'Axiom Trade - Pulse',
  description: 'Real-time token discovery and trading platform on Solana',
  keywords: ['Solana', 'DEX', 'Token', 'Trading', 'DeFi', 'Crypto'],
  openGraph: {
    title: 'Axiom Trade - Pulse',
    description: 'Real-time token discovery and trading platform on Solana',
    type: 'website',
  },
  robots: { index: true, follow: true },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://axiom.trade" />
        <link rel="dns-prefetch" href="https://axiom.trade" />
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
