import React from 'react';
import '../css/Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.sections[0],
    };
  }

  handleSelection(newSection) {
    this.setState({ active: newSection }); // make new section active
    this.props.setSection(newSection); // callback function
  }

  render() {
    const icons = ['fas fa-home', 'fas fa-clipboard-check', 'fas fa-address-book', 'fa fa-search', 'fas fa-envelope'];
    return (
      <nav className="col-sm-3 col-md-2 hidden-xs-down sidebar" >
        <hr />
        <ul className="nav nav-pills flex-column">
          {this.props.sections.map(function (sectionName, index) {
            const activeClass = this.state.active === sectionName ? 'nav-link active' : 'nav-link';
            return (
              <li key={index} className="nav-item">
                <a className={activeClass} onClick={() => { this.handleSelection(sectionName); }} role="button" tabIndex="0">
                  <i className={`icon ${icons[index]}`} />
                  <span className="section-title">{sectionName}</span>
                </a>

              </li>
            );
          }, this)}
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
