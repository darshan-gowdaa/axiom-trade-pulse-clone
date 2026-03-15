import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Token, type TokenStatus } from '@/types';

interface TokenState {
  lastUpdated: number | null;
}

const initialState: TokenState = {
  lastUpdated: null,
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // Kept to trigger lastUpdated if needed, but array logic removed
    addToken: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ status: TokenStatus; token: Token }>
    ) => {
      state.lastUpdated = Date.now();
    },


  },
});

export const {
  addToken,
} = tokenSlice.actions;

export default tokenSlice.reducer;
