'use client';

import { 
  Settings, Star, TrendingUp, List, Box, HelpCircle, ChevronDown, 
  Bookmark, Monitor, LayoutGrid, Volume2, Diamond, Grid3X3, Wallet
} from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

interface PulseToolbarProps {
  className?: string;
}

export function PulseToolbar({ className }: PulseToolbarProps) {
  return (
    <div className={className} style={{ backgroundColor: '#06070b', borderBottom: '1px solid #1a1b23' }}>
      {/* Top Row: Mini icons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '2px 8px',
          borderBottom: '1px solid #1a1b23',
        }}
      >
        <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '2px', display: 'flex',marginLeft: '10px' }}>
          <Settings style={{ width: '14px', height: '14px' }} />
        </button>
        <div style={{ width: '1px', height: '12px', backgroundColor: '#38383fff' }} />
        <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '2px', display: 'flex' }}>
          <Star style={{ width: '14px', height: '14px' }} />
        </button>
        <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '2px', display: 'flex' }}>
          <TrendingUp style={{ width: '14px', height: '14px' }} />
        </button>
        <div style={{ width: '1px', height: '12px', backgroundColor: '#38383fff' }} />
      </div>

      {/* Main Toolbar Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
        }}
      >
        {/* Left: Pulse + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#fcfcfc' }}>Pulse</span>
          <button style={{ background: 'none', border: 'none', color: '#52c5ff', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <SolanaLogo width={16} height={16} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <Box style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Help */}
          <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <HelpCircle style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Display Dropdown */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: '#1a1b23',
              border: '1px solid #2a2a35',
              borderRadius: '4px',
              color: '#fcfcfc',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <Grid3X3 style={{ width: '14px', height: '14px' }} />
            <span>Display</span>
            <ChevronDown style={{ width: '12px', height: '12px', color: '#555' }} />
          </button>

          {/* Divider */}
          <div style={{ width: '1px', height: '16px', backgroundColor: '#2a2a35' }} />

          {/* Action Icons */}
          <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <Bookmark style={{ width: '16px', height: '16px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <Monitor style={{ width: '16px', height: '16px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <LayoutGrid style={{ width: '16px', height: '16px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <Volume2 style={{ width: '16px', height: '16px' }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <Diamond style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Divider */}
          <div style={{ width: '1px', height: '16px', backgroundColor: '#2a2a35' }} />

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
          <Wallet style={{ width: '14px', height: '14px', color: '#6b6b7a' }} />
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>1</span>
          
          {/* Custom Solana Gradient Icon */}
          <SolanaLogo width={10} height={8} />

          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>0</span>
          <ChevronDown style={{ width: '14px', height: '14px', color: '#6b6b7a' }} />
        </button>
        </div>
      </div>
    </div>
  );
}
