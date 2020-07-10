import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { Button, useScrollTrigger } from '@material-ui/core';
import useFetch from '../hooks/useFetch';

const Content = () => {
  const { info } = useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);

  const { error, loading, request } = useFetch();

  const handleLogout = async () => {
    const responce = await request('/api/logout');
    console.log({ responce });
    setRedirect(true);
  };

  if (redirect) {
    window.location.reload(true);
  }

  if (!info.ready) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <Button variant='contained' color='secondary' onClick={handleLogout}>
          Logout
        </Button>
        <h2>Secret content only authenticated users permitted to see!</h2>
        <div style={{ margin: '20px' }}>{JSON.stringify(info, null, 2)}</div>
      </div>
    );
  }
};

export default Content;
