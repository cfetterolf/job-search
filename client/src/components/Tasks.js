import React from 'react';
// import styled from 'styled-components';
import '../css/Tasks.css';
import firebase from 'firebase';
import TodoItems from './task-components/TodoItems.js';
// import "./TodoList.css";


/* class Tasks extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      //set state
    };
  }

  render() {
    return (
      <div className="container-fluid">
        Tasks goes Here
      </div>
    );
  }
} */

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // call pull down list function
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== '') {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now(),
      };

      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
      }));

      this._inputElement.value = '';
    }

    this.writeUserData(newItem);

    console.log(this.state.items);
    e.preventDefault();
  }

  writeUserData(item) {
    firebase.database().ref(`tasks/${item.key}`).set({
      name: item.text,
    });

    const obj = {};
    obj[item.key] = true;

    firebase.database().ref(`users/${this.props.user.uid}/tasks/`).set(obj);
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => (item.key !== key));

    this.setState({
      items: filteredItems,
    });

    firebase.database().ref(`users/${this.props.user.uid}/tasks/${key}`).remove();
    firebase.database().ref(`tasks/${key}`).remove();
  }

  render() {
    return (
      <div className="TasksMain">
        <div className="Tasks-header">
          <form onSubmit={this.addItem}>
            <input
              ref={a => this._inputElement = a}
              placeholder="enter task"
            />
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems
          entries={this.state.items}
          delete={this.deleteItem}
        />
      </div>
    );
  }
}

export default Tasks;
