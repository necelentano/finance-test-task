import { useEffect } from 'react';

import Header from './components/Header';
import Layout from './components/Layout';
import DataTable from './components/tables/DataTable';
import WishlistTable from './components/tables/WishlistTable';

import { Switch } from 'antd';

import {
  setTickers,
  setPrevTickers,
  toggleStartPause,
  useGetTickersQuery,
} from './redux';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { data, isLoading } = useGetTickersQuery();
  const dispatch = useDispatch();
  const { wishlistTickers, tickers, toggleFetch } = useSelector(
    (state) => state.tickers
  );

  useEffect(() => {
    if (toggleFetch) {
      dispatch(setTickers(data));

      setTimeout(() => {
        dispatch(setPrevTickers(data));
      }, 3000);
    }
  }, [data, dispatch, toggleFetch]);

  return (
    <div>
      <Header />
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          <h3>Start/Pause Tickers</h3>
          <Switch
            defaultChecked
            onChange={() => dispatch(toggleStartPause())}
          />
        </div>
        {wishlistTickers.length > 0 && (
          <>
            <h3>Wishlist</h3>
            <WishlistTable />
          </>
        )}
        <h3>All Tickers</h3>
        <DataTable data={tickers} loading={isLoading} />
      </Layout>
    </div>
  );
}

export default App;
