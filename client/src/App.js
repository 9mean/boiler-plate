import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
function App() {
  return (
    <Router>
      <div>
        <hr />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
