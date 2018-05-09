import React from 'react';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggedIn: true });
  }

  handleLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const page = (this.state.isLoggedIn) ? <Dashboard logout={this.handleLogout} /> : <SignIn login={this.handleLogin} />;
    return <div>{page}</div>;
  }
}

export default App;
