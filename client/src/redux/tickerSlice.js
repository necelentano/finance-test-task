import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickers: [],
  prevTickers: [],
  wishlistTickers: [],
  toggleFetch: true,
};

export const tickerSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.tickers = action.payload;
      if (state.prevTickers) {
        state.tickers = state.tickers?.map((currentItem) => {
          const prevTicker = state.prevTickers?.find(
            (prevItem) => prevItem.ticker === currentItem.ticker
          );
          if (prevTicker?.price > currentItem.price) {
            return {
              ...currentItem,
              icon: `down`,
            };
          } else if (prevTicker?.price < currentItem.price) {
            return {
              ...currentItem,
              icon: `up`,
            };
          } else {
            return {
              ...currentItem,

              icon: `loading`,
            };
          }
        });
      }
    },
    setPrevTickers: (state, action) => {
      state.prevTickers = action.payload;
    },
    addTickerToWishlist: (state, action) => {
      if (!state.wishlistTickers.includes(action.payload)) {
        state.wishlistTickers.push(action.payload);
      }
    },
    removeTickerFromWishlist: (state, action) => {
      state.wishlistTickers = state.wishlistTickers.filter(
        (item) => item !== action.payload
      );
    },
    toggleStartPause: (state) => {
      state.toggleFetch = !state.toggleFetch;
    },
  },
});

export const {
  setTickers,
  setPrevTickers,
  addTickerToWishlist,
  removeTickerFromWishlist,
  toggleStartPause,
} = tickerSlice.actions;

export default tickerSlice.reducer;
