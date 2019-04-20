
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
        <div className="v-table-header">
          <Table
            title="title"
            visibleWidth={800}
            visibleHeight={40}
            columns={this.getColumns(25)}
            dataSource={[{ title0: '内容'}]}
            fixedLeftColumnCount={2}
          />
        </div>
        <Table
          title="title"
          visibleWidth={800}
          visibleHeight={800}
          columns={this.getColumns(25)}
          dataSource={list}
          fixedLeftColumnCount={2}
          onCellTap={this.onCellTap}
        />
      </div>
    );
  }

  // 点击每个子项
  onCellTap(record) {
    console.log(record, '选择的回调');
  }

}

export default App;
