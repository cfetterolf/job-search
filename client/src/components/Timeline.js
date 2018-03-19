import React from 'react';
import styled from 'styled-components';
import '../css/Timeline.css';

class Timeline extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      // TODO - set state
    };
  }

  render() {
    return (
      <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div class="container-fluid test">
          Test
          <p> TEST </p>
          <p> TEST </p>
          <p> TEST </p>
          <p> TEST </p>
          <p> TEST </p>
          <p> TEST </p>
        </div>
      </main>
    );
  }
}

export default Timeline;
