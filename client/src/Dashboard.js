import React, { Component } from 'react';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import Tasks from './components/Tasks';
import Contacts from './components/Contacts';
import Discover from './components/Discover';

const bodyStyle = {
  paddingLeft: '0px',
  paddingRight: '0px',
  backgroundColor: 'white',
  position: 'fixed',
  top: '56px',
  bottom: '0',
  right: '0',
  zIndex: '1000',
  padding: '10px',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const sections = ['Timeline', 'Tasks', 'Contacts', 'Discover'];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: sections[0], // current section on sidebar
    };
  }

  componentDidMount() {
    /* dummy GET to test connection */
    // fetch('/api/')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.status_text);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.setState({ selected: data.response });
    //   })
    //   .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  render() {

    /* conditionally set body based on section selected */
    let body;
    if (this.state.selected === "Timeline") {
      body = <Timeline />;
    } else if (this.state.selected === "Tasks") {
      body = <Tasks />;
    } else if (this.state.selected === "Contacts") {
      body = <Contacts />;
    } else if (this.state.selected === "Discover") {
      body = <Discover />;
    } else {
      body = <div>Something went wrong!</div>;
    }

    return (
      <div className="Dashboard">
        <NavBar />
        <div className="container-fluid">
          <div clas="row">
            <Sidebar
              setSection={ (s) => this.setState({selected: s}) } // callback function
              sections={sections}
            />
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" style={bodyStyle}>
              {body}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
