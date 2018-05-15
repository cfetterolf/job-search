import React, { Component } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

class List extends React.Component {

    constructor(props) {
      super(props);

      this.state = {};
    }
    
  render() {
    let cards = this.props.cards.map((card) => {
      return <Card key={card.id}
                   taskCallbacks={this.props.taskCallbacks}
                   {...card} />
    });

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default List;
