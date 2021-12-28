import React, { Component } from 'react';
import FlightManager from './flightsManagerApp/FlightManager';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <FlightManager />
      </div>
    );
  }
}

export default App;
