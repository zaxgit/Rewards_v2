import Customer from './Customer';
import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './CustomersList.module.css';

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
    content = (
      <li>
        <p>Loading...</p>
      </li>
    );
  }

  if (error) {
    content = (
      <li>
        <p>{error}</p>
      </li>
    );
  }

  if (customers) {
    content = customers.map((customer) => {
      return (
        <li key={customer.id}>
          <Customer id={customer.id} name={customer.name} />
        </li>
      );
    });
  }

  return <ul className={classes['customer-list']}>{content}</ul>;
};

export default CustomerList;
