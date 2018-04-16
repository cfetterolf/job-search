import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';
import './index.css';

const muiTheme = getMuiTheme({
  appBar: {
    color: '#37517E',
    height: 50,
  },
});

const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
