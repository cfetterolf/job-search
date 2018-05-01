import React from 'react';
import { Avatar } from 'material-ui';
import '../css/NavBar.css';
// import { colors } from '../config/constants';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const Title = (
      <div className="navbar-header">
        <a className="navbar-brand" role="button" tabIndex="0">
          Endeavor
        </a>
      </div>
    );

    const Buttons = (
      <span>
        {/* <RaisedButton
          backgroundColor="#a4c639"
          labelColor="#ffffff"
          label="Sign Out"
          onTouchTap={this.props.logoutClicked()}
        /> */}
        <div className="btn-group dropdown">
          <a
            className="user-icon"
            id="userDropdown"
            role="button"
            tabIndex="0"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={this.props.user.photoURL} />
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="dropdown-item" href="https://www.github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item logout"
              role="button"
              tabIndex="0"
              onClick={this.props.logoutClicked()}
            >
              Log Out
            </a>
          </div>
        </div>
      </span>
    );

    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          {Title}
          {Buttons}
        </div>
      </nav>
    );
  }
}

export default NavBar;
