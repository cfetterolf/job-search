import React from 'react';
import {Avatar, RaisedButton} from "material-ui";
//import styled from 'styled-components';
//import PropTypes from 'prop-types';

class NavBar extends React.Component   {

  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    const Title = (
      <div className="navbar-header">
        <a className="navbar-brand" role="button" tabIndex="0">
          Job Search
        </a>
      </div>
    );

    const Buttons = (
      <span>
        <RaisedButton
          backgroundColor="#a4c639"
          labelColor="#ffffff"
          label="Sign Out"
          onTouchTap={this.props.logoutClicked()}
        />
        <Avatar src={this.props.user.photoURL}/>
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
