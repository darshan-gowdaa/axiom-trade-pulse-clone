import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/organisms';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Axiom Trade - Pulse',
  description: 'Real-time token discovery and trading platform on Solana',
  keywords: ['Solana', 'DEX', 'Token', 'Trading', 'DeFi', 'Crypto'],
  openGraph: {
    title: 'Axiom Trade - Pulse',
    description: 'Real-time token discovery and trading platform on Solana',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#06070b',
        }}
      >
        <Providers>
          <div style={{ zoom: 1.20, flexShrink: 0 }}>
            <Header />
          </div>
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, zoom: 1.33 }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
