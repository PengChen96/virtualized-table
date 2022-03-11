
import React from 'react';
import VTablCase from './example/VTable2.0';
import './app.less';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <VTablCase
          columnsNum={10}
          dataNum={1000}
        />
      </div>
    );
  }
}

export default App;
