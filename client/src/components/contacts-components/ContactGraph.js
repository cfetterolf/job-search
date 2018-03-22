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
    const myGraph = {nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]};
    return (
      <div>
        Graph
        <Sigma graph={myGraph} settings={{drawEdges: true, clone: false}}>
          <RelativeSize initialSize={15} />
          <RandomizeNodePositions />
        </Sigma>
      </div>
    );
  }
}

export default ContactGraph;
