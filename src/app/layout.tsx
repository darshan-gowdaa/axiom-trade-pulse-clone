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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-screen max-h-screen overflow-hidden flex flex-col bg-[#06070b]`}
      >
        <Providers>
          <div className="shrink-0" style={{ zoom: 1.20 }}>
            <Header />
          </div>
          <main className="flex-1 flex flex-col overflow-hidden min-h-0" style={{ zoom: 1.33 }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
