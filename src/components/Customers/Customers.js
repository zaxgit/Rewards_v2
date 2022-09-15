import { useState, useEffect } from 'react';

import classes from './Customers.module.css';

import Lottie from 'lottie-react';
import paperplane from '../../lotties/paperplane-loading.json';

import { customerRequestConfig } from '../../config/config';
import useHttpPromise from '../../hooks/use-http-promise';

import ErrorContainer from '../UI/ErrorContainer';
import Customer from './Customer';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { fetchData: fetchCustomers } = useHttpPromise(customerRequestConfig);

  useEffect(() => {
    fetchCustomers()
      .then((response) => {
        setIsLoading(true);

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}, ${response.statusText}: Couldn't fetch customers!`
          );
        }

        return response.json();
      })
      .then((fetchedCustomerData) => {
        const customerData = [];

        for (const key in fetchedCustomerData) {
          customerData.push({ id: key, name: fetchedCustomerData[key].name });
        }

        if (customerData) {
          setCustomers(customerData);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchCustomers]);

  if (isLoading) {
    return (
      <Lottie
        className={classes.lottie}
        animationData={paperplane}
        loop={true}
      />
    );
  }

  if (errorMessage && !isLoading) {
    return (
      <ErrorContainer>
        <p>{errorMessage}</p>
      </ErrorContainer>
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
