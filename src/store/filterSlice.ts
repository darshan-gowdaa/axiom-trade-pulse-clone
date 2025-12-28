import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchKeywords: string;
  excludeKeywords: string;
  activeTab: string;
}

const initialState: FilterState = {
  searchKeywords: '',
  excludeKeywords: '',
  activeTab: 'New Pairs',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchKeywords: (state, action: PayloadAction<string>) => {
      state.searchKeywords = action.payload;
    },
    setExcludeKeywords: (state, action: PayloadAction<string>) => {
      state.excludeKeywords = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetFilters: (state) => {
      state.searchKeywords = '';
      state.excludeKeywords = '';
    },
  },
});

export const { setSearchKeywords, setExcludeKeywords, setActiveTab, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
