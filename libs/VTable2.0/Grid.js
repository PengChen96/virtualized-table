
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './styles/grid.less';
import {calculateColumnsWidth} from './utils';
import {sameType} from '../common/utils';

const ALIGN_TYPE = {
  left: 'vt-align-left',
  right: 'vt-align-right',
  center: 'vt-align-center',
};

const Grid = (props) => {

  const _scrollContainer = useRef(null);
  let stateProps = {
    // 列 #
    columns: props.columns || [],
    // 源数据 #
    dataSource: props.dataSource || [],

    // 可视区域高度
    visibleHeight: props.visibleHeight || 400,
    // 一行的高度（预估）
    estimatedRowHeight: props.estimatedRowHeight || 40,
    minRowHeight: props.minRowHeight || 40,
    // 可渲染的元素个数
    rowVisibleCount: props.rowVisibleCount || 30,
    // 上下偏移渲染个数
    rowOffsetCount: props.rowOffsetCount || 10,

    // 可视区域宽度
    visibleWidth: props.visibleWidth || 1200,
    // 预估的每列宽度
    estimatedColumnWidth: props.estimatedColumnWidth || 150,
    // 可渲染个数（水平）
    columnVisibleCount: props.columnVisibleCount || 8,
    // 左右偏移渲染个数
    columnOffsetCount: props.columnOffsetCount || 6,

    // 是否显示边框
    bordered: props.bordered || false
  };
  let [grid, setGrid] = useState({
    // 虚拟列
    virtualColumns: [],
    // 虚拟数据
    virtualData: [],
    // 可视区坐标（rowIndex垂直）
    startRowIndex: 0,
    endRowIndex: 0,
    // 可视区坐标（columnIndex水平）
    startColumnIndex: 0,
    endColumnIndex: 0,
    // padding偏移量(垂直)
    startVerticalOffset: 0,
    endVerticalOffset: 0,
    // padding偏移量(水平)
    startHorizontalOffset: 0,
    endHorizontalOffset: 0,
  });

  const updateGrid = (partialState) => {
    setGrid(oldState => ({
      ...oldState,
      ...partialState
    }));
  };

  useEffect(() => {

    // let rowVisibleCount = Math.ceil(stateProps.visibleHeight / stateProps.estimatedRowHeight);
    // let rowVisibleCount = stateProps.rowVisibleCount;
    // let endRowIndex = grid.startRowIndex + rowVisibleCount + stateProps.rowOffsetCount * 2;
    // console.log(endRowIndex);
    // updateGrid({
    //   virtualData: props.dataSource.slice(grid.startRowIndex, endRowIndex)
    // });
    _onScrollEvent();

  }, [
    props.dataSource
  ]);

  const _onScrollEvent = () => {

    // 垂直方向滚动
    _onVerticalScroll();
    // 水平方向滚动
    _onHorizontalScroll();

  };
  // 垂直方向滚动
  const _onVerticalScroll = () => {
    const {scrollTop} = _scrollContainer.current;
    const {
      dataSource,
      estimatedRowHeight,
      rowOffsetCount,
      rowVisibleCount
    } = stateProps;
    // dom存在的行条数
    let realRowsCount = rowVisibleCount + rowOffsetCount * 2;
    // 获取垂直滚动的条数
    let scrollTopNum = Math.floor(scrollTop / estimatedRowHeight);
    // 获取要渲染的行开始坐标，最小坐标为0  rowOffsetCount: 行偏移量
    let startRowIndex = (scrollTopNum - rowOffsetCount) > 0 ? (scrollTopNum - rowOffsetCount) : 0;
    let maxStartRowIndex = dataSource.length - realRowsCount;
    maxStartRowIndex = maxStartRowIndex > 0 ? maxStartRowIndex : 0;
    startRowIndex = startRowIndex > maxStartRowIndex ? maxStartRowIndex : startRowIndex;
    // 获取要渲染的行结尾坐标，最大坐标为dataSource长度  rowOffsetCount: 行偏移量
    let endRowIndex = (startRowIndex + realRowsCount) > dataSource.length ? dataSource.length : (startRowIndex + realRowsCount);
    // 上方未渲染数据的paddingTop值
    let startVerticalOffset = startRowIndex * estimatedRowHeight;
    // 上方未渲染数据的paddingBottom值
    let endVerticalOffset = (dataSource.length - endRowIndex) * estimatedRowHeight;
    // 需要渲染显示的行数据
    let virtualData = dataSource.slice(startRowIndex, endRowIndex);
    // console.table({scrollTop, scrollTopNum, startRowIndex, endRowIndex});
    updateGrid({
      startRowIndex,
      endRowIndex,
      startVerticalOffset,
      endVerticalOffset,
      virtualData
    });
  };
  // 水平方向滚动
  const _onHorizontalScroll = () => {
    const {scrollLeft} = _scrollContainer.current;
    const {
      dataSource,
      columns,
      estimatedColumnWidth,
      columnOffsetCount,
      columnVisibleCount
    } = stateProps;
    let scrollColumns = columns;
    // dom存在的行条数
    let realColumnsCount = columnVisibleCount + columnOffsetCount * 2;
    // 获取水平滚动的条数
    let scrollLeftNum = Math.floor(scrollLeft / estimatedColumnWidth);
    // 获取要渲染的列开始坐标
    let startColumnIndex = (scrollLeftNum - columnOffsetCount) > 0 ? (scrollLeftNum - columnOffsetCount) : 0;
    let maxStartColumnIndex = scrollColumns.length - realColumnsCount;
    maxStartColumnIndex = maxStartColumnIndex > 0 ? maxStartColumnIndex : 0;
    startColumnIndex = startColumnIndex > maxStartColumnIndex ? maxStartColumnIndex : startColumnIndex;
    // 获取要渲染的列结尾坐标
    let endColumnIndex = (startColumnIndex + realColumnsCount) > scrollColumns.length ? scrollColumns.length : (startColumnIndex + realColumnsCount);
    // 左边未渲染数据的paddingLeft值
    let leftOffsetColumns = scrollColumns.slice(0, startColumnIndex);
    let startHorizontalOffset = dataSource.length > 0 ? calculateColumnsWidth(leftOffsetColumns) : 0;
    // 右边未渲染数据的paddingRight值
    let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
    let endHorizontalOffset = dataSource.length > 0 ? calculateColumnsWidth(rightOffsetColumns) : 0;
    // 需要渲染显示的列数据
    let virtualColumns = scrollColumns.slice(startColumnIndex, endColumnIndex);
    // console.log(leftOffsetColumns, startHorizontalOffset, rightOffsetColumns, endHorizontalOffset, virtualColumns, calculateColumnsWidth(virtualColumns));
    // console.table({scrollLeft, scrollLeftNum, startColumnIndex, endColumnIndex});
    updateGrid({
      startColumnIndex,
      endColumnIndex,
      startHorizontalOffset,
      endHorizontalOffset,
      virtualColumns
    });
  };
  // 渲染单元格
  const _cellRender = (row, rowIndex, column, columnIndex) => {

    let realRowIndex = rowIndex + grid.startRowIndex;
    let realColumnIndex = columnIndex + grid.startColumnIndex;
    let value = row[column['key']];
    let width = column.width || stateProps.estimatedColumnWidth;

    // colSpan目前方案是传方法确定哪一行需要列合并
    let colSpan = sameType(column.colSpan, 'Function') ? column.colSpan(realRowIndex) : 1;
    // TODO 宽度 要计算而不是直接乘
    width = width * colSpan;
    let display = colSpan === 0 ? 'none' : 'flex';

    // 是否显示边框
    let bordered = stateProps.bordered ? 'vt-bordered' : '';
    // 对齐方式 'left' | 'right' | 'center'
    let align = ALIGN_TYPE[column.align] || ALIGN_TYPE.left;
    // 省略号
    let ellipsis = column.ellipsis ? 'vt-ellipsis' : '';
    //
    return <div
      key={realColumnIndex}
      className={`vt-grid-cell ${bordered} ${align}`}
      onClick={() => __onCellTap(
        value,
        row, rowIndex, realRowIndex,
        column, columnIndex, realColumnIndex
      )}
      style={{
        width: width,
        minWidth: width,
        minHeight: stateProps.minRowHeight,
        display: display
      }}
    >
      {/* 因flex布局下省略号不生效 故加一层div*/}
      <div className={`${ellipsis}`}>{value}</div>
    </div>;

  };
  // 点击单元格
  const __onCellTap = (
    value,
    row, rowIndex, realRowIndex,
    column, columnIndex, realColumnIndex
  ) => {
    console.log(realRowIndex, realColumnIndex);
    if (typeof props.onCellTap === 'function') {
      props.onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  };

  // 默认行
  const defaultGridRow = (row, rowIndex) => {
    return <div
      key={rowIndex}
      className="vt-grid-row"
      style={{
        // height: stateProps.estimatedRowHeight,
        // width: stateProps.visibleWidth
      }}
    >
      {
        grid.virtualColumns.map((column, columnIndex) => {
          return _cellRender(row, rowIndex, column, columnIndex);
        })
      }
    </div>;
  };

  // 渲染行
  const _gridRowRender = (row, rowIndex) => {

    let gridRow = <>{defaultGridRow(row, rowIndex)}</>;
    // 覆盖默认的 GridRow 元素
    if (props.components && props.components.row) {
      let realRowIndex = rowIndex + grid.startRowIndex;
      // {index, moveRow}
      let rowProps = typeof props.onRow === 'function' ? props.onRow(row, realRowIndex) : {};
      gridRow = <props.components.row
        key={realRowIndex}
        {...rowProps}
      >
        {defaultGridRow(row, rowIndex)}
      </props.components.row>;
    }
    return gridRow;

  };

  return <>
    <div className={`vt-grid-container ${props.className}`}
      ref={_scrollContainer}
      onScrollCapture={() => _onScrollEvent()}
      style={{height: stateProps.visibleHeight}}
    >
      <div style={{
        paddingTop: grid.startVerticalOffset,
        paddingBottom: grid.endVerticalOffset,
        paddingLeft: grid.startHorizontalOffset,
        paddingRight: grid.endHorizontalOffset
      }}>
        {
          grid.virtualData.map((row, rowIndex) => {
            // 行渲染
            return _gridRowRender(row, rowIndex);
          })
        }
      </div>
    </div>
  </>;

};

Grid.propTypes = {
  // .vt-grid-container 样式
  className: PropTypes.string,
  // 类型 header
  type: PropTypes.string,
  // 是否显示边框
  bordered: PropTypes.bool,
  // 点击每个子项的方法
  onCellTap: PropTypes.func
};

export default Grid;
