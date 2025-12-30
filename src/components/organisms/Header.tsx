'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiNotification3Line,
  RiStarLine,
  RiWalletLine,
  RiMenuLine,
  RiFileCopyLine,
  RiUserSettingsLine,
} from '@remixicon/react';
import { ChainLogo, ChainText } from '@/components/atoms';
import { AxiomLogo } from '@/components/atoms/AxiomLogo';
import { OptimizedImage } from '@/components/atoms';
import { AvatarDropdown, ChainDropdown, AccountSettingsDropdown, WalletDropdown } from '@/components/molecules';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from '@/utils/constants';
import { useAppSelector } from '@/hooks';

export function Header() {
  const activeChain = useAppSelector((state) => state.ui.activeChain);
  const isBnb = activeChain === 'bnb';

  const navContainerRef = useRef<HTMLDivElement>(null);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateScrollState = useCallback(() => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  const scrollNav = useCallback((direction: 'left' | 'right') => {
    if (navContainerRef.current) {
      const scrollAmount = 120;
      navContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollState, 300);
    }
  }, [updateScrollState]);

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


          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
          >

            <div
              ref={navContainerRef}
              className="flex items-center gap-[26px] overflow-x-auto overflow-y-visible scrollbar-hide max-w-[420px] py-3 -my-3"
              onScroll={updateScrollState}
            >
              {NAV_LINKS.map((link) => (
                <span
                  key={link.href}
                  className={`text-[12px] font-medium transition-all duration-150 whitespace-nowrap px-[12px] py-[6px] -mx-[12px] -my-[6px] rounded-lg cursor-not-allowed hover:bg-[#1a1f3d] hover:text-[#526fff] ${link.active ? 'text-[#526fff]' : 'text-white'
                    }`}
                >
                  {link.label}
                </span>
              ))}
            </div>


            <div
              className={`absolute left-0 top-0 bottom-0 w-[44px] flex items-center justify-start z-20 transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c10] via-[#0c0c10] to-transparent pointer-events-none" />
              <button
                onClick={() => scrollNav('left')}
                className={`relative z-10 flex items-center justify-center cursor-pointer transition-opacity duration-200 ${isNavHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
              >
                <RiArrowLeftSLine className="w-[18px] h-[20px] text-[#6b6b7a]" />
              </button>
            </div>


            <div
              className={`absolute right-0 top-0 bottom-0 w-[44px] flex items-center justify-end z-20 transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#0c0c10] via-[#0c0c10] to-transparent pointer-events-none" />
              <button
                onClick={() => scrollNav('right')}
                className={`relative z-10 flex items-center justify-center cursor-pointer transition-opacity duration-200 ${isNavHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
              >
                <RiArrowRightSLine className="w-[18px] h-[20px] text-[#6b6b7a]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center max-w-[200px] mx-[10px]">
          <div className="relative w-full">
            <RiSearchLine className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#d4d4d8]" />
            <input
              type="text"
              placeholder="Search by token or CA..."
              className="w-full h-[28px] pl-[36px] pr-[36px] border border-[#2a2a38] rounded-[16px] p-2 text-[9.8px] text-gray-200 opacity-60 outline-none placeholder:text-gray-200"
            />
            <kbd className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[10px] text-gray-200 px-[6px] py-[2px] rounded-full border border-[#2a2a38] font-mono">/</kbd>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <ChainDropdown>
            <button
              className={`flex items-center gap-[5px] h-[32px] pl-[8px] pr-[6px] border-[1.5px] rounded-full text-[12px] text-white cursor-pointer font-semibold transition-all duration-150 ease-in-out hover:brightness-125 active:scale-[0.96] ${isBnb ? 'shadow-[0_0_12px_rgba(240,185,11,0.2)]' : ''
                }`}
              style={{ borderColor: isBnb ? 'rgba(240, 185, 11, 0.15)' : '#2a2a38' }}
            >
              <ChainLogo width={14} height={14} />
              <span className="font-semibold"><ChainText /></span>
              <RiArrowDownSLine className="w-[16px] h-[16px] text-[#d4d4d8] font-semibold" />
            </button>
          </ChainDropdown>

          <button className="h-[28px] px-[11px] py-0 bg-[#526fff] border-0 rounded-[16px] text-[12px] font-[750] text-[#000000] cursor-pointer">
            Deposit
          </button>

          <button className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer transition-colors duration-150 hover:bg-[#252630]">
            <RiStarLine className="w-[16px] h-[16px]" />
          </button>

          <button className="relative w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer transition-colors duration-150 hover:bg-[#252630]">
            <RiNotification3Line className="w-[16px] h-[16px]" />
          </button>

          <WalletDropdown>
            <div className="flex items-center gap-[10px] h-[28px] px-[10px] bg-[#22242d] border border-[#2a2a38] rounded-[16px] cursor-pointer transition-colors duration-150 hover:bg-[#2a2c36]">
              <div className="flex items-center gap-[4px]">
                <RiWalletLine className="w-[16px] h-[16px] text-white" />
                <ChainLogo width={14} height={14} />
                <span className="text-white text-[12px] font-bold">O</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <OptimizedImage src="https://axiom.trade/images/usdc-perps.svg" alt="USDC Perps" width={16} height={16} />
                <span className="text-white text-[12px] font-bold">O</span>
                <RiArrowDownSLine className="w-[16px] h-[16px] text-white font-semibold" />
              </div>
            </div>
          </WalletDropdown>

          <AvatarDropdown>
            <div className="relative w-[24px] h-[24px] ml-2 cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0c0c10]" />
              </div>
              <button className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] border-0 flex items-center justify-center cursor-pointer overflow-hidden p-0">
                <span className="text-[10px] font-bold text-white">67</span>
              </button>
              <div className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#14f195] rounded-full border-[2px] border-[#0c0c10]" />
            </div>
          </AvatarDropdown>

          <AccountSettingsDropdown>
            <button className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1b23] rounded-full border-0 text-[#fcfcfc] cursor-pointer transition-colors duration-150 hover:bg-[#252630]">
              <RiUserSettingsLine className="w-[16px] h-[16px]" />
            </button>
          </AccountSettingsDropdown>
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
            <ChainLogo width={9} height={9} />
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

          <button
            className="flex items-center justify-center w-7 h-7 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <RiMenuLine className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
