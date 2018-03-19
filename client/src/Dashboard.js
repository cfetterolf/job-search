import React, { Component } from 'react';
import styled from 'styled-components';

import NavBar from './components/NavBar';

const Sidebar = styled.div`
  background: red;
  padding: 20px;
  height: 100%;
`;

const Timeline = styled.div`
  background: blue;
  padding: 20px;
  margin-top: 30px;
  height: 550px;
`;

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
    const body = (
      //<div class="container">
        <div class="row">
          <div class="col-2">
            <Sidebar />
          </div>

          <div class="col-10">
            <div class="container">
              <Timeline />
            </div>
          </div>
        </div>
      //</div>
    );

    return (
      <div className="Dashboard">
        <NavBar />
        {body}
      </div>
    );
  }
}

export default Dashboard;
