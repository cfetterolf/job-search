import React from 'react';
import EmailTemplate from './EmailTemplate';
import ContactListSmall from '../contacts-components/ContactListSmall';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../css/Discover.css';
import firebase from 'firebase';

const database = firebase.database();

const styles = {
  form: {
    backgroundColor: 'white',
    borderRadius: '10px',
  },
};

const showPopUp = (msg) => {
  console.log(msg);
  window.alert(msg);
}

class Template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      company: '',
      city: '',
      position: props.user.template.position ? props.user.template.position : '',
      email: '',
      subject: props.user.template.subject ? props.user.template.subject : '',
      password: '',
      content: props.user.template.content ? props.user.template.content : '',
      readOnly: true,
      modal: false,
    };

    this.handleName = this.handleTextUpdate.bind(this, 'name');
    this.handleCompany = this.handleTextUpdate.bind(this, 'company');
    this.handleCity = this.handleTextUpdate.bind(this, 'city');
    this.handlePosition = this.handleTextUpdate.bind(this, 'position');
    this.handleEmail = this.handleTextUpdate.bind(this, 'email');
    this.handleSubject = this.handleTextUpdate.bind(this, 'subject');
    this.handleContent = this.handleTextUpdate.bind(this, 'content');
    this.handlePassword = this.handleTextUpdate.bind(this, 'password');

    this.toggle = this.toggle.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setFields(contact) {
    this.setState({
      name: `${contact.f_name} ${contact.l_name}`,
      company: contact.company,
      city: contact.city,
      email: contact.email
    });

    this.setState({ modal: !this.state.modal });
  }

  handleTextUpdate(field, event) {
    this.setState({ [field]: event.target.value });
  }

  saveContent(newContent) {
    const template = {
      content: newContent,
      position: this.state.position,
      subject: this.state.subject,
    }

    // save new content to firebase
    database.ref(`users/${this.props.user.user.uid}/template`).set(template);

    // update localStorage
    const user = JSON.parse(localStorage.getItem('firebaseUser'));
    user.template = template;
    localStorage.setItem('firebaseUser', JSON.stringify(user));

    // update state
    this.setState({ content: newContent });
  }

  sendEmail(content) {
    if (!this.state.email || !this.state.password) {
      window.alert("Please enter a valid email address and password.");
      return;
    }

    var body = {
      to: this.state.email,
      from: this.props.user.user.email,
      name: this.props.user.user.displayName,
      password: this.state.password,
      subject: this.state.subject,
      content: content,
    }


    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({ 'Content-type': 'application/json' }),
    })
      .then((response) => {
        if (!response.ok) {
          window.alert(response.status_text);
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          window.alert(response.error);
        } else {
          showPopUp(`Email successfully sent to ${response.info.envelope.to}`);
        }
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console

  }

  render() {
    const inputFields = (
      <div className="col-md-4 form-input email-input">
        <div className="form-group email-input">
          <label htmlFor="inTop" id="topLabel">
            <strong>Contact Info</strong>
            <a role="button" tabIndex="0" onClick={this.toggle}>Import Contact</a>
          </label>
          <input id="inTop" type="text" name="name" placeholder="$FIRSTNAME $LASTNAME" value={this.state.name} onChange={this.handleName} />
          <input type="text" name="company" placeholder="$COMPANY" value={this.state.company} onChange={this.handleCompany} />
          <input type="text" name="city" placeholder="$CITY" value={this.state.city} onChange={this.handleCity} />
          <input type="text" name="position" placeholder="$POSITION" value={this.state.position} onChange={this.handlePosition} />
        </div>
        <div className="form-group email-input">
          <label id="label2" htmlFor="inMid"><strong>Email Details</strong></label>
          <input id="inMid" type="email" name="email" placeholder="Contact Email" value={this.state.email} onChange={this.handleEmail} />
          <input type="text" name="subject" placeholder="Subject Line of Email" value={this.state.subject} onChange={this.handleSubject} />
          <input type="password" name="password" placeholder="Your Email Password" value={this.state.password} onChange={this.handlePassword} />
        </div>
        <a
          href="https://myaccount.google.com/lesssecureapps"
          target="_blank"
          rel="noopener noreferrer">
          Grant App Access
        </a>
      </div>
    );

    const modal = (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-example">
        <ModalHeader toggle={this.toggle}>Choose Contact to Import</ModalHeader>
        <ModalBody>
          <ContactListSmall
            contacts={this.props.user.contacts}
            clicked={(contact) => this.setFields(contact)}
          />
        </ModalBody>
        <ModalFooter>
          <Button outline color="danger" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );

    return (
      <div className="form" style={styles.form}>
        <div className="row" style={{ height: '100%', }}>
          {inputFields}
          {modal}
          <div className="col-md-8">
            <div className="form-group email-temp">
              <label htmlFor="emailTemplate"><strong>Email Template</strong></label>
              <EmailTemplate
                {...this.state}
                saveContent={ content => this.saveContent(content) }
                sendEmail={ content => this.sendEmail(content) }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Template;
