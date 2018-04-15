import React from 'react';
import { Graph } from 'react-d3-graph';
// import styled from 'styled-components';
// import '../css/Contacts.css';


const data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};

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
  window.alert('Clicked node ${nodeId}');
};

const onMouseOverNode = function(nodeId) {
  window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
  window.alert(`Mouse out node ${nodeId}`);
};


class ContactGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{backgroundColor: 'red'}}>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
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
