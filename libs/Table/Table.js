
import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Table extends React.Component {

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
      // 左边固定列个数
      fixedLeftColumnCount: 1,


      // 可视区域宽度
      visibleWidth: props.visibleWidth || 1200,
      // 预估的每列宽度
      estimatedColumnWidth: 150,
      // 可渲染个数（水平）
      columnVisibleCount: 8,
      // 左右偏移渲染个数
      columnOffsetCount: 4,
      // 可视区坐标(columnIndex水平)
      startColumnIndex: 0,
      endColumnIndex: 0,
      // padding偏移量(水平)
      startHorizontalOffset: 0,
      endHorizontalOffset: 0,
      // 固定列 列数
      fixedLeftColumns: 0,
      // 水平滚动距离
      scrollLeft: 0
    };
  }

  static getDerivedStateFromProps(props, state) {

    console.log(props.dataSource !== state.dataSource);
    if (props.dataSource !== state.dataSource) {
      let rowVisibleCount = Math.ceil(state.visibleHeight / state.estimatedRowHeight);
      let endRowIndex = state.startRowIndex + rowVisibleCount + state.rowOffsetCount * 2;
      //
      let columnVisibleCount = Math.ceil(state.visibleWidth / state.estimatedColumnWidth);
      let endColumnIndex = state.startColumnIndex + columnVisibleCount + state.columnOffsetCount * 2;

      let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
      return {
        columns: props.columns,
        fixedLeftColumns,
        fixedLeftColumnCount: props.fixedLeftColumnCount,
        virtualColumns: props.columns.slice(state.startColumnIndex, endColumnIndex),
        startHorizontalOffset: state.startColumnIndex * state.estimatedColumnWidth,
        endHorizontalOffset: (props.columns.length - endColumnIndex) * state.estimatedColumnWidth,
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

  componentDidMount () {
    this.setState({
      visibleHeight: this._container.clientHeight,
      visibleWidth: this._container.clientWidth
    });
    this._container.addEventListener('scroll', () => {
      console.log(this._container.scrollTop, this._leftContainer.scrollTop);
      this._leftContainer.scrollTop = this._container.scrollTop;
    });
  }

  // 垂直方向滚动
  _onVerticalScroll() {
    const {scrollTop} = this._container;
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
    const {scrollLeft} = this._container;
    const {
      columns,
      estimatedColumnWidth,
      columnOffsetCount,
      columnVisibleCount
    } = this.state;
    // let totalColumnLength = this.state.columns.length;
    // 获取水平滚动的条数
    let scrollLeftNum = Math.floor(scrollLeft / estimatedColumnWidth);
    // 获取要渲染的列开始坐标
    let startColumnIndex = (scrollLeftNum - columnOffsetCount) > 0 ? (scrollLeftNum - columnOffsetCount) : 0;
    // let startColumnIndex = scrollLeftNum;
    // 获取要渲染的列结尾坐标
    let endColumnIndex = (columnVisibleCount + scrollLeftNum + columnOffsetCount) > columns.length ? columns.length : (columnVisibleCount + scrollLeftNum + columnOffsetCount);
    // let endColumnIndex = columnVisibleCount + scrollLeftNum;
    // 左边未渲染数据的paddingLeft值
    let startHorizontalOffset = startColumnIndex * estimatedColumnWidth;
    // 右边未渲染数据的paddingRight值
    let endHorizontalOffset = (columns.length - endColumnIndex) * estimatedColumnWidth;
    // 需要渲染显示的列数据
    let virtualColumns = columns.slice(startColumnIndex, endColumnIndex);
    console.table({
      'columns.length': columns.length,
      'scrollLeftNum水平滚动的条数': scrollLeftNum,
      'startColumnIndex要渲染的列开始坐标': startColumnIndex,
      'endColumnIndex要渲染的列结尾坐标': endColumnIndex,
      'startHorizontalOffset左边未渲染数据的paddingLeft值': startHorizontalOffset,
      'endHorizontalOffset右边未渲染数据的paddingRight值': endHorizontalOffset
    });
    console.log('需要渲染显示的列数据', virtualColumns);
    console.log('总columns', columns);
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
    this.__onScroll(this._container.scrollLeft);
    // 垂直方向滚动
    this._onVerticalScroll();
    // 水平方向滚动
    this._onHorizontalScroll();

    // 当前的滚动位置 减去  上一次的滚动位置
    // 如果为true则代表向下滚动，false代表向上滚动
    const {scrollPosition} = this.state;
    let flagToDirection = this._container.scrollTop - scrollPosition > 0;
    // 记录当前的滚动位置
    this.setState({
      scrollPosition: this._container.scrollTop
    });
    const height = this._container.scrollHeight - this._container.scrollTop - this._container.clientHeight;
    // 记录滚动位置距离底部的位置
    let scrollBottom = this._container.scrollHeight - (this._container.scrollTop + this._container.clientHeight) < 100;
    // 如果已达到指定位置则触发 （向下滚动）
    if (flagToDirection && scrollBottom) {
    }
    // 向上滚动
    if (!flagToDirection && this._container.scrollTop < 100) {
    }
    console.table({
      'scrollTop 滚动的高度': this._container.scrollTop,
      'scrollLeft 滚动的宽度': this._container.scrollLeft,
      'clientHeight 视窗高度': this._container.clientHeight,
      'scrollHeight 页面高度': this._container.scrollHeight,
      'height 距离页面底部的高度': height,
      '滚动方向': flagToDirection ? '下' : '上'
    });
  }

  _cellRender(row, rowIndex, column, columnIndex) {
    let realRowIndex = rowIndex + this.state.startRowIndex;
    let realColumnIndex = columnIndex + this.state.startColumnIndex;
    let value = row[column['key']];
    return <div style={{minWidth: 150}} onClick={() => this.__onCellTap(row)}>
      {
        column.render ? column.render(value) : row[column['key']]
      }
      [{realRowIndex}, {realColumnIndex}]
    </div>;
  }

  render() {

    const {
      fixedLeftColumns,
      virtualColumns,
      startHorizontalOffset,
      endHorizontalOffset,
      visibleWidth,
      scrollLeft,
      //
      virtualData,
      startVerticalOffset,
      endVerticalOffset,
      estimatedRowHeight,
      visibleHeight
    } = this.state;

    console.log(virtualData, '-');
    console.log(virtualColumns, '|');
    return (
      <div className="v-table-container">
        {/* 左侧固定列*/}
        <div className={`v-table-left-columns-container ${scrollLeft > 0 && 'v-table-fixed-left'}`}
          ref={lc => this._leftContainer = lc}
          style={{width: 300, height: visibleHeight}}
        >
          <div style={{paddingTop: startVerticalOffset, paddingBottom: endVerticalOffset}}>
            {
              virtualData.map((left_row, left_row_index) => {
                return <React.Fragment key={left_row_index}>
                  <div className="v-table-row" style={{
                    width: 300,
                    height: estimatedRowHeight
                  }}>
                    {
                      fixedLeftColumns.map((left_column, left_column_index) => {
                        return <React.Fragment key={left_column_index}>
                          {
                            this._cellRender(left_row, left_row_index, left_column, left_column_index)
                          }
                        </React.Fragment>;
                      })
                    }
                  </div>
                </React.Fragment>;
              })
            }
          </div>
        </div>
        {/* 表格主内容*/}
        <div className="v-table-main-container"
          ref={c => this._container = c}
          onScrollCapture={this._onScrollEvent.bind(this)}
          style={{
            width: visibleWidth,
            height: visibleHeight,
            // 设置最小高度[visibleHeight计算会少滚动条的高度]
            minHeight: estimatedRowHeight
          }}
        >
          <div style={{paddingTop: startVerticalOffset, paddingBottom: endVerticalOffset}}>
            {
              virtualData.map((row, rowIndex) => {
                return <React.Fragment key={rowIndex}>
                  <div className="v-table-row" style={{
                    height: estimatedRowHeight,
                    width: visibleWidth,
                    paddingLeft: startHorizontalOffset,
                    paddingRight: endHorizontalOffset
                  }}>
                    {
                      virtualColumns.map((column, columnIndex) => {
                        return <React.Fragment key={columnIndex}>
                          {
                            this._cellRender(row, rowIndex, column, columnIndex)
                          }
                        </React.Fragment>;
                      })
                    }
                  </div>
                </React.Fragment>;
              })
            }
          </div>
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
  __onCellTap (row) {

    const {onCellTap} = this.props;
    if (typeof onCellTap === 'function') {
      onCellTap(row);
    }

  }

}

Table.propTypes = {
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

  //  API
  // 滚动
  onScroll: PropTypes.func,
  // 点击每个子项
  onCellTap: PropTypes.func
};

export default Table;
