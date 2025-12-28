'use client';

import { useSelector } from 'react-redux';
import { type RootState } from '@/store';

interface ChainTextProps {
    className?: string;
}

export function ChainText({ className }: ChainTextProps) {
    const activeChain = useSelector((state: RootState) => state.ui.activeChain);
    return <span className={className}>{activeChain === 'bnb' ? 'BNB' : 'SOL'}</span>;
}
