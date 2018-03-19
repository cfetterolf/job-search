import React, { Component } from 'react';
import styled from 'styled-components';

//import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';

const Row = styled.div``;
const Container = styled.div``;
const OuterDiv = styled.div``;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // fetch('/api/movies/')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.status_text);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.setState({ movies: data });
    //   })
    //   .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  render() {

    let body;
    if (!body) {
      body = <Timeline />;
    } else {
      body = <Timeline />;
    }

    return (
      <OuterDiv class="Dashboard">

        <Container class="container-fluid">
          <Row clas="row">
            <Sidebar />
            {body}
          </Row>
        </Container>
      </OuterDiv>
    );
  }
}

export default Dashboard;
