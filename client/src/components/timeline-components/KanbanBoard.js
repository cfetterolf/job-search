import React, { Component} from 'react';
import List from './timeline-components/List';
import PropTypes from 'prop-types';

class KanbanBoard extends React.Component {
<<<<<<< HEAD
    constructor(props) {
      super(props);

      this.state = {};
    }
    
  render(){
=======
  render() {
>>>>>>> f9c80bcad6a3a66ecfab5fd02e23ed376942ccae
    return (
      <div className="app">
        <List
          id="todo"
          title="To Do"
          cards={this.props.cards.filter(card => card.status === 'todo')}
          taskCallbacks={this.props.taskCallbacks}
        />
        <List
          id="in-progress"
          title="In Progress"
          cards={this.props.cards.filter(card => card.status === 'in-progress')}
          taskCallbacks={this.props.taskCallbacks}
        />
        <List
          id="done"
          title="Done"
          cards={this.props.cards.filter(card => card.status === 'done')}
          taskCallbacks={this.props.taskCallbacks}
        />
      </div>
    );
  }
<<<<<<< HEAD
};

=======
}
>>>>>>> f9c80bcad6a3a66ecfab5fd02e23ed376942ccae
KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
};

export default KanbanBoard;
