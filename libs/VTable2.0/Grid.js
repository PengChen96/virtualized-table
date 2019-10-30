
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './style.less';

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
    // 可渲染的元素个数
    rowVisibleCount: props.rowVisibleCount || 10,
    // 上下偏移渲染个数
    rowOffsetCount: props.rowOffsetCount || 10,
  };
  let [grid, setGrid] = useState({
    // 虚拟列
    virtualColumns: [],
    // 虚拟数据
    virtualData: [],
    // 可视区坐标(rowIndex垂直)
    startRowIndex: 0,
    endRowIndex: 0,
    // padding偏移量(垂直)
    startVerticalOffset: 0,
    endVerticalOffset: 0,
  });

  useEffect(() => {

    let rowVisibleCount = Math.ceil(stateProps.visibleHeight / stateProps.estimatedRowHeight);
    let endRowIndex = grid.startRowIndex + rowVisibleCount + stateProps.rowOffsetCount * 2;
    setGrid(Object.assign({
      virtualData: props.dataSource.slice(grid.startRowIndex, endRowIndex)
    }));

  }, [
    props.dataSource
  ]);

  const _onScrollEvent = () => {

    console.log('121');
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
    console.log(virtualData);
    setGrid(Object.assign({
      startRowIndex,
      endRowIndex,
      startVerticalOffset,
      endVerticalOffset,
      virtualData
    }));
  };

  const _cellRender = (row, rowIndex, column, columnIndex) => {

    let value = row[column['key']];
    let width = column.width || 150;
    return <div className="v-grid-cell" style={{
      width: width,
      minWidth: width
    }}>
      {value}
    </div>;

  };

  return <>
    <div className="v-grid-container1"
      ref={_scrollContainer}
      onScrollCapture={() => _onScrollEvent()}
      style={{height: stateProps.visibleHeight}}
    >
      <div className="v-grid-main-container">
        {
          props.dataSource.map((row, rowIndex) => {
            return <div className="v-grid-row" key={rowIndex}>
              {
                props.columns.map((column, columnIndex) => {
                  return <div key={columnIndex}>
                    {
                      _cellRender(row, rowIndex, column, columnIndex)
                    }
                  </div>;
                })
              }
            </div>;
          })
        }
      </div>
      <div className="v-grid-left-columns-container">
        {
          props.dataSource.map((row, rowIndex) => {
            return <div className="v-grid-row" key={rowIndex}>
              {
                props.columns.map((column, columnIndex) => {
                  return <div key={columnIndex}>
                    {
                      _cellRender(row, rowIndex, column, columnIndex)
                    }
                  </div>;
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
