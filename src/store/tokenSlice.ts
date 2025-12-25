import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Token, type TokenStatus } from '@/types';

interface TokenState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  priceFlash: Record<string, 'up' | 'down' | null>;
  lastUpdated: number | null;
  isLoading: boolean;
}

const initialState: TokenState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  priceFlash: {},
  lastUpdated: null,
  isLoading: true,
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ status: TokenStatus; tokens: Token[] }>
    ) => {
      const { status, tokens } = action.payload;
      if (status === 'new') {
        state.newPairs = tokens;
      } else if (status === 'finalStretch') {
        state.finalStretch = tokens;
      } else {
        state.migrated = tokens;
      }
      state.lastUpdated = Date.now();
      state.isLoading = false;
    },
    
    addToken: (
      state,
      action: PayloadAction<{ status: TokenStatus; token: Token }>
    ) => {
      const { status, token } = action.payload;
      if (status === 'new') {
        state.newPairs = [token, ...state.newPairs];
      } else if (status === 'finalStretch') {
        state.finalStretch = [token, ...state.finalStretch];
      } else {
        state.migrated = [token, ...state.migrated];
      }
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
      const { tokenId, status, newPrice, oldPrice } = action.payload;
      
      // Determine flash direction
      const flashDirection = newPrice > oldPrice ? 'up' : 'down';
      state.priceFlash[tokenId] = flashDirection;
      
      // Update token in the correct array
      const updateInArray = (tokens: Token[]) => {
        const token = tokens.find(t => t.id === tokenId);
        if (token) {
          const change = ((newPrice - oldPrice) / oldPrice) * 100;
          token.priceInSol = newPrice;
          token.priceChange24h = change;
          token.marketCap = token.marketCap * (1 + change / 100);
        }
      };
      
      if (status === 'new') {
        updateInArray(state.newPairs);
      } else if (status === 'finalStretch') {
        updateInArray(state.finalStretch);
      } else {
        updateInArray(state.migrated);
      }
      
      state.lastUpdated = Date.now();
    },
    
    clearPriceFlash: (state, action: PayloadAction<string>) => {
      state.priceFlash[action.payload] = null;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTokens,
  addToken,
  updateTokenPrice,
  clearPriceFlash,
  setLoading,
} = tokenSlice.actions;

export default tokenSlice.reducer;
