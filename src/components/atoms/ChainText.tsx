'use client';

import { useSelector } from 'react-redux';
import { type RootState } from '@/store';
import { useState, useEffect } from 'react';

interface ChainTextProps {
    className?: string;
}

export function ChainText({ className }: ChainTextProps) {
    const activeChain = useSelector((state: RootState) => state.ui.activeChain);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);
    // SSR placeholder
    if (!mounted) return <span className={className}>SOL</span>;

    return <span className={className}>{activeChain === 'bnb' ? 'BNB' : 'SOL'}</span>;
}
