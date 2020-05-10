import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
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
        signal: httpAbortCtrl.signal // to cancel connected requests.
      });

      const resData = await res.json();
      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl); // remove all controllers except for the current request

      if (!res.ok) throw new Error(resData.message);
      setIsLoading(false);

      return resData;
    }
    catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // clean up function
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
