'use client';

import { useSelector } from 'react-redux';
import { type RootState } from '@/store';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ChainLogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export function ChainLogo({ className, width = 14, height = 14 }: ChainLogoProps) {
    const activeChain = useSelector((state: RootState) => state.ui.activeChain);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const wrapperStyle = {
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    };

    // SSR default
    const chainToRender = !mounted ? 'sol' : activeChain;

    if (chainToRender === 'bnb') {
        return (
            <div style={wrapperStyle} className={className}>
                <Image
                    src="/icons/bnb-fill.svg"
                    alt="BNB"
                    width={width}
                    height={height}
                    className="object-contain"
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
