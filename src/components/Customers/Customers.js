import { useState, useEffect } from 'react';

import classes from './Customers.module.css';

import Lottie from 'lottie-react';
import paperplane from '../../lotties/paperplane-loading.json';
import useHttp from '../../hooks/use-http';
import Error from '../UI/Error';
import Customer from './Customer';

const Customers = () => {
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
        url: 'https://rewards-ecbd0-default-rtdb.firebaseio.com/customers.json',
      },
      requestDataHandler
    );
  }, [requestData]);

  let content;
  if (isLoading) {
    content = (
      <Lottie
        className={classes.lottie}
        animationData={paperplane}
        loop={true}
      />
    );
  }

  if (error) {
    content = (
      <Error>
        <p>{error}</p>
      </Error>
    );
  }

  if (customers && !isLoading) {
    content = (
      <div className={classes.grid}>
        {customers.map((customer) => {
          return (
            <div key={customer.id} className={classes['grid-item']}>
              <Customer id={customer.id} name={customer.name} />
            </div>
          );
        })}
      </div>
    );
  }

  return <>{content}</>;
};

export default Customers;
