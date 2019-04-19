
import React from 'react';
import {Table} from '../libs/Table';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      list: []
    };
  }

  getList(num = 1,val = ''){
    let list = [];
    for (let i = 0; i < num; i++) {
      list.push({
        title0: '内容' + i + val,
        title1: '内容' + i + val,
        title2: '内容' + i + val,
        title3: '内容' + i + val,
        title4: '内容' + i + val,
        title5: '内容' + i + val,
      });
      this.setState({
        list
      });
    }
  };
  getColumns(num = 1) {
    let columns = [{
      key: 'title0',
      title: '标题列',
      width: '100px',
      render: (value) => {
        return <div>
          <input type="checkbox"/>
          {value}
        </div>;
      }
    }];
    for (let i = 0; i < num; i++) {
      columns.push({
        key: 'title' + i,
        title: '标题列',
        width: '100px',
        render: (value) => {
          return <span>{value}值</span>;
        }
      });
    }
    return columns;
  }
  render() {
    const {list} = this.state;
    return (
      <div className="App">
        <div onClick={() => this.getList(10000)}>getList</div>
        <div onClick={() => this.getList(10000, '哈哈')}>getListVal</div>
        {/*<Table*/}
        {/*title="title"*/}
        {/*columns={this.getColumns(10)}*/}
        {/*dataSource={this.getList(1)}*/}
        {/*/>*/}
        <Table
          title="title"
          columns={this.getColumns(10)}
          dataSource={list}
          fixedLeftColumnCount={2}
        />
      </div>
    );
  }
}

export default App;
