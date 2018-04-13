import React from 'react';
//import styled from 'styled-components';
import '../../css/Discover.css';
import {colors} from '../../config/constants';
import firebase from 'firebase'

const database = firebase.database();
let contacts = {};

const styles = {
  form: {
    backgroundColor: colors.fill,
  },
}

const message = {
  greeting: "Hi ",
  intro: ", \n\nMy name is Chris Fetterolf and I attend Middlebury College in Vermont.",
}

const dummy = {
  name: "Chris Fetterolf",
  company: "Quid",
  position: "Software Engineering Intern",
  email: "chris.fetterolf@gmail.com",
  content: message,
}


class Template extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      name: "Chris Fetterolf",
      company: "Quid",
      position: "Software Engineering Intern",
      email: "chris.fetterolf@gmail.com",
      content: '',
    };

    this.handleName = this.handleTextUpdate.bind(this, 'name');
    this.handleCompany = this.handleTextUpdate.bind(this, 'company');
    this.handlePosition = this.handleTextUpdate.bind(this, 'position');
    this.handleEmail = this.handleTextUpdate.bind(this, 'email');
    this.handleContent = this.handleTextUpdate.bind(this, 'content');
  }

  handleTextUpdate(field, event) {
    this.setState({ [field]: event.target.value });
  }

  componentDidMount() {
    const path = 'users/' + this.props.user.uid + '/template';
    const self = this;
    database.ref(path).once('value').then(function(snapshot) {
      self.setState({ content: snapshot.val().content })
    });
    //this.setState({ content: getTemplate().content });
    //contacts = getContacts();
  }

  render() {
    return (
      <div className="form" style={styles.form}>
        <div className='row'>
          <div className='col-md-4 form-input'>
            <input type="text" name="name" placeholder="Full Name" value={this.state.name} onChange={this.handleName}/>
            <input type="text" name="company" placeholder="Company" value={this.state.company} onChange={this.handleCompany}/>
            <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handlePosition}/>
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail}/>
          </div>
          <div className='col-md-8'>
            <textarea className="email editor" value={this.state.content} onChange={this.handleContent}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Template;
