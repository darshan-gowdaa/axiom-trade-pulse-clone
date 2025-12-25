'use client';

import { 
  TrendingUp, TrendingDown, Twitter, Wallet, ChevronDown, Compass, Activity, 
  DollarSign, Disc, AppWindow, Bell, Paintbrush, MessageCircle, Settings, 
  Link, Fuel 
} from 'lucide-react';

interface BottomStatusBarProps {
  className?: string;
}

export function BottomStatusBar({ className }: BottomStatusBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
        padding: '0 16px',
        backgroundColor: '#06070b',
        borderTop: '1px solid #1a1b23',
        fontSize: '11px',
        flexShrink: 0,
      }}
      className={className}
    >
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Preset Button - Light purple bg, purple text */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            backgroundColor: 'rgba(82, 111, 255, 0.15)',
            border: 'none',
            borderRadius: '4px',
            color: '#526fff',
            fontSize: '10px',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <Disc style={{ width: '10px', height: '10px' }} />
          <span>PRESET 1</span>
          <ChevronDown style={{ width: '8px', height: '8px' }} />
        </button>

        {/* Wallet + Hamburger + 0 + Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b6b7a' }}>
          <Wallet style={{ width: '10px', height: '10px' }} />
          <span style={{ color: '#526fff', fontSize: '10px' }}>1</span>
          <span style={{ fontSize: '9px' }}>≡</span>
          <span style={{ fontSize: '10px' }}>0</span>
          <Settings style={{ width: '10px', height: '10px' }} />
        </div>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Wallet dropdown */}
        <button style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', fontSize: '10px' }}>
          <Wallet style={{ width: '10px', height: '10px' }} />
          <span>Wallet</span>
          <ChevronDown style={{ width: '8px', height: '8px' }} />
        </button>

        {/* Twitter */}
        <button style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', fontSize: '10px' }}>
          <Twitter style={{ width: '10px', height: '10px' }} />
          <span>Twitter</span>
        </button>

        {/* Discover */}
        <button style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', fontSize: '10px' }}>
          <Compass style={{ width: '10px', height: '10px' }} />
          <span>Discover</span>
        </button>

        {/* Pulse - Active */}
        <button style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '2px 6px', backgroundColor: '#1a1a1f', border: 'none', borderRadius: '4px', color: 'white', fontSize: '10px', cursor: 'pointer' }}>
          <Activity style={{ width: '10px', height: '10px', color: '#22d3ee' }} />
          <span>Pulse</span>
        </button>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* PnL */}
        <button style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', fontSize: '10px' }}>
          <DollarSign style={{ width: '10px', height: '10px' }} />
          <span>PnL</span>
        </button>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Bitcoin - Yellow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ color: '#f7931a', fontSize: '10px', fontWeight: 600 }}>₿</span>
          <span style={{ color: '#f7931a', fontSize: '10px' }}>97.4K</span>
        </div>

        {/* Ethereum - Blue/Purple */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ color: '#627eea', fontSize: '10px', fontWeight: 600 }}>Ξ</span>
          <span style={{ color: '#627eea', fontSize: '10px' }}>3.4K</span>
        </div>

        {/* SOL - Green */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ color: '#14f195', fontSize: '10px', fontWeight: 600 }}>◎</span>
          <span style={{ color: '#14f195', fontSize: '10px' }}>189</span>
        </div>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Link + $50.4K */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#6b6b7a' }}>
          <Link style={{ width: '10px', height: '10px' }} />
          <span style={{ fontSize: '10px' }}>$50.4K</span>
        </div>

        {/* Gas/Fuel icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#6b6b7a' }}>
          <Fuel style={{ width: '10px', height: '10px' }} />
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Buy/Sell Pressure */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <TrendingUp style={{ width: '10px', height: '10px', color: '#34d399' }} />
          <span style={{ color: '#34d399', fontSize: '10px' }}>$877K</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <TrendingDown style={{ width: '10px', height: '10px', color: '#f87171' }} />
          <span style={{ color: '#f87171', fontSize: '10px' }}>$294</span>
        </div>

        {/* SOL Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#34d399' }} />
          <span style={{ color: '#34d399', fontSize: '10px' }}>$122.41</span>
        </div>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Connection - Green bg, green text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            backgroundColor: 'rgba(52, 211, 153, 0.15)',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#34d399' }} />
          <span style={{ color: '#34d399', fontSize: '10px' }}>Connection is stable</span>
        </div>

        {/* GLOBAL with dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#6b6b7a' }}>
          <span style={{ fontWeight: 500, fontSize: '10px' }}>GLOBAL</span>
          <ChevronDown style={{ width: '8px', height: '8px' }} />
        </div>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button style={{ background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', padding: '1px', display: 'flex' }}>
            <AppWindow style={{ width: '12px', height: '12px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', padding: '1px', display: 'flex' }}>
            <Bell style={{ width: '12px', height: '12px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', padding: '1px', display: 'flex' }}>
            <Paintbrush style={{ width: '12px', height: '12px' }} />
          </button>
        </div>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button style={{ background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', padding: '1px', display: 'flex' }}>
            <MessageCircle style={{ width: '12px', height: '12px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', padding: '1px', display: 'flex' }}>
            <Twitter style={{ width: '12px', height: '12px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
