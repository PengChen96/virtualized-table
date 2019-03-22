
import React from 'react';
import {Table} from '../libs/Table';

const columns = [{
  title: '标题列',
  content: '内容列'
}];
const list = [{
  title: '标题1',
  content: '内容1'
}, {
  title: '标题1',
  content: '内容1'
}, {
  title: '标题1',
  content: '内容1'
}];

class App extends React.Component {

  componentDidMount () {
    console.log('start');
  }

  render() {
    return (
      <div className="App">
        <Table
          title="title"
          columns={columns}
          list={list}/>
      </div>
    );
  }
}

export default App;
