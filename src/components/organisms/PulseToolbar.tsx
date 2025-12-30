'use client';

import { useState } from 'react';
import {
  RiSettings4Line,
  RiStarLine,
  RiLineChartLine,
  RiQuestionLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiVolumeUpLine,
  RiCrosshair2Line,
  RiListUnordered,
  RiEqualizer3Line,
  RiSettings3Line,
  RiKeyboardBoxLine,
  RiBookmark3Line,
  RiListCheck,
} from '@remixicon/react';
import { WalletSolPill, ChainSelector, PresetPill, FilterModal } from '@/components/molecules';
import { Tooltip } from '@/components/atoms';
import { type ActiveTab } from '@/types';
import { PULSE_TABS } from '@/utils/constants';
import { useAppDispatch } from '@/hooks';
import { setActiveModalTab } from '@/store/filterSlice';

interface PulseToolbarProps {
  className?: string;
  activeTab?: ActiveTab;
  onTabChange?: (tab: ActiveTab) => void;
}

export function PulseToolbar({ className, activeTab, onTabChange }: PulseToolbarProps) {
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenFilter = () => {
    const currentTabLabel = PULSE_TABS.find(t => t.id === activeTab)?.label || 'New Pairs';
    dispatch(setActiveModalTab(currentTabLabel));
    setIsFilterModalOpen(true);
  };

  return (
    <div className={`bg-[#06070b] border-b border-[#1a1b23] ${className || ''}`}>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-2.5 px-4 lg:px-9 py-1 border-b border-[#1a1b23] overflow-visible -ml-4">
          <Tooltip content="Settings" position="right">
            <button aria-label="Settings" className="bg-none border-none text-[#636470] hover:text-[#a1a1aa] cursor-pointer flex transition-colors shrink-0">
              <RiSettings3Line className="w-3 h-3" />
            </button>
          </Tooltip>
          <div className="w-[1px] h-3 bg-[#27272a] shrink-0" />
          <Tooltip content="Watchlist" position="right">
            <button aria-label="Watchlist" className="bg-none border-none text-[#636470] hover:text-[#a1a1aa] cursor-pointer flex transition-colors shrink-0">
              <RiStarLine className="w-2.5 h-2.5" />
            </button>
          </Tooltip>
          <Tooltip content="Active Positions" position="right">
            <button aria-label="Active Positions" className="bg-none border-none text-white hover:text-[#a1a1aa] cursor-pointer flex transition-colors shrink-0">
              <RiLineChartLine className="w-3 h-3 ml-1.5" />
            </button>
          </Tooltip>
          <div className="w-[1px] h-3 bg-[#27272a] shrink-0" />
        </div>

        <div className="flex items-center justify-between px-4 lg:px-5 py-2 overflow-visible gap-4 mt-2">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[15px] font-semibold text-white tracking-wide">Pulse</span>
            <ChainSelector variant="desktop" />
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Tooltip content="Help with Pulse Filters, Settings">
              <button aria-label="Help" className="bg-none border-none text-[#52525b] hover:text-[#a1a1aa] cursor-pointer p-1 flex transition-colors">
                <RiQuestionLine className="w-4 h-4" />
              </button>
            </Tooltip>

            <button className="flex items-center gap-1 px-2.5 py-1 bg-[#22242d] border border-[#27272a] hover:border-[#3f3f46] rounded-full text-white text-[10px] font-bold cursor-pointer transition-colors whitespace-nowrap">
              <RiListCheck className="w-3.5 h-3.5 text-white" />
              <span className="mr-1">Display</span>
              <RiArrowDownSLine className="w-3.5 h-3.5 text-white" />
            </button>

            <div className="flex items-center gap-2">
              <Tooltip content="Blacklist dev, handle, keywords">
                <button aria-label="Blacklist Settings" className="w-6 h-6 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded-full transition-colors cursor-pointer">
                  <RiBookmark3Line className="w-3 h-3" />
                </button>
              </Tooltip>
              <Tooltip content="Pulse Hotkeys">
                <button aria-label="Hotkeys" className="w-6 h-6 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded-full transition-colors cursor-pointer">
                  <RiKeyboardBoxLine className="w-3 h-3" />
                </button>
              </Tooltip>
              <Tooltip content="Alerts">
                <button aria-label="Alerts" className="w-6 h-6 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded-full transition-colors cursor-pointer">
                  <RiVolumeUpLine className="w-3 h-3" />
                </button>
              </Tooltip>
              <Tooltip content="Snipe Settings">
                <button aria-label="Snipe Settings" className="relative w-6 h-6 flex items-center justify-center bg-none border-none text-[#bfc0c8] hover:text-white hover:bg-[#1a1b23] rounded-full transition-colors cursor-pointer">
                  <RiCrosshair2Line className="w-3.5 h-3.5" />
                  <RiSettings4Line className="w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5" />
                </button>
              </Tooltip>
            </div>

            <Tooltip content={<>Active<br />Wallets</>} className="px-3 py-0.5">
              <WalletSolPill variant="compact" walletCount={1} solBalance={0} />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col lg:hidden w-full">
        <div className="flex items-center justify-between px-2 py-1 w-full gap-2">
          <ChainSelector variant="mobile" />

          <div className="flex-1 overflow-x-auto scrollbar-hide min-w-0">
            <div className="flex items-center gap-0.5 rounded-full p-0.5 -max">
              {PULSE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={`h-6 px-2 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors flex items-center ${activeTab === tab.id
                    ? 'bg-[#2a2a38] text-white'
                    : 'text-[#6b6b7a] hover:text-[#a1a1aa]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowMobileSettings(!showMobileSettings)}
            aria-label="Toggle Mobile Settings"
            className={`flex items-center gap-1.5 py-0.5 bg-[#16161e] rounded-full border border-[#2a2a38] shrink-0 ${showMobileSettings ? 'px-1.5' : 'pl-2 pr-1.5'
              }`}
          >
            {!showMobileSettings && (
              <span className="text-[11px] text-white font-medium">P1</span>
            )}
            {showMobileSettings ? (
              <RiArrowUpSLine className="w-3.5 h-3.5 text-[#526fff]" />
            ) : (
              <RiSettings4Line className="w-3.5 h-3.5 text-[#526fff]" />
            )}
          </button>
        </div>

        {showMobileSettings && (
          <div className="flex flex-col gap-2 px-2 pb-2 w-full">
            <div className="flex items-center justify-between w-full">
              <button className="flex items-center gap-2 px-2.5 py-0.5 bg-[#22242d] rounded-full border border-[#2a2a38]">
                <RiListUnordered className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] text-white font-bold">Display</span>
                <RiArrowDownSLine className="w-3.5 h-3.5 text-[#6b6b7a] rounded-full" />
              </button>

              <div className="flex items-center gap-3">
                <RiBookmark3Line className="w-4 h-4 text-[#6b6b7a]" />
                <div className="relative">
                  <RiCrosshair2Line className="w-4 h-4 text-[#6b6b7a]" />
                  <RiSettings4Line className="w-[10px] h-[10px] text-[#6b6b7a] absolute -bottom-1 -right-1" />
                </div>
                <RiQuestionLine className="w-4 h-4 text-[#6b6b7a]" />
              </div>

              <button
                onClick={handleOpenFilter}
                className="flex items-center gap-2 px-2.5 py-0.5 bg-[#22242d] rounded-full border border-[#2a2a38]"
              >
                <RiEqualizer3Line className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] text-white font-bold">Filter</span>
                <RiArrowDownSLine className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            <div className="flex items-center justify-between w-full overflow-x-auto scrollbar-hide">
              <WalletSolPill variant="default" walletCount={1} solBalance={0} />
              <PresetPill activePreset="P1" quickBuyAmount={0} />
            </div>
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  );
}
