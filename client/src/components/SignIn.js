import React from 'react';
import {FontIcon, RaisedButton} from "material-ui";
import ReactLoading from 'react-loading';
import {loginWithGoogle} from "../helpers/auth";
import {firebaseAuth} from "../config/constants";
import styled from 'styled-components';
import {colors} from '../config/constants';
import icon from '../img/g-light.png';
import '../css/SignIn.css';

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const firebaseUser = "firebaseUser";
const styles = {
  bg: {
    background: '#eee url(https://subtlepatterns.com/patterns/extra_clean_paper.png)',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '200px',
    height: 'auto',
    boxShadow: '0 1px 3px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    borderRadius: '3px'
  },
  center: {
    marginTop: '-100px',
  }
}



export default class SignIn extends React.Component   {

  constructor(props) {
    super(props);

    this.state = {
      splashScreen: false
    };

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin() {
    loginWithGoogle()
      .catch(function (error) {
        alert(error); // or show toast
        localStorage.removeItem(firebaseAuthKey);
      });
    localStorage.setItem(firebaseAuthKey, "1");
    this.setState({splashScreen: true});
  }

  componentWillMount() {
    // We have appToken relevant for our backend API
    if (localStorage.getItem(appTokenKey)) {
      this.props.history.push("/app/dash");
      return;
    }

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        localStorage.removeItem(firebaseAuthKey);

        // here you could authenticate with you web server to get the
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem(appTokenKey, user.uid);

        // set the firebase user
        localStorage.setItem(firebaseUser, JSON.stringify(user));

        // go to dashboard
        this.props.history.push("/app/dash")
      } else {
        console.log('error in login');
        localStorage.removeItem(firebaseAuthKey);
      }
    });
  }

  reset() {
    localStorage.removeItem(firebaseAuthKey);
    this.props.history.push("/")
  }

  render() {
    const SplashScreen = () => (
      <div className='center'>
        <div className='mt-lg'>
          <h4 className='subtitle'>Loading...</h4>
          <ReactLoading
            type="bars"
            color={colors.bg}
            width='150px'
            height='50px'
          />
          <h4 className='subtitle mt-lg'>Not working?</h4>
          <a role='button' tabIndex='0' onClick={() => {this.reset}}>Take me back</a>
        </div>
      </div>
    );

    if ((localStorage.getItem(firebaseAuthKey) === "1")) {
      return <SplashScreen />;
    }
    return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
  }

}

const LoginPage = ({handleGoogleLogin}) => (
    <div>
      <div style={styles.bg}>
        <div style={styles.center}>
          <div>
            <h1 className="title">Job Search App</h1>
            <br/>
            <h4 className="subtitle">
              Click below to get started
            </h4>
          </div>
          <img
            src={icon}
            id="signInBtn"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
);
