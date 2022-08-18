import { useState } from 'react';
import classes from './OrdersList.module.css';
import Table from '../UI/Table';
import Button from '../UI/Button';

const OrdersList = (props) => {
  const { orders } = props;

  const [isExpanded, setIsExpanded] = useState(false);

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

  const showDataHandler = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Button onClick={showDataHandler}>Orders</Button>
      {isExpanded && (
        <Table
          className={classes.expanded}
          headers={['Order Id', 'Order Date', 'Order Total']}
        >
          {content}
        </Table>
      )}
    </>
  );
};

export default OrdersList;
