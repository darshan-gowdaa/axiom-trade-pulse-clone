'use client';

import { RiWalletLine, RiArrowDownSLine } from '@remixicon/react';
import { ChainLogo } from '@/components/atoms';

type WalletPillVariant = 'default' | 'compact' | 'statusBar';

interface WalletSolPillProps {
    variant?: WalletPillVariant;
    walletCount?: number | string;
    solBalance?: number | string;
    className?: string;
    showDropdown?: boolean;
}

const VARIANT_STYLES: Record<WalletPillVariant, {
    button: string;
    walletIcon: string;
    text: string;
    solanaSize: { width: number; height: number };
    arrowIcon: string;
}> = {
    default: {
        button: 'flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[#2a2a38] shrink-0',
        walletIcon: 'w-3.5 h-3.5 text-[#d4d4d8] shrink-0',
        text: 'text-white text-[11px] font-medium',
        solanaSize: { width: 9, height: 9 },
        arrowIcon: 'w-3.5 h-3.5 text-[#6b6b7a] shrink-0',
    },
    compact: {
        button: 'flex items-center gap-2 px-2 py-1 bg-transparent border border-[#27272a] hover:border-[#3f3f46] rounded-full text-[#bfc0c8] text-[11px] cursor-pointer transition-colors whitespace-nowrap',
        walletIcon: 'w-3 h-3 shrink-0',
        text: 'text-white font-semibold',
        solanaSize: { width: 12, height: 12 },
        arrowIcon: 'w-3 h-3 shrink-0',
    },
    statusBar: {
        button: 'flex items-center gap-[5px] px-[5px] py-[2px] bg-transparent border border-[#1a1b23] rounded-xl text-[#6b6b7a] text-[10px] cursor-pointer',
        walletIcon: 'w-[12px] h-[12px] min-w-[12px] min-h-[12px] text-[#6b6b7a] shrink-0',
        text: 'text-[#e2e8f0] font-semibold',
        solanaSize: { width: 12, height: 12 },
        arrowIcon: 'w-[12px] h-[12px] min-w-[12px] min-h-[12px] text-[#fcfcfcfc] shrink-0',
    },
};

export function WalletSolPill({
    variant = 'default',
    walletCount = 1,
    solBalance = 0,
    className = '',
    showDropdown = true,
}: WalletSolPillProps) {
    const styles = VARIANT_STYLES[variant];

    // For compact variant, use grouped layout
    if (variant === 'compact') {
        return (
            <button className={`${styles.button} ${className}`}>
                <div className="flex items-center gap-1">
                    <RiWalletLine className={styles.walletIcon} />
                    <span className={styles.text}>{walletCount}</span>
                </div>
                <div className="flex items-center gap-1">
                    <ChainLogo width={styles.solanaSize.width} height={styles.solanaSize.height} />
                    <span className={styles.text}>{solBalance}</span>
                    {showDropdown && <RiArrowDownSLine className={styles.arrowIcon} />}
                </div>
            </button>
        );
    }

    // Default and statusBar use flat layout
    return (
        <button className={`${styles.button} ${className}`}>
            <RiWalletLine className={styles.walletIcon} />
            <span className={styles.text}>{walletCount}</span>
            <ChainLogo width={styles.solanaSize.width} height={styles.solanaSize.height} />
            <span className={styles.text}>{solBalance}</span>
            {showDropdown && <RiArrowDownSLine className={styles.arrowIcon} />}
        </button>
    );
}
