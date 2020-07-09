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

function App() {
  return (
    <Router>
      <div className='App'>
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
          <Route path='/content' exact>
            <Content />
          </Route>
          <Redirect to='/login' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
