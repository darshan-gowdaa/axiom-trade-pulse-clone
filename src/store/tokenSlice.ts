import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Token, type TokenStatus } from '@/types';

interface TokenState {
  priceFlash: Record<string, 'up' | 'down' | null>;
  lastUpdated: number | null;
}

const initialState: TokenState = {
  priceFlash: {},
  lastUpdated: null,
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // Kept to trigger lastUpdated if needed, but array logic removed
    addToken: (
      state,
      action: PayloadAction<{ status: TokenStatus; token: Token }>
    ) => {
      state.lastUpdated = Date.now();
    },
    
    updateTokenPrice: (
      state,
      action: PayloadAction<{
        tokenId: string;
        status: TokenStatus;
        newPrice: number;
        oldPrice: number;
      }>
    ) => {
      const { tokenId, newPrice, oldPrice } = action.payload;
      
      // Determine flash direction
      const flashDirection = newPrice > oldPrice ? 'up' : 'down';
      state.priceFlash[tokenId] = flashDirection;
      
      state.lastUpdated = Date.now();
    },
    
    clearPriceFlash: (state, action: PayloadAction<string>) => {
      state.priceFlash[action.payload] = null;
    },
  },
});

export const {
  addToken,
  updateTokenPrice,
  clearPriceFlash,
} = tokenSlice.actions;

export default tokenSlice.reducer;
