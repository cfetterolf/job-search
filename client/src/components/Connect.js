import React from 'react';
import '../css/Connect.css';
import Template from './connect-components/Template';

function Connect(props) {
  return (
    <div className="container-fluid wrapper">
      <Template user={JSON.parse(localStorage.getItem('firebaseUser'))} />
    </div>
  );
}

export default Connect;
