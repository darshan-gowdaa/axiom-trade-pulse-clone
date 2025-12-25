'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Bell, Star, Settings, Wallet, Globe, Menu, Copy } from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';
import { AxiomLogo } from '@/components/atoms/AxiomLogo';
import { Button } from '@/components/atoms/Button';

const NAV_LINKS = [
  { href: '/discover', label: 'Discover', active: false },
  { href: '/pulse', label: 'Pulse', active: true },
  { href: '/trackers', label: 'Trackers', active: false },
  { href: '/perpetuals', label: 'Perpetuals', active: false },
  { href: '/yield', label: 'Yield', active: false },
  { href: '/vision', label: 'Vision', active: false },
  { href: '/pump', label: 'Pr', active: false },
];

export function Header() {
  const [chain] = useState<'SOL' | 'BNB'>('SOL');

  return (
    <header className="h-[35px] lg:h-[53px] bg-[#0c0c10] border-b border-[#1a1b23] select-none">
      {/* Desktop Layout - Pixel Perfect Preservation */}
      <div className="hidden lg:flex items-center justify-between px-[24px] h-full">
        {/* Left Section: Logo + Nav */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-[1px] no-underline mr-[24px]"
          >
            <AxiomLogo className="w-[36px] h-[36px] text-white" />
            <span className="text-white font-medium text-[19px]">
              AXIOM
            </span>
            <span className="bg-transparent text-[#fcfcfc] text-[13px] font-light p-0 self-end mb-[7px] ml-[2px]">
              Pro
            </span>
          </Link>

          {/* nav */}
          <nav className="flex items-center gap-[16px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors ${
                  link.active ? 'text-[#526fff]' : 'text-[#e4e4e7]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle Section: Search */}
        <div className="flex-1 flex justify-center max-w-[280px] mx-[24px]">
          <div className="relative w-full">
            <Search 
              className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#d4d4d8]"
            />
            <input
              type="text"
              placeholder="Search by token or CA..."
              className="w-full h-[28px] pl-[36px] pr-[36px] bg-[#16161e] border border-[#2a2a38] rounded-[16px] text-[10px] text-gray-300 outline-none placeholder:text-[#d4d4d8]"
            />  
            <kbd className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[10px] text-[#d4d4d8] px-[6px] py-[2px] rounded-[12px] border border-[#2a2a38] font-mono bg-[#1c1c26]">
              /
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-[8px]">
          {/* Chain Selector */}
          <button
            className="flex items-center gap-[6px] h-[28px] px-[12px] bg-[#16161e] border border-[#2a2a38] rounded-[16px] text-[12px] text-white cursor-pointer"
          >
            <SolanaLogo width={10} height={8} />
            <span className="font-medium">{chain}</span>
            <ChevronDown className="w-[12px] h-[12px] text-[#d4d4d8]" />
          </button>

          {/* Deposit Button */}
          <button
            className="h-[28px] px-[8px] py-[2px] bg-[#526fff] border-0 rounded-[16px] text-[12px] font-[750] text-[#000000] cursor-pointer"
          >
            Deposit
          </button>

          {/* Star Button */}
          <button
            className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer"
          >
            <Star className="w-[16px] h-[16px]" strokeWidth={1.5} />
          </button>

          {/* Bell Button */}
          <button
            className="relative w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer"
          >
            <Bell className="w-[16px] h-[16px]" strokeWidth={1.5} />
            <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#ef4444] rounded-full" />
          </button>

          {/* Wallet & Globe Group */}
          <div className="flex items-center gap-[10px] h-[28px] px-[10px] bg-[#22242d] border border-[#2a2a38] rounded-[16px]">
            <div className="flex items-center gap-[8px]">
              <Wallet className="w-[12px] h-[12px] text-[#d4d4d8]" />
              <SolanaLogo width={10} height={8} />
              <span className="text-white text-[12px] font-medium">0</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <img 
                src="https://axiom.trade/images/usdc-perps.svg" 
                alt="USDC Perps"
                className="w-[18px] h-[18px]"
              />
              <span className="text-white text-[12px] font-medium">0</span>
              <ChevronDown className="w-[10px] h-[10px] text-[#d4d4d8]" />
            </div>
          </div>

          {/* Profile Gradient Circle */}
          <div className="relative w-[28px] h-[28px]">
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-[2px]"
            >
              <div className="w-full h-full rounded-full bg-[#0c0c10]" />
            </div>
            <button
              className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] border-0 flex items-center justify-center cursor-pointer overflow-hidden p-0"
            >
              <span className="text-[10px] font-bold text-white">67</span>
            </button>
            <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#14f195] rounded-full border-[2px] border-[#0c0c10]" />
          </div>

          {/* Settings Button */}
          <button
            className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer"
          >
            <Settings className="w-[16px] h-[16px]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center justify-between px-2 h-full overflow-hidden">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center no-underline shrink-0">
          <AxiomLogo className="w-[20px] h-[20px] text-white" />
        </Link>

        {/* Right: Actions Group */}
        <div className="flex items-center gap-1.5 overflow-hidden">
             {/* Wallet Pill */}
             <button className="flex items-center gap-1 px-2 py-1.5 bg-[#16161e] border border-[#2a2a38] rounded-full text-[10px] whitespace-nowrap shrink-0">
                <Wallet className="w-3.5 h-3.5 text-[rgba(255,255,255,0.7)]" />
                <SolanaLogo width={9} height={9} /> 
                <span className="text-white font-semibold">0</span>
                <div className="w-[1px] h-2.5 bg-[#2a2a38] mx-0.5" />
                <img src="https://axiom.trade/images/usdc-perps.svg" alt="USDC" className="w-3.5 h-3.5" />
                <span className="text-white font-semibold">0</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#6b6b7a]" />
             </button>

             {/* Paste CA */}
             <button className="flex items-center gap-1 px-2 py-1.5 bg-[#16161e] border border-[#2a2a38] rounded-full text-[10px] text-white font-medium whitespace-nowrap shrink-0">
                <Copy className="w-3 h-3 text-white" />
                <span>Paste</span>
             </button>

             {/* Search */}
             <button className="flex items-center justify-center w-7 h-7 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0">
                <Search className="w-3.5 h-3.5 text-white" />
             </button>

             {/* Profile */}
             <div className="relative w-7 h-7 shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-[#0c0c10]" />
                </div>
                <button className="absolute inset-[1.5px] rounded-full bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] border-0 flex items-center justify-center cursor-pointer overflow-hidden p-0">
                  <span className="text-[9px] font-bold text-white">CO</span>
                </button>
                <div className="absolute bottom-[1px] right-[1px] w-1.5 h-1.5 bg-[#14f195] rounded-full border border-[#0c0c10]" />
             </div>

             {/* Menu */}
             <button className="flex items-center justify-center w-7 h-7 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0">
                <Menu className="w-3.5 h-3.5 text-white" />
             </button>
        </div>
      </div>
    </header>
  );
}
