import React from 'react';

import MovieSummary from './MovieSummary';
import MovieDetail from './MovieDetail';

class MovieContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ detail: !this.state.detail });
  }

  render() {
    const View = (this.state.detail) ? MovieDetail : MovieSummary;
    return (<View
      {...this.props}
      onClick={this.handleClick}
    />);
  }
}

export default MovieContainer;
