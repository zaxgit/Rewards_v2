import { useState, useEffect } from 'react';

import classes from './Customer.module.css';
import useHttp from '../../hooks/use-http';

import Card from '../UI/Card';
import PointDetails from '../Orders/PointDetails';
import Orders from '../Orders/Orders';

const Customer = (props) => {
  const { id, name } = props;

  const [orders, setOrders] = useState([]);

  const { isLoading, hasError, requestData } = useHttp();

  useEffect(() => {
    const requestDataHandler = (allOrders) => {
      if (allOrders) {
        const filteredOrders = allOrders.filter(
          (order) => id === order.customer
        );

        setOrders(filteredOrders);
      }
    };

    requestData(
      {
        url: 'https://rewards-ecbd0-default-rtdb.firebaseio.com/orders.json',
      },
      requestDataHandler
    );
  }, [requestData, id]);

  let content;
  if (isLoading) {
    content = <p>Customer orders loading!</p>;
  }

  if (hasError) {
    content = <p>{hasError}</p>;
  }

  if (orders.length <= 0) {
    content = <p>No orders found!</p>;
  }

  if (orders.length > 0)
    content = (
      <>
        <Orders orders={orders} />
        <PointDetails orders={orders} customerId={id} />
      </>
    );

  return (
    <Card className={classes.customer}>
      <h2>{name}</h2>
      <div className={classes.content}>{content}</div>
    </Card>
  );
};

export default Customer;
