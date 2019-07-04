
import React from 'react';
import {VTable} from '../libs/VTable';
// import {Table} from '../libs/Table';
// import VTableCustomExample from './example/VTableCustomExample';
import './app.less';


class App extends React.Component {

  constructor () {
    super();
    this.state = {
      dataSource: [],
      footerColumnData: [],
      loading: false,
      // 参数设置
      __rowSelection: false,
      __pointerEventDisabled: false
    };
  }

  getColumns(num = 1) {
    let columns = [{
      key: 'id',
      title: '复选框',
      width: 100
    }];
    for (let i = 0; i < num; i++) {
      columns.push({
        key: 'title' + i,
        title: '标题列' + i,
        width: 150,
        render: (value) => {
          return <span>{value}</span>;
        }
      });
    }
    return columns;
  }

  getList(num = 1, colNum = 25) {

    this.setState({
      loading: true
    });
    let list = [];
    for (let i = 0; i < num; i++) {
      let rowObj = {id: i};
      for (let j = 0; j < colNum; j++) {
        rowObj[`title${j}`] = `内容${j}`;
      }
      list.push(rowObj);
    }
    this.setState({
      dataSource: list
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 500);

  };

  // 获取footer行内容
  getFooterColumnData(colNum = 25) {

    let rowObj = {id: '-1'};
    for (let j = 0; j < colNum; j++) {
      rowObj[`title${j}`] = `内容${j}`;
    }
    this.setState({
      footerColumnData: [rowObj]
    });
  }

  // 设置参数
  switchSetting(key) {

    this.setState({
      [key]: !this.state[key]
    });

  };

  render() {
    const {
      dataSource,
      footerColumnData,
      loading,
      __rowSelection,
      __pointerEventDisabled
    } = this.state;
    // let columnData = [{ title0: '内容'}];
    let columns = this.getColumns(25);
    return (
      <div className="App">

        <div className="btn-container">
          <span onClick={() => this.getList(10000)}>获取10000条数据</span>
          <span onClick={() => this.getList(0)}>空数据</span>
          <span onClick={() => this.getFooterColumnData(25)}>有底部数据</span>
          <span onClick={() => this.setState({footerColumnData: []})}>无底部数据</span>
        </div>

        <label>
          <input type="checkbox" checked={__rowSelection} onClick={() => this.switchSetting('__rowSelection')}/>
          rowSelection
        </label>
        <label>
          <input type="checkbox" checked={__pointerEventDisabled} onClick={() => this.switchSetting('__pointerEventDisabled')}/>
          pointerEventDisabled
        </label>


        <VTable
          className="a"
          columns={columns}
          dataSource={dataSource}
          columnOffsetCount={columns.length}
          fixedLeftColumnCount={2}
          fixedRightColumnCount={1}
          rowSelection={__rowSelection}
          rowKey="title0"
          onSelectAll={this.onSelectAll}
          onSelect={this.onSelect}
          onCellTap={this.onCellTap}
          onRowRemove={this.onRowRemove}
          visibleHeight={600}
          mainRowHeight={33}
          emptyText={<div>未查询到数据</div>}
          loading={loading}
          loadingText={<div>数据加载中...</div>}
          // rowRemoveText={<div>x</div>}
          footerColumnData={footerColumnData}
          rowRemoveVisible={false}
          pointerEventDisabled={__pointerEventDisabled}
        />
        {/*example*/}
        {/*<VTableCustomExample/>*/}

        {/*<div className="v-table-header">*/}
        {/*<Table*/}
        {/*ref={h => this._header = h}*/}
        {/*title="title"*/}
        {/*visibleWidth={800}*/}
        {/*visibleHeight={40}*/}
        {/*columns={this.getColumns(25)}*/}
        {/*dataSource={columnData}*/}
        {/*fixedLeftColumnCount={2}*/}
        {/*/>*/}
        {/*</div>*/}
        {/*<Table*/}
        {/*title="title"*/}
        {/*visibleWidth={800}*/}
        {/*visibleHeight={800}*/}
        {/*columns={this.getColumns(25)}*/}
        {/*dataSource={list}*/}
        {/*fixedLeftColumnCount={2}*/}
        {/*onScroll={this.onScroll.bind(this)}*/}
        {/*onCellTap={this.onCellTap}*/}
        {/*/>*/}
      </div>
    );
  }

  // 滚动
  onScroll(scrollLeft) {
    console.log(this._header._container.scrollLeft, 'header');
    console.log(scrollLeft, 'onScroll callback');
    this._header._container.scrollLeft = scrollLeft;
  }
  // 点击每个子项
  onCellTap(record, row) {
    console.log(record, row, '每个子项的回调');
  }
  // 用户手动选择/取消选择所有行的回调
  onSelectAll(selected, selectedRows) {
    console.log(selected, selectedRows, 'onSelectAll');
  }
  // 用户手动选择/取消选择行的回调
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows, 'onSelect');
  }
  // 删除行
  onRowRemove(e, row) {
    console.log(e, row, 'onRowRemove');
  }

}

export default App;
