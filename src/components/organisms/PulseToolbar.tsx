'use client';

import { useState } from 'react';
import { 
  RiSettings4Line, 
  RiStarLine, 
  RiLineChartLine, 
  RiQuestionLine, 
  RiArrowDownSLine, 
  RiArrowUpSLine,
  RiBookmarkLine, 
  RiLayoutGridLine, 
  RiVolumeUpLine, 
  RiGridLine, 
  RiWalletLine,
  RiCrosshair2Line, 
  RiKeyboardLine, 
  RiListUnordered, 
  RiEqualizer3Fill, 
  RiFlashlightFill,
  RiSettings3Line,
  RiKeyboardBoxLine,
  RiBookmark3Line,
  RiListCheck
} from '@remixicon/react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

import { type ActiveTab } from '@/types';

interface PulseToolbarProps {
  className?: string;
  activeTab?: ActiveTab;
  onTabChange?: (tab: ActiveTab) => void;
}

export function PulseToolbar({ className, activeTab, onTabChange }: PulseToolbarProps) {
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'newPairs', label: 'New Pairs' },
    { id: 'finalStretch', label: 'Final Stretch' },
    { id: 'migrated', label: 'Migrated' },
  ];

  return (
    <div className={`bg-[#06070b] border-b border-[#1a1b23] ${className || ''}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Top Row: Mini icons */}
        <div className="flex items-center gap-2.5 px-4 lg:px-9 py-1 border-b border-[#1a1b23] overflow-x-auto scrollbar-hide -ml-4">
          <button className="bg-none border-none text-[#636470] hover:text-[#a1a1aa] cursor-pointer flex transition-colors shrink-0">
            <RiSettings3Line className="w-3 h-3" />
          </button>
          <div className="w-[1px] h-3 bg-[#27272a] shrink-0" />
          <button className="bg-none border-none text-white hover:text-[#fbbf24]/80 cursor-pointer flex transition-colors shrink-0">
            <RiStarLine className="w-2.5 h-2.5" />
          </button>
          <button className="bg-none border-none text-[#636470] hover:text-[#a1a1aa] cursor-pointer flex transition-colors shrink-0">
            <RiLineChartLine className="w-3 h-3 ml-1.5" />
          </button>
          <div className="w-[1px] h-3 bg-[#27272a] shrink-0" />
        </div>
 
        {/* Main Toolbar Row */}
        <div className="flex items-center justify-between px-4 lg:px-7 py-2 overflow-x-auto scrollbar-hide gap-4 mt-2">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[15px] font-semibold text-white tracking-wide">Pulse</span>
            <div className="flex items-center gap-1 p-1">
              <button className="w-6 h-6 flex items-center justify-center bg-[#16181f] rounded-full text-[#22d3ee] cursor-pointer">
                <SolanaLogo width={16} height={16} />
              </button>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-[#27272a] rounded-full cursor-pointer transition-colors">
  <img
    src="https://axiom.trade/images/bnb-fill.svg"
    alt="BNB"
    className="w-3.5 h-3.5 opacity-50"
  />
</button>

            </div>
          </div>
 
          <div className="flex items-center gap-2.5 shrink-0">
            <button className="bg-none border-none text-[#52525b] hover:text-[#a1a1aa] cursor-pointer p-1 flex transition-colors">
              <RiQuestionLine className="w-4 h-4" />
            </button>
 
            <button className="flex items-center gap-1 px-3 py-0.5 bg-[#22242d] border border-[#27272a] hover:border-[#3f3f46] rounded-full text-white text-[10px] font-bold cursor-pointer transition-colors whitespace-nowrap">
              <RiListCheck className="w-3.5 h-3.5 text-white" />
              <span className="mr-1">Display</span>
              <RiArrowDownSLine className="w-3 h-3 text-white" />
            </button>

            <div className="flex items-center gap-1.5">
              {[RiBookmark3Line, RiKeyboardBoxLine, RiVolumeUpLine, RiCrosshair2Line].map((Icon, i) => (
                <button key={i} className="w-6 h-6 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded transition-colors cursor-pointer">
                  <Icon className="w-3 h-3" />
                </button>
              ))}
            </div>
 
            <button className="flex items-center gap-2 px-2 py-1 bg-transparent border border-[#27272a] hover:border-[#3f3f46] rounded-full text-[#bfc0c8] text-[11px] cursor-pointer transition-colors whitespace-nowrap">
              <div className="flex items-center gap-1">
                <RiWalletLine className="w-3.5 h-3.5" />
                <span className="text-white font-semibold">1</span>
              </div>
              <div className="flex items-center gap-1">
                <SolanaLogo width={10} height={8} />
                <span className="text-white font-semibold">0</span>
                <RiArrowDownSLine className="w-3 h-3" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden w-full">
        {/* Row 1: Header */}
        <div className="flex items-center justify-between px-2 py-1 w-full gap-2">
          {/* Left: Chains */}
          <div className="flex items-center gap-0.5 shrink-0">
            <div className="w-6 h-6 rounded-full bg-[#16161e] flex items-center justify-center border border-[#2a2a38]">
              <SolanaLogo width={15} height={15} />
            </div>
            <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
              <img src="https://axiom.trade/images/bnb-fill.svg" alt="BNB" className="w-3.5 h-3.5 opacity-50" />
            </div>
          </div>

          {/* Center: Tabs */}
          <div className="flex-1 overflow-x-auto scrollbar-hide min-w-0">
            <div className="flex items-center gap-0.5 rounded-full p-0.5 border border-[#1a1b23]/50 w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`h-6 px-2 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors flex items-center ${
                    activeTab === tab.id 
                      ? 'bg-[#2a2a38] text-white' 
                      : 'text-[#6b6b7a] hover:text-[#a1a1aa]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Settings Toggle */}
          <button 
            onClick={() => setShowMobileSettings(!showMobileSettings)} 
            className="flex items-center gap-1.5 pl-3 pr-2 py-0.5 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0"
          >
            <span className="text-[12px] text-white font-medium">P1</span>
            {showMobileSettings ? (
              <RiArrowUpSLine className="w-3.5 h-3.5 text-[#526fff]" />
            ) : (
              <RiSettings4Line className="w-3.5 h-3.5 text-[#526fff]" />
            )}
          </button>
        </div>

        {/* Row 2: Settings (Collapsible) */}
        {showMobileSettings && (
          <div className="flex flex-col gap-2 px-2 pb-2 w-full">
            {/* Display & Icons & Filter */}
            <div className="flex items-center justify-between w-full">
              {/* Display Button */}
              <button className="flex items-center gap-2 px-2.5 py-0.5 bg-[#16161e] rounded-full border border-[#2a2a38]">
                <RiListUnordered className="w-3.5 h-3.5 text-white" />
                <span className="text-[12px] text-white font-bold">Display</span>
                <RiArrowDownSLine className="w-3.5 h-3.5 text-[#6b6b7a]" />
              </button>
              
              {/* Center Icons */}
              <div className="flex items-center gap-2">
                 <RiBookmarkLine className="w-4 h-4 text-[#6b6b7a]" />
                 <div className="relative">
                    <RiCrosshair2Line className="w-4 h-4 text-[#6b6b7a]" />
                    <RiSettings4Line className="w-[10px] h-[10px] text-[#6b6b7a] absolute -bottom-1 -right-1" />
                 </div>
                 <RiQuestionLine className="w-4 h-4 text-[#6b6b7a]" />
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-2.5 py-0.5 bg-[#16161e] rounded-full border border-[#2a2a38]">
                 <RiEqualizer3Fill className="w-3.5 h-3.5 text-white" />
                 <span className="text-[12px] text-white font-bold">Filter</span>
                 <RiArrowDownSLine className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Wallet & Presets */}
            <div className="flex items-center justify-between w-full overflow-x-auto scrollbar-hide">
              {/* Wallet Pill */}
              <button className="flex items-center gap-2 px-2.5 py-0.5 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0">
                <RiWalletLine className="w-3.5 h-3.5 text-[#d4d4d8]" />
                <span className="text-white text-[12px] font-medium">1</span>
                <SolanaLogo width={9} height={9} />
                <span className="text-white text-[12px] font-medium">0</span>
                <RiArrowDownSLine className="w-3.5 h-3.5 text-[#6b6b7a]" />
              </button>
              
              
              <div className="flex items-center bg-[#16161e] rounded-full border border-[#2a2a38] p-[3px] shrink-0">
                <div className="flex items-center gap-1.5 px-2 border-r border-[#2a2a38]">
                   <RiFlashlightFill className="w-3 h-3 text-[#d4d4d8]" />
                   <span className="text-white text-[12px] font-medium">0</span>
                </div>
                <div className="flex items-center gap-2 px-2">
                   <SolanaLogo width={9} height={9} />
                   <span className="text-[#526fff] text-[12px] font-bold">P1</span>
                   <span className="text-[#6b6b7a] text-[12px] font-medium">P2</span>
                   <span className="text-[#6b6b7a] text-[12px] font-medium">P3</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
