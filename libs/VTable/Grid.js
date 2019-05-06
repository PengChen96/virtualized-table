
import React from 'react';
import PropTypes from 'prop-types';
import {calculateColumnsWidth} from './utils/calculateColumnsWidth';
import './style.less';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // 列 #
      columns: [],
      // 虚拟列
      virtualColumns: [],
      // 源数据 #
      dataSource: [],
      // 虚拟数据
      virtualData: [],


      // 可视区域高度
      visibleHeight: props.visibleHeight || 400,
      // 一行的高度
      estimatedRowHeight: 40,
      // 可渲染的元素个数
      rowVisibleCount: 10,
      // 上下偏移渲染个数
      rowOffsetCount: 5,
      // 可视区坐标(rowIndex垂直)
      startRowIndex: 0,
      endRowIndex: 0,
      // padding偏移量(垂直)
      startVerticalOffset: 0,
      endVerticalOffset: 0,


      // 可视区域宽度
      visibleWidth: props.visibleWidth || 1200,
      // 预估的每列宽度
      estimatedColumnWidth: 150,
      // 可渲染个数（水平）
      columnVisibleCount: 8,
      // 左右偏移渲染个数
      columnOffsetCount: props.columnOffsetCount || 4,
      // 可视区坐标(columnIndex水平)
      startColumnIndex: 0,
      endColumnIndex: 0,
      // padding偏移量(水平)
      startHorizontalOffset: 0,
      endHorizontalOffset: 0,
      // 水平滚动距离
      scrollLeft: 0,
      // 左边固定列个数
      fixedLeftColumnCount: 0,
      // 左边固定列
      fixedLeftColumns: [],
      fixedLeftColumnsWidth: 0,
      // 主要滚动列
      scrollColumns: [],
      scrollColumnsWidth: props.visibleWidth || 1200
    };
  }

  static getDerivedStateFromProps(props, state) {

    console.log(props.dataSource !== state.dataSource);
    if (props.dataSource !== state.dataSource) {
      // 行
      let rowVisibleCount = Math.ceil(state.visibleHeight / state.estimatedRowHeight);
      let endRowIndex = state.startRowIndex + rowVisibleCount + state.rowOffsetCount * 2;
      // 列
      let visibleWidth = state.visibleWidth;
      let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
      let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);
      let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, props.columns.length);
      let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth;
      let columnVisibleCount = Math.ceil(scrollColumnsWidth / state.estimatedColumnWidth);
      let endColumnIndex = state.startColumnIndex + columnVisibleCount + state.columnOffsetCount * 2;

      let leftOffsetColumns = scrollColumns.slice(0, state.startColumnIndex);
      let startHorizontalOffset = calculateColumnsWidth(leftOffsetColumns);
      let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
      let endHorizontalOffset = calculateColumnsWidth(rightOffsetColumns);

      return {
        visibleHeight: props.visibleHeight,
        //
        columns: props.columns,
        fixedLeftColumns,
        fixedLeftColumnsWidth,
        scrollColumns,
        scrollColumnsWidth,
        fixedLeftColumnCount: props.fixedLeftColumnCount,
        virtualColumns: scrollColumns.slice(state.startColumnIndex, endColumnIndex),
        startHorizontalOffset,
        endHorizontalOffset,
        columnVisibleCount,
        //
        dataSource: props.dataSource,
        virtualData: props.dataSource.slice(state.startRowIndex, endRowIndex),
        startVerticalOffset: state.startRowIndex * state.estimatedRowHeight,
        endVerticalOffset: (props.dataSource.length - endRowIndex) * state.estimatedRowHeight,
        rowVisibleCount
      };
    }
    return null;

  }

  componentWillReceiveProps(props) {

    let {state} = this;
    if (props.dataSource !== state.dataSource) {
      let rowVisibleCount = Math.ceil(state.visibleHeight / state.estimatedRowHeight);
      let endRowIndex = state.startRowIndex + rowVisibleCount + state.rowOffsetCount * 2;
      //
      let visibleWidth = this._masterContainer.clientWidth;
      let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
      let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);
      let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, props.columns.length);
      let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth;
      let columnVisibleCount = Math.ceil(scrollColumnsWidth / state.estimatedColumnWidth);
      let endColumnIndex = state.startColumnIndex + columnVisibleCount + state.columnOffsetCount * 2;

      let leftOffsetColumns = scrollColumns.slice(0, state.startColumnIndex);
      let startHorizontalOffset = calculateColumnsWidth(leftOffsetColumns);
      let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
      let endHorizontalOffset = calculateColumnsWidth(rightOffsetColumns);

      this.setState({
        visibleHeight: props.visibleHeight,
        //
        columns: props.columns,
        fixedLeftColumns,
        fixedLeftColumnsWidth,
        scrollColumns,
        scrollColumnsWidth,
        fixedLeftColumnCount: props.fixedLeftColumnCount,
        virtualColumns: scrollColumns.slice(state.startColumnIndex, endColumnIndex),
        startHorizontalOffset,
        endHorizontalOffset,
        columnVisibleCount,
        // //
        dataSource: props.dataSource,
        virtualData: props.dataSource.slice(state.startRowIndex, endRowIndex),
        startVerticalOffset: state.startRowIndex * state.estimatedRowHeight,
        endVerticalOffset: (props.dataSource.length - endRowIndex) * state.estimatedRowHeight,
        rowVisibleCount
      });
    }

  }

  componentDidMount () {
    let {props} = this;
    let visibleHeight = this._masterContainer.clientHeight;
    let visibleWidth = this._masterContainer.clientWidth;
    let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
    let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);
    let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, props.columns.length);
    let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth;
    this.setState({
      visibleHeight,
      visibleWidth,
      fixedLeftColumns,
      fixedLeftColumnsWidth,
      scrollColumns,
      scrollColumnsWidth
    });
    this._scrollContainer.addEventListener('scroll', () => {
      console.log(this._scrollContainer.scrollTop, this._leftContainer.scrollTop);
      this._leftContainer.scrollTop = this._scrollContainer.scrollTop;
    });
  }

  // 垂直方向滚动
  _onVerticalScroll() {
    const {scrollTop} = this._scrollContainer;
    const {
      dataSource,
      estimatedRowHeight,
      rowOffsetCount,
      rowVisibleCount
    } = this.state;
    // 获取垂直滚动的条数
    let scrollTopNum = Math.floor(scrollTop / estimatedRowHeight);
    // 获取要渲染的行开始坐标，最小坐标为0  rowOffsetCount: 行偏移量
    let startRowIndex = (scrollTopNum - rowOffsetCount) > 0 ? (scrollTopNum - rowOffsetCount) : 0;
    // 获取要渲染的行结尾坐标，最大坐标为dataSource长度  rowOffsetCount: 行偏移量
    let endRowIndex = (rowVisibleCount + scrollTopNum + rowOffsetCount) > dataSource.length ? dataSource.length : (rowVisibleCount + scrollTopNum + rowOffsetCount);
    // 上方未渲染数据的paddingTop值
    let startVerticalOffset = startRowIndex * estimatedRowHeight;
    // 上方未渲染数据的paddingBottom值
    let endVerticalOffset = (dataSource.length - endRowIndex) * estimatedRowHeight;
    // 需要渲染显示的行数据
    let virtualData = dataSource.slice(startRowIndex, endRowIndex);
    console.log(scrollTopNum, startRowIndex, endRowIndex, startVerticalOffset, endVerticalOffset, virtualData, '垂直滚动');
    this.setState({
      startRowIndex,
      endRowIndex,
      startVerticalOffset,
      endVerticalOffset,
      virtualData
    });
  }

  // 水平方向滚动
  _onHorizontalScroll() {
    const {scrollLeft} = this._scrollContainer;
    const {
      scrollColumns,
      estimatedColumnWidth,
      columnOffsetCount,
      columnVisibleCount
    } = this.state;
    // let totalColumnLength = this.state.scrollColumns.length;
    // 获取水平滚动的条数
    let scrollLeftNum = Math.floor(scrollLeft / estimatedColumnWidth);
    // 获取要渲染的列开始坐标
    let startColumnIndex = (scrollLeftNum - columnOffsetCount) > 0 ? (scrollLeftNum - columnOffsetCount) : 0;
    // let startColumnIndex = scrollLeftNum;
    // 获取要渲染的列结尾坐标
    let endColumnIndex = (columnVisibleCount + scrollLeftNum + columnOffsetCount) > scrollColumns.length ? scrollColumns.length : (columnVisibleCount + scrollLeftNum + columnOffsetCount);
    // let endColumnIndex = columnVisibleCount + scrollLeftNum;
    // 左边未渲染数据的paddingLeft值
    // let startHorizontalOffset = startColumnIndex * estimatedColumnWidth;
    let leftOffsetColumns = scrollColumns.slice(0, startColumnIndex);
    let startHorizontalOffset = calculateColumnsWidth(leftOffsetColumns);
    // 右边未渲染数据的paddingRight值
    // let endHorizontalOffset = (scrollColumns.length - endColumnIndex) * estimatedColumnWidth;
    let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
    let endHorizontalOffset = calculateColumnsWidth(rightOffsetColumns);
    // 需要渲染显示的列数据
    let virtualColumns = scrollColumns.slice(startColumnIndex, endColumnIndex);
    console.table({
      'scrollColumns.length': scrollColumns.length,
      'scrollLeftNum水平滚动的条数': scrollLeftNum,
      'startColumnIndex要渲染的列开始坐标': startColumnIndex,
      'endColumnIndex要渲染的列结尾坐标': endColumnIndex,
      'startHorizontalOffset左边未渲染数据的paddingLeft值': startHorizontalOffset,
      'endHorizontalOffset右边未渲染数据的paddingRight值': endHorizontalOffset
    });
    console.log('需要渲染显示的列数据', virtualColumns);
    console.log('总scrollColumns', scrollColumns);
    this.setState({
      scrollLeft,
      startColumnIndex,
      endColumnIndex,
      startHorizontalOffset,
      endHorizontalOffset,
      virtualColumns
    });
  }

  // 滚动事件
  _onScrollEvent() {
    console.log(this);
    this.__onScroll(this._scrollContainer.scrollLeft);
    // 垂直方向滚动
    this._onVerticalScroll();
    // 水平方向滚动
    this._onHorizontalScroll();

    // 当前的滚动位置 减去  上一次的滚动位置
    // 如果为true则代表向下滚动，false代表向上滚动
    const {scrollPosition} = this.state;
    let flagToDirection = this._scrollContainer.scrollTop - scrollPosition > 0;
    // 记录当前的滚动位置
    this.setState({
      scrollPosition: this._scrollContainer.scrollTop
    });
    const height = this._scrollContainer.scrollHeight - this._scrollContainer.scrollTop - this._scrollContainer.clientHeight;
    // 记录滚动位置距离底部的位置
    let scrollBottom = this._scrollContainer.scrollHeight - (this._scrollContainer.scrollTop + this._scrollContainer.clientHeight) < 100;
    // 如果已达到指定位置则触发 （向下滚动）
    if (flagToDirection && scrollBottom) {
    }
    // 向上滚动
    if (!flagToDirection && this._scrollContainer.scrollTop < 100) {
    }
    console.table({
      'scrollTop 滚动的高度': this._scrollContainer.scrollTop,
      'scrollLeft 滚动的宽度': this._scrollContainer.scrollLeft,
      'clientHeight 视窗高度': this._scrollContainer.clientHeight,
      'scrollHeight 页面高度': this._scrollContainer.scrollHeight,
      'height 距离页面底部的高度': height,
      '滚动方向': flagToDirection ? '下' : '上'
    });
  }

  _cellRender(row, rowIndex, column, columnIndex) {
    let realRowIndex = rowIndex + this.state.startRowIndex;
    let realColumnIndex = columnIndex + this.state.startColumnIndex;
    let value = row[column['key']];
    let width = column.width || 150;

    return <div
      onClick={() => this.__onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)}
      className={`v-grid-cell ${column.className || ''}`}
      style={{
        width: width,
        minWidth: width,
        height: this.state.estimatedRowHeight,
        // 勾选或hover颜色
        background: (row.checked || row.hover) ? '#e6f7ff' : '',
        ...column.style
      }}
    >
      {
        this._render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
      }
      {/*{*/}
      {/*this.props.type === 'header' ? row[column['key']] :*/}
      {/*column.render ? column.render(value, row, rowIndex, column, columnIndex) : row[column['key']]*/}
      {/*}*/}
      {/*[{realRowIndex}, {realColumnIndex}]*/}
    </div>;
  }
  _render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {
    if (this.props.type === 'header') {
      return column.headRender ? column.headRender(
        value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex
      ) : row[column['key']];
      //if (columnIndex === 0) {
      //  return column.render ? column.render(
      //    value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex
      //  ) : row[column['key']];
      //} else {
      //  return row[column['key']];
      //}
    } else {
      return column.render ? column.render(
        value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex
      ) : row[column['key']];
    }
  }

  _mouseEnter(rowIndex) {
    // 当表头，不执行
    if (this.props.type === 'header') {
      return;
    }
    // 添加hover
    let {virtualData} = this.state;
    virtualData.map((row, index) => {
      row.hover = false;
      if (index === rowIndex) {
        row.hover = true;
      }
    });
    this.setState({
      virtualData
    });
  }
  _mouseLeave(rowIndex) {
    // 当表头，不执行
    if (this.props.type === 'header') {
      return;
    }
    // 移除hover
    let {virtualData} = this.state;
    virtualData[rowIndex].hover = false;
    this.setState({
      virtualData
    });
  }

  render() {

    const {
      fixedLeftColumns,
      fixedLeftColumnsWidth,
      scrollColumnsWidth,
      virtualColumns,
      startHorizontalOffset,
      endHorizontalOffset,
      // visibleWidth,
      scrollLeft,
      //
      virtualData,
      startVerticalOffset,
      endVerticalOffset,
      estimatedRowHeight,
      visibleHeight,
      //
      dataSource
    } = this.state;

    // console.log(virtualData, '-');
    // console.log(virtualColumns, '|');
    return (
      <div>
        <div className="v-grid-container"
          ref={mc => this._masterContainer = mc}
          // style={{
          //   width: visibleWidth,
          //   height: visibleHeight
          // }}
        >

          {/* 左侧固定列*/}
          <div className={`v-grid-left-columns-container ${scrollLeft > 0 && 'v-grid-fixed-left'}`}
            ref={lc => this._leftContainer = lc}
            style={{
              width: fixedLeftColumnsWidth,
              minWidth: fixedLeftColumnsWidth,
              height: visibleHeight
            }}
          >
            <div style={{paddingTop: startVerticalOffset, paddingBottom: endVerticalOffset}}>
              {
                virtualData.map((left_row, left_row_index) => {
                  return <div key={left_row_index}>
                    <div
                      className="v-grid-row"
                      onMouseEnter={()=>this._mouseEnter(left_row_index)}
                      onMouseLeave={()=>this._mouseLeave(left_row_index)}
                      style={{
                        width: fixedLeftColumnsWidth,
                        minWidth: fixedLeftColumnsWidth,
                        height: estimatedRowHeight
                      }}>
                      {
                        fixedLeftColumns.map((left_column, left_column_index) => {
                          return <div key={left_column_index}>
                            {
                              this._cellRender(left_row, left_row_index, left_column, left_column_index)
                            }
                          </div>;
                        })
                      }
                    </div>
                  </div>;
                })
              }
            </div>
          </div>
          {/* 表格主内容*/}
          <div className="v-grid-main-container"
            ref={sc => this._scrollContainer = sc}
            onScrollCapture={this._onScrollEvent.bind(this)}
            style={{
              width: scrollColumnsWidth,
              height: visibleHeight,
              // 设置最小高度[visibleHeight计算会少滚动条的高度]
              minHeight: estimatedRowHeight
            }}
          >
            <div style={{paddingTop: startVerticalOffset, paddingBottom: endVerticalOffset}}>
              {
                virtualData.map((row, rowIndex) => {
                  return <div key={rowIndex}>
                    <div
                      className="v-grid-row"
                      onMouseEnter={()=>this._mouseEnter(rowIndex)}
                      onMouseLeave={()=>this._mouseLeave(rowIndex)}
                      style={{
                        height: estimatedRowHeight,
                        width: scrollColumnsWidth,
                        paddingLeft: startHorizontalOffset,
                        paddingRight: endHorizontalOffset
                      }}
                    >
                      {
                        virtualColumns.map((column, columnIndex) => {
                          return <div key={columnIndex}>
                            {
                              this._cellRender(row, rowIndex, column, columnIndex)
                            }
                          </div>;
                        })
                      }
                    </div>
                  </div>;
                })
              }
            </div>
          </div>
          {
            dataSource.length < 1 &&
                <div className="v-container-empty">
                  {
                    this.props.emptyText
                  }
                </div>
          }
        </div>
      </div>
    );

  }

  // 滚动
  __onScroll (scrollLeft) {

    const {onScroll} = this.props;
    if (typeof onScroll === 'function') {
      onScroll(scrollLeft);
    }

  }

  // 点击每个子项
  __onCellTap (value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {

    const {onCellTap} = this.props;
    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }

  }

}

Grid.propTypes = {
  // 类型 header
  type: PropTypes.string,
  // 标题
  title: PropTypes.string,
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
  // 左右偏移量
  columnOffsetCount: PropTypes.number,
  // 空页面渲染
  emptyText: PropTypes.element,
  //  API
  // 滚动
  onScroll: PropTypes.func,
  // 点击每个子项
  onCellTap: PropTypes.func

};

export default Grid;
