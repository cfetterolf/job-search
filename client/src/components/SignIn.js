import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {FontIcon, RaisedButton} from "material-ui";

// Google Info
// Client ID
// 813819049284-3lij99gjqte25c5316k29f43buif1h17.apps.googleusercontent.com
// Client Secret
// ctL8XEKoWdDGOPpuyjGz4PGi

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";


export default class SignIn extends React.Component   {

  constructor(props) {
    super(props);

    this.state = {
      // TODO - set state
    };
  }

  signOut() {

  }

  onSignIn(googleUser) {
    console.log(googleUser);
  }

  render() {
    console.log("test")
    return (
      <div>
        <div class="g-signin2" data-onsuccess={() => {this.onSignIn(); }}></div>
        <a onclick={() => { console.log("test");; }} role="button" tabIndex="0">Sign out</a>
      </div>
    );
  }
}
