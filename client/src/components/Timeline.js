import React from 'react';
import '../css/Timeline.css';
//import './App.css'
import {Board} from 'react-trello'

const data = require('./timeline-components/data.json')

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends React.Component {
    state = {boardData: {lanes: []}}

    setEventBus = eventBus => {
        this.setState({eventBus})
    }

    async componentWillMount() {
        const response = await this.getBoard()
        this.setState({boardData: response})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    // completeCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'COMPLETED',
    //         card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
    //     })
    //     this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    // }

    // addCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'BLOCKED',
    //         card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
    //     })
    // }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added')
        console.log(nextData)
    }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`)
		console.dir(card)
	}

    render() {
        return (
            <div className="Timeline">
                <div className="Timeline-header">
                    <h3>Timeline</h3>
                </div>
                <div className="Timeline-intro">
                    {/* <button onClick={this.completeCard} style={{margin: 5}}>
                        Complete Task
                    </button>
                    <button onClick={this.addCard} style={{margin: 5}}>
                        Add Blocked
                    </button> */}
                    <Board
                        data={{lanes: {}}}
                        style={{background: "white", fontFamily: "inherit"}}
                        editable
						onCardAdd={this.handleCardAdd}
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                    />
                </div>
            </div>
        )
    }
}

  /*font-family: inherit;*/

export default App;

// import React, { Component} from 'react';
// import PropTypes from 'prop-types';
// import List from './timeline-components/List';
//
// class KanbanBoard extends React.Component {
//     constructor(props) {
//       super(props);
//
//       this.state = {};
//     }
//
//   render(){
//     return (
//       <div className="app">
//         <List id='todo'
//               title="To Do"
//               cards={this.props.cards.filter((card) => card.status === "todo")}
//               taskCallbacks={this.props.taskCallbacks} />
//         <List id='in-progress'
//               title="In Progress"
//               cards={this.props.cards.filter((card) => card.status === "in-progress")}
//               taskCallbacks={this.props.taskCallbacks} />
//         <List id='done'
//               title='Done'
//               cards={this.props.cards.filter((card) => card.status === "done")}
//               taskCallbacks={this.props.taskCallbacks} />
//       </div>
//     );
//   }
// };
//
// KanbanBoard.propTypes = {
//   cards: PropTypes.arrayOf(PropTypes.object),
//   taskCallbacks: PropTypes.object
// };
//
// export default KanbanBoard;


//render(<KanbanBoardContainer />, document.getElementById('root'));

//
// class Products extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     //  this.state.products = [];
//     this.state = {};
//     this.state.filterText = "";
//     this.state.products = [
//       {
//         id: 1,
//         category: 'Google',
//         price: '5/6/18',
//         qty: 2,
//         name: 'Software Engineering Intern'
//       }, {
//         id: 2,
//         category: 'Quid',
//         price: '4/18/18',
//         qty: 5,
//         name: 'SDET Intern'
//       }
//     ];
//
//   }
//   handleUserInput(filterText) {
//     this.setState({filterText: filterText});
//   };
//   handleRowDel(product) {
//     var index = this.state.products.indexOf(product);
//     this.state.products.splice(index, 1);
//     this.setState(this.state.products);
//   };
//
//   handleAddEvent(evt) {
//     var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
//     var product = {
//       id: id,
//       name: "",
//       price: "",
//       category: "",
//       qty: 0
//     }
//     this.state.products.push(product);
//     this.setState(this.state.products);
//
//   }
//
//   handleProductTable(evt) {
//     var item = {
//       id: evt.target.id,
//       name: evt.target.name,
//       value: evt.target.value
//     };
// var products = this.state.products.slice();
//   var newProducts = products.map(function(product) {
//
//     for (var key in product) {
//       if (key == item.name && product.id == item.id) {
//         product[key] = item.value;
//
//       }
//     }
//     return product;
//   });
//     this.setState({products:newProducts});
//   //  console.log(this.state.products);
//   };
//   render() {
//
//     return (
//       <div>
//         <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
//         <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
//       </div>
//     );
//
//   }
//
// }
// class SearchBar extends React.Component {
//   handleChange() {
//     this.props.onUserInput(this.refs.filterTextInput.value);
//   }
//   render() {
//     return (
//       <div>
//
//         <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
//
//       </div>
//
//     );
//   }
//
// }
//
// class ProductTable extends React.Component {
//
//   render() {
//     var onProductTableUpdate = this.props.onProductTableUpdate;
//     var rowDel = this.props.onRowDel;
//     var filterText = this.props.filterText;
//     var product = this.props.products.map(function(product) {
//       if (product.name.indexOf(filterText) === -1) {
//         return;
//       }
//       return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
//     });
//     return (
//       <div>
//
//
//       <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>position</th>
//               <th>application date</th>
//               <th>contacts</th>
//               <th>company</th>
//             </tr>
//           </thead>
//
//           <tbody>
//             {product}
//
//           </tbody>
//
//         </table>
//       </div>
//     );
//
//   }
//
// }
//
// class ProductRow extends React.Component {
//   onDelEvent() {
//     this.props.onDelEvent(this.props.product);
//
//   }
//   render() {
//
//     return (
//       <tr className="eachRow">
//         <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
//           "type": "name",
//           value: this.props.product.name,
//           id: this.props.product.id
//         }}/>
//         <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
//           type: "price",
//           value: this.props.product.price,
//           id: this.props.product.id
//         }}/>
//         <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
//           type: "qty",
//           value: this.props.product.qty,
//           id: this.props.product.id
//         }}/>
//         <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
//           type: "category",
//           value: this.props.product.category,
//           id: this.props.product.id
//         }}/>
//         <td className="del-cell">
//           <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
//         </td>
//       </tr>
//     );
//
//   }
//
// }
// class EditableCell extends React.Component {
//
//   render() {
//     return (
//       <td>
//         <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
//       </td>
//     );
//
//   }
//
// }
//
// export default Products;
