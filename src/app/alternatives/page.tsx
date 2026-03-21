import type { Metadata } from 'next';
import Link from 'next/link';
import {
  RiFlashlightLine,
  RiCrosshair2Line,
  RiBarChartLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiLockUnlockLine,
  RiCheckLine,
  RiCloseLine,
} from '@remixicon/react';
import { type ElementType } from 'react';

export const metadata: Metadata = {
  title: 'Best Free Axiom Trade Alternatives 2025 | Mobula Pulse',
  description: 'Looking for a free Axiom Trade alternative? Mobula Pulse is the best free real-time Solana & BNB token tracker. Live prices, new pairs, pumpfun tracker. No sign-up needed.',
  keywords: [
    'Axiom trade alternative', 'free Axiom trade alternative', 'Axiom trade free',
    'Solana token tracker free', 'pumpfun tracker', 'meme coin screener',
    'BNB pump tracker', 'new pairs Solana', 'DEX screener alternative',
    'free crypto trading tools', 'Solana meme coin tracker', 'best DeFi tools 2025'
  ],
  alternates: { canonical: '/alternatives' },
  openGraph: {
    title: 'Best Free Axiom Trade Alternatives 2025 | Mobula Pulse',
    description: 'Free real-time Solana & BNB token tracker. Live prices, new pairs, pumpfun finder. The best free Axiom Trade alternative — no sign-up needed.',
    type: 'article',
  },
};

const REFERRAL_URL = 'https://docs.mobula.io?ref=dg';

const features: { icon: ElementType; title: string; desc: string }[] = [
  {
    icon: RiFlashlightLine,
    title: 'Real-time Token Feed',
    desc: 'See new pairs the moment they launch on Solana and BNB Chain — faster than refreshing Axiom.',
  },
  {
    icon: RiCrosshair2Line,
    title: 'Pumpfun & FourMeme Tracker',
    desc: 'Track tokens across pumpfun, fou.meme and Raydium launches with bonding curve progress in real time.',
  },
  {
    icon: RiBarChartLine,
    title: 'Market Cap, Volume & Liquidity',
    desc: 'Full metrics on every token: MC, 24h volume, liquidity depth, buys/sells, holder count and more.',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Smart Trader & Insider Detection',
    desc: 'See smart traders, snipers, and insider holders on every token card — spot rugs before they happen.',
  },
  {
    icon: RiGlobalLine,
    title: 'Multi-chain: Solana + BNB',
    desc: 'Switch between Solana and BNB Chain in one click. No need for separate tools for each chain.',
  },
  {
    icon: RiLockUnlockLine,
    title: '100% Free — No Sign-up',
    desc: 'No wallet connect required, no subscription, no limits. Powered by the Mobula API — open and free.',
  },
];


const comparisons = [
  { feature: 'Real-time token feed', mobula: true, axiom: true },
  { feature: 'Pumpfun / FourMeme tracker', mobula: true, axiom: true },
  { feature: 'Free to use', mobula: true, axiom: false },
  { feature: 'No sign-up required', mobula: true, axiom: false },
  { feature: 'BNB Chain support', mobula: true, axiom: false },
  { feature: 'Smart trader detection', mobula: true, axiom: true },
  { feature: 'Open API access', mobula: true, axiom: false },
  { feature: 'Insider & sniper alerts', mobula: true, axiom: true },
];

