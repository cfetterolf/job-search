import React from 'react';
//import styled from 'styled-components';
import '../css/Discover.css';
import {colors} from '../config/constants';

const styles = {
  form: {
    backgroundColor: colors.fill,
  },
}

class Discover extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      // TODO - set state
    };
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="container-fluid wrapper">
        <div className="form" style={styles.form}>
        <form class="form-style-7">
          <ul>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" maxlength="100"/>
              <span>Enter your full name here</span>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" maxlength="100"/>
              <span>Enter a valid email address</span>
            </li>
            <li>
              <label for="url">Website</label>
              <input type="url" name="url" maxlength="100"/>
              <span>Your website address (eg: http://www.google.com)</span>
            </li>
            <li>
              <label for="bio">About You</label>
              <textarea className="email"></textarea>
              <span>Say something about yourself</span>
            </li>
            <li>
              <input type="submit" value="Send This" />
            </li>
          </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Discover;
