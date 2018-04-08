import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, Route, Router} from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import './index.css';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import createBrowserHistory from "history/createBrowserHistory";

const muiTheme = getMuiTheme({
    appBar: {
        color: "#37517E",
        height: 50
    },
});

injectTapEventPlugin();

const customHistory = createBrowserHistory();
const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={customHistory}>
            <div>
                <Route path="/signin" component={SignIn}/>
                <Route path="/app/dash" component={Dashboard}/>
                <Redirect from="/" to="/signin"/>
            </div>
        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
