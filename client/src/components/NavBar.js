import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'material-ui';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import glassdoorIcon from '../img/glassdoor.png';
import { colors } from '../config/constants';
import brandIcon from '../img/endeavor_icon.png';
import '../css/NavBar.css';

const Section = styled.span`
  font-weight: bold;
  color: ${colors.light_blue};
`;

const Title = styled.span`
  font-weight: bold;
  color: ${colors.bg};
`;

const welcomeText = (
  <div style={{ color: colors.text }}>
    <p>Here you will find some useful tools that may assist you in your next job hunt.</p>
    <p>In the <Section>Timeline</Section> section, you can find table that helps organize your tasks in a linear fashion.</p>
    <p>The <Section>Tasks</Section> section helps you track ongoing job applications and other things you need to do.</p>
    <p>Click on <Section>Contacts</Section> to see a table of every contact you hope to network with, in either a list or graph format.</p>
    <p>In <Section>Discover</Section>, you can enter someone's name and company to find a valid email address.</p>
    <p>Finally, use the <Section>Connect</Section> section to import a contact's information into a template, and send a networking email!</p>
  </div>
);

/*
 * props:
 *    user - firebaseUser object
 *    showHelp - boolean
 *    logoutClicked() - callback
 */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.showHelp,
    };

    this.toggle = this.toggle.bind(this);
    this.closeHelp = this.closeHelp.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  closeHelp() {
    const user = JSON.parse(localStorage.getItem('firebaseUser'));
    user.firstLogin = false;
    localStorage.setItem('firebaseUser', JSON.stringify(user));
    this.toggle();
  }

  render() {
    const helpModal = (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-example">
        <ModalHeader toggle={this.toggle}>Welcome to <Title>Endeavor!</Title></ModalHeader>
        <ModalBody>
          {welcomeText}
        </ModalBody>
        <ModalFooter>
          <Button outline color="success" onClick={() => this.closeHelp()}>Got It</Button>
        </ModalFooter>
      </Modal>
    );

    const brand = (
      <div className="navbar-header">
        <a className="navbar-brand" role="button" tabIndex="0">
          <img
            src={brandIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
            style={{ marginRight: '7px' }}
          />
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
