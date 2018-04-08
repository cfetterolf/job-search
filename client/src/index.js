import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, Route, Router} from "react-router";
import './index.css';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import createBrowserHistory from "history/createBrowserHistory";

const customHistory = createBrowserHistory();
const Root = () => (
  <Router history={customHistory}>
      <div>
          <Route path="/login" component={SignIn}/>
          <Route path="/app/home" component={Dashboard}/>
          <Redirect from="/" to="/login"/>
      </div>
  </Router>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
