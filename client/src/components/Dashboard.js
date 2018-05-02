import React, { Component } from 'react';
import { logout } from '../helpers/auth';
// import { colors } from '../config/constants';
// import styled from 'styled-components';

import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Timeline from './Timeline';
import Tasks from './Tasks';
import Contacts from './Contacts';
import Discover from './Discover';
import Connect from './Connect';

const bodyStyle = {
  paddingLeft: '0px',
  paddingRight: '0px',
  backgroundColor: '#ECEFF1',
  position: 'fixed',
  top: '56px',
  bottom: '0',
  right: '0',
  zIndex: '1000',
  padding: '10px',
  overflowX: 'hidden',
  overflowY: 'auto',
};

const sections = ['Timeline', 'Tasks', 'Contacts', 'Discover', 'Connect'];
const appTokenKey = 'appToken';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: sections[0],
      firebaseUser: JSON.parse(localStorage.getItem('firebaseUser')),
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout().then(() => {
      localStorage.removeItem(appTokenKey);
      localStorage.removeItem('firebaseUser');
      this.props.logout();
    });
  }

  render() {
    /* conditionally set body based on section selected */
    let body;
    if (this.state.selected === 'Timeline') {
      body = <Timeline />;
    } else if (this.state.selected === 'Tasks') {
      body = <Tasks user={this.state.firebaseUser} />;
    } else if (this.state.selected === 'Contacts') {
      body = <Contacts contacts={this.state.firebaseUser.contacts} />;
    } else if (this.state.selected === 'Connect') {
      body = <Connect />;
    } else if (this.state.selected === 'Discover') {
      body = <Discover />;
    } else {
      body = <div>Something went wrong!</div>;
    }

    return (
      <div className="Dashboard">
        <NavBar logoutClicked={() => this.handleLogout} user={this.state.firebaseUser.user} />
        <div className="container-fluid">
          <div clas="row">
            <Sidebar
              setSection={s => this.setState({ selected: s })} // callback function
              sections={sections}
            />
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" style={bodyStyle}>
              {body}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
