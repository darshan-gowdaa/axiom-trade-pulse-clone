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
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from '@remixicon/react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ChainLogo, Tooltip } from '@/components/atoms';
import { NavButton, OptimizedImage } from '@/components/atoms';
import { WalletSolPill, MultiChainBadge } from '@/components/molecules';
import { cn } from '@/lib/utils';

interface BottomStatusBarProps {
  className?: string;
  loading?: boolean;
}

// Constants
const SCROLL_AMOUNT = 150;
const SCROLL_UPDATE_DELAY = 300;

const HOVER_CLASSES = {
  common: "hover:bg-[#1a1a1f] px-1 py-[2px] rounded-md transition-all duration-200 cursor-pointer",
  settings: "text-[#6b6b7a] hover:text-[#fcfcfcfc]",
  endIcon: "bg-none border-none text-[#6b6b7a] hover:text-[#fcfcfcfc] cursor-pointer p-[2px] flex hover:bg-[#1a1a1f] rounded-md transition-all duration-200",
};

const PRICE_DATA = [
  { icon: RiBtcFill, label: 'BTC', color: 'text-[#f7931a]', price: '69.67K', tooltip: 'Price of BTC in USD' },
  { icon: null, label: 'ETH', color: 'text-[#497493]', price: '4167', tooltip: 'Price of ETH in USD', imageSrc: 'https://axiom.trade/images/eth-fill.svg' },
];

const FEE_DATA = [
  { icon: RiCapsuleLine, label: 'Migration', price: '$50.2K', tooltip: 'Estimated Migration Price' },
  { icon: RiGasStationLine, label: 'Gas', price: '0.062₂1', tooltip: 'Recommended priority fee' },
  { icon: RiCoinLine, label: 'Bribe', price: '0.00₂38', tooltip: 'Recommend bribe fee' },
];

const NAV_SETTINGS = [
  { icon: RiWalletLine, label: 'Wallet', tooltip: 'Wallet Settings', withDot: true },
  { icon: RiTwitterXLine, label: 'Twitter', tooltip: 'Twitter Settings', withDot: true },
  { icon: RiCompass3Line, label: 'Discover', tooltip: 'Discover Settings', withDot: true },
];

const END_ICONS = [
  { icon: RiWindowLine, tooltip: 'Hide Watchlist Ticker' },
  { icon: RiNotification3Line, tooltip: 'Notification Settings' },
  { icon: RiPaletteLine, tooltip: 'Customize Theme' },
];

const SOCIAL_ICONS = [
  { icon: RiDiscordFill, tooltip: 'Join our Discord' },
  { icon: RiTwitterXLine, tooltip: 'follow us on X' },
];

