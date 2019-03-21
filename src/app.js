
import React, { Component } from 'react';
import {Table} from '../libs/Table';

class App extends Component {

  componentDidMount () {
    console.log("start");
  }

  render() {
    return (
      <div className="App">
        <Table/>1
      </div>
    );
  }
}

export default App;
