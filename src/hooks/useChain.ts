'use client';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { type RootState } from '@/store';
import { setActiveChain, setChainLoading } from '@/store/uiSlice';
import { type Chain } from '@/types';

export function useChain() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeChain = useSelector((state: RootState) => state.ui.activeChain);
    const isChainLoading = useSelector((state: RootState) => state.ui.isChainLoading);

    // Sync URL → Store on mount
    useEffect(() => {
        const chainParam = searchParams.get('chain') as Chain | null;
        if (chainParam && (chainParam === 'sol' || chainParam === 'bnb')) {
            dispatch(setActiveChain(chainParam));
        }
    }, [searchParams, dispatch]);

    // Change chain and update URL with loading animation
    const changeChain = useCallback((chain: Chain) => {
        if (chain === activeChain) return;
        
        dispatch(setChainLoading(true));
        dispatch(setActiveChain(chain));
        const params = new URLSearchParams(searchParams.toString());
        params.set('chain', chain);
        router.push(`?${params.toString()}`, { scroll: false });
        
        // Show skeleton for 200ms
        setTimeout(() => {
            dispatch(setChainLoading(false));
        }, 200);
    }, [activeChain, dispatch, router, searchParams]);

    return {
        activeChain,
        changeChain,
        isChainLoading,
        isSol: activeChain === 'sol',
        isBnb: activeChain === 'bnb',
    };
}
