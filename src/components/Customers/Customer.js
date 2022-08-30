import { useState, useEffect } from 'react';

import classes from './Customer.module.css';
import useHttp from '../../hooks/use-http';

import Card from '../UI/Card';
import PointDetails from '../Orders/PointDetails';
import Orders from '../Orders/Orders';

const Customer = (props) => {
  const [orders, setOrders] = useState([]);

  const { isLoading, error, requestData } = useHttp();

  useEffect(() => {
    const requestDataHandler = (allOrders) => {
      if (allOrders) {
        const filteredOrders = allOrders.filter(
          (order) => props.id === order.customer
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
  }, [requestData, props.id]);

  let customerData;
  if (error) {
    customerData = <p>{error}</p>;
  }

  if (isLoading) {
    customerData = <p>Customer orders loading!</p>;
  }

  if (orders.length > 0)
    customerData = (
      <>
        <Orders orders={orders} isLoading={isLoading} error={error} />
        <PointDetails
          orders={orders}
          customerId={props.id}
          isLoading={isLoading}
        />
      </>
    );

  return (
    <Card className={classes.customer}>
      <h2>{props.name}</h2>
      <div className={classes.content}>{customerData}</div>
    </Card>
  );
};

export default Customer;