export function BottomStatusBar({ className, loading }: BottomStatusBarProps) {
  const activeChain = useSelector((state: RootState) => state.ui.activeChain);
  const chainName = activeChain === 'bnb' ? 'BNB' : 'SOL';

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollNav = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: 'smooth'
      });
      setTimeout(updateScrollState, SCROLL_UPDATE_DELAY);
    }
  }, [updateScrollState]);

  const settingsHoverClasses = cn(HOVER_CLASSES.common, HOVER_CLASSES.settings, "text-[8px]");

  const renderPriceItem = (item: typeof PRICE_DATA[0]) => (
    <Tooltip content={item.tooltip} key={item.label}>
      <div className={cn("flex items-center gap-[3px] -mr-2 whitespace-nowrap", HOVER_CLASSES.common)}>
        {item.icon ? (
          <item.icon className={`w-[11px] h-[11px] ${item.color}`} />
        ) : item.imageSrc ? (
          <OptimizedImage src={item.imageSrc} alt={item.label} width={11} height={11} />
        ) : null}
        <span className={`${item.color} text-[9px]`}>{item.price}</span>
      </div>
    </Tooltip>
  );

  const renderFeeItem = (item: typeof FEE_DATA[0]) => (
    <Tooltip content={item.tooltip} key={item.label}>
      <div className={cn("flex items-center gap-[3px] whitespace-nowrap", HOVER_CLASSES.common)}>
        <item.icon className="w-[12px] h-[12px] text-[#6b6b7a]" />
        <span className="text-[#6b6b7a] text-[9px]">{item.price}</span>
      </div>
    </Tooltip>
  );

  const renderIconButton = (item: { icon: any; tooltip: string }, key?: string) => (
    <Tooltip content={item.tooltip} key={key}>
      <button className={HOVER_CLASSES.endIcon}>
        <item.icon className="w-3 h-3 text-[#fcfcfc]" />
      </button>
    </Tooltip>
  );

  const renderScrollButton = (direction: 'left' | 'right', canScroll: boolean) => {
    const Icon = direction === 'left' ? RiArrowLeftSLine : RiArrowRightSLine;
    const position = direction === 'left' ? 'left-0 justify-start' : 'right-0 justify-end';
    const gradient = direction === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l';
    const padding = direction === 'left' ? 'pl-1' : 'pr-1';

    return (
      <div className={`absolute ${position} top-0 bottom-0 w-[30px] flex items-center z-20 transition-opacity duration-200 ${canScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 ${gradient} from-[#06070b] via-[#06070b] to-transparent pointer-events-none`} />
        <button
          onClick={() => scrollNav(direction)}
          className={`relative z-10 flex items-center justify-center cursor-pointer transition-opacity duration-200 ${padding} ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Icon className="w-4 h-4 text-[#6b6b7a] hover:text-white transition-colors" />
        </button>
      </div>
    );
  };

  return (
    <div
      className={cn("relative flex items-center h-6 bg-[#06070b] border-t border-[#1a1b23] text-[10px] shrink-0 group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-between w-full px-4 lg:px-7 overflow-x-auto overflow-y-visible scrollbar-hide"
        onScroll={updateScrollState}
      >
        <div className="flex items-center gap-2 lg:gap-2 shrink-0">
          <Tooltip content="1 - Trading Settings">
            <button className="flex items-center gap-1 px-1 py-[2px] bg-[rgba(82,111,255,0.15)] border-none rounded-[4px] text-[#526fff] text-[9px] font-medium cursor-pointer whitespace-nowrap hover:bg-[#1a1a1f] hover:rounded-md transition-all">
              <RiListSettingsLine className="w-[10px] h-[10px]" />
              <span className="font-semibold uppercase">Preset 1</span>
            </button>
          </Tooltip>

          <Tooltip content="Active wallets">
            <div className="flex items-center -mr-2">
              <WalletSolPill variant="statusBar" className="hover:bg-[#1a1a1f] hover:border-[#2a2a38] transition-all" walletCount={1} solBalance={0} />
            </div>
          </Tooltip>

          <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0" />

          <Tooltip content="Tracker settings">
            <button className="bg-none border-none p-[2px] cursor-pointer text-[#6b6b7a] hover:text-[#fcfcfcfc] flex hover:bg-[#1a1a1f] rounded-md transition-all">
              <RiSettings3Line className="w-[12px] h-[12px] -mr-2" />
            </button>
          </Tooltip>

          {NAV_SETTINGS.map(item => (
            <Tooltip content={item.tooltip} key={item.label}>
              <NavButton icon={<item.icon className="w-[11px] h-[11px]" />} label={item.label} withDot={item.withDot} className={settingsHoverClasses} />
            </Tooltip>
          ))}

          <Tooltip content="Pulse Settings">
            <button className="flex items-center gap-[3px] px-1 py-[2px] bg-[#1a1a1f] border-none rounded-[4px] text-[#6b6b7a] hover:text-[#fcfcfcfc] text-[9px] cursor-pointer hover:bg-[#25262e] transition-all">
              <RiPulseLine className="w-[11px] h-[11px] text-[#6b6b7a]" />
              <span className="text-[#fcfcfc]">Pulse</span>
            </button>
          </Tooltip>
          <Tooltip content="PnL Settings">
            <NavButton icon={<RiBarChartLine className="w-[11px] h-[11px]" />} label="PnL" className={cn(settingsHoverClasses, "text-[8px]")} />
          </Tooltip>



          <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0 -mr-1" />

          <div className="flex items-center gap-1 xl:gap-2">
            <MultiChainBadge />
            <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0 -mr-2" />

            {PRICE_DATA.map(renderPriceItem)}

            <Tooltip content={`Price of ${chainName} in USD`}>
              <div className={cn("flex items-center gap-[3px] -mr-2 whitespace-nowrap", HOVER_CLASSES.common)}>
                <ChainLogo width={11} height={11} />
                <span className="text-[#14f195] text-[9px]">$181.6</span>
              </div>
            </Tooltip>
          </div>

          <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0" />
        </div>

        <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
          <div className="flex items-center gap-1">
            {FEE_DATA.map(renderFeeItem)}
          </div>

          <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0" />

          <div className={`flex items-center justify-center w-[105px] gap-1 px-1.5 py-[2px] rounded-[4px] whitespace-nowrap shrink-0 ${loading ? 'bg-[rgba(248,113,113,0.15)]' : 'bg-[rgba(52,211,153,0.15)]'}`}>
            <span className={`w-[5px] h-[5px] rounded-full shrink-0 ${loading ? 'bg-[#f87171]' : 'bg-[#34d399]'}`} />
            <span className={`text-[9px] ${loading ? 'text-[#f87171]' : 'text-[#34d399]'}`}>
              {loading ? 'Disconnected' : 'Connection is stable'}
            </span>
          </div>

          <div className="flex items-center gap-[2px] text-white shrink-0">
            <span className="font-medium text-[9px]">GLOBAL</span>
            <RiArrowDownSLine className="w-3 h-3 shrink-0" />
          </div>

          <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0" />

          <div className="flex items-center gap-3 shrink-0">
            {END_ICONS.map((item, idx) => renderIconButton(item, `end-${idx}`))}
          </div>

          <div className="w-[1px] h-3 bg-[#1a1a1f] shrink-0" />

          <div className="flex items-center gap-1.5 shrink-0">
            {SOCIAL_ICONS.map((item, idx) => renderIconButton(item, `social-${idx}`))}

            <button className="flex items-center gap-[2px] bg-none border-none text-[#6b6b7a] hover:text-[#fcfcfcfc] cursor-pointer text-[9px] hover:bg-[#1a1a1f] px-1 py-[1.5px] rounded-md transition-all shrink-0">
              <RiWindowLine className="w-[10px] h-[10px] ml-1" />
              <span>Docs</span>
            </button>

          </div>
        </div>
      </div>

      {renderScrollButton('left', canScrollLeft)}
      {renderScrollButton('right', canScrollRight)}
    </div>
  );
}
