import { useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = async (url, params) => {
    try {
      const uri = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const responce = await fetch(uri);
      const json = await responce.json();

      console.log({json})

      if (json.success) {
        return json;
      } else {
        setLoading(false);
        setError(json.msg);
      }
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  return { loading, error, request };
};

export default useFetch;
