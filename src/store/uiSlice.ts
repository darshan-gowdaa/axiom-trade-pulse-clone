import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type UIState, type DisplaySettings, type ActiveTab, type SortConfig, type Chain } from '@/types';

const defaultDisplaySettings: DisplaySettings = {
  layout: 'compact',
  showSearchBar: true,
  showDecimals: true,
  circleImages: false,
  showSocials: true,
  showSafetyBadges: true,
  showVolume: true,
  showTxCount: true,
  showBondingProgress: true,
};

const defaultSortConfig: SortConfig = {
  field: 'createdAt',
  direction: 'desc',
};

const initialState: UIState = {
  displaySettings: defaultDisplaySettings,
  activeTab: 'newPairs',
  sortConfig: {
    newPairs: { ...defaultSortConfig },
    finalStretch: { field: 'bondingCurveProgress', direction: 'desc' },
    migrated: { field: 'marketCap', direction: 'desc' },
  },
  activePresets: {
    newPairs: null,
    finalStretch: null,
    migrated: null,
  },
  isDisplaySettingsOpen: false,
  isMobile: false,
  activeChain: 'sol',
  isChainLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDisplaySettings: (state, action: PayloadAction<Partial<DisplaySettings>>) => {
      state.displaySettings = { ...state.displaySettings, ...action.payload };
    },
    
    setActiveTab: (state, action: PayloadAction<ActiveTab>) => {
      state.activeTab = action.payload;
    },
    
    setSortConfig: (
      state,
      action: PayloadAction<{ tab: ActiveTab; config: SortConfig }>
    ) => {
      state.sortConfig[action.payload.tab] = action.payload.config;
    },
    
    setActivePreset: (
      state,
      action: PayloadAction<{ tab: ActiveTab; presetId: string | null }>
    ) => {
      state.activePresets[action.payload.tab] = action.payload.presetId;
    },
    
    toggleDisplaySettings: (state) => {
      state.isDisplaySettingsOpen = !state.isDisplaySettingsOpen;
    },
    
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },

    setActiveChain: (state, action: PayloadAction<Chain>) => {
      state.activeChain = action.payload;
    },

    setChainLoading: (state, action: PayloadAction<boolean>) => {
      state.isChainLoading = action.payload;
    },
  },
});

export const {
  setDisplaySettings,
  setActiveTab,
  setSortConfig,
  setActivePreset,
  toggleDisplaySettings,
  setIsMobile,
  setActiveChain,
  setChainLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
