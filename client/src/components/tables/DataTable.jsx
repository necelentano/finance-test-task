import { Space, Table, Button } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTickerToWishlist } from '../../redux';
import moment from 'moment';

const DataTable = ({ loading }) => {
  const dispatch = useDispatch();
  const { wishlistTickers, tickers } = useSelector((state) => state.tickers);

  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (price, record) => {
        return (
          <>
            <span>
              {record.icon === 'up' ? (
                <ArrowUpOutlined style={{ color: 'green' }} />
              ) : record.icon === 'down' ? (
                <ArrowDownOutlined style={{ color: 'red' }} />
              ) : (
                <LoadingOutlined style={{ color: 'black' }} />
              )}
            </span>
            <span>{`$${price}`}</span>
          </>
        );
      },
    },
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange',
      align: 'center',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      align: 'center',
    },
    {
      title: 'Change Percent',
      dataIndex: 'changePercent',
      key: 'changePercent',
      align: 'center',
    },
    {
      title: 'Dividend',
      dataIndex: 'dividend',
      key: 'dividend',
      align: 'center',
    },
    {
      title: 'Yield',
      dataIndex: 'yield',
      key: 'yield',
      align: 'center',
    },
    {
      title: 'Lasrt Trade',
      dataIndex: 'lastTradeTime',
      key: 'lastTradeTime',
      align: 'center',
      render: (lastTradeTime) => {
        const formatedData = moment(lastTradeTime).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        );
        return (
          <Space size="middle">
            <span>{formatedData}</span>
          </Space>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const inWishlist = wishlistTickers?.find(
          (ticker) => ticker === record.id
        );
        return (
          <Space size="middle">
            <Button
              onClick={() => dispatch(addTickerToWishlist(record.id))}
              type="link"
              size="small"
              disabled={inWishlist}
            >
              {inWishlist ? 'Added' : 'Wishlist'}
            </Button>
          </Space>
        );
      },
    },
  ];

  const tableData = tickers?.map((item) => ({
    key: item.ticker,
    id: item.ticker,
    ticker: item.ticker,
    exchange: item.exchange,
    price: item.price,
    change: item.change,
    changePercent: item.change_percent,
    dividend: item.dividend,
    yield: item.yield,
    lastTradeTime: item.last_trade_time,
    icon: item.icon,
  }));

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      bordered={true}
      scroll={{ x: true }}
      rowKey="ticker"
      loading={loading}
    />
  );
};

export default DataTable;
