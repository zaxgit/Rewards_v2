import { useState, useEffect } from 'react';

import Lottie from 'lottie-react';
import paperplane from '../../lotties/paperplane-loading.json';
import Customer from './Customer';
import useHttp from '../../hooks/use-http';
import classes from './Customers.module.css';

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
      <Lottie
        className={classes.lottie}
        animationData={paperplane}
        loop={true}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
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
