import React from 'react';
//import styled from 'styled-components';
import '../css/Contacts.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ContactList from './contacts-components/ContactList';
import ContactGraph from './contacts-components/ContactGraph';

const dummyList = {
  1: {
    city: "San Francisco",
    company: "Quid",
    email: "cfetterolf@middlebury.edu",
    f_name: "Bob",
    l_name: "Smith",
    note: "Met at Tech Trek Dinner.  Son Matt knows Alex from school.",
  },
  2: {
    city: "San Francisco",
    company: "Thumbtack",
    email: "chrisy.fetterolf@gmail.com",
    f_name: "Chicken",
    l_name: "Little",
    note: "Met at Tech Trek Dinner.  Cool cluck.",
  },
}

class Contacts extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'list',
    };
  }

  handleTabClick(e) {
    this.setState({ selected: e });
  }

  render() {
    /* conditionally set selected tab */
    let listStyle = { color: '#9D7618', fontWeight: 'normal', backgroundColor: 'inherit' };
    let graphStyle = { color: '#C93A3C', fontWeight: 'normal', backgroundColor: 'inherit' };
    if (this.state.selected === 'list') {
      listStyle.backgroundColor = '#FFF5DB';
      listStyle.fontWeight = 'bold';
    } else {
      graphStyle.backgroundColor = '#F4D8D8';
      graphStyle.fontWeight = 'bold';
    }

    /* conditionally set body */
    let body = this.state.selected === 'list' ? <ContactList list={dummyList}/> : <ContactGraph />;

    return (
      <div className="container-fluid">
        <div className="tab-header">
          <button id="listTab" className="tab-link" style={listStyle} onClick={() => this.setState({ selected: 'list' })}>
            List
          </button>
          <button id="graphTab" className="tab-link" style={graphStyle} onClick={() => this.setState({ selected: 'graph' })}>
            Graph
          </button>
        </div>
        <span id="listBorder"></span><span id="graphBorder"></span>
        <div className="tab-body">
          {body}
        </div>
      </div>
    );
  }
}

export default Contacts;
