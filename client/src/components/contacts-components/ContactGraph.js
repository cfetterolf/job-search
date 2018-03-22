import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
//import styled from 'styled-components';
//import '../css/Contacts.css';

class ContactGraph extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const settings = {
      drawEdges: true,
      clone: false,
      defaultNodeColor: '#C93A3C',
      defaultEdgeColor: '#F4D8D8',
    }
    return (
      <div>
        Graph
        <Sigma graph={defaultGraph} settings={settings}>
          <RelativeSize initialSize={15} />
        </Sigma>
      </div>
    ); // can use <RandomizeNodePositions/> to make nodes random
  }
}

export default ContactGraph;

const defaultGraph = {
  "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 3,
      "y": 1,
      "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 1,
      "y": 3,
      "size": 1
    }
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
  ]
}
