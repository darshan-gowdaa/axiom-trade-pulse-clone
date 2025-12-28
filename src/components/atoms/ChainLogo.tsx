'use client';

import { useSelector } from 'react-redux';
import { type RootState } from '@/store';
import { SolanaLogo } from './SolanaLogo';

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
                <img
                    src="https://axiom.trade/images/bnb-fill.svg"
                    alt="BNB"
                    width={width}
                    height={height}
                    style={{ width, height, objectFit: 'contain' }}
                />
            </div>
        );
    }

    return (
        <div style={wrapperStyle} className={className}>
            <SolanaLogo width={width} height={height} />
        </div>
    );
}
