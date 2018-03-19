import React from 'react';
//import PropTypes from 'prop-types';

function Navbar(props) {
  const Title = (
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
        Job Search
      </a>
    </div>
  );

  const Buttons = (
    <button class="btn btn-outline-info my-2 my-sm-0">
      Log In
    </button>
  );

  return (
      <nav class="navbar fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
        {Title}
        {Buttons}
        </div>
      </nav>
  );
}

export default Navbar;
