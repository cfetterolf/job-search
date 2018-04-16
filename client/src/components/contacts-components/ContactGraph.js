import React from 'react';
import { Graph } from 'react-d3-graph';
// import styled from 'styled-components';
// import '../css/Contacts.css';

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue'
  },
  link: {
    highlightColor: 'lightblue'
  }
};

// graph event callbacks
const onClickNode = function(nodeId) {
  console.log('Clicked node ${nodeId}');
};

const onMouseOverNode = function(nodeId) {
  console.log(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
  console.log(`Mouse out node ${nodeId}`);
};


/*
 * props: data - the contacts object
*/
class ContactGraph extends React.Component {
  constructor(props) {
    super(props);

    this.setByName = this.setByName.bind(this);

    this.state = {
      graphData: {
        nodes: [{ id: 'Me' }],
        links: []
      }
    };
  }

  componentDidMount() {
    this.setByName();
  }

  setByName() {
    let data = this.state.graphData;

    Object.keys(this.props.data).map(function(id) {
      const contact = this.props.data[id];
      const name = contact.f_name+' '+contact.l_name;

      data.nodes.push({ id: name });
      data.links.push({ source: 'Me', target: name });
    }, this);

    this.setState({ graphData: data });
  }

  render() {
    return (
      <div>
        <Graph
          id="graph-id" // id is mandatory
          data={this.state.graphData}
          config={myConfig}
          onClickNode={onClickNode}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
        />;
      </div>
    ); // can use <RandomizeNodePositions/> to make nodes random
  }
}

export default ContactGraph;
