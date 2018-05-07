import React from 'react';
import firebase from 'firebase';
import EmailTemplate from './EmailTemplate';
import ContactListSmall from '../contacts-components/ContactListSmall';
import InputFields from './InputFields';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import sendIcon from '../../img/paper_plane.png';
import successIcon from '../../img/checkmark.png';
import errorIcon from '../../img/error.png';
import '../../css/Connect.css';

const database = firebase.database();

class Template extends React.Component {
  constructor(props) {
    super(props);

    const template = props.user.template.templates[props.user.template.default];
    this.state = {
      uid: this.props.user.user.uid,
      defaultID: props.user.template.default,
      templates: props.user.template.templates,
      curTempID: props.user.template.default,
      curTempName: template.name,
      name: '',
      company: '',
      city: '',
      position: template.position ? template.position : '',
      email: '',
      subject: template.subject ? template.subject : '',
      password: '',
      content: template.content ? template.content : '',
      readOnly: true,
      modal: false,
      alertModal: false,
      modalMsg: 'Sending Email...',
      modalImg: 'sending',
      curContact: null,
    };

    this.toggle = this.toggle.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.chooseTemplate = this.chooseTemplate.bind(this);
    this.setNewTemplate = this.setNewTemplate.bind(this);
    this.setDefaultTemplate = this.setDefaultTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
  }

  toggle(type) {
    if (type === 'modal') {
      this.setState({ modal: !this.state.modal });
    } else {
      this.setState({ alertModal: !this.state.alertModal });
    }
  }

  setFields(contactID) {
    const contact = this.props.user.contacts[contactID];
    this.setState({
      name: `${contact.f_name} ${contact.l_name}`,
      company: contact.company,
      city: contact.city,
      email: contact.email,
      modal: !this.state.modal,
      curContact: contactID,
    });
  }

  handleTextUpdate(field, event) {
    if (field === 'name' || field === 'email') {
      this.setState({ curContact: null, [field]: event.target.value });
    } else {
      this.setState({ [field]: event.target.value });
    }
  }

  deleteTemplate(tempID) {
    if (window.confirm('Are you sure you want to permanently delete this template?')) {

      const templates = this.state.templates;

      if (Object.keys(templates).length <= 1) {
        window.alert("That's your last template!  You can't delete it.");
        return;
      }

      delete templates[tempID];
      const newDefaultID = tempID === this.state.defaultID ? parseInt(Object.keys(templates)[0], 10) : this.props.user.template.default;

      const templateObj = {
        default: newDefaultID,
        templates: templates
      };

      // update localStorage
      const user = JSON.parse(localStorage.getItem('firebaseUser'));
      user.template = templateObj;
      localStorage.setItem('firebaseUser', JSON.stringify(user));

      // update Firebase
      database.ref(`users/${user.user.uid}/template/`).set(templateObj);

      // update state
      this.setState({
        templates: templates,
        defaultID: newDefaultID
      }, () => {
        this.chooseTemplate(newDefaultID);
      })
    }
  }

  chooseTemplate(tempID) {
    const template = this.state.templates[tempID];
    this.setState({
      curTempID: tempID,
      curTempName: template.name,
      position: template.position,
      subject: template.subject,
      content: template.content,
    });
  }

  setNewTemplate(tempID, newTemp) {
    const self = this;
    this.setState({
      curTempID: tempID,
      curTempName: newTemp.name,
      position: newTemp.position,
      subject: newTemp.subject,
      content: newTemp.content,
    }, () => {
      self.saveContent(newTemp.content, tempID, newTemp.name)
    });
  }

  setDefaultTemplate() {
    // update firebase
    database.ref(`users/${this.state.uid}/template/default`).set(this.state.curTempID);

    // update localStorage
    const user = JSON.parse(localStorage.getItem('firebaseUser'));
    user.template.default = this.state.curTempID;
    localStorage.setItem('firebaseUser', JSON.stringify(user));

    // update state
    this.setState({ defaultID: this.state.curTempID });

    window.alert(`${this.state.templates[this.state.curTempID].name} is now your default template.`);
  }

