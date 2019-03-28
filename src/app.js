
import React from 'react';
import {Table} from '../libs/Table';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      list: []
    };
  }
  getList(val = ''){
    let list = [];
    for (let i = 0; i < 10000; i++) {
      list.push({
        title: '标题' + i + val,
        content: '内容' + i + val
      });
      this.setState({
        list: list
      });
    }
  };
  render() {
    const columns = [];
    for (let i = 0; i < 5000; i++) {
      columns.push({
        key: 'title',
        title: '标题列',
        width: '100px',
        render: (value) => {
          return <span>{value}+</span>;
        }
      });
      columns.push({
        key: 'title',
        title: '内容列',
        width: '100px'
      });
    }
    const {list} = this.state;
    console.log(list);
    return (
      <div className="App">
        <div onClick={() => this.getList()}>getList</div>
        <div onClick={() => this.getList('哈哈哈哈哈哈')}>getListVal</div>
        <Table
          title="title"
          columns={columns}
          dataSource={list}
        />
      </div>
    );
  }
}

export default App;
