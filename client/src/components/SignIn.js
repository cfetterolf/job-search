import React from 'react';
import ReactLoading from 'react-loading';
import { loginWithGoogle } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
import firebase from 'firebase';
import { colors } from '../config/constants';
import icon from '../img/g-light.png';
import '../css/SignIn.css';

const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';
const firebaseUser = 'firebaseUser';
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
    borderRadius: '3px',
  },
  center: {
    marginTop: '-100px',
  },
};

/*
 * props: login - callback function when user is logged in
*/
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreen: false,
    };

    this.reset = this.reset.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin() {
    loginWithGoogle()
      .catch((error) => {
        alert(error); // or show toast
        localStorage.removeItem(firebaseAuthKey);
      });
    localStorage.setItem(firebaseAuthKey, '1');
  }

  componentWillMount() {
    // We have appToken relevant for our backend API
    if (localStorage.getItem(firebaseUser)) {
      this.props.login();
      return;
    }

    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        try {
          localStorage.removeItem(firebaseAuthKey);
          localStorage.setItem(appTokenKey, user.uid);

          const userObj = {
            user,
          };

          // get contacts
          const path = `users/${user.uid}`;
          firebase.database().ref(path).once('value').then((snapshot) => {
            userObj.contacts = snapshot.val() ? snapshot.val().contacts : {};
            userObj.template = snapshot.val() ? snapshot.val().template : { position: '', content: '', subject: '' };
          })
          .then(() => {
            // set the firebase user
            localStorage.setItem(firebaseUser, JSON.stringify(userObj));

            // go to dashboard
            this.props.login();
          });
        }

        catch(error) {
          console.log(error);
          localStorage.removeItem(firebaseAuthKey);
          this.setState({ splashScreen: false });
        }
      }
    });
  }

  reset() {
    localStorage.removeItem(firebaseAuthKey);
    this.setState({ splashScreen: false });
  }

  render() {
    const SplashScreen = () => (
      <div className="center">
        <div className="mt-lg">
          <h4 className="subtitle">Loading...</h4>
          <ReactLoading
            type="bars"
            color={colors.bg}
            width="150px"
            height="50px"
          />
          <div className="mt-md">
            <span>
              Not Loading? <a role="button" tabIndex="0" onClick={() => this.reset}>
              Back</a>
            </span>
          </div>
        </div>
      </div>
    );

    if ((localStorage.getItem(firebaseAuthKey) === '1')) {
      return <SplashScreen />;
    }
    return <LoginPage handleGoogleLogin={this.handleGoogleLogin} />;
  }
}

const LoginPage = ({ handleGoogleLogin }) => (
  <div>
    <div style={styles.bg}>
      <div style={styles.center}>
        <div>
          <h1 className="title">Job Search App</h1>
          <br />
          <h4 className="subtitle">
              Click below to get started
          </h4>
        </div>
        {/*eslint-disable */}
          <img
            src={icon}
            id="signInBtn"
            onClick={handleGoogleLogin}
          />
          {/* eslint-enable */}
      </div>
    </div>
  </div>
);
