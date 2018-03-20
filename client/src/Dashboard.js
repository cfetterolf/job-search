import React, { Component } from 'react';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';

const Row = styled.div``;
const Container = styled.div``;
const OuterDiv = styled.div``;
const bodyStyle = {
  paddingLeft: '0px',
  paddingRight: '0px',
  backgroundColor: 'white',
  position: 'fixed',
  top: '56px',
  bottom: '0',
  right: '0',
  zIndex: '1000',
  padding: '10px',
  overflowX: 'hidden',
  overflowY: 'auto',
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  componentDidMount() {
    fetch('/api/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ selected: data.response });
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  render() {

    let body;
    if (this.state.selected === "Hello!") {
      body = <Timeline />;
    } else {
      body = (
        <div>
          <div>failedfailedfailedfailedfailedfailed</div>
        </div>
      );
    }

    return (
      <OuterDiv className="Dashboard">
        <NavBar />
        <Container className="container-fluid">
          <Row clas="row">
            <Sidebar />
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" style={bodyStyle}>
              {body}
            </main>
          </Row>
        </Container>
      </OuterDiv>
    );
  }
}

export default Dashboard;
