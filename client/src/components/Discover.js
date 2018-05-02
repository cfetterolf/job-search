import React from 'react';
// import styled from 'styled-components';
import '../css/Discover.css';
import Guesser from './discover-components/Guesser';

class Discover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleTextUpdate(field, event) {
    this.setState({ [field]: event.target.value });
  }

  render() {
    return (
      <div className="container-fluid wrapper">
        <Guesser user={JSON.parse(localStorage.getItem('firebaseUser'))} />
      </div>
    );
  }
}

export default Discover;
