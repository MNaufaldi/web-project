import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Posts from './components/Homepage/Posts';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';

class App extends Component{
  render(){
    return(
      <div className="container">
        <BrowserRouter>
          <Switch>
          <Route exact path = "/" render={() => <Redirect to={{pathname: "/login"}} />} />
          <Route exact path="/login" component={ LoginForm } />
          <PrivateRoute exact path="/logout" component={ Logout }/>
          <PrivateRoute exact path="/dashboard" component={ Posts } />
          <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;