import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classes from './Customer.module.css';
import useHttpPromise from '../../hooks/use-http-promise';
import { orderRequestConfig } from '../../config/config';
import Card from '../UI/Card';
import CustomerDetails from './CustomerDetails';

Customer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function Customer({ id, name }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { fetchData: fetchCustomers } = useHttpPromise(orderRequestConfig);

  useEffect(() => {
    fetchCustomers()
      .then((payload) => {
        setIsLoading(true);
        if (!payload.ok) {
          throw new Error(
            `Error ${payload.status}, ${payload.statusText}: Couldn't fetch orders!`
          );
        }

        return payload.json();
      })
      .then((data) => {
        const customerOrders = [];

        for (const key in data) {
          if (data[key].customer === id) {
            customerOrders.push({
              id: key,
              customer: data[key].customer,
              total: data[key].total,
              date: data[key].date,
            });
          }
        }

        setOrders(customerOrders);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchCustomers, id]);

  return (
    <Card className={classes.customer}>
      <h2>{name}</h2>
      <div className={classes.content}>
        <CustomerDetails
          orders={orders}
          isLoading={isLoading}
          errorMessage={errorMessage}
          id={id}
        />
      </div>
    </Card>
  );
}

export default Customer;
