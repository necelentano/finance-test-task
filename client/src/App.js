import { useEffect } from 'react';

import Header from './components/Header';
import Layout from './components/Layout';
import DataTable from './components/tables/DataTable';
import WishlistTable from './components/tables/WishlistTable';

import { useGetTickersQuery } from './redux';
import { setTickers, setPrevTickers } from './redux';
import { useDispatch, useSelector } from 'react-redux';

function App() {
	const { data, isLoading } = useGetTickersQuery();
	const dispatch = useDispatch();
	const { wishlistTickers, tickers } = useSelector(state => state.tickers);

	useEffect(() => {
		dispatch(setTickers(data));

		setTimeout(() => {
			dispatch(setPrevTickers(data));
		}, 3000);
	}, [data, dispatch]);

	return (
		<div>
			<Header />
			<Layout>
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
