import React, { Component } from 'react';
import './App.css';

import Graph from './components/graph'; //Component

import store from './store'; //store

import { Provider } from 'react-redux'; //provider

class App extends Component {

  handleX = (datapoint, event) => {
    console.log("datapoint = ", datapoint)
    console.log("event = ", event)
  }

  handleClick = (datapoint, event) => {
    console.log("Click event = ", event)
  }

  render() {
    
    return (
      <Provider store = { store } >
        <Graph />
      </Provider>      
    );

      // <div className="App">
      //   <XYPlot height={300} width={600}>
      //     <XAxis />
      //     <YAxis />
      //     <LineSeries 
      //       onNearestX = {(datapoint, event) => this.handleX(datapoint, event)}
      //       // onValueClick = {(datapoint, event) => this.handleClick(datapoint, event)}
      //       data={data} 
      //     />
      //   </XYPlot>
      // </div>
  }
}

export default App;