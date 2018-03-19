import React from 'react';
//import PropTypes from 'prop-types';

function NavBar(props) {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
        Job Search
      </a>
      <button class="btn btn-outline-info my-2 my-sm-0">Log In</button>

    </nav>
  );
}

export default NavBar;
