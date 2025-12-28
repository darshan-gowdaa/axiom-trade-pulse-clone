import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import uiReducer from './uiSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    ui: uiReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
