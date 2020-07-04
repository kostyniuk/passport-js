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

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <div>
              <h1>Home</h1>
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
