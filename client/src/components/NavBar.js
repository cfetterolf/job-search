import React from 'react';
import { Avatar } from 'material-ui';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import glassdoorIcon from '../img/glassdoor.png';
import { colors } from '../config/constants';
import '../css/NavBar.css';

const welcomeText = (
  <div style={{ color: colors.text }}>
    <p>Here you will find some useful tools that may assist you in your next job hunt.</p>
    <p>In the <strong>Timeline</strong> section, you can find table that help organize your tasks in a linear fashion.</p>
    <p>The <strong>Tasks</strong> section helps you track applicaitons you need to comlete and other things you need to do.</p>
    <p>Click on <strong>Contacts</strong> to record and view any contacts you need to reach out and network with, in either a list or graph format.</p>
    <p>In <strong>Discover</strong>, you can enter someone's name and company to find a possible email address.</p>
    <p>Finally, use the <strong>Connect</strong> section to import a contact's information into a template, and send a networking email!</p>
  </div>
);

/*
 * props:
 *    user - firebaseUser object
 *    logoutClicked() - callback
 */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(type) {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const helpModal = (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-example">
        <ModalHeader toggle={this.toggle}>Welcome to <strong>Endeavor!</strong></ModalHeader>
        <ModalBody>
          {welcomeText}
        </ModalBody>
        <ModalFooter>
          <Button outline color="success" onClick={() => this.toggle('modal')}>Got It!</Button>
        </ModalFooter>
      </Modal>
    );

    const brand = (
      <div className="navbar-header">
        <a className="navbar-brand" role="button" tabIndex="0">
          Endeavor
        </a>
      </div>
    );

    const helpIcon = (
      <span onClick={this.toggle} className="nav-item ml-auto" id="helpSpan">
        <i className="far fa-question-circle" id="helpIcon"></i>
      </span>
    );

    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          {helpModal}
          {brand}
          {helpIcon}
          <UserIcon photoURL={this.props.user.photoURL} logoutClicked={this.props.logoutClicked()}/>
        </div>
      </nav>
    );
  }
}

const UserIcon = ({photoURL, logoutClicked}) => (
  <span>
    <div className="btn-group dropdown">
      <a className="user-icon" id="userDropdown" role="button" tabIndex="0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <Avatar src={photoURL} />
      </a>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
        <a className="dropdown-item" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin" style={{marginRight: '10px'}}></i>
          LinkedIn
        </a>
        <a className="dropdown-item" href="https://www.glassdoor.com" target="_blank" rel="noopener noreferrer">
          <img src={glassdoorIcon} alt="" style={{width: '16px', margin: '-3px 10px 0 0'}} />
          Glassdoor
        </a>
        <a className="dropdown-item" href="https://www.github.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" style={{marginRight: '10px'}}></i>
          GitHub
        </a>
        <div className="dropdown-divider" />
        <a style={{textAlign: 'center'}} className="dropdown-item logout" role="button" tabIndex="0" onClick={() => logoutClicked()}>
          Log Out
        </a>
      </div>
    </div>
  </span>
);

export default NavBar;
