'use client';

import { 
  Settings, Star, TrendingUp, Box, HelpCircle, ChevronDown, 
  Bookmark, Monitor, LayoutGrid, Volume2, Diamond, Grid3X3, Wallet,
  CrosshairIcon,
  Keyboard
} from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface PulseToolbarProps {
  className?: string;
}

export function PulseToolbar({ className }: PulseToolbarProps) {
  return (
    <div className={`bg-[#06070b] border-b border-[#1a1b23] ${className || ''}`}>
      {/* Top Row: Mini icons */}
      <div className="flex items-center gap-3 px-9 py-1 border-b border-[#1a1a1f]">
        <button className="bg-none border-none text-[#52525b] hover:text-[#a1a1aa] cursor-pointer flex transition-colors">
          <Settings className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-3 bg-[#27272a]" />
        <button className="bg-none border-none text-white hover:text-[#fbbf24]/80 cursor-pointer flex transition-colors">
          <Star className="w-3.5 h-3.5" />
        </button>
        <button className="bg-none border-none text-[#52525b] hover:text-[#a1a1aa] cursor-pointer flex transition-colors">
          <TrendingUp className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-3 bg-[#27272a]" />
      </div>

      {/* Main Toolbar Row */}
      <div className="flex items-center justify-between px-7 py-3">
        {/* Left: Pulse + Icons */}
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-bold text-white tracking-wide">Pulse</span>
          <div className="flex items-center gap-1  p-1">
            <button className="w-6 h-6 flex items-center justify-center bg-[#27272a] rounded text-[#22d3ee] cursor-pointer">
              <SolanaLogo width={14} height={14} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-[#27272a] rounded text-[#fbbf24] cursor-pointer transition-colors">
              <img src="https://axiom.trade/images/bnb-fill.svg" alt="BNB" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Help */}
          <button className="bg-none border-none text-[#52525b] hover:text-[#a1a1aa] cursor-pointer p-1 flex transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Display Dropdown */}
          <button className="flex items-center gap-2 px-2.5 py-0.5 bg-[#22242d] border border-[#27272a] hover:border-[#3f3f46] rounded-full text-white text-[12px] font-bold cursor-pointer transition-colors">
            <Grid3X3 className="w-3.5 h-3.5 text-[#a1a1aa]" />
            <span>Display</span>
            <ChevronDown className="w-3 h-3 text-[#52525b]" />
          </button>

          {/* Divider */}
          <div className="w-[1px] h-5 bg-[#27272a]" />

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center bg-none border-none text-[] hover:text-white hover:bg-[#1a1b23] rounded transition-colors cursor-pointer">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded transition-colors cursor-pointer">
              <Keyboard className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded transition-colors cursor-pointer">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded transition-colors cursor-pointer">
              <Volume2 className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded transition-colors cursor-pointer">
              <CrosshairIcon   className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-5 bg-[#27272a]" />

          {/* Wallet + Sol Status */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#27272a] hover:border-[#3f3f46] rounded-full text-[#bfc0c8] text-[11px] cursor-pointer transition-colors">
            <div className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              <span className="text-white font-semibold">1</span>
            </div>
            <div className="w-[1px] h-3 bg-[#27272a]" />
            <div className="flex items-center gap-1.5">
              <SolanaLogo width={10} height={8} />
              <span className="text-white font-semibold">0</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

