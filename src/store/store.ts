import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
