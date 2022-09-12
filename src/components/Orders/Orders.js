import Table from '../UI/Table';

const orderData = (orders) => {
  if (orders.length > 0) {
    return orders.map((order) => {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.date}</td>
          <td>${order.total}</td>
        </tr>
      );
    });
  }
};

const OrdersList = (props) => {
  const { orders } = props;

  return (
    <>
      <h3>ORDERS</h3>
      <Table headers={['Order Id', 'Order Date', 'Order Total']}>
        {orderData(orders)}
      </Table>
    </>
  );
};

export default OrdersList;
