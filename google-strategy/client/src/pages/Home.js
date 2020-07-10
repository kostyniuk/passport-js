import React from 'react';
import useAuth from '../hooks/useAuth';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = () => {
  const { info, loading } = useAuth();
  console.log({ info });
  if (loading) {
    return <CircularProgress />;
  } 

  return (
    <div>
      <h1>Home page</h1>
      <h3>Hi, {info.username}</h3>
      <div style={{ margin: '20px' }}>{JSON.stringify(info, null, 2)}</div>
      <div style={{ margin: '20px' }}>{JSON.stringify(loading, null, 2)}</div>
    </div>
  );
};

export default Home;
