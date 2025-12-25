'use client';

import { 
  Twitter, Wallet, ChevronDown, Compass, Activity, 
  Disc, AppWindow, Bell, Paintbrush, MessageCircle, Settings, Fuel, Pill, 
  BarChart,
} from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface BottomStatusBarProps {
  className?: string;
  loading?: boolean;
}

export function BottomStatusBar({ className, loading }: BottomStatusBarProps) {
  return (
    <div
      className={`flex items-center justify-between h-6.5 px-7 bg-[#06070b] border-t border-[#1a1b23] text-[11px] shrink-0 ${className || ''}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Preset Button - Light purple bg, purple text */}
        <button className="flex items-center gap-1 px-2 py-[3px] bg-[rgba(82,111,255,0.15)] border-none rounded-[4px] text-[#526fff] text-[10px] font-medium cursor-pointer whitespace-nowrap">
          <Disc className="w-[10px] h-[10px]" />
          <span>PRESET 1</span>
        </button>

        {/* Wallet + Sol Status */}
        <button className="flex items-center gap-[5px] px-[5px] py-[2px] bg-transparent border border-[#1a1b23] rounded-xl text-[#6b6b7a] text-[10px] cursor-pointer">
          <Wallet className="w-[10px] h-[10px] text-[#6b6b7a]" />
          <span className="text-[#e2e8f0] font-semibold">1</span>
          
          {/* Custom Solana Gradient Icon */}
          <SolanaLogo width={10} height={8} />

          <span className="text-[#e2e8f0] font-semibold">0</span>
          <ChevronDown className="w-[10px] h-[10px] text-[#6b6b7a]" />
        </button>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />
        
        {/* Settings */}
        <button className="bg-none border-none p-0 cursor-pointer text-[#6b6b7a] flex">
          <Settings className="w-[10px] h-[10px]" />
        </button>

        {/* Wallet dropdown */}
        <button className="flex items-center gap-[3px] bg-none border-none text-[#6b6b7a] cursor-pointer text-[10px]">
          <Wallet className="w-[10px] h-[10px]" />
          <span>Wallet</span>
        </button>

        {/* Twitter */}
        <button className="flex items-center gap-[3px] bg-none border-none text-[#6b6b7a] cursor-pointer text-[10px]">
          <Twitter className="w-[10px] h-[10px]" />
          <span>Twitter</span>
        </button>

        {/* Docs - Added after Twitter */}
        <button className="flex items-center gap-[3px] bg-none border-none text-white cursor-pointer text-[10px]">
          <AppWindow className="w-[10px] h-[10px] text-white" />
          <span className="text-white">Docs</span>
        </button>

        {/* Discover */}
        <button className="flex items-center gap-[3px] bg-none border-none text-[#6b6b7a] cursor-pointer text-[10px]">
          <Compass className="w-[10px] h-[10px]" />
          <span>Discover</span>
        </button>

        {/* Pulse - Active */}
        <button className="flex items-center gap-[3px] px-1.5 py-[2px] bg-[#1a1a1f] border-none rounded-[4px] text-white text-[10px] cursor-pointer">
          <Activity className="w-[10px] h-[10px] text-[#22d3ee]" />
          <span>Pulse</span>
        </button>

        {/* PnL */}
        <button className="flex items-center gap-[3px] bg-none border-none text-[#6b6b7a] cursor-pointer text-[10px]">
          <BarChart className="w-[10px] h-[10px]" />
          <span>PnL</span>
        </button>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Bitcoin - Yellow */}
        <div className="flex items-center gap-[3px]">
          <span className="text-[#f7931a] text-[10px] font-semibold">₿</span>
          <span className="text-[#f7931a] text-[10px]">97.4K</span>
        </div>

        {/* Ethereum - Blue/Purple */}
        <div className="flex items-center gap-[3px]">
          <img src="https://axiom.trade/images/eth-fill.svg" alt="ETH" className="w-[10px] h-[10px]" />
          <span className="text-[#8A9FFF] text-[10px]">3.4K</span>
        </div>

        {/* SOL - Green */}
        <div className="flex items-center gap-[3px]">
          <span className="text-[#14f195] text-[10px] font-semibold">◎</span>
          <span className="text-[#14f195] text-[10px]">189</span>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Link + $50.4K */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* New Metrics: Pill, Fuel, Disc */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-[3px]">
            <Pill className="w-[10px] h-[10px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">$50.2K</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <Fuel className="w-[10px] h-[10px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">0.021</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <Disc className="w-[10px] h-[10px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">0.003</span>
          </div>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Connection - Conditionally Rendered */}
        <div
          className={`flex items-center gap-1 px-1.5 py-[2px] rounded-[4px] whitespace-nowrap ${
            loading ? 'bg-[rgba(248,113,113,0.15)]' : 'bg-[rgba(52,211,153,0.15)]'
          }`}
        >
          <span className={`w-[5px] h-[5px] rounded-full ${loading ? 'bg-[#f87171]' : 'bg-[#34d399]'}`} />
          <span className={`text-[10px] ${loading ? 'text-[#f87171]' : 'text-[#34d399]'}`}>
            {loading ? 'Disconnected' : 'Connection is stable'}
          </span>
        </div>

        {/* GLOBAL with dropdown */}
        <div className="flex items-center gap-[2px] text-[#6b6b7a]">
          <span className="font-medium text-[10px]">GLOBAL</span>
          <ChevronDown className="w-2 h-2" />
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Action Icons */}
        <div className="flex items-center gap-1.5">
          <button className="bg-none border-none text-[#6b6b7a] cursor-pointer p-[1px] flex">
            <AppWindow className="w-3 h-3" />
          </button>
          <button className="bg-none border-none text-[#6b6b7a] cursor-pointer p-[1px] flex">
            <Bell className="w-3 h-3" />
          </button>
          <button className="bg-none border-none text-[#6b6b7a] cursor-pointer p-[1px] flex">
            <Paintbrush className="w-3 h-3" />
          </button>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Social Icons */}
        <div className="flex items-center gap-1.5">
          <button className="bg-none border-none text-[#6b6b7a] cursor-pointer p-[1px] flex">
            <MessageCircle className="w-3 h-3" />
          </button>
          <button className="bg-none border-none text-[#6b6b7a] cursor-pointer p-[1px] flex">
            <Twitter className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