export default function AlternativesPage() {
  return (
    <div className="min-h-screen bg-[#06070b] text-white font-sans">

      {/* Nav */}
      <nav className="border-b border-[#1a1b23] px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 no-underline">
          <span className="text-white font-bold text-lg">mobula</span>
          <span className="text-[#526fff] text-sm font-light">pulse</span>
        </Link>
        <a
          href={REFERRAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 bg-[#526fff] rounded-full text-sm font-bold text-black hover:bg-[#6b85ff] transition-colors"
        >
          Open Mobula API Docs →
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(82,111,255,0.15)] rounded-full border border-[#526fff]/30 text-[#526fff] text-xs font-semibold mb-6">
          <RiFlashlightLine className="w-3.5 h-3.5" /> Free Axiom Trade Alternative
        </div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
          The Best Free{' '}
          <span className="text-[#526fff]">Axiom Trade Alternative</span>{' '}
          for Solana &amp; BNB
        </h1>
        <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto mb-8">
          Mobula Pulse gives you real-time token discovery, pumpfun tracking, smart trader alerts,
          and full market analytics — completely free, no sign-up needed.
          Powered by the <a href={REFERRAL_URL} target="_blank" rel="noopener noreferrer" className="text-[#526fff] hover:underline">Mobula API</a>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#526fff] rounded-full font-bold text-black hover:bg-[#6b85ff] transition-colors no-underline"
          >
            Launch Free Tracker →
          </Link>
          <a
            href={REFERRAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#1a1b23] border border-[#2a2a38] rounded-full font-bold text-white hover:bg-[#252630] transition-colors no-underline"
          >
            Explore Mobula API Docs
          </a>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          Everything Axiom has — for free
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-5 bg-[#0f1014] border border-[#1a1b23] rounded-xl hover:border-[#526fff]/40 transition-colors"
            >
              <f.icon className="w-5 h-5 text-[#526fff] mb-3" />
              <h3 className="font-bold text-sm mb-1">{f.title}</h3>
              <p className="text-[#64748b] text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          Mobula Pulse vs Axiom Trade
        </h2>
        <div className="border border-[#1a1b23] rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-[#0f1014] border-b border-[#1a1b23] text-xs font-bold uppercase text-[#64748b] px-4 py-2">
            <span>Feature</span>
            <span className="text-center text-[#526fff]">Mobula Pulse</span>
            <span className="text-center">Axiom Trade</span>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-[#06070b]' : 'bg-[#0a0b0e]'} border-b border-[#1a1b23] last:border-0`}
            >
              <span className="text-[#94a3b8]">{row.feature}</span>
              <span className="flex justify-center">
                {row.mobula
                  ? <RiCheckLine className="w-4 h-4 text-[#22c55e]" />
                  : <RiCloseLine className="w-4 h-4 text-[#ef4444]" />}
              </span>
              <span className="flex justify-center">
                {row.axiom
                  ? <RiCheckLine className="w-4 h-4 text-[#22c55e]" />
                  : <RiCloseLine className="w-4 h-4 text-[#ef4444]" />}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — SEO rich content */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Is Mobula Pulse really free?',
              a: 'Yes — 100% free with no account required. Just open the site and start tracking tokens on Solana and BNB Chain instantly.',
            },
            {
              q: 'How is Mobula Pulse different from Axiom Trade?',
              a: 'Axiom Trade requires sign-up and charges fees. Mobula Pulse is free, open, and supports both Solana and BNB Chain out of the box — powered by the Mobula API.',
            },
            {
              q: 'Can I track pumpfun tokens on Mobula Pulse?',
              a: 'Yes. Mobula Pulse has a dedicated pumpfun feed showing new pairs, bonding curve progress (Final Stretch tab), and migrated tokens in real time.',
            },
            {
              q: 'What data does Mobula Pulse show?',
              a: 'Live price, market cap, 24h volume, liquidity, buy/sell counts, holder breakdown (smart traders, snipers, insiders), and token age — all updating in real time via WebSocket.',
            },
            {
              q: 'Does Mobula Pulse have an API?',
              a: 'The underlying data comes from the Mobula API — one of the most comprehensive DeFi data APIs available. You can explore the docs and get your own API key for building apps.',
            },
          ].map((faq) => (
            <div key={faq.q} className="p-5 bg-[#0f1014] border border-[#1a1b23] rounded-xl">
              <h3 className="font-bold text-sm mb-2">{faq.q}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <div className="p-8 bg-[rgba(82,111,255,0.08)] border border-[#526fff]/30 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3">Start tracking tokens for free</h2>
          <p className="text-[#94a3b8] text-sm mb-6">
            No sign-up. No fees. Just open, real-time DeFi data powered by the Mobula API.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#526fff] rounded-full font-bold text-black hover:bg-[#6b85ff] transition-colors no-underline"
            >
              Launch Mobula Pulse →
            </Link>
            <a
              href={REFERRAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-transparent border border-[#526fff]/50 rounded-full font-bold text-[#526fff] hover:bg-[#526fff]/10 transition-colors no-underline"
            >
              Get Mobula API Access
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1b23] py-6 text-center text-xs text-[#64748b]">
        <p>
          Powered by{' '}
          <a href={REFERRAL_URL} target="_blank" rel="noopener noreferrer" className="text-[#526fff] hover:underline">
            Mobula API
          </a>{' '}
          · <Link href="/" className="hover:text-white transition-colors">Back to Pulse Tracker</Link>
        </p>
      </footer>
    </div>
  );
}
