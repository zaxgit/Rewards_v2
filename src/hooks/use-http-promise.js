import { useCallback } from 'react';

const useHttpPromise = (requestConfig) => {
  const fetchData = useCallback(async () => {
    return fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : 'GET',
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    }).finally((promise) => {
      return new Promise((resolve, reject) => {
        resolve(promise);
        reject('uhOh');
      });
    });
  }, [requestConfig]);
  return { fetchData };
};

export default useHttpPromise;
