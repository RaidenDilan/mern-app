import { useState, useCallback, useRef, useEffect } from 'react';

const useHttpCLient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const activeHttpRequests = useRef([]); // using useRef as reference to an empty Array.

  const sendRequest = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {}
  ) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        singal: httpAbortCtrl.signal // to cancel connected requests.
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message);
      return resData;
    }
    catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // clean up function
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpCLient;
