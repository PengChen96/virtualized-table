
import React from 'react';
// import VTable from './example/VTable';
import VTable2 from './example/VTable2.0';
// import VTableCustomExample from './example/VTableCustomExample';
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

        {/*<VTable/>*/}

        <VTable2/>

        {/*example*/}
        {/*<VTableCustomExample/>*/}

      </div>
    );
  }
}

export default App;
