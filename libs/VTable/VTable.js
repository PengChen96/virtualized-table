
import React from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';

class VTable extends React.Component {

  constructor () {
    super();
    this.state = {
      list: [],
      columns: [],
      columnData: [{}],
      dataSource: []
    };
  }
  componentWillReceiveProps(props) {

    let {state} = this;
    if (props.dataSource !== state.dataSource) {
      let columns = props.columns;
      // 复选框
      if (props.rowSelection) {
        columns.unshift({
          key: 'checkbox',
          width: 60,
          title: 'hhh',
          render: (value, row) => {
            console.log(value, row, '复选框');
            return <div>
              <input type="checkbox"/>
            </div>;
          }
        });
      }
      console.log(columns);
      this.setState({
        columns,
        columnData: this.getColumnData(columns),
        dataSource: props.dataSource
      });
    }

  }

  getColumnData(columns) {

    let data = [{}];
    columns.forEach((item) => {
      data[0][item.key] = item.title;
    });
    return data;

  }

  render() {
    const {
      columns,
      // columnData,
      dataSource
    } = this.state;
    let {
      fixedLeftColumnCount = 0
    } = this.props;
    let columnData = this.getColumnData(columns);
    return (
      <div className="v-table">
        <div className="v-table-header">
          <Grid
            type="header"
            ref={h => this._header = h}
            title="title"
            visibleWidth={1000}
            visibleHeight={40}
            columns={columns}
            dataSource={columnData}
            fixedLeftColumnCount={fixedLeftColumnCount}
            rowSelection={this.props.rowSelection}
          />
        </div>
        <div className="v-table-content">
          <Grid
            title="title"
            visibleWidth={1000}
            visibleHeight={400}
            columns={columns}
            dataSource={dataSource}
            fixedLeftColumnCount={fixedLeftColumnCount}
            columnOffsetCount={4}
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
  //
  test() {
    console.log('test');
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
  // 复选框
  rowSelection: PropTypes.object,

  //  API
  // 点击每个子项
  onCellTap: PropTypes.func
};

export default VTable;
