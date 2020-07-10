import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

const Content = () => {
  const { info } = useContext(AuthContext);

  if (!info.ready) {
    return <CircularProgress />;
  } else {
    if (info.isAuthenticated) {
      return (
        <div>
          <h2>Secret content only authenticated users permitted to see!</h2>
          <div style={{ margin: '20px' }}>{JSON.stringify(info, null, 2)}</div>
        </div>
      );
    } else {
      return <Redirect to='/login' />
    }
  }
};

export default Content;
