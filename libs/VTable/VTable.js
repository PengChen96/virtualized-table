
import React from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';

class VTable extends React.Component {

  constructor () {
    super();
    this.state = {
      list: [],
      columns: [],
      dataSource: []
    };
  }
  componentWillReceiveProps(props) {

    let {state} = this;
    if (props.dataSource !== state.dataSource) {
      this.setState({
        columns: props.columns,
        dataSource: props.dataSource
      });
    }

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
      width: 100,
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
        width: 150,
        render: (value) => {
          return <span>{value}值</span>;
        }
      });
    }
    return columns;
  }

  render() {
    const {
      columns,
      dataSource
    } = this.state;
    let columnData = [{ title: '内容'}];
    return (
      <div className="v-table">
        <div onClick={() => this.getList(10000)}>getList</div>
        <div onClick={() => this.getList(10000, '哈哈')}>getListVal</div>
        <div className="v-table-header">
          <Grid
            ref={h => this._header = h}
            title="title"
            visibleWidth={1000}
            visibleHeight={40}
            columns={columns}
            dataSource={columnData}
            fixedLeftColumnCount={2}
          />
        </div>
        <div className="v-table-content">
          <Grid
            title="title"
            visibleWidth={1000}
            visibleHeight={400}
            columns={columns}
            dataSource={dataSource}
            fixedLeftColumnCount={2}
            onScroll={this.onScroll.bind(this)}
            onCellTap={this.onCellTap}
          />
        </div>
      </div>
    );
  }

  // 滚动
  onScroll(scrollLeft) {
    console.log(this._header._scrollContainer.scrollLeft, 'header');
    console.log(scrollLeft, 'onScroll callback');
    this._header._scrollContainer.scrollLeft = scrollLeft;
  }
  // 点击每个子项
  onCellTap(record) {
    console.log(record, '选择的回调');
  }

}

VTable.propTypes = {
  // 列
  columns: PropTypes.array,
  // 左边固定列 列数
  fixedLeftColumnCount: PropTypes.number,
  // 源数据
  dataSource: PropTypes.array,
  // 可视区域宽度
  visibleWidth: PropTypes.number,
  // 可视区域高度
  visibleHeight: PropTypes.number,

  //  API
  // 滚动
  onScroll: PropTypes.func,
  // 点击每个子项
  onCellTap: PropTypes.func
};

export default VTable;
