import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterConfig {
  searchKeywords: string;
  excludeKeywords: string;
  sortBy: 'mC' | 'volume' | 'tx' | 'liquidity' | null;
  sortOrder: 'asc' | 'desc';
  minMC: string;
  maxMC: string;
  minVol: string;
  maxVol: string;
  minTx: string;
  maxTx: string;
}

interface FilterState {
  activeModalTab: string; // Tracks which tab is active in the modal
  filters: Record<string, FilterConfig>; // Keyed by column/tab name
}

const initialFilterConfig: FilterConfig = {
  searchKeywords: '',
  excludeKeywords: '',
  sortBy: null,
  sortOrder: 'desc',
  minMC: '',
  maxMC: '',
  minVol: '',
  maxVol: '',
  minTx: '',
  maxTx: '',
};

const initialState: FilterState = {
  activeModalTab: 'New Pairs',
  filters: {
    'New Pairs': { ...initialFilterConfig },
    'Final Stretch': { ...initialFilterConfig },
    'Migrated': { ...initialFilterConfig },
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveModalTab: (state, action: PayloadAction<string>) => {
      state.activeModalTab = action.payload;
      // Ensure the filter entry exists
      if (!state.filters[action.payload]) {
        state.filters[action.payload] = { ...initialFilterConfig };
      }
    },
    setFilterConfig: (state, action: PayloadAction<{ tab: string; config: Partial<FilterConfig> }>) => {
      const { tab, config } = action.payload;
      if (!state.filters[tab]) {
        state.filters[tab] = { ...initialFilterConfig };
      }
      state.filters[tab] = { ...state.filters[tab], ...config };
    },
    resetFilters: (state, action: PayloadAction<string>) => {
      state.filters[action.payload] = { ...initialFilterConfig };
    },
  },
});

export const { setActiveModalTab, setFilterConfig, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
