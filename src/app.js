
import React from 'react';
import {VTable} from '../libs/VTable';
// import {Table} from '../libs/Table';
// import VTableCustomExample from './example/VTableCustomExample';


class App extends React.Component {

  constructor () {
    super();
    this.state = {
      list: [],
      loading: false
    };
  }

  getList(num = 1,val = ''){

    this.setState({
      loading: true
    });
    let list = [];
    for (let i = 0; i < num; i++) {
      list.push({
        id: i,
        title0: '内容' + i + val,
        title1: '内容' + i + val,
        title2: '内容' + i + val,
        title3: '内容' + i + val,
        title4: '内容' + i + val,
        title5: '内容' + i + val,
      });
    }
    this.setState({
      list
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 500);

  };
  onCheckedClick() {
    console.log('11');
    //let {list} = this.state;
    //list.map(item => {
    //  item.checked = true;
    //  return item;
    //});
    //console.log(list);
    //this.setState({
    //  list
    //});
  }
  getColumns(num = 1) {
    let columns = [{
      key: 'id',
      title: '复选框',
      width: 100
      // render: (value, row) => {
      //
      //   console.log(row);
      //   return <div style={{position: 'relative'}}>
      //     {
      //       row && row.hover && <div className="v-close" onClick={this.onCheckedClick.bind(this)}/>
      //     }
      //     <input type="checkbox" checked={row.checked}/>
      //     {/*{value}*/}
      //   </div>;
      //
      // }
    }, {
      key: 'title0',
      title: '标题列',
      width: 150,
    }, {
      key: 'title0',
      title: '标题列',
      width: 150,
    }, {
      key: 'title0',
      title: '标题列',
      width: 150,
    }];
    for (let i = 0; i < num; i++) {
      columns.push({
        key: 'title' + i,
        title: '标题列' + i,
        width: 150,
        render: (value) => {
          return <span>{value}值 input</span>;
        }
      });
    }
    return columns;
  }

  render() {
    const {list, loading} = this.state;
    // let columnData = [{ title0: '内容'}];
    let columns = this.getColumns(25);
    return (
      <div className="App">


        <div onClick={() => this.getList(10000)}>getList</div>
        <div onClick={() => this.getList(0, '哈哈')}>getListVal</div>
        <VTable
          className="a"
          columns={columns}
          dataSource={list}
          columnOffsetCount={columns.length}
          fixedLeftColumnCount={2}
          fixedRightColumnCount={1}
          rowSelection={list.length > 0 ? true : false}
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
          footerColumnData={[{id: '123',title0: '1212'}]}
          rowRemoveVisible={false}
          pointerEventDisabled={false}
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
