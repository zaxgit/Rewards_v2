import { useState, useEffect } from 'react';

import classes from './Customers.module.css';

import Lottie from 'lottie-react';
import paperplane from '../../lotties/paperplane-loading.json';
import useHttp from '../../hooks/use-http';
import { customerRequestCongig } from '../../config/config';
import Error from '../UI/Error';
import Customer from './Customer';

const Customers = () => {
  const [customers, setCustomers] = useState();
  const { isLoading, hasError, requestData } = useHttp();

  useEffect(() => {
    const requestDataHandler = (fetchedCustomers) => {
      if (fetchedCustomers.length > 0) {
        setCustomers(fetchedCustomers);
      }
    };

    requestData(customerRequestCongig, requestDataHandler);
  }, [requestData]);

  if (isLoading) {
    return (
      <Lottie
        className={classes.lottie}
        animationData={paperplane}
        loop={true}
      />
    );
  }

  if (hasError && !isLoading) {
    return (
      <Error>
        <p>{hasError}</p>
      </Error>
    );
  }

  if (customers && !isLoading) {
    return (
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
};

export default Customers;
