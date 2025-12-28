'use client';

import {
  RiWalletLine,
  RiArrowDownSLine,
  RiCompass3Line,
  RiPulseLine,
  RiWindowLine,
  RiNotification3Line,
  RiSettingsLine,
  RiGasStationLine,
  RiCapsuleLine,
  RiBarChartLine,
  RiTwitterXLine,
  RiListSettingsLine,
  RiBtcFill,
  RiPaletteLine,
  RiDiscordFill,
  RiCoinLine,
  RiSettings3Line,
} from '@remixicon/react';
import { ChainLogo } from '@/components/atoms';
import { NotificationDot, NavButton, OptimizedImage } from '@/components/atoms';
import { WalletSolPill } from '@/components/molecules';

interface BottomStatusBarProps {
  className?: string;
  loading?: boolean;
}

export function BottomStatusBar({ className, loading }: BottomStatusBarProps) {
  return (
    <div className={`flex items-center justify-between h-6.5 px-7 bg-[#06070b] border-t border-[#1a1b23] text-[11px] shrink-0 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-1 py-[3px] bg-[rgba(82,111,255,0.15)] border-none rounded-[4px] text-[#526fff] text-[10px] font-medium cursor-pointer whitespace-nowrap">
          <RiListSettingsLine className="w-[10px] h-[10px]" />
          <span className="font-semibold">PRESET 1</span>
        </button>

        <WalletSolPill variant="statusBar" walletCount={1} solBalance={0} />
        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        <button className="bg-none border-none p-0 cursor-pointer text-[#6b6b7a] flex">
          <RiSettings3Line className="w-[11px] h-[11px]" />
        </button>

        <NavButton icon={<RiWalletLine className="w-[11px] h-[11px]" />} label="Wallet" withDot />
        <NavButton icon={<RiTwitterXLine className="w-[11px] h-[11px]" />} label="Twitter" withDot />
        <NavButton icon={<RiCompass3Line className="w-[11px] h-[11px]" />} label="Discover" withDot />

        <NotificationDot>
          <button className="flex items-center gap-[3px] px-1.5 py-[2px] bg-[#1a1a1f] border-none rounded-[4px] text-white text-[10px] cursor-pointer">
            <RiPulseLine className="w-[11px] h-[11px] text-[#22d3ee]" />
            <span className="text-[#fcfcfcfc]">Pulse</span>
          </button>
        </NotificationDot>

        <NavButton icon={<RiBarChartLine className="w-[11px] h-[11px]" />} label="PnL" />
        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        <div className="flex items-center gap-[3px]">
          <RiBtcFill className="w-[11px] h-[11px] text-[#f7931a]" />
          <span className="text-[#f7931a] text-[10px]">690.67K</span>
        </div>

        <div className="flex items-center gap-[3px]">
          <OptimizedImage src="https://axiom.trade/images/eth-fill.svg" alt="ETH" width={11} height={11} />
          <span className="text-[#497493] text-[10px]">401.67K</span>
        </div>

        <div className="flex items-center gap-[3px]">
          <ChainLogo width={11} height={11} />
          <span className="text-[#14f195] text-[10px]">$189.96</span>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-[3px]">
            <RiCapsuleLine className="w-[12px] h-[12px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">$50.2K</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <RiGasStationLine className="w-[12px] h-[12px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">0.062₂1</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <RiCoinLine className="w-[12px] h-[12px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">0.00₂38</span>
          </div>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        <div className={`flex items-center gap-1 px-1.5 py-[2px] rounded-[4px] whitespace-nowrap ${loading ? 'bg-[rgba(248,113,113,0.15)]' : 'bg-[rgba(52,211,153,0.15)]'}`}>
          <span className={`w-[5px] h-[5px] rounded-full ${loading ? 'bg-[#f87171]' : 'bg-[#34d399]'}`} />
          <span className={`text-[10px] ${loading ? 'text-[#f87171]' : 'text-[#34d399]'}`}>
            {loading ? 'Disconnected' : 'Connection is stable'}
          </span>
        </div>

        <div className="flex items-center gap-[2px] text-white">
          <span className="font-medium text-[9.8px]">GLOBAL</span>
          <RiArrowDownSLine className="w-2 h-2" />
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        <div className="flex items-center gap-2">
          <button className="bg-none border-none text-white cursor-pointer p-[1px] flex">
            <RiWindowLine className="w-3 h-3" />
          </button>
          <button className="bg-none border-none text-white cursor-pointer p-[1px] flex">
            <RiNotification3Line className="w-3 h-3" />
          </button>
          <button className="bg-none border-none text-white cursor-pointer p-[1px] flex">
            <RiPaletteLine className="w-3 h-3" />
          </button>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        <div className="flex items-center gap-1.5">
          <button className="bg-none border-none text-white cursor-pointer p-[1px] flex">
            <RiDiscordFill className="w-3 h-3" />
          </button>
          <button className="bg-none border-none text-white cursor-pointer p-[1px] flex">
            <RiTwitterXLine className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-[3px] bg-none border-none text-white cursor-pointer text-[10px]">
            <RiWindowLine className="w-[10px] h-[10px] text-white" />
            <span className="text-white">Docs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
