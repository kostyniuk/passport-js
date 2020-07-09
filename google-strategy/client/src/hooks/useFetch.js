import { useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (
    url,
    params = { method: 'GET', body: 'null', headers: {} }
  ) => {
    try {
      console.log({ url, params });

      setLoading(true);

      // const responce = await fetch(url, params);
      // const responce = await fetch('/api');
      const responce = await fetch(url, params);
      console.log({ responce });
      const json = await responce.json();

      console.log({ json });

      if (json.success) {
        return json;
      } else {
        setLoading(false);
        setError(json.msg);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(e);
    }
  };

  return { loading, error, request };
};

export default useFetch;
