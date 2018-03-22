import React from 'react';
//import styled from 'styled-components';
import '../css/Sidebar.css';

class Sidebar extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.sections[0],
    };
  }

  handleSelection(newSection) {
    this.setState({ active: newSection });  // make new section active
    this.props.setSection(newSection);      // callback function
  }

  render() {
    return (
      <nav className="col-sm-3 col-md-2 hidden-xs-down sidebar" >
        <ul className="nav nav-pills flex-column">
          {this.props.sections.map(function(sectionName){
            let activeClass = this.state.active === sectionName ? 'nav-link active' : 'nav-link';
            return (
              <li className="nav-item">
                <a key={sectionName} className={activeClass} onClick={() => { this.handleSelection(sectionName); }} role="button" tabindex="0">
                  {sectionName}
                </a>
              </li>
            );
          }, this)}
        </ul>
      </nav>
    );
  }
}

// <li className="nav-item">
//   <a className="nav-link active" href="" onClick={() => { this.props.setSection(i); }}>
//     Timeline<span className="sr-only">(current)</span>
//   </a>
// </li>

export default Sidebar;
