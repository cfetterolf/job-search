import React from 'react';
import ReactLoading from 'react-loading';
import { loginWithGoogle } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
import firebase from 'firebase';
import { colors } from '../config/constants';
import icon from '../img/g-light.png';
import img1 from '../img/landing-img-1.png';
import img2 from '../img/landing-img-2.png';
import '../css/SignIn.css';

const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';
const firebaseUser = 'firebaseUser';
const styles = {
  bg: {
    //background: '#eee url(https://subtlepatterns.com/patterns/extra_clean_paper.png)',
    background: '#34447A',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    overflowY: 'scroll',
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
            const defaultContent = "This is an example message.  Notice how you can use different variables, like $FIRSTNAME or $COMPANY, to compose this message.  Try filling in the corresponding fields on the left and see what happens!"
            userObj.contacts = snapshot.val() ? snapshot.val().contacts : {};
            userObj.template = snapshot.val() ? snapshot.val().template : { position: '', content: defaultContent, subject: '' };
          })
            .then(() => {
            // set the firebase user
              localStorage.setItem(firebaseUser, JSON.stringify(userObj));

              // go to dashboard
              this.props.login();
            });
        } catch (error) {
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
              Back
              </a>
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
  <div style={styles.bg}>
    <div className="row">
      <div className="col-md-4 offset-2">
        <div>
          <h1 className="title-lg">Endeavor</h1>
          <br />
          <h4 className="subtitle-light">
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
        <div className="col-md-6">
          <div className="fadein">
            <img src={img2} className="landing-img" id="f2" alt=""/>
            <img src={img1} className="landing-img" id="f1" alt=""/>
          </div>
        </div>
    </div>
  </div>
);
