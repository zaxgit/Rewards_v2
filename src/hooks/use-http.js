import { useCallback, useState } from 'react';
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const requestData = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setHasError(null);
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!res.ok) {
        throw new Error(
          `Error ${res.status}: Something went wrong while getting your data!`
        );
      }

      const resData = await res.json();

      applyData(resData);
    } catch (error) {
      setHasError(error.message);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return {
    isLoading,
    hasError,
    requestData,
  };
};

export default useHttp;
