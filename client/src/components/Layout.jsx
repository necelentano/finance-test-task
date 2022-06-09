import { Row, Col } from 'antd';

const Layout = ({ children }) => (
	<Row>
		<Col span={12} offset={6}>
			{children}
		</Col>
	</Row>
);

export default Layout;
