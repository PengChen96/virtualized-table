/**
 * Created by Administrator on 2019/5/4.
 */

import React from 'react';
import {VTable} from '../../libs/VTable';
import './VTableCustomExample.less';

class VTableCustomExample extends React.Component {

  constructor () {
    super();
    this.state = {
      list: [],
      realRowIndex: 0,
      realColumnIndex: 0
    };
  }

  getList(num = 1,val = ''){
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
      this.setState({
        list
      });
    }
  };
  getColumns(num = 1) {
    let columns = [{
      key: 'checkbox',
      title: '复选框',
      width: 100,
      style: {justifyContent: 'center'},
      render: (value, row) => {

        return [
          <div key={0}>
            {
              row && row.hover &&
              <div className="v-close" onClick={this.onCloseClick.bind(this, row)}>
                x
              </div>
            }
          </div>,
          <div key={1}>
            <input type="checkbox" checked={row.checked} onClick={this.onCheckboxClick.bind(this, row)}/>
          </div>
        ];

      },
      headRender: (value, row) => {

        return [
          <div key={0}>
            {
              row && row.hover &&
              <div className="v-close" onClick={this.onCloseClick.bind(this, row)}>
                x
              </div>
            }
          </div>,
          <div key={1}>
            <input type="checkbox" checked={row.checked} onClick={this.onCheckboxClick.bind(this, row)}/>
          </div>
        ];

      }
    }, {
      key: 'title0',
      title: '自定义标题列',
      width: 150,
      headRender: () => {
        return <div>自定义标题列xxx</div>;
      }
    }];
    for (let i = 0; i < num; i++) {
      columns.push({
        key: 'title' + i,
        title: '标题列',
        width: 150,
        render: (value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) => {
          //console.log(this.state.realColumnIndex, realColumnIndex, '----', this.state.realColumnIndex === realColumnIndex);
          //let flag = this.state.realColumnIndex === realColumnIndex;
          return <input
            type="text"
            className={`R${realRowIndex}C${realColumnIndex}`}
            defaultValue={value}
            onKeyPress={this.handleEnterKey.bind(this)}
          />;
        }
      });
    }
    return columns;
  }

  render() {
    const {list} = this.state;
    // let columnData = [{ title0: '内容'}];
    return (
      <div className="App">
        <div onClick={() => this.getList(10000)}>getList</div>
        <div onClick={() => this.getList(10000, '哈哈')}>getListVal</div>
        <VTable
          bordered
          columns={this.getColumns(25)}
          dataSource={list}
          fixedLeftColumnCount={2}
          columnOffsetCount={26}
          onCellTap={this.onCellTap.bind(this)}
          emptyText={<div style={{textAlign: 'center'}}>数据加载中...</div>}
        />
      </div>
    );
  }
  // 点击每个子项
  onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {
    console.log(value, '每个子项的回调');
    this.setState({
      realRowIndex,
      realColumnIndex
    });
  }
  // 勾选
  onCheckboxClick(row) {

    if (row.selection === 'all') {
      console.log('勾选全部', row);
    } else {
      console.log('勾选单行', row);
    }
    if (row.checked) {
      row.checked = false;
    } else {
      row.checked = true;
    }
  }
  // 点击删除
  onCloseClick(row) {
    console.log('点击删除', row);
  }
  // enter
  handleEnterKey(e) {
    let {realRowIndex, realColumnIndex} = this.state;
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像

      if (realColumnIndex >= 24) {
        return;
      }
      let index = realColumnIndex + 1;
      console.log(index, realColumnIndex);
      this.setState({
        realColumnIndex: index
      }, () => {
        console.log(`R${realRowIndex}C${realColumnIndex}`);
        document.getElementsByClassName(`R${realRowIndex}C${index}`)[0].focus();
      });
    }
  }
}

export default VTableCustomExample;
