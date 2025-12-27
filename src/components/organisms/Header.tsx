'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiNotification3Line,
  RiStarLine,
  RiWalletLine,
  RiMenuLine,
  RiFileCopyLine,
  RiUserSettingsLine,
} from '@remixicon/react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';
import { AxiomLogo } from '@/components/atoms/AxiomLogo';
import { OptimizedImage } from '@/components/atoms';
import { NAV_LINKS } from '@/utils/constants';

export function Header() {
  const [chain] = useState<'SOL' | 'BNB'>('SOL');

  return (
    <header className="h-[35px] lg:h-[53px] bg-[#0c0c10] border-b border-[#1a1b23] select-none">
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between px-[24px] h-full">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-[1px] no-underline mr-[24px]">
            <AxiomLogo className="w-[32px] h-[32px] text-white" />
            <span className="text-white font-medium text-[20px]">AXIOM</span>
            <span className="bg-transparent text-[#fcfcfc] text-[13px] font-light p-0 self-end mb-[4px] ml-[2px]">Pro</span>
          </Link>

          <nav className="flex items-center gap-[26px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[12px] font-medium transition-colors ${link.active ? 'text-[#526fff]' : 'text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex justify-center max-w-[200px] mx-[20px]">
          <div className="relative w-full">
            <RiSearchLine className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#d4d4d8]" />
            <input
              type="text"
              placeholder="Search by token or CA..."
              className="w-full h-[28px] pl-[36px] pr-[36px] border border-[#2a2a38] rounded-[16px] p-2 text-[9.8px] text-gray-200 outline-none placeholder:text-gray-200"
            />
            <kbd className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[10px] text-gray-200 px-[6px] py-[2px] rounded-full border border-[#2a2a38] font-mono">/</kbd>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <button className="flex items-center gap-[6px] h-[28px] px-[12px] border border-[#2a2a38] rounded-[16px] text-[12px] text-white cursor-pointer font-semibold">
            <SolanaLogo width={14} height={14} />
            <span className="font-semibold">{chain}</span>
            <RiArrowDownSLine className="w-[12px] h-[12px] text-[#d4d4d8] font-semibold" />
          </button>

          <button className="h-[28px] px-[11px] py-0 bg-[#526fff] border-0 rounded-[16px] text-[12px] font-[750] text-[#000000] cursor-pointer">
            Deposit
          </button>

          <button className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer">
            <RiStarLine className="w-[16px] h-[16px]" />
          </button>

          <button className="relative w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer">
            <RiNotification3Line className="w-[16px] h-[16px]" />
          </button>

          <div className="flex items-center gap-[10px] h-[28px] px-[10px] bg-[#22242d] border border-[#2a2a38] rounded-[16px]">
            <div className="flex items-center gap-[4px]">
              <RiWalletLine className="w-[16px] h-[16px] text-white" />
              <SolanaLogo width={14} height={14} />
              <span className="text-white text-[12px] font-bold">O</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <OptimizedImage src="https://axiom.trade/images/usdc-perps.svg" alt="USDC Perps" width={16} height={16} />
              <span className="text-white text-[12px] font-bold">O</span>
              <RiArrowDownSLine className="w-[16px] h-[16px] text-white font-semibold" />
            </div>
          </div>

          <div className="relative w-[24px] h-[24px] ml-2">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0c0c10]" />
            </div>
            <button className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] border-0 flex items-center justify-center cursor-pointer overflow-hidden p-0">
              <span className="text-[10px] font-bold text-white">67</span>
            </button>
            <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#14f195] rounded-full border-[2px] border-[#0c0c10]" />
          </div>

          <button className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer">
            <RiUserSettingsLine className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden items-center justify-between px-2 h-full overflow-hidden">
        <Link href="/" className="flex items-center no-underline shrink-0">
          <AxiomLogo className="w-[20px] h-[20px] text-white" />
        </Link>

        <div className="flex items-center gap-1.5 overflow-hidden">
          <button className="flex items-center gap-1 px-2 py-1 bg-[#16161e] border border-[#2a2a38] rounded-full text-[10px] whitespace-nowrap shrink-0">
            <RiWalletLine className="w-3.5 h-3.5 text-[rgba(255,255,255,0.7)]" />
            <SolanaLogo width={9} height={9} />
            <span className="text-white font-semibold">0</span>
            <div className="w-[1px] h-2.5 bg-[#2a2a38] mx-0.5" />
            <OptimizedImage src="https://axiom.trade/images/usdc-perps.svg" alt="USDC" width={14} height={14} />
            <span className="text-white font-semibold">0</span>
            <RiArrowDownSLine className="w-2.5 h-2.5 text-[#6b6b7a]" />
          </button>

          <button className="flex items-center gap-1 px-2 py-1 bg-[#16161e] border border-[#2a2a38] rounded-full text-[10px] text-white font-medium whitespace-nowrap shrink-0">
            <RiFileCopyLine className="w-3 h-3 text-white" />
            <span>Paste CA</span>
          </button>

          <button className="flex items-center justify-center w-7 h-7 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0">
            <RiSearchLine className="w-3.5 h-3.5 text-white" />
          </button>

          <div className="relative w-7 h-7 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-[1.5px]">
              <div className="w-full h-full rounded-full bg-[#0c0c10]" />
            </div>
            <button className="absolute inset-[1.5px] rounded-full bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] border-0 flex items-center justify-center cursor-pointer overflow-hidden p-0">
              <span className="text-[9px] font-bold text-white">67</span>
            </button>
            <div className="absolute bottom-[1px] right-[1px] w-1.5 h-1.5 bg-[#14f195] rounded-full border border-[#0c0c10]" />
          </div>

          <button className="flex items-center justify-center w-7 h-7 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0">
            <RiMenuLine className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
