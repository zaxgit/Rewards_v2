import classes from './OrdersList.module.css';
import Table from '../UI/Table';

const OrdersList = (props) => {
  const { orders } = props;

  let content;
  if (orders.length > 0) {
    content = orders.map((order) => {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.date}</td>
          <td>${order.total}</td>
        </tr>
      );
    });
  }

  return (
    <Table
      className={classes.expanded}
      headers={['Order Id', 'Order Date', 'Order Total']}
    >
      {content}
    </Table>
  );
};

export default OrdersList;
