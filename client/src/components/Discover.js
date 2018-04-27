import React from 'react';
// import styled from 'styled-components';
import '../css/Discover.css';
import Template from './discover-components/Template';

const message = {
  greeting: 'Hi ',
  intro: ', \n\nMy name is Chris Fetterolf and I attend Middlebury College in Vermont.',
};

const dummy = {
  name: 'Chris Fetterolf',
  company: 'Quid',
  position: 'Software Engineering Intern',
  email: 'chris.fetterolf@gmail.com',
  content: message,
};

class Discover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Chris Fetterolf',
      company: 'Quid',
      position: 'Software Engineering Intern',
      email: 'chris.fetterolf@gmail.com',
      content: dummy.content.greeting + dummy.name + dummy.content.intro,
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

  render() {
    return (
      <div className="container-fluid wrapper">
        <Template user={JSON.parse(localStorage.getItem('firebaseUser'))} />
      </div>
    );
  }
}

export default Discover;