  saveContent(newContent, tempID, curTempName) {
    const template = {
      content: newContent,
      position: this.state.position,
      subject: this.state.subject,
      name: curTempName ? curTempName : this.state.curTempName,
    };

    // save new content to firebase
    database.ref(`users/${this.state.uid}/template/templates/${tempID}`).set(template);

    // update localStorage
    const user = JSON.parse(localStorage.getItem('firebaseUser'));
    user.template.templates[tempID] = template;
    localStorage.setItem('firebaseUser', JSON.stringify(user));

    // update state
    this.setState({
      content: newContent,
      curTempName: curTempName,
      curTempID: tempID,
      templates: user.template.templates
    }, () => {
      console.log('saved content.  New state:', this.state);
    });
  }

  sendEmail(content) {
    if (!this.state.email || !this.state.password) {
      window.alert('Please enter a valid email address and password.');
      return;
    }

    // Activate our email status modal
    this.setState({ modalMsg: 'Sending Email...', modalImg: 'sending' });
    this.toggle('alertModal');

    const body = {
      to: this.state.email,
      from: this.props.user.user.email,
      name: this.props.user.user.displayName,
      password: this.state.password,
      subject: this.state.subject,
      content,
    };

    // Send email via NodeJS endpoint
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({ 'Content-type': 'application/json' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then((response) => {
        let msg, img;
        if (response.error) {
          console.log(response.error);
          msg = 'Could not send email.  Make sure to unlock your account by clicking the links below.';
          img = 'error';
        } else {
          msg = `Email successfully sent to ${response.info.envelope.to}!`;
          img = 'success';
          if (this.state.curContact) {

            // update firebase
            database.ref(`users/${this.props.user.user.uid}/contacts/${this.state.curContact}/emailed`).set(true);

            // update localStorage
            const user = JSON.parse(localStorage.getItem('firebaseUser'));
            user.contacts[this.state.curContact].emailed = true;
            localStorage.setItem('firebaseUser', JSON.stringify(user));
          }
        }

        this.setState({
          modalMsg: msg,
          modalImg: img
        });
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  render() {
    // Create our import contacts list
    const contactsModal = (
      <Modal isOpen={this.state.modal} toggle={() => this.toggle('modal')} className="modal-example">
        <ModalHeader toggle={() => this.toggle('modal')}>Choose Contact to Import</ModalHeader>
        <ModalBody>
          <ContactListSmall
            contacts={this.props.user.contacts}
            clicked={contactID => this.setFields(contactID)}
          />
        </ModalBody>
        <ModalFooter>
          <Button outline color="danger" onClick={() => this.toggle('modal')}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );

    // Conditionally create our email alert modal
    let modalImg;
    if (this.state.modalImg === 'sending') {
      modalImg = sendIcon;
    } else if (this.state.modalImg === 'success') {
      modalImg = successIcon;
    } else {
      modalImg = errorIcon;
    }

    const alertModal = (
      <Modal isOpen={this.state.alertModal} toggle={() => this.toggle('alertModal')}>
        <ModalBody className="alert">
          {this.state.modalMsg}<br/>
          <img src={modalImg} className="modal-img" alt=""/>
        </ModalBody>
      </Modal>
    );

    const inputFields = (
      <InputFields
        {...this.state}
        toggle={type => this.toggle(type)}
        handleTextUpdate={(field, e) => this.handleTextUpdate(field, e)}
      />
    );

    const emailTemplate = (
      <div className="col-md-8">
        <EmailTemplate
          {...this.state}
          saveContent={(content, tempID, name) => this.saveContent(content, tempID, name)}
          sendEmail={content => this.sendEmail(content)}
          chooseTemplate={tempID => this.chooseTemplate(tempID)}
          setNewTemplate={(tempID, newTemp) => this.setNewTemplate(tempID, newTemp)}
          deleteTemplate={() => this.deleteTemplate(this.state.curTempID)}
          setDefaultTemplate={() => this.setDefaultTemplate()}
        />
      </div>
    );

    return (
      <div className="form template-form">
        <div className="row" style={{ height: '100%' }}>
          {contactsModal}
          {alertModal}
          {inputFields}
          {emailTemplate}
        </div>
      </div>
    );
  }
}

export default Template;
