
import React from 'react';
import {VTable} from '../../../libs/VTable';


class VTableCase extends React.Component {

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
    }, {
      key: 'merge',
      title: '合并',
      width: 300,
      subColumns: [{
        key: 'merge_col1',
        title: '列1',
        width: 100
      }, {
        key: 'merge_col2',
        title: '列2',
        width: 100
      }, {
        key: 'merge_col3',
        title: '列3',
        width: 100
      }]
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
      let rowObj = {
        id: i,
        merge_col1: '列1',
        merge_col2: '列2',
        merge_col3: '列3'
      };
      for (let j = 0; j < colNum; j++) {
        rowObj[`title${j}`] = `内容${j}`;
        if (i < 5) {
          rowObj.selectionDisable = true;
        }
        // if (i === 6) {
        //   rowObj.checked = true;
        // }
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
          <span onClick={() => this.getList(5000)}>获取5000条数据</span>
          <span onClick={() => this.getList(10000)}>获取10000条数据</span>
          <span onClick={() => this.getList(50000)}>获取50000条数据</span>
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
          fixedLeftColumnCount={1}
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

export default VTableCase;
