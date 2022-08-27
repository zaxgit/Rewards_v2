import Customer from './Customer';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './Customers.module.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState();
  const { isLoading, error, requestData } = useHttp();

  useEffect(() => {
    const requestDataHandler = (fetchedCustomers) => {
      if (fetchedCustomers.length > 0) {
        setCustomers(fetchedCustomers);
      }
    };

    requestData(
      {
        url: 'https://rewards-1acde-default-rtdb.firebaseio.com/customers.json',
      },
      requestDataHandler
    );
    return () => {
      console.log('CLEANUP');
    };
  }, [requestData]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (customers) {
    content = customers.map((customer) => {
      return (
        <div key={customer.id} className={classes['grid-item']}>
          <Customer id={customer.id} name={customer.name} />
        </div>
      );
    });
  }

  return <div className={classes.grid}>{content}</div>;
};

export default CustomerList;
