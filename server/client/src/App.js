import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout'
import LoginForm from './components/LoginForm'
import Posts from './components/Posts'
const Home = () => <h1>Home</h1>


class App extends Component{
  render(){
    return(
      <div className="container">
        <BrowserRouter>
          <Switch>
          <Route exact path="/login" component={LoginForm} />
            <Layout>
            <Route exact path="/" component={Posts} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;