'use client';

import { useSelector } from 'react-redux';
import { type RootState } from '@/store';
import Image from 'next/image';

interface ChainLogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export function ChainLogo({ className, width = 14, height = 14 }: ChainLogoProps) {
    const activeChain = useSelector((state: RootState) => state.ui.activeChain);

    // Wrapper ensures consistent sizing
    const wrapperStyle = {
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    };

    if (activeChain === 'bnb') {
        return (
            <div style={wrapperStyle} className={className}>
                <Image
                    src="/icons/bnb-fill.svg"
                    alt="BNB"
                    width={width}
                    height={height}
                    style={{ objectFit: 'contain' }}
                />
            </div>
        );
    }

    return (
        <div style={wrapperStyle} className={className}>
            <Image
                src="/icons/sol-fill.svg"
                alt="Solana"
                width={width}
                height={height}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
}
