import React from 'react';
// import React, { Component, PropTypes } from 'react';

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

export default App;
