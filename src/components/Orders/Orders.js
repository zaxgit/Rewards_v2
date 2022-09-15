import PropTypes from 'prop-types';
import Table from '../UI/Table';

// const orderData = (orders) => {
//   if (orders.length > 0) {
//     return orders.map((order) => {
//       return (

//       );
//     });
//   }
// };

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
};

function OrdersList({ orders }) {
  const ordersNotEmpty = orders.length !== 0;

  return (
    <>
      <h3>ORDERS</h3>
      <Table headers={['Order Id', 'Order Date', 'Order Total']}>
        {ordersNotEmpty ? (
          orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total}</td>
              </tr>
            );
          })
        ) : (
          <tr>no orders found</tr>
        )}
      </Table>
    </>
  );
}

export default OrdersList;
