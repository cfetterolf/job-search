import React, { Component } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

class List extends React.Component {

    constructor(props) {
      super(props);

      this.state = {};
    }
    
  render() {
    const cards = this.props.cards.map(card => (<Card
      key={card.id}
      taskCallbacks={this.props.taskCallbacks}
      {...card}
    />));

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
<<<<<<< HEAD
};

=======
}
>>>>>>> f9c80bcad6a3a66ecfab5fd02e23ed376942ccae
List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
};

export default List;
