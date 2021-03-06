import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Content from './pages/Content';
import Home from './pages/Home';
import AuthContext from './contexts/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';

import useAuth from './hooks/useAuth';

function App() {
  const { info } = useAuth();

  if (!info.ready) {
    return <CircularProgress />;
  } else {
    if (info.isAuthenticated) {
      return (
        <Router>
          <div className='App'>
            <AuthContext.Provider value={{ info }}>
              <Switch>
                <Route path='/' exact>
                  <div>
                    <Home />
                  </div>
                </Route>
                <Route path='/content' exact>
                  <Content />
                </Route>
                <Redirect to='/content' />
              </Switch>
            </AuthContext.Provider>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className='App'>
            <AuthContext.Provider value={{ info }}>
              <Switch>
                <Route path='/' exact>
                  <div>
                    <Home />
                  </div>
                </Route>
                <Route path='/login' exact>
                  <Login />
                </Route>
                <Route path='/signup' exact>
                  <Signup />
                </Route>
                <Redirect to='/login' />
              </Switch>
            </AuthContext.Provider>
          </div>
        </Router>
      );
    }
  }
}

export default App;
