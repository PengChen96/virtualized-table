
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './style.less';

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
    // 是否显示边框
    bordered: props.bordered || true
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
    _onVerticalScroll();
  }, [
    props.dataSource
  ]);

  const _onScrollEvent = () => {

    _onVerticalScroll();

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

  // 渲染单元格
  const _cellRender = (row, rowIndex, column, columnIndex) => {

    let realRowIndex = rowIndex + grid.startRowIndex;
    let realColumnIndex = columnIndex + grid.startColumnIndex;
    let value = row[column['key']];
    let width = column.width || 150;
    // 是否显示边框
    let bordered = stateProps.bordered ? 'vt-bordered' : '';
    // 对齐方式 'left' | 'right' | 'center'
    let align = ALIGN_TYPE[column.align] || 'vt-align-left';
    return <div
      className={`vt-grid-cell ${bordered} ${align}`}
      onClick={() => __onCellTap(
        value,
        row, rowIndex, realRowIndex,
        column, columnIndex, realColumnIndex
      )}
      style={{
        width: width,
        minWidth: width,
        minHeight: stateProps.minRowHeight
      }}
    >
      {value}
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

  return <>
    <div className="vt-grid-container"
      ref={_scrollContainer}
      onScrollCapture={() => _onScrollEvent()}
      style={{height: stateProps.visibleHeight}}
    >
      <div style={{
        paddingTop: grid.startVerticalOffset,
        paddingBottom: grid.endVerticalOffset
      }}>
        {
          grid.virtualData.map((row, rowIndex) => {
            return <div className="vt-grid-row" key={rowIndex}>
              {
                props.columns.map((column, columnIndex) => {
                  return _cellRender(row, rowIndex, column, columnIndex);
                  // return <div key={columnIndex}>
                  //   {
                  //     _cellRender(row, rowIndex, column, columnIndex)
                  //   }
                  // </div>;
                })
              }
            </div>;
          })
        }
      </div>
    </div>
  </>;

};

Grid.propTypes = {
  // 类型 header
  type: PropTypes.string
};

export default Grid;
