'use client';

import {
  RiWalletLine,
  RiArrowDownSLine,
  RiCompass3Line,
  RiPulseLine,
  RiDiscLine,
  RiWindowLine,
  RiNotification3Line,
  RiBrushLine,
  RiChat1Line,
  RiSettings4Line,
  RiGasStationLine,
  RiCapsuleLine,
  RiBarChartLine,
  RiTwitterXLine,
  RiListSettingsLine,
  RiBtcLine,
  RiBtcFill,
  RiPaletteLine,
  RiDiscordLine,
  RiDiscordFill,
  RiCoinLine,
} from '@remixicon/react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface BottomStatusBarProps {
  className?: string;
  loading?: boolean;
}

/** Small red dot shown on top-right of a child */
const NotificationDot = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-flex">
    {children}
    <span className="absolute -top-0.5 right-0 w-[4px] h-[4px] rounded-full bg-[#ec397a]" />
  </div>
);

/** Generic small text button with icon (keeps Tailwind DRY) */
const NavButton = ({
  icon,
  label,
  className = '',
  withDot = false,
}: {
  icon: React.ReactNode;
  label?: string;
  className?: string;
  withDot?: boolean;
}) => {
  const content = (
    <button
      className={`flex items-center gap-[3px] bg-none border-none text-[#6b6b7a] cursor-pointer text-[10px] ${className}`}
    >
      {icon}
      {label && <span className="text-[#fcfcfcfc]">{label}</span>}
    </button>
  );

  return withDot ? <NotificationDot>{content}</NotificationDot> : content;
};

export function BottomStatusBar({ className, loading }: BottomStatusBarProps) {
  return (
    <div
      className={`flex items-center justify-between h-6.5 px-7 bg-[#06070b] border-t border-[#1a1b23] text-[11px] shrink-0 ${
        className || ''
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Preset Button */}
        <button className="flex items-center gap-1 px-2 py-[3px] bg-[rgba(82,111,255,0.15)] border-none rounded-[4px] text-[#526fff] text-[10px] font-medium cursor-pointer whitespace-nowrap">
          <RiListSettingsLine className="w-[10px] h-[10px]" />
          <span>PRESET 1</span>
        </button>

        {/* Wallet + Sol Status (kept as-is, but wrapped with notification dot) */}
        
          <button className="flex items-center gap-[5px] px-[5px] py-[2px] bg-transparent border border-[#1a1b23] rounded-xl text-[#6b6b7a] text-[10px] cursor-pointer">
            <RiWalletLine className="w-[10px] h-[10px] text-[#6b6b7a]" />
            <span className="text-[#e2e8f0] font-semibold">1</span>
            <SolanaLogo width={10} height={8} />
            <span className="text-[#e2e8f0] font-semibold">0</span>
            <RiArrowDownSLine className="w-[10px] h-[10px] text-[#fcfcfcfc]" />
          </button>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Settings */}
        <button className="bg-none border-none p-0 cursor-pointer text-[#6b6b7a] flex">
          <RiSettings4Line className="w-[11px] h-[11px]" />
        </button>

        {/* Wallet nav (with notification dot) */}
        <NavButton
          icon={<RiWalletLine className="w-[11px] h-[11px]" />}
          label="Wallet"
          withDot
        />

        {/* Twitter (with notification dot) */}
        <NavButton
          icon={<RiTwitterXLine className="w-[11px] h-[11px]" />}
          label="Twitter"
          withDot
        />

        {/* Discover (with notification dot) */}
        <NavButton
          icon={<RiCompass3Line className="w-[11px] h-[11px]" />}
          label="Discover"
          withDot
        />

        {/* Pulse - active (with notification dot) */}
        <NotificationDot>
          <button className="flex items-center gap-[3px] px-1.5 py-[2px] bg-[#1a1a1f] border-none rounded-[4px] text-white text-[10px] cursor-pointer">
            <RiPulseLine className="w-[11px] h-[11px] text-[#22d3ee]" />
            <span className="text-[#fcfcfcfc]">Pulse</span>
          </button>
        </NotificationDot>

        {/* PnL */}
        <NavButton
          icon={<RiBarChartLine className="w-[11px] h-[11px]" />}
          label="PnL"
        />

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Bitcoin */}
        <div className="flex items-center gap-[3px]">
          <RiBtcFill className="w-[11px] h-[11px] text-[#f7931a]" />
          <span className="text-[#f7931a] text-[10px]">690.67K</span>
        </div>

        {/* Ethereum */}
        <div className="flex items-center gap-[3px]">
          <img
            src="https://axiom.trade/images/eth-fill.svg"
            alt="ETH"
            className="w-[11px] h-[11px]"
          />
          <span className="text-[#497493] text-[10px]">401.67K</span>
        </div>

        {/* SOL */}
        <div className="flex items-center gap-[3px]">
          <SolanaLogo width={11} height={11} />
          <span className="text-[#14f195] text-[10px]">$189.96</span>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* (placeholder for Link + $50.4K – left as comment in original) */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* New Metrics: Pill, Fuel, Disc */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-[3px]">
            <RiCapsuleLine className="w-[12px] h-[12px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">$50.2K</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <RiGasStationLine className="w-[12px] h-[12px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">0.021</span>
          </div>
          <div className="flex items-center gap-[3px]">
            <RiCoinLine className="w-[12px] h-[12px] text-[#6b6b7a]" />
            <span className="text-[#6b6b7a] text-[10px]">0.003</span>
          </div>
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Connection */}
        <div
          className={`flex items-center gap-1 px-1.5 py-[2px] rounded-[4px] whitespace-nowrap ${
            loading
              ? 'bg-[rgba(248,113,113,0.15)]'
              : 'bg-[rgba(52,211,153,0.15)]'
          }`}
        >
          <span
            className={`w-[5px] h-[5px] rounded-full ${
              loading ? 'bg-[#f87171]' : 'bg-[#34d399]'
            }`}
          />
          <span
            className={`text-[10px] ${
              loading ? 'text-[#f87171]' : 'text-[#34d399]'
            }`}
          >
            {loading ? 'Disconnected' : 'Connection is stable'}
          </span>
        </div>

        {/* GLOBAL */}
        <div className="flex items-center gap-[2px] text-white">
          <span className="font-medium text-[9.8px]">GLOBAL</span>
          <RiArrowDownSLine className="w-2 h-2" />
        </div>

        <div className="w-[1px] h-3 bg-[#1a1a1f]" />

        {/* Action Icons */}
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

        {/* Social Icons */}
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
