import React, { Component } from 'react';
import cookies from 'react-cookies'

import { 
  HashRouter,
  Route,
  Switch,   
  Redirect
} from 'react-router-dom'

import Login from '../views/Login'
import Dashboard from '../views/Dashboard'

class Router extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          {
             <Route path='/' render={() =>
              cookies.load('token') ? <Dashboard /> : <Redirect to="login" />
            }/>
          }
        </Switch>
      </HashRouter>
    );
  }
}

export default Router
