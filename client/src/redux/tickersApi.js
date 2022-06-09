import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

export const tickersApi = createApi({
  reducerPath: 'tickersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000`,
  }),
  endpoints: (builder) => ({
    getTickers: builder.query({
      queryFn: async () => {
        return { data: [] };
      },
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        const socket = io(`ws://localhost:4000`);
        socket.emit('start');

        try {
          await cacheDataLoaded;

          socket.on('ticker', (response) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...response);
            });
          });

          await cacheEntryRemoved;

          socket.off('start');
          socket.off('ticker');
          socket.disconnect();
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
    }),
  }),
});

export const { useGetTickersQuery } = tickersApi;
