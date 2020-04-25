import {useState, useCallback, useRef, useEffect} from 'react';

export default function useHttp () {
  const [isLoading, setIsLoading] = useState (false);
  const [error, setError] = useState ();
  const activeRequests = useRef ([]);

  useEffect (() => {
    return () => {
      activeRequests.current.forEach (activeRequest => activeRequest.abort ());
    };
  }, []);

  const sendRequest = useCallback (
    async (url, method = 'GET', headers = {}, body = null) => {
      try {
        setIsLoading (true);

        const abortControl = new AbortController ();
        activeRequests.current.push (abortControl);

        const response = await fetch (url, {
          method,
          headers,
          body,
          signal: abortControl.signal,
        });

        activeRequests.current = activeRequests.current.filter (
          activeContorl => activeContorl !== abortControl
        );

        const responseBody = await response.json ();
        if (!response.ok) {
          throw new Error (responseBody.message);
        }

        setIsLoading (false);
        return responseBody;
      } catch (error) {
        setIsLoading (false);
        console.log (error.message);
        setError (error.message || 'Something went Wrong :(');
        throw error;
      }
    },
    []
  );

  const clearError = () => setError ();

  return [sendRequest, isLoading, error, clearError];
}
