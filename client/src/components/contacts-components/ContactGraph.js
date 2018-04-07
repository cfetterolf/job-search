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

          <RandomizeNodePositions />
        </Sigma>
      </div>
    ); // can use <RandomizeNodePositions/> to make nodes random
  }
}

export default ContactGraph;

const defaultGraph = {
  "nodes": [
    {
      "id": "root",
      "label": "Your Name Here",
      "size": 40
    },
    {
      "id": "microsoft",
      "label": "Microsoft",
      "size": 15
    },
    {
      "id": "amazon",
      "label": "Amazon",
      "size": 40
    },
    {
      "id": "google",
      "label": "Google",
      "size": 30
    },
  ],
  "edges": [
    {
      "id": "e0",
      "source": "root",
      "target": "microsoft"
    },
    {
      "id": "e1",
      "source": "root",
      "target": "google"
    },
    {
      "id": "e2",
      "source": "root",
      "target": "amazon"
    },
  ]
}
