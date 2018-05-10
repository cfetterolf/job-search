import React from 'react';
// import styled from 'styled-components';
import '../css/Tasks.css';
import firebase from 'firebase';
// import TodoItems from './task-components/TodoItems.js';
// import "./TodoList.css";

function uuid(len) {
  const length = len || 6;
  const charCodes = [];
  let string = '';

  for (let i = 0; i < 10; i++) {
    charCodes.push(48 + i);
    charCodes.push(97 + i);
  }
  for (let i = 0; i < 16; i++) {
    charCodes.push(107 + i);
  }

  for (let i = 0; i < length; i++) {
    const charIndex = Math.floor(Math.random() * charCodes.length);
    string += String.fromCharCode(charCodes[charIndex]);
  }

  return string;
}

function colour(bright) {
  let val;

  if (bright) {
    val = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
  } else {
    val = '#';
    const chars = '1234567890ABCDEF'.split('');
    for (let i = 0; i < 6; i++) {
      val += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  console.log(val);
  return val;
}

class AddTask extends React.Component {
  constructor() {
    super();
    this.state = {
      newTask: {},
    };
  }

  handleSubmit(e) {
    if (this.refs.taskName.value === '') {
      alert('Please enter a task');
    } else {
      this.setState({
        newTask: {
          content: this.refs.taskName.value,
          completed: false,
          id: uuid(),
          tag: 'Home',
        },
      }, function () {
        console.log(this.state);
        this.props.addTask(this.state.newTask);
        this.refs.taskName.value = '';
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="task-form">
        <div className="task-input">
          <input className="taskinput" type="text" ref="taskName" placeholder="What do you need to do?" />
        </div>
        <button className="task-add-button" type="submit" value="Submit">
          <svg viewBox="0 0 40 40">
            <path d="M10 20 L30 20 M20 10 L20 30" />
          </svg>
        </button>
      </form>
    );
  }
}

class TaskItem extends React.Component {
  removeTask(id) {
    this.props.onRemove(id);
  }

  checkTask(id) {
    this.props.onCheck(id);
  }

  render() {
    let tags = this.props.tags,
      task = this.props.task;

    // let colour = tags[task.tag] !== undefined ? tags[task.tag].colour : '#ccc';

    // let tagStyle = {
    //	borderColor: tags[task.tag].colour
    // }
    return (
      <li>
        <input
          className="taskinput"
          id={this.props.task.id}
          type="checkbox"
          checked={this.props.task.completed}
          onChange={this.checkTask.bind(this, this.props.task.id)}
        />
        <label
          htmlFor={this.props.task.id}
        >
          {this.props.task.content}
          <span
            className="task-strike"
          />
        </label>
        <button
          className="task-item-remove"
          onClick={this.removeTask.bind(this, this.props.task.id)}
        >
          <svg viewBox="0 0 40 40">
            <path d="M15 15 L25 25 M25 15 L15 25" />
          </svg>
        </button>
      </li>
    );
  }
}

class TaskList extends React.Component {
  render() {
    const taskItems = this.props.tasks.map(task =>
      // console.log(task.id);
      (
        <TaskItem
          task={task}
          key={task.id}
          onRemove={this.props.removeTask.bind(this)}
          onCheck={this.props.checkTask.bind(this)}
          tags={this.props.tags}
        />
      ));

    return (
      <ul className="task-list">
        {taskItems}
      </ul>
    );
  }
}

class TaskControls extends React.Component {
  render() {
    let filters = this.props.filters;
    filters = filters.map(filter => (
      <button
        key={filter.id}
        onClick={this.props.setFilter.bind(this, filter)}
        className={this.props.activeFilter === filter.name ? 'btn-active' : ''}
      >
        {filter.label || filter.name}
      </button>
    ));

    return (
      <div className="task-controls">
        <span>{this.props.completed()} / {this.props.total()} Completed</span>
        {filters}
        <button
          onClick={this.props.clearCompleted}
        >
          <i className="fa fa-trash-o" aria-hidden="true" /> Clear Completed
        </button>
      </div>
    );
  }
}

class Tags extends React.Component {
  render() {
    let tags = this.props.tags;
    tags = tags.map((tag) => {
      const dotStyle = {
        background: tag.colour,
      };
      const activeStyle = {
        boxShadow: `0 0 0 2px ${tag.colour}`,
      };
      return (
        <button
          key={tag.id}
          onClick={this.props.setTag.bind(this, tag)}
          style={tag.name === this.props.activeTag ? activeStyle : {}}
        >
          <span style={dotStyle} />
          {tag.name}
        </button>
      );
    });
    return (
      <div className="task-tags">
        <span>Tags </span> &nbsp;
        {tags}
        <button
          onClick={this.props.reset.bind(this)}
        >Reset
        </button>
      </div>
    );
  }
}

class Modal extends React.Component {
  render() {
    return (
      <div className="modal-wrap">
        <div className="modal-tasks">
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }

  componentWillMount() {
    const initial = [
      // {
      //     id: uuid(),
      //     content: "Learn React",
      //     completed: false,
      //     tag: 'Work'
      // },
      // {
      //     id: uuid(),
      //     content: "Make another app",
      //     completed: false,
      //     tag: false
      // },
      // {
      //     id: uuid(),
      //     content: "Make to do list",
      //     completed: true,
      //     tag: false
      // }
    ];
    if (localStorage && localStorage.getItem('tasks')) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks')),
      });
    } else {
      this.setState({ tasks: initial });
    }
    this.setState({
      activeList: 'all',
      activeTag: 'all',
      initial,
      tags: [
        {
          id: uuid(),
          name: 'all',
          colour: colour(true),
        },
        {
          id: uuid(),
          name: 'Applications',
          colour: colour(true),
        },
        {
          id: uuid(),
          name: 'Networking',
          colour: colour(true),
        },
        {
          id: uuid(),
          name: 'Interviews',
          colour: colour(true),
        },
      ],
      filters: [
        {
          id: uuid(),
          name: 'all',
          label: 'All Tasks',
          method(item) {
            return item;
          },
        },
        {
          id: uuid(),
          name: 'active',
          label: 'Active',
          method(item) {
            return item.completed === false;
          },
        },
        {
          id: uuid(),
          name: 'completed',
          label: 'Completed',
          method(item) {
            return item.completed === true;
          },
        },
      ],
    });
  }

  // Handlers
  handleAddTask(task) {
    console.log(task);
    const tasks = this.state.tasks;
    tasks.unshift(task);
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleRemoveTask(id) {
    console.log(`Delete ${id}`);
    const tasks = this.state.tasks;
    const target = tasks.findIndex(index => index.id === id);
    tasks.splice(target, 1);
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleCheckTask(id) {
    console.log(`Check ${id}`);
    const tasks = this.state.tasks;
    const target = tasks.findIndex(index => index.id === id);
    tasks[target].completed = tasks[target].completed !== true;
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Setters
  setFilter(filter) {
    const activeFilter = filter.name;
    this.setState({ activeFilter });
  }

  setTag(tag) {
    const activeTag = tag.name;
    this.setState({ activeTag });
  }

  reset() {
    const tasks = this.state.initial;
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Getters
  getTotalCompleted() {
    const tasks = this.state.tasks;
    const completed = tasks.filter(item => item.completed === true);
    return completed.length;
  }

  getTotalTasks() {
    return this.state.tasks.length;
  }

  getActiveList() {
    const filter = this.state.activeFilter;
    const tag = this.state.activeTag;
    let tasks = this.state.tasks;

    // Filte by Filter
    for (let i = 0, len = this.state.filters.length; i < len; i++) {
      const element = this.state.filters[i];
      if (filter === element.name) {
        tasks = tasks.filter(item => element.method(item));
      }
    }

    // Filter by Tag
    if (tag === 'all') {
      return tasks;
    }

    return tasks.filter(item => item.tag === tag);
  }

  clearCompleted() {
    let tasks = this.state.tasks;
    tasks = tasks.filter(item => item.completed === false);
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  render() {
    return (
      <div className="app">
        <AddTask addTask={this.handleAddTask.bind(this)} />

        <Tags
          tags={this.state.tags}
          setTag={this.setTag.bind(this)}
          activeTag={this.state.activeTag}
          reset={this.reset.bind(this)}
        />

        <TaskList
          tasks={this.getActiveList.call(this)}
          removeTask={this.handleRemoveTask.bind(this)}
          checkTask={this.handleCheckTask.bind(this)}
          tags={this.state.tags}
        />

        <TaskControls
          completed={this.getTotalCompleted.bind(this)}
          filters={this.state.filters}
          total={this.getTotalTasks.bind(this)}
          activeFilter={this.state.activeFilter}
          setFilter={this.setFilter.bind(this)}
          clearCompleted={this.clearCompleted.bind(this)}
        />

        {/* <Modal content="Nothing yet" /> */}
      </div>
    );
  }
}

export default App;

/** ****************************************************** */
/*
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editText:this.props.todo.title
        }
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            var node = React.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }
    handleChange(event){
        if(this.props.editing){
            this.setState({editText:event.target.value});
        }
    }
    handleDestroy(){
        this.props.handleDestroyButton && this.props.handleDestroyButton()
    }
    handleEdit(){
        this.props.onEdit();
        this.setState({editText:this.props.todo.title})
    }
    handleKeyDown(event){
        if(event.which===ESCAPE_KEY){
            this.setState({editText:this.props.todo.title})
            this.props.onCancel(event);
        }else if(event.which === ENTER_KEY){
            this.handleSubmit(event);
        }
    }
    handleSubmit(event){
        let value=event.target.value.trim();
        if(value){
            this.props.onSave(value);
            this.setState({editText:value});
        }
        else{
            this.props.onDestroy();
        }
    }

    render(){
        let localStyle={
            listStyleType:"none"
        };
        return(
            <li
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onClick={this.handleEdit.bind(this)}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.handleDestroy.bind(this)} />

                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                />
            </li>
        );
    }
}


class TodoFilter extends React.Component{
    handleActive(){
        this.props.clickedActive && this.props.clickedActive();
    }
    handleAll() {
        this.props.clickedAll && this.props.clickedAll();
    }
    handleClearCompleted(){
        this.props.clearCompletedButton && this.props.clearCompletedButton()
    }
    handleCompleted() {
        this.props.clickedCompleted && this.props.clickedCompleted();
    }

    render(){
        let nowShowing=this.props.nowShowing;
        var clearButton=null;
        if(this.props.completedCount > 0){
            clearButton=(
            <button
                    className="clear-completed"
                    onClick={this.handleClearCompleted.bind(this)}>
                    Clear completed
               </button>
            );
        }
        return(
            <footer className="footer">
                <strong className="todo-count" >{this.props.count} left</strong>
                <ul className="filters" >
                    <li  >
                        <a
                            onClick={this.handleAll.bind(this)}

                            href="#">

                            All
                        </a>
                    </li>
                    {"      "}
                    <li  >
                        <a onClick={this.handleActive.bind(this)}

                            href="#">
                            Completed

                        </a>
                    </li >
                    {"      "}
                    <li >
                        <a onClick={this.handleCompleted.bind(this)}

                            href="#">
                            Active

                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>

        );
    }
}


const ALL='all';
const ACTIVE='active';
const COMPLETED='completed';
var ENTER_KEY = 13;
var key=0;

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            todos: [],
            nowShowing: ALL,
            editing:null,
            newTodo: ''
        };
     }
    addTodo(title){
        this.setState({
            todos:this.state.todos.concat({
                title:title,
                completed:false
                })
        });
    }
    cancel(){
        this.setState({editing:null});
    }
    clearCompleted(){
        this.setState({todos:this.state.todos.filter(function(todo){
            return !todo.completed;
            })
        });
    }
    edit(todo){
        this.setState({editing:todo})
    }
    extend(){
        var newObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }
    destroyButton(todo){

        this.setState({todos:this.state.todos.filter(function(candidate){
            return candidate !==todo;
            })
        });
    }
    handleChange(event){
        this.setState({newTodo: event.target.value});
    }
    handleClickAll(){

        this.setState({nowShowing:ALL})
    }
    handleClickActive(){
        this.setState({nowShowing:ACTIVE})
    }
    handleClickComplete(){
        this.setState({nowShowing:COMPLETED})
    }
    handleNewTodoKeyDown(event){
        if(event.keyCode !== ENTER_KEY)
            return;
        event.preventDefault();

        var val=this.state.newTodo.trim();
        if(val){
            this.addTodo(val);
            this.setState({newTodo:''});
        }
    }
    renderTodoItem(todo) {
        return (
            <TodoItem
                todo={todo}
                key={key++}
                onToggle={this.toggle.bind(this,todo)}
                handleDestroyButton={this.destroyButton.bind(this,todo)}
                onEdit={this.edit.bind(this,todo)}
                editing={this.state.editing===todo}
                onSave={this.save.bind(this,todo)}
                onCancel={this.cancel.bind(this)}
            />
        )
    }
    save(todoToSave,text){
        this.setState({todos:this.state.todos.map(function(todo){
            return todo!==todoToSave? todo: this.extend({},todo,{title:text});
            },this)
        });
        this.setState({ editing:null});
    }
    toggle(todoToToggle){
        this.setState({todos: this.state.todos.map(function (todo){
            return todo !== todoToToggle ?
                todo : this.extend({}, todo, {completed: !todo.completed});
        },this)});
    }
    toggleAll(event){
        this.setState({todos:this.state.todos.map(function(todo){
            return this.extend({},todo,{completed:event.target.checked});
            },this)
        });
    }

    render() {
        var footer;
        var main;

        var shownTodos=[];
        let todos=this.state.todos;
        for(let i=0;i<todos.length;i++){
            if(this.state.nowShowing === ACTIVE) {
                if (todos[i].completed)
                    shownTodos = shownTodos.concat(todos[i]);
            }
            else if(this.state.nowShowing === COMPLETED){
                if(!todos[i].completed)
                    shownTodos=shownTodos.concat(todos[i]);
            }
            else
                shownTodos=shownTodos.concat(todos[i]);
        }
        var activeTodoCount=this.state.todos.reduce((accum,todo)=>{
          return todo.completed? accum : accum + 1;
        },0);

        var completedCount = this.state.todos.length - activeTodoCount;

        if(activeTodoCount || completedCount){
           footer =
               <TodoFilter
                    count={shownTodos.length}
                    completedCount={completedCount}
                    clearCompletedButton={this.clearCompleted.bind(this)}
                    clickedAll={this.handleClickAll.bind(this)}
                    clickedActive={this.handleClickActive.bind(this)}
                    clickedCompleted={this.handleClickComplete.bind(this)}
                    nowShowing={this.state.nowShowing}
               />
        }

        let todoItems = [];
        shownTodos.map((todo)=>{
            let view = this.renderTodoItem(todo);
            if (!view) return;
            todoItems.push(view);
        },this);

        if(this.state.todos.length>0){
          main=(
              <section className="main">
                  <input
                      className="toggle-all"
                      type="checkbox"
                      onChange={this.toggleAll.bind(this)}
                      checked={activeTodoCount===0}
                  />
                  <ul className="todo-list">
                      {todoItems}
                  </ul>
              </section>

          )
        }
            return (
              <div>
                <header className="header">
                  <input
                      className="new-todo"
                      type="text"
                      placeholder="What needs to be done?"
                      value={this.state.newTodo}
                      onChange={this.handleChange.bind(this)}
                      onKeyDown={this.handleNewTodoKeyDown.bind(this)}
                  />

                </header>

                  {main}
                {footer}
              </div>
            );
      }
} */

/** ****************************************************************** */

/*
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
} */

/** ****************************************************************** */

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
} */


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
*/
