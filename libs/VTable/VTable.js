
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
      footerColumnData: [],
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
    let {rowRemoveVisible = true} = props;
    if (props.dataSource !== state.dataSource ||
      props.footerColumnData !== state.footerColumnData ||
      props.columns !== state.columns
    ) {
      let columns = props.columns;
      let footerColumns = JSON.parse(JSON.stringify(props.columns));
      // 复选框
      if (props.rowSelection && columns[0] && columns[0].type !== 'checkBox') {
        columns.unshift({
          type: 'checkBox',
          width: 60,
          style: {justifyContent: 'center'},
          headRender: (value, row, rowIndex, realRowIndex) => {
            return <div className="v-checkbox-container" onClick={(e) => this._select(e, row, realRowIndex)}>
              <input type="checkbox" onChange={(e) => this._select(e, row, realRowIndex)} checked={row.checked || false}/>
              <div className="show-box" />
            </div>;
          },
          render: (value, row, rowIndex, realRowIndex) => {
            return [
              rowRemoveVisible && row && row.hover && <div key={0} onClick={(e) => this.__onRowRemove(e, row, rowIndex, realRowIndex)}>
                {props.rowRemoveText || <div className="v-row-remove"/>}
              </div>,
              <div className="v-checkbox-container" key={1} onClick={(e) => this._select(e, row, realRowIndex)}>
                <input type="checkbox" checked={row.checked || false}/>
                <div className="show-box" />
              </div>
            ];
          }
        });
        //
        footerColumns = JSON.parse(JSON.stringify(props.columns));
        footerColumns[0] = {width: 60};
      }
      this.setState({
        columns,
        columnData: this.getColumnData(columns),
        dataSource: props.dataSource,
        footerColumns: footerColumns,
        footerColumnData: props.footerColumnData,
        selected: [],
        selectedRows: []
      });
    }

  }

  componentDidMount() {

    let {props} = this;
    let {rowRemoveVisible = true} = props;
    let columns = props.columns;
    let footerColumns = JSON.parse(JSON.stringify(props.columns));
    // 复选框
    if (props.rowSelection && columns[0] && columns[0].type !== 'checkBox') {
      columns.unshift({
        type: 'checkBox',
        width: 60,
        style: {justifyContent: 'center'},
        headRender: (value, row, rowIndex, realRowIndex) => {
          return <div className="v-checkbox-container" onClick={(e) => this._select(e, row, realRowIndex)}>
            <input type="checkbox" checked={row.checked || false}/>
            <div className="show-box" />
          </div>;
        },
        render: (value, row, rowIndex, realRowIndex) => {
          return [
            rowRemoveVisible && row && row.hover && <div key={0} onClick={(e) => this.__onRowRemove(e, row, rowIndex, realRowIndex)}>
              {props.rowRemoveText || <div className="v-row-remove"/>}
            </div>,
            <div className="v-checkbox-container" key={1} onClick={(e) => this._select(e, row, realRowIndex)}>
              <input type="checkbox" checked={row.checked || false}/>
              <div className="show-box" />
            </div>
          ];
        }
      });
      //
      footerColumns = JSON.parse(JSON.stringify(props.columns));
      footerColumns[0] = {width: 60};
    }
    this.setState({
      columns,
      columnData: this.getColumnData(columns),
      dataSource: props.dataSource,
      footerColumns: footerColumns,
      footerColumnData: props.footerColumnData,
      selected: [],
      selectedRows: []
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
      dataSource,
      footerColumns = [],
      footerColumnData = []
    } = this.state;
    let {
      className,
      visibleWidth = 1200,
      visibleHeight = 400,
      mainRowHeight = 40,
      fixedLeftColumnCount = 0,
      columnOffsetCount = 0,
      emptyText,
      loading,
      loadingText,
      rowActiveKey,
      rowActiveColor,
      // 禁止数据事件
      pointerEventDisabled = false
    } = this.props;

    return (
      <div className={`v-table ${className}`}>
        <div className="v-table-header">
          <Grid
            type="header"
            ref={h => this._header = h}
            title="title"
            visibleWidth={visibleWidth}
            visibleHeight={38}
            estimatedRowHeight={38}
            columns={columns}
            dataSource={columnData}
            fixedLeftColumnCount={fixedLeftColumnCount}
            columnOffsetCount={columnOffsetCount}
            pointerEventDisabled={pointerEventDisabled}
          />
        </div>
        <div className="v-table-content">
          <Grid
            title="title"
            visibleWidth={visibleWidth}
            visibleHeight={visibleHeight}
            estimatedRowHeight={mainRowHeight}
            columns={columns}
            dataSource={dataSource}
            fixedLeftColumnCount={fixedLeftColumnCount}
            columnOffsetCount={columnOffsetCount}
            onScroll={this.onScroll.bind(this)}
            onCellTap={this.__onCellTap.bind(this)}
            emptyText={emptyText}
            loading={loading}
            loadingText={loadingText}
            rowActiveKey={rowActiveKey}
            rowActiveColor={rowActiveColor}
            pointerEventDisabled={pointerEventDisabled}
          />
        </div>
        {
          footerColumnData.length > 0 &&
            <div className="v-table-footer">
              <Grid
                type="footer"
                ref={h => this._footer = h}
                title="title"
                visibleWidth={visibleWidth}
                visibleHeight={38}
                estimatedRowHeight={38}
                columns={footerColumns}
                dataSource={footerColumnData}
                fixedLeftColumnCount={fixedLeftColumnCount}
                columnOffsetCount={columnOffsetCount}
                pointerEventDisabled={pointerEventDisabled}
              />
            </div>
        }
      </div>
    );
  }

  // 滚动
  onScroll(scrollLeft) {
    this._header._scrollContainer.scrollLeft = scrollLeft;
    if (this._footer) {
      this._footer._scrollContainer.scrollLeft = scrollLeft;
    }
  }
  // 点击每个子项
  __onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {

    const {onCellTap} = this.props;
    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  }
  // 删除行
  __onRowRemove(e, row, rowIndex, realRowIndex) {

    e.stopPropagation();
    const {onRowRemove} = this.props;
    if (typeof onRowRemove === 'function') {
      onRowRemove(e, row, rowIndex, realRowIndex);
    }
  }
  // 用户手动选择/取消选择行的回调
  _select(e, row, realRowIndex) {

    e.stopPropagation();
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
    const {selected, selectedRows, columnData, dataSource} = this.state;
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
      // 是否已经全部勾选
      if (_selected.length === dataSource.length) {
        columnData[0].checked = true;
      } else {
        columnData[0].checked = false;
      }
      this.setState({
        columnData
      });
      onSelect(row, _selected, _selectedRows);

    }

  }

}

VTable.propTypes = {
  // v-table className
  className: PropTypes.string,
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
  // 主内容 预估的行高度
  mainRowHeight: PropTypes.number,
  // 复选框
  rowSelection: PropTypes.object,
  // 空页面渲染
  emptyText: PropTypes.element,
  // loading
  loading: PropTypes.bool,
  // loadingText
  loadingText: PropTypes.element,
  // rowKey for select
  rowKey: PropTypes.string,
  // 标记行的键
  rowActiveKey: PropTypes.string,
  // 标记行的颜色
  rowActiveColor: PropTypes.string,
  // 底部footer行数据
  footerColumnData: PropTypes.array,

  //  API
  // 点击每个子项 Function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
  onCellTap: PropTypes.func,
  // 勾选全部 Function(selected, selectedRows)
  onSelectAll: PropTypes.func,
  // 勾选行 Function(record, selected, selectedRows)
  onSelect: PropTypes.func,
  // 删除行 Function(row)
  onRowRemove: PropTypes.func,
  // 删除行内容样式
  rowRemoveText: PropTypes.element,
  // 是否显示删除按钮
  rowRemoveVisible: PropTypes.bool,
  // 禁止数据事件
  pointerEventDisabled: PropTypes.bool

};

export default VTable;
