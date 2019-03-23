
import React from 'react';
import {Table} from '../libs/Table';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      list: []
    };
  }
  getList(){
    let list = [];
    for (let i = 0; i < 10000; i++) {
      list.push({
        title: '标题'+i,
        content: '内容'+i
      });
      this.setState({
        list: list
      });
    }
  };
  render() {
    const {list} = this.state;
    console.log(list);
    return (
      <div className="App">
        <div onClick={() => this.getList()}>getlist</div>
        <Table
          title="title"
          list={list}
        />
      </div>
    );
  }
}

export default App;
