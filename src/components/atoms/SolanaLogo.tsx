import React from 'react';

export const SolanaLogo = ({ className, width = 10, height = 8 }: { className?: string, width?: number | string, height?: number | string }) => (
  <svg width={width} height={height} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.30724 2.27586H13.6738" stroke="url(#paint0_linear_solana_logo)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M0.75 5.56034H12.1166" stroke="url(#paint1_linear_solana_logo)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.30737 8.84483H13.674" stroke="url(#paint2_linear_solana_logo)" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="paint0_linear_solana_logo" x1="2.30724" y1="2.27586" x2="14.3929" y2="2.27586" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3"/>
        <stop offset="1" stopColor="#DC1FFF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_solana_logo" x1="0.75" y1="5.56034" x2="12.8357" y2="5.56034" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3"/>
        <stop offset="1" stopColor="#DC1FFF"/>
      </linearGradient>
      <linearGradient id="paint2_linear_solana_logo" x1="2.30737" y1="8.84483" x2="14.393" y2="8.84483" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3"/>
        <stop offset="1" stopColor="#DC1FFF"/>
      </linearGradient>
    </defs>
  </svg>
);
