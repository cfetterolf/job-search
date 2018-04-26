import React from 'react';
import { Graph } from 'react-d3-graph';
// import styled from 'styled-components';
// import '../css/Contacts.css';

const myConfig = {
  nodeHighlightBehavior: false,
  node: {
    color: '#C63D0F',
    fontSize: 15,
    highlightStrokeColor: '#772409',
  },
  link: {
    highlightColor: '#f6a488',
    semanticStrokeWidth: true,
  },
};

// graph event callbacks
// const onClickNode = function(nodeId) {
//   console.log(`Clicked node ${nodeId}`);
// };
//
// const onMouseOverNode = function(nodeId) {
//   console.log(`Mouse over node ${nodeId}`);
// };
//
// const onMouseOutNode = function(nodeId) {
//   console.log(`Mouse out node ${nodeId}`);
// };


/*
 * props: data - the contacts object
*/
class ContactGraph extends React.Component {
  constructor(props) {
    super(props);

    this.setBy = this.setBy.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);

    this.state = {
      graphData: {},
    };
  }

  componentWillMount() {
    this.setBy('name');
  }

  handleDropdown(event) {
    this.setBy(event.target.value);
  }

  setBy(key) {
    const data = {
      nodes: [{ id: 'Me', size: 600 }],
      links: [],
    };

    for (const id in this.props.data) {
      const contact = this.props.data[id];
      const name = `${contact.f_name} ${contact.l_name}`;
      data.nodes.push({ id: name, size: 200 });

      if (key !== 'name') { // 'company' or 'city'
        const bigNode = { id: contact[key], size: 400 };
        if (!data.nodes.includes(bigNode)) {
          data.nodes.push(bigNode);
          data.links.push({ source: bigNode.id, target: 'Me' });
        }
        data.links.push({ source: bigNode.id, target: name });
      } else {
        data.links.push({ source: 'Me', target: name });
      }
    }

    this.setState({ graphData: data });
  }

  render() {
    return (
      <div className="row graph">
        <span className="col-3 graph-type">
          <label
            className=""
            htmlFor="graphSelect"
          >Organize By:
          </label>
          <select id="graphSelect" className="form-control" onChange={this.handleDropdown}>
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="city">City</option>
          </select>
        </span>
        <div className="graph-data">
          <Graph
            style={{ display: 'block', margin: '0 auto' }}
            id="graph-id" // id is mandatory
            data={this.state.graphData}
            config={myConfig}
          />
        </div>
      </div>
    );
  }
}

export default ContactGraph;
