import React from 'react';
//import PropTypes from 'prop-types';

class NavBar extends React.Component   {

  constructor(props) {
    super(props);

    this.state = {
      // TODO - set state
    };
  }

  render() {
    const Title = (
      <div className="navbar-header">
        <a className="navbar-brand" href="#">
          <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
          Job Search
        </a>
      </div>
    );

    const Buttons = (
      <button className="btn btn-outline-info my-2 my-sm-0">
        Log In
      </button>
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
