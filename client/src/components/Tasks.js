import React from 'react';
// import styled from 'styled-components';
import '../css/Tasks.css';
import firebase from 'firebase';
//import TodoItems from './task-components/TodoItems.js';
// import "./TodoList.css";


class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));

    this.writeUserData(newItem);
  }

  writeUserData(item) {
    firebase.database().ref(`tasks/${item.key}`).set({
      name: item.text,
    });

    const obj = {};
    obj[item.key] = true;

    firebase.database().ref(`users/${this.props.user.uid}/tasks/`).set(obj);
  }

  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    this.setState({
      items: [].concat(updatedItems)
    });
  }

  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({
      items: [].concat(updatedItems)
    });

    firebase.database().ref(`users/${this.props.user.uid}/tasks/${itemId}`).remove();
    firebase.database().ref(`tasks/${itemId}`).remove();
  }

  render() {
    return (
      <div>
        <h3 className="apptitle">TO DO LIST</h3>
        <div className="row">
          <div className="col-md-3">
            <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
          </div>
        </div>
        <form className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={this.handleAddItem} disabled={!this.state.text}>{"Add #" + (this.state.items.length + 1)}</button>
          </div>
        </form>
      </div>
    );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  markCompleted(event) {
    this.props.onItemCompleted(this.props.id);
  }

  deleteItem(event) {
    this.props.onDeleteItem(this.props.id);
  }

  // Highlight newly added item for several seconds.
  componentDidMount() {
    if (this._listItem) {
      // 1. Add highlight class.
      this._listItem.classList.add("highlight");

      // 2. Set timeout.
      setTimeout((listItem) => {
        // 3. Remove highlight class.
        listItem.classList.remove("highlight");
      }, 500, this._listItem);
    }
  }

  render() {
    var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
    return (
      <li className={itemClass} ref={li => this._listItem = li }>
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> {this.props.text}
        </label>
        <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem}>x</button>
      </li>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul className="todolist">
        {this.props.items.map(item => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
        ))}
      </ul>
    );
  }
}

/*
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
          Task List
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
}*/

export default Tasks;


/*
// A little enhanced of Facebook's React TODO example.
// Want to be looked Reminder alike.

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    this.setState({
      items: [].concat(updatedItems)
    });
  }
  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({
      items: [].concat(updatedItems)
    });
  }
  render() {
    return (
      <div>
        <h3 className="apptitle">MY TO DO LIST</h3>
        <div className="row">
          <div className="col-md-3">
            <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
          </div>
        </div>
        <form className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={this.handleAddItem} disabled={!this.state.text}>{"Add #" + (this.state.items.length + 1)}</button>
          </div>
        </form>
      </div>
    );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  markCompleted(event) {
    this.props.onItemCompleted(this.props.id);
  }
  deleteItem(event) {
    this.props.onDeleteItem(this.props.id);
  }
  // Highlight newly added item for several seconds.
  componentDidMount() {
    if (this._listItem) {
      // 1. Add highlight class.
      this._listItem.classList.add("highlight");

      // 2. Set timeout.
      setTimeout((listItem) => {
        // 3. Remove highlight class.
        listItem.classList.remove("highlight");
      }, 500, this._listItem);
    }
  }
  render() {
    var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");
    return (
      <li className={itemClass} ref={li => this._listItem = li }>
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> {this.props.text}
        </label>
        <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem}>x</button>
      </li>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul className="todolist">
        {this.props.items.map(item => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
        ))}
      </ul>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById("app"));
*/
