import React from 'react';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { info, loading } = useAuth();
  console.log({ info });

  return (
    <div>
      <h1>Home page</h1>
      <div style={{ margin: '20px' }}>{JSON.stringify(info, null, 2)}</div>
      <div style={{ margin: '20px' }}>{JSON.stringify(loading, null, 2)}</div>
    </div>
  );
};

export default Home;
