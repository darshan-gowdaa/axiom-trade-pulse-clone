'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, Bell, Star, Settings, Wallet } from 'lucide-react';
import { SolanaLogo } from '@/components/atoms/SolanaLogo';

const NAV_LINKS = [
  { href: '/discover', label: 'Discover', active: false },
  { href: '/pulse', label: 'Pulse', active: true },
  { href: '/trackers', label: 'Trackers', active: false },
  { href: '/perpetuals', label: 'Perpetuals', active: false },
  { href: '/yield', label: 'Yield', active: false },
  { href: '/vision', label: 'Vision', active: false },
  { href: '/pump', label: 'Pr', active: false },
];

export function Header() {
  const [chain] = useState<'SOL' | 'BNB'>('SOL');

  return (
    <header
      style={{
        height: '53px',
        backgroundColor: '#0c0c10',
        borderBottom: '1px solid #1a1b23',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            textDecoration: 'none',
            marginRight: '8px',
          }}
        >
          <Image
            src="/favicon.ico"
            alt="Axiom"
            width={36}
            height={36}
            style={{ width: '36px', height: '36px' }}
          />
          <span
            style={{
              color: 'white',
              fontWeight: 500,
              fontSize: '17px',
            }}
          >
            AXIOM
          </span>
          <span
            style={{
              backgroundColor: 'transparent',
              color: '#fcfcfc',
              fontSize: '11px',
              fontWeight: 300,
              padding: '0',
              alignSelf: 'flex-end',
              marginBottom: '8px',
            }}
          >
            Pro
          </span>
        </Link>

        {/* nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color: link.active ? '#526fff' : '#e4e4e7',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '320px',
          margin: '0 24px',
        }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: '#d4d4d8',
            }}
          />
          <input
            type="text"
            placeholder="Search by token or CA..."
            style={{
              width: '100%',
              height: '28px',
              paddingLeft: '32px',
              paddingRight: '32px',
              backgroundColor: '#16161e',
              border: '1px solid #2a2a38',
              borderRadius: '16px',
              fontSize: '12px',
              color: 'white',
              outline: 'none',
            }}
          />
          <kbd
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '10px',
              color: '#d4d4d8',
              backgroundColor: '#1c1c26',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #2a2a38',
              fontFamily: 'monospace',
            }}
          >
            /
          </kbd>
        </div>
      </div>

      {/* right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            height: '28px',
            padding: '0 10px',
            backgroundColor: '#16161e',
            border: '1px solid #2a2a38',
            borderRadius: '16px',
            fontSize: '12px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <SolanaLogo width={10} height={8} />
          <span style={{ fontWeight: 500 }}>{chain}</span>
          <ChevronDown style={{ width: '12px', height: '12px', color: '#d4d4d8' }} />
        </button>

        <button
          style={{
            height: '28px',
            padding: '0 14px',
            backgroundColor: '#526fff',
            border: 'none',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 750,
            color: '#000000',
            cursor: 'pointer',
          }}
        >
          Deposit
        </button>

        <button
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1b23',
            borderRadius: '50%',
            border: 'none',
            color: '#fcfcfc',
            cursor: 'pointer',
          }}
        >
          <Star style={{ width: '16px', height: '16px' }} strokeWidth={1.5} />
        </button>

        <button
          style={{
            position: 'relative',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1b23',
            borderRadius: '50%',
            border: 'none',
            color: '#fcfcfc',
            cursor: 'pointer',
          }}
        >
          <Bell style={{ width: '16px', height: '16px' }} strokeWidth={1.5} />
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '6px',
              height: '6px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
            }}
          />
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '28px',
            padding: '0 10px',
            backgroundColor: '#16161e',
            border: '1px solid #2a2a38',
            borderRadius: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet style={{ width: '12px', height: '12px', color: '#d4d4d8' }} />
            <SolanaLogo width={10} height={8} />
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>0</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#fbbf24', fontSize: '10px' }}>◆</span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 500 }}>0</span>
            <ChevronDown style={{ width: '10px', height: '10px', color: '#d4d4d8' }} />
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '28px',
            height: '28px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f472b6, #a78bfa, #22d3ee)',
              padding: '2px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#0c0c10',
              }}
            />
          </div>
          <button
            style={{
              position: 'absolute',
              inset: '2px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'white' }}>67</span>
          </button>
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '10px',
              height: '10px',
              backgroundColor: '#14f195',
              borderRadius: '50%',
              border: '2px solid #0c0c10',
            }}
          />
        </div>

        <button
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1b23',
            borderRadius: '50%',
            border: 'none',
            color: '#fcfcfc',
            cursor: 'pointer',
          }}
        >
          <Settings style={{ width: '16px', height: '16px' }} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
