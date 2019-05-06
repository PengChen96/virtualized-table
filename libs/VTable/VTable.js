
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
      dataSource: [],
      // 选择的行
      selected: [],
      // 选择的行行号
      selectedRows: []
    };
  }

  //static getDerivedStateFromProps(props, state) {
  //
  //  if (props.dataSource !== state.dataSource) {
  //    let columns = props.columns;
  //    // 复选框
  //    if (props.rowSelection) {
  //      columns.unshift({
  //        key: 'selection',
  //        title: 'all',
  //        width: 60,
  //        render: (value, row) => {
  //          //console.log(value, row, '复选框');
  //          return <div>
  //            <input type="checkbox" onChange={() => this._select(row)} checked={row.checked || false}/>
  //          </div>;
  //        }
  //      });
  //    }
  //    console.log(columns,'----');
  //    return {
  //      columns,
  //      //columnData: this.getColumnData(columns),
  //      dataSource: props.dataSource
  //    };
  //  }
  //  return null;
  //
  //}

  componentWillReceiveProps(props) {

    let {state} = this;
    if (props.dataSource !== state.dataSource) {
      let columns = props.columns;
      // 复选框
      if (props.rowSelection) {
        columns.unshift({
          width: 60,
          style: {justifyContent: 'center'},
          headRender: (value, row, rowIndex, realRowIndex) => {
            //console.log(value, row, '复选框');
            return <div>
              <input type="checkbox" onChange={() => this._select(row, realRowIndex)} checked={row.checked || false}/>
            </div>;
          },
          render: (value, row, rowIndex, realRowIndex) => {
            //console.log(value, row, '复选框');
            return [
              row && row.hover && <div key={0} className="v-row-remove" onClick={() => this.__onRowRemove(row)}/>,
              <input key={1} type="checkbox" onChange={() => this._select(row, realRowIndex)} checked={row.checked || false}/>
            ];
          }
        });
      }
      this.setState({
        columns,
        columnData: this.getColumnData(columns),
        dataSource: props.dataSource
      });
    }

  }

  componentDidMount() {

    let {props} = this;
    let columns = props.columns;
    // 复选框
    if (props.rowSelection) {
      columns.unshift({
        width: 60,
        style: {justifyContent: 'center'},
        headRender: (value, row, rowIndex, realRowIndex) => {
          //console.log(value, row, '复选框');
          return <div>
            <input type="checkbox" onChange={() => this._select(row, realRowIndex)} checked={row.checked || false}/>
          </div>;
        },
        render: (value, row, rowIndex, realRowIndex) => {
          //console.log(value, row, '复选框');
          return [
            row && row.hover && <div key={0} className="v-row-remove" onClick={() => this.__onRowRemove(row)}/>,
            <input key={1} type="checkbox" onChange={() => this._select(row, realRowIndex)} checked={row.checked || false}/>
          ];
        }
      });
    }
    this.setState({
      columns,
      columnData: this.getColumnData(columns),
      dataSource: props.dataSource
    });

  }

  // 获取表头
  getColumnData(columns) {

    let data = [{}];
    columns.forEach((item) => {
      data[0][item.key] = item.title;
    });
    // 表头复选框“全选”标志
    data[0].selection = 'all';
    return data;

  }

  render() {
    const {
      columns,
      columnData,
      dataSource
    } = this.state;
    let {
      visibleWidth = 1200,
      visibleHeight,
      fixedLeftColumnCount = 0,
      columnOffsetCount = 0,
      emptyText
    } = this.props;

    return (
      <div className="v-table">
        <div className="v-table-header">
          <Grid
            type="header"
            ref={h => this._header = h}
            title="title"
            visibleWidth={visibleWidth}
            visibleHeight={40}
            columns={columns}
            dataSource={columnData}
            fixedLeftColumnCount={fixedLeftColumnCount}
            columnOffsetCount={columnOffsetCount}
            rowSelection={this.props.rowSelection}
          />
        </div>
        <div className="v-table-content">
          <Grid
            title="title"
            visibleWidth={visibleWidth}
            visibleHeight={visibleHeight}
            columns={columns}
            dataSource={dataSource}
            fixedLeftColumnCount={fixedLeftColumnCount}
            columnOffsetCount={columnOffsetCount}
            onScroll={this.onScroll.bind(this)}
            onCellTap={this.__onCellTap.bind(this)}
            emptyText={emptyText}
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
  //
  test() {
    console.log('test');
  }
  // 点击每个子项
  __onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {

    const {onCellTap} = this.props;
    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  }
  // 删除行
  __onRowRemove(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {

    const {onRowRemove} = this.props;
    if (typeof onRowRemove === 'function') {
      onRowRemove(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  }
  // 用户手动选择/取消选择行的回调
  _select(row, realRowIndex) {

    // 表头的全选
    if (row.selection && row.selection === 'all') {

      this.__onSelectAll(row);

    }
    // 表格内容的选择
    else {

      this.__onSelect(row, realRowIndex);

    }

  }
  // 用户手动选择/取消选择所有行的回调
  __onSelectAll(row) {

    const {onSelectAll, rowKey} = this.props;
    const {dataSource} = this.state;
    if (typeof onSelectAll === 'function') {

      // 深拷贝全部数据
      let _dataSource = JSON.parse(JSON.stringify(dataSource));
      // 选择的行
      let _selected = [];
      // 选择的行行号
      let _selectedRows = [];
      // 当前全选 要不全选
      if (row.checked) {
        row.checked = false;
        dataSource.map((item) => {
          item.checked = false;
          return item;
        });
        this.setState({
          dataSource,
          selected: [],
          selectedRows: []
        });
      }
      // 当前不全选 要全选
      else {
        row.checked = true;
        // 这里需要改变源数据
        dataSource.map((item) => {
          item.checked = true;
          return item;
        });
        this.setState({
          dataSource,
          // 这里不能改变源数据
          selected: _dataSource,
          selectedRows: _dataSource.map((item, index) => {return rowKey ? item[rowKey] : index;})
        });
        _selected = _dataSource;
        _selectedRows = _dataSource.map((item, index) => {return rowKey ? item[rowKey] : index;});
      }
      onSelectAll(_selected, _selectedRows);
    }

  }
  // 用户手动选择/取消选择行的回调
  __onSelect(row, realRowIndex) {

    const {onSelect, rowKey} = this.props;
    const {selected, selectedRows} = this.state;
    if (typeof onSelect === 'function') {

      if (row.checked) {
        row.checked = false;
        selected[realRowIndex] = undefined;
        selectedRows[realRowIndex] = undefined;
      } else {
        row.checked = true;
        selected[realRowIndex] = row;
        selectedRows[realRowIndex] = rowKey ? row[rowKey] : realRowIndex;
      }
      // 过滤空元素
      let _selected = selected.filter(x => x);
      let _selectedRows = selectedRows.filter(x => x === 0 ? true : x);
      onSelect(row, _selected, _selectedRows);

    }

  }

}

VTable.propTypes = {
  // 列
  columns: PropTypes.array,
  // 左边固定列 列数
  fixedLeftColumnCount: PropTypes.number,
  // 左右偏移量
  columnOffsetCount: PropTypes.number,
  // 源数据
  dataSource: PropTypes.array,
  // 可视区域宽度
  visibleWidth: PropTypes.number,
  // 可视区域高度
  visibleHeight: PropTypes.number,
  // 复选框
  rowSelection: PropTypes.object,
  // 空页面渲染
  emptyText: PropTypes.element,
  // rowKey
  rowKey: PropTypes.string,

  //  API
  // 点击每个子项 Function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
  onCellTap: PropTypes.func,
  // 勾选全部 Function(selected, selectedRows)
  onSelectAll: PropTypes.func,
  // 勾选行 Function(record, selected, selectedRows)
  onSelect: PropTypes.func,
  // 删除行 Function(row)
  onRowRemove: PropTypes.func

};

export default VTable;
