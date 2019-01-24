import React, { Component } from 'react';
import Home from './Route'
require('dotenv').config()

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
