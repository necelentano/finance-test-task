import { configureStore } from '@reduxjs/toolkit';
import { tickersApi } from './tickersApi';
import tickerSlice from './tickerSlice';

export const store = configureStore({
  reducer: {
    [tickersApi.reducerPath]: tickersApi.reducer,
    tickers: tickerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tickersApi.middleware),
});
