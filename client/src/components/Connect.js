import React from 'react';
import '../css/Connect.css';
import Template from './connect-components/Template';

class Connect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    console.log('getting localStorage:', JSON.parse(localStorage.getItem('firebaseUser')));

    return (
      <div className="container-fluid wrapper">
        <Template user={JSON.parse(localStorage.getItem('firebaseUser'))} />
      </div>
    );
  }
}

export default Connect;
