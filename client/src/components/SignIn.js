import React from 'react';
import {FontIcon, RaisedButton} from "material-ui";
import {loginWithGoogle} from "../helpers/auth";
import {firebaseAuth} from "../config/constants";
import splashImg from '../img/splash_image.jpg';
import styled from 'styled-components';

// Google Info
// Client ID
// 813819049284-3lij99gjqte25c5316k29f43buif1h17.apps.googleusercontent.com
// Client Secret
// ctL8XEKoWdDGOPpuyjGz4PGi

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const firebaseUser = "firebaseUser";
const BackgroundImage = styled.img`
height: auto;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
`;


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
  }

  componentWillMount() {
        /**
         * We have appToken relevant for our backend API
         */
        if (localStorage.getItem(appTokenKey)) {
            this.props.history.push("/app/dash");
            return;
        }

        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                console.log("User signed in: ", JSON.stringify(user));

                localStorage.removeItem(firebaseAuthKey);

                // here you could authenticate with you web server to get the
                // application specific token so that you do not have to
                // authenticate with firebase every time a user logs in
                localStorage.setItem(appTokenKey, user.uid);

                // set the firebase user
                localStorage.setItem(firebaseUser, JSON.stringify(user));

                // store the token
                this.props.history.push("/app/dash")
            }
        });
    }


    render() {
      if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
      return (
        <div>
          <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>
          <BackgroundImage src={splashImg} />
        </div>
      );
    }
}

const iconStyles = {
    color: "#ffffff"
};

const LoginPage = ({handleGoogleLogin}) => (
    <div>
        <h1>Login</h1>
        <div>
            <RaisedButton
                label="Sign in with Google"
                labelColor={"#ffffff"}
                backgroundColor="#dd4b39"
                icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                onClick={handleGoogleLogin}
            />
        </div>
    </div>
);

const SplashScreen = () => (<p>Loading...</p>)
