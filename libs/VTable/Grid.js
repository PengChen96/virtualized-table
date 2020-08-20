
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
      estimatedRowHeight: props.estimatedRowHeight || 40,
      // 可渲染的元素个数
      rowVisibleCount: 10,
      // 上下偏移渲染个数
      rowOffsetCount: 10,
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
      // 水平滚动距离 TODO (这里设置1是为了保证滚动同步，为什么呢？？？暂不清楚)
      scrollLeft: 1,
      // 左边固定列个数
      fixedLeftColumnCount: 0,
      // 左边固定列
      fixedLeftColumns: [],
      fixedLeftColumnsWidth: 0,
      // 右边固定列个数
      fixedRightColumnCount: props.fixedRightColumnCount || 0,
      // 右边固定列
      fixedRightColumns: [],
      fixedRightColumnsWidth: 0,
      // 主要滚动列
      scrollColumns: [],
      scrollColumnsWidth: props.visibleWidth || 1200,

      // 鼠标事件
      pointerEvents: 'auto',
      // 禁止鼠标事件
      pointerEventDisabled: props.pointerEventDisabled || false
    };
  }

  static getDerivedStateFromProps(props, state) {

    if (props.dataSource !== state.dataSource ||
      props.pointerEventDisabled !== state.pointerEventDisabled
    ) {
      // 行
      let rowVisibleCount = Math.ceil(state.visibleHeight / state.estimatedRowHeight);
      let endRowIndex = state.startRowIndex + rowVisibleCount + state.rowOffsetCount * 2;
      // 列
      let visibleWidth = state.visibleWidth;
      let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
      let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);

      let fixedRightColumnsStartIndex = props.columns.length - state.fixedRightColumnCount;
      let fixedRightColumns = props.columns.slice(fixedRightColumnsStartIndex, props.columns.length);
      let fixedRightColumnsWidth = calculateColumnsWidth(fixedRightColumns);

      let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, fixedRightColumnsStartIndex);
      let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth - fixedRightColumnsWidth;
      let columnVisibleCount = Math.ceil(scrollColumnsWidth / state.estimatedColumnWidth);
      let endColumnIndex = state.startColumnIndex + columnVisibleCount + state.columnOffsetCount * 2;

      let leftOffsetColumns = scrollColumns.slice(0, state.startColumnIndex);
      let startHorizontalOffset = calculateColumnsWidth(leftOffsetColumns);
      let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
      let endHorizontalOffset = calculateColumnsWidth(rightOffsetColumns);

      return {
        pointerEventDisabled: props.pointerEventDisabled,
        visibleHeight: props.visibleHeight,
        estimatedRowHeight: props.estimatedRowHeight,
        //
        columns: props.columns,
        fixedLeftColumns,
        fixedLeftColumnsWidth,
        fixedRightColumns,
        fixedRightColumnsWidth,
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
  componentDidUpdate(prevProps){

    // 为了查询数据后滚动条能到顶部
    if (prevProps.dataSource.length !== this.state.dataSource.length) {
      this._scrollContainer.scrollTop = 0;
    }

  }

  componentWillReceiveProps(props) {

    let {state} = this;
    if (props.dataSource !== state.dataSource ||
      props.pointerEventDisabled !== state.pointerEventDisabled
    ) {
      let rowVisibleCount = Math.ceil(state.visibleHeight / state.estimatedRowHeight);
      let endRowIndex = state.startRowIndex + rowVisibleCount + state.rowOffsetCount * 2;
      //
      let visibleWidth = this._masterContainer.clientWidth;
      let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
      let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);

      let fixedRightColumnsStartIndex = props.columns.length - state.fixedRightColumnCount;
      let fixedRightColumns = props.columns.slice(fixedRightColumnsStartIndex, props.columns.length);
      let fixedRightColumnsWidth = calculateColumnsWidth(fixedRightColumns);

      let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, fixedRightColumnsStartIndex);
      let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth - fixedRightColumnsWidth;
      let columnVisibleCount = Math.ceil(scrollColumnsWidth / state.estimatedColumnWidth);
      let endColumnIndex = state.startColumnIndex + columnVisibleCount + state.columnOffsetCount * 2;

      let leftOffsetColumns = scrollColumns.slice(0, state.startColumnIndex);
      let startHorizontalOffset = calculateColumnsWidth(leftOffsetColumns);
      let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
      let endHorizontalOffset = calculateColumnsWidth(rightOffsetColumns);

      this.setState({
        pointerEventDisabled: props.pointerEventDisabled,
        visibleHeight: props.visibleHeight,
        estimatedRowHeight: props.estimatedRowHeight,
        //
        columns: props.columns,
        fixedLeftColumns,
        fixedLeftColumnsWidth,
        fixedRightColumns,
        fixedRightColumnsWidth,
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
        rowVisibleCount,
      });
    }

  }

  componentDidMount () {

    let {props} = this;
    let visibleHeight = this._masterContainer.clientHeight;
    let visibleWidth = this._masterContainer.clientWidth;
    let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
    let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);

    let fixedRightColumnsStartIndex = props.columns.length - props.fixedRightColumnCount;
    let fixedRightColumns = props.columns.slice(fixedRightColumnsStartIndex, props.columns.length);
    let fixedRightColumnsWidth = calculateColumnsWidth(fixedRightColumns);

    let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, props.columns.length);
    let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth - fixedRightColumnsWidth;
    this.setState({
      pointerEventDisabled: props.pointerEventDisabled,
      estimatedRowHeight: props.estimatedRowHeight,
      visibleHeight,
      visibleWidth,
      fixedLeftColumns,
      fixedLeftColumnsWidth,
      fixedRightColumns,
      fixedRightColumnsWidth,
      scrollColumns,
      scrollColumnsWidth
    });
    //
    window.addEventListener('resize', () => this.resizeListener());

  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resizeListener());
  }
  resizeListener () {

    if (this._masterContainer) {
      let {clientWidth} = this._masterContainer;
      this.setState({
        visibleWidth: clientWidth
      }, () => {
        let {props, state} = this;
        this.setState(this.getTableConfig(props, state));

      });
    }

  };
  // 获取表格参数
  getTableConfig(props, state) {

    let rowVisibleCount = Math.ceil(state.visibleHeight / state.estimatedRowHeight);
    let endRowIndex = state.startRowIndex + rowVisibleCount + state.rowOffsetCount * 2;
    //
    let visibleWidth = state.visibleWidth;
    let fixedLeftColumns = props.columns.slice(0, props.fixedLeftColumnCount);
    let fixedLeftColumnsWidth = calculateColumnsWidth(fixedLeftColumns);

    let fixedRightColumnsStartIndex = props.columns.length - state.fixedRightColumnCount;
    let fixedRightColumns = props.columns.slice(fixedRightColumnsStartIndex, props.columns.length);
    let fixedRightColumnsWidth = calculateColumnsWidth(fixedRightColumns);

    let scrollColumns = props.columns.slice(props.fixedLeftColumnCount, fixedRightColumnsStartIndex);
    let scrollColumnsWidth = visibleWidth - fixedLeftColumnsWidth - fixedRightColumnsWidth;
    let columnVisibleCount = Math.ceil(scrollColumnsWidth / state.estimatedColumnWidth);
    let endColumnIndex = state.startColumnIndex + columnVisibleCount + state.columnOffsetCount * 2;

    let leftOffsetColumns = scrollColumns.slice(0, state.startColumnIndex);
    let startHorizontalOffset = calculateColumnsWidth(leftOffsetColumns);
    let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
    let endHorizontalOffset = calculateColumnsWidth(rightOffsetColumns);

    return {
      fixedLeftColumns,
      fixedLeftColumnsWidth,
      fixedRightColumns,
      fixedRightColumnsWidth,
      scrollColumns,
      scrollColumnsWidth,
      virtualColumns: scrollColumns.slice(state.startColumnIndex, endColumnIndex),
      startHorizontalOffset,
      endHorizontalOffset,
      columnVisibleCount,
      virtualData: props.dataSource.slice(state.startRowIndex, endRowIndex),
      startVerticalOffset: state.startRowIndex * state.estimatedRowHeight,
      endVerticalOffset: (props.dataSource.length - endRowIndex) * state.estimatedRowHeight,
      rowVisibleCount,
    };

  };
  // 同步左侧滚动条
  _syncScrollTop (container) {
    const { scrollTop } =  container;
    [this._scrollContainer, this._leftContainer, this._rightContainer].forEach(containerItem => {
      if(containerItem.scrollTop !== scrollTop) containerItem.scrollTop = scrollTop
    });

    // 禁用
    if (this._leftContainer.scrollTop !== this._scrollContainer.scrollTop) {
      this.setState({
        pointerEvents: 'none'
      });
    } else {
      this.setState({
        pointerEvents: 'auto'
      });
    }
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

    this.setState({
      // TODO (这里设置1是为了保证滚动同步，为什么呢？？？暂不清楚)
      scrollLeft: scrollLeft < 1 ? 1 : scrollLeft,
      startColumnIndex,
      endColumnIndex,
      startHorizontalOffset,
      endHorizontalOffset,
      virtualColumns
    });
  }

  // 滚动事件
  _onScrollEvent(e) {
    this._syncScrollTop(e.target);
    // 同步header滚动条
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
    // 记录滚动位置距离底部的位置
    let scrollBottom = this._scrollContainer.scrollHeight - (this._scrollContainer.scrollTop + this._scrollContainer.clientHeight) < 100;
    // 如果已达到指定位置则触发 （向下滚动）
    if (flagToDirection && scrollBottom) {
    }
    // 向上滚动
    if (!flagToDirection && this._scrollContainer.scrollTop < 100) {
    }

  }

  _cellRender(row, rowIndex, column, columnIndex) {
    let realRowIndex = rowIndex + this.state.startRowIndex;
    let realColumnIndex = columnIndex + this.state.startColumnIndex;
    let value = row[column['key']];
    let width = column.width || 150;
    let height = this.state.estimatedRowHeight;
    let {
      rowActiveKey = 'active',
      rowActiveColor = '#fff1f0',
      type = 'content'
    } = this.props;
    let headerClassName = column.headerClassName ? column.headerClassName : column.className;
    let className = type === 'header' ? headerClassName : column.className;
    if (type === 'header') {
      let valueArr = value && value.split('@');
      value = valueArr[0];
      width = Number(valueArr[1]);
      height = Number(valueArr[2]);
    }
    return <div
      onClick={() => this.__onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)}
      className={`v-grid-cell ${className || ''}`}
      style={{
        width: width,
        minWidth: width,
        display: String(width) === '0' ? 'none' : undefined,
        height: height,
        // 勾选或hover颜色
        background: row[rowActiveKey] ? rowActiveColor : ((row.checked || row.hover) ? '#ebf5ff' : ''),
        ...column.style
      }}
    >
      {
        this._render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
      }
    </div>;
  }
  _render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {
    if (this.props.type === 'header') {

      return column.headRender ? column.headRender(
        value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex
      ) : value;

    } else {

      return column.render ? column.render(
        value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex
      ) : value;

    }
  }

  _mouseEnter(rowIndex, rowData) {
    // 当表头，不执行
    let {type} = this.props;
    if (this.props.type === 'header' || type === 'footer') {
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
    // 鼠标浮动到某个行上
    const {onMouseEnter} = this.props;
    if (typeof onMouseEnter === 'function') {
      onMouseEnter(rowData, rowIndex,);
    }
  }
  _mouseLeave(rowIndex, rowData) {
    // 当表头，不执行
    let {type} = this.props;
    if (type === 'header' || type === 'footer') {
      return;
    }
    // 移除hover
    let {virtualData} = this.state;
    virtualData[rowIndex].hover = false;
    this.setState({
      virtualData
    });
    // 鼠标浮动到某个行上
    const {onMouseLeave} = this.props;
    if (typeof onMouseLeave === 'function') {
      onMouseLeave(rowData, rowIndex,);
    }
  }

  render() {

    const {
      fixedLeftColumns,
      fixedLeftColumnsWidth,
      fixedRightColumns,
      fixedRightColumnsWidth,
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
      dataSource,
      pointerEvents,
      pointerEventDisabled
    } = this.state;

    // let width = fixedLeftColumnsWidth + fixedRightColumnsWidth + scrollColumnsWidth;
    return (
      <div>
        <div className="v-grid-container"
          ref={mc => this._masterContainer = mc}
        >

          {/* 左侧固定列*/} {/*TODO (这里设置1是为了保证滚动同步，为什么呢？？？暂不清楚)*/}
          <div className={`v-grid-left-columns-container ${scrollLeft > 1 ? 'v-grid-fixed-left' : 'v-for-sync-scroll-shadow'}`}
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
                      onMouseEnter={()=>this._mouseEnter(left_row_index, left_row)}
                      onMouseLeave={()=>this._mouseLeave(left_row_index, left_row)}
                      style={{
                        pointerEvents: pointerEventDisabled ? 'none' : pointerEvents,
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
          <div className={`v-grid-main-container ${this.props.emptyContainer ? 'v-grid-empty-main-container' : ''}` }
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
                      onMouseEnter={()=>this._mouseEnter(rowIndex, row)}
                      onMouseLeave={()=>this._mouseLeave(rowIndex, row)}
                      style={{
                        pointerEvents: pointerEventDisabled ? 'none' : pointerEvents,
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
          {/* 右侧固定列*/} {/*TODO (这里设置1是为了保证滚动同步，为什么呢？？？暂不清楚)*/}
          <div  className={`v-grid-right-columns-container ${scrollLeft > 1 ? 'v-grid-fixed-right' : 'v-for-sync-scroll-shadow-right'}`}
            ref={rc => this._rightContainer = rc}
            style={{
              width: fixedRightColumnsWidth,
              minWidth: fixedRightColumnsWidth,
              height: visibleHeight
            }}
          >
            <div style={{paddingTop: startVerticalOffset, paddingBottom: endVerticalOffset}}>
              {
                virtualData.map((right_row, right_row_index) => {
                  return <div key={right_row_index}>
                    <div
                      className="v-grid-row"
                      onMouseEnter={()=>this._mouseEnter(right_row_index, right_row)}
                      onMouseLeave={()=>this._mouseLeave(right_row_index, right_row)}
                      style={{
                        pointerEvents: pointerEventDisabled ? 'none' : pointerEvents,
                        width: fixedRightColumnsWidth,
                        minWidth: fixedRightColumnsWidth,
                        height: estimatedRowHeight
                      }}>
                      {
                        fixedRightColumns.map((right_column, right_column_index) => {
                          return <div key={right_column_index}>
                            {
                              this._cellRender(right_row, right_row_index, right_column, right_column_index)
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
                    this.props.emptyText || '暂无数据'
                  }
                </div>
          }
          {
            this.props.loading &&
              <div className="v-container-loading">
                {this.props.loadingText || '数据加载中，请稍后..'}
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
  // 右边固定列 列数
  fixedRightColumnCount: PropTypes.number,
  // 源数据
  dataSource: PropTypes.array,
  // 内容区域的数据是否为空
  emptyContainer: PropTypes.bool,
  // 可视区域宽度
  visibleWidth: PropTypes.number,
  // 预估的行高度
  estimatedRowHeight: PropTypes.number,
  // 可视区域高度
  visibleHeight: PropTypes.number,
  // 左右偏移量
  columnOffsetCount: PropTypes.number,
  // 空页面渲染
  emptyText: PropTypes.element,
  // loading
  loading: PropTypes.bool,
  // loadingText
  loadingText: PropTypes.element,
  // 标记行的键
  rowActiveKey: PropTypes.string,
  // 标记行的颜色
  rowActiveColor: PropTypes.string,
  //  API
  // 滚动
  onScroll: PropTypes.func,
  // 点击每个子项
  onCellTap: PropTypes.func,
  // 禁止数据事件
  pointerEventDisabled: PropTypes.bool

};

export default Grid;
