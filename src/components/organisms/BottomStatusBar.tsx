'use client';

import { 
   Twitter, Wallet, ChevronDown, Compass, Activity, 
  DollarSign, Disc, AppWindow, Bell, Paintbrush, MessageCircle, Settings, Fuel, Pill, 
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
        </button>

{/* Wallet + Sol Status */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 5px',
            backgroundColor: 'transparent', 
            border: '1px solid #1a1b23',
            borderRadius: '12px',
            color: '#6b6b7a',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          <Wallet style={{ width: '10px', height: '10px', color: '#6b6b7a' }} />
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>1</span>
          
          {/* Custom Solana Gradient Icon */}
          <SolanaLogo width={10} height={8} />

          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>0</span>
          <ChevronDown style={{ width: '10px', height: '10px', color: '#6b6b7a' }} />
        </button>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />
        
        {/* Settings */}
        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#6b6b7a', display: 'flex' }}>
          <Settings style={{ width: '10px', height: '10px' }} />
        </button>

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

        {/* PnL */}
        <button style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'none', border: 'none', color: '#6b6b7a', cursor: 'pointer', fontSize: '10px' }}>
          <BarChart style={{ width: '10px', height: '10px' }} />
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

      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* New Metrics: Pill, Fuel, Disc */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Pill style={{ width: '10px', height: '10px', color: '#6b6b7a' }} />
            <span style={{ color: '#6b6b7a', fontSize: '10px' }}>$50.2K</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Fuel style={{ width: '10px', height: '10px', color: '#6b6b7a' }} />
            <span style={{ color: '#6b6b7a', fontSize: '10px' }}>0.021</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Disc style={{ width: '10px', height: '10px', color: '#6b6b7a' }} />
            <span style={{ color: '#6b6b7a', fontSize: '10px' }}>0.003</span>
          </div>
        </div>

        <div style={{ width: '1px', height: '12px', backgroundColor: '#1a1a1f' }} />

        {/* Connection - Conditionally Rendered */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 6px',
            backgroundColor: loading ? 'rgba(248, 113, 113, 0.15)' : 'rgba(52, 211, 153, 0.15)',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: loading ? '#f87171' : '#34d399' }} />
          <span style={{ color: loading ? '#f87171' : '#34d399', fontSize: '10px' }}>
            {loading ? 'Disconnected' : 'Connection is stable'}
          </span>
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
