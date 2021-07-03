
import React, {useEffect, useState, useMemo, useRef, useImperativeHandle, useContext} from 'react';
import PropTypes from 'prop-types';
import {getCellBordered, getCellAlign} from './Cell';
import {getCellFixedShadow, getFixedCellInfo, getFixedCellStyle} from './utils/fixUtil';
import './styles/grid.less';
import {getRealGridVerticalScrollInfo, getRealGridHorizontalScrollInfo} from './utils/gridScrollInfo';
import {getColumnsWidth} from './utils';
import {sameType, classNames} from './utils/base';
import VTableContext from './context/VTableContext';
import {getRowKey} from './utils/rowKey';
import {getRowHeightArr} from './cache/rowHeightCache';

// const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {
//   trackAllPureComponents: true
// });
const Grid = (props, ref) => {

  // 要向父MultiGrid暴露的
  const gridContainer = useRef(null);
  useImperativeHandle(ref, () => ({
    gridContainer: gridContainer.current,
  }));

  const _VTableContext = useContext(VTableContext);
  const {isSticky} = _VTableContext;

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
    rowVisibleCount: props.rowVisibleCount || 20,
    // 上下偏移渲染个数
    rowOffsetCount: props.rowOffsetCount || 20,

    // 可视区域宽度
    visibleWidth: props.visibleWidth || 1200,
    // 预估的每列宽度
    estimatedColumnWidth: props.estimatedColumnWidth || 150,
    // 可渲染个数（水平）
    columnVisibleCount: props.columnVisibleCount || 8,
    // 左右偏移渲染个数
    columnOffsetCount: props.columnOffsetCount || 4,

    fixedLeftColumns: props.fixedLeftColumns || [],
    fixedRightColumns: props.fixedRightColumns || [],

  };
  const {
    type,
    mgType,
    className,
    gridStyle,
    //
    shouldRowHeightSync,
    //
    rowKey,
    rowSelection = {},
    //
    components,
    onRow,
    //
    headerBordered,
    bordered,
    //
    onScrollTopSync,
    onCellTap
  } = props;
  let [gridScrollTop, setGridScrollTop] = useState(null);
  let [gridScrollLeft, setGridScrollLeft] = useState(null);
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
  // 真实展示的列
  const displayedColumns = useMemo(() => {
    return [...stateProps.fixedLeftColumns, ...grid.virtualColumns, ...stateProps.fixedRightColumns];
  }, [stateProps.fixedLeftColumns, grid.virtualColumns, stateProps.fixedRightColumns]);

  const updateGrid = (partialState) => {
    setGrid(oldState => ({
      ...oldState,
      ...partialState
    }));
  };

  useEffect(() => {

    _onScrollEvent(true);
    console.log('dataSource change');
    //
    if (type === 'body' && mgType === 'mainMultiGrid') {
      setTimeout(() => {
        _VTableContext.getBodyScrollBarWidth({ref: gridContainer});
      }, 0);
    }

  }, [
    stateProps.dataSource,
    stateProps.columns,
  ]);

  const _onScrollEvent = (didMount) => {

    // window.requestAnimationFrame(() => {
    // 垂直方向滚动
    _onVerticalScroll(didMount);
    // 水平方向滚动
    _onHorizontalScroll(didMount);
    // });

  };
  // 垂直方向滚动
  const _onVerticalScroll = (didMount) => {
    const {scrollTop} = gridContainer.current;
    // const doUpdate = gridScrollLeft !== scrollTop ;
    const doUpdate = Math.abs(scrollTop - gridScrollTop) > 40;
    if (didMount || doUpdate) {
      // console.log('vertical');
      setGridScrollTop(scrollTop);
      const {dataSource, estimatedRowHeight, rowOffsetCount, rowVisibleCount} = stateProps;
      // 当前scrollTop
      let gridInfo = getRealGridVerticalScrollInfo({
        scrollTop,
        dataSource,
        estimatedRowHeight,
        rowOffsetCount,
        rowVisibleCount
      });
      // 更新渲染
      updateGrid(gridInfo);
    }
  };
  // 水平方向滚动
  const _onHorizontalScroll = (didMount) => {
    const {scrollLeft} = gridContainer.current;
    // const doUpdate = gridScrollLeft !== scrollLeft;
    const doUpdate = Math.abs(scrollLeft - gridScrollLeft) > 80;
    if (didMount || doUpdate) {
      // console.log('horizontal');
      setGridScrollLeft(scrollLeft);
      const {dataSource, columns, estimatedColumnWidth, columnOffsetCount, columnVisibleCount} = stateProps;
      // 当前scrollLeft
      let gridInfo = getRealGridHorizontalScrollInfo({
        scrollLeft,
        dataSource,
        columns,
        estimatedColumnWidth,
        columnOffsetCount,
        columnVisibleCount
      });
      // 更新渲染
      updateGrid(gridInfo);
    }
  };
  // 合并列
  const getCellColSpanStyle = ({column, realRowIndex, realColumnIndex, columnIndex}) => {
    const {columns} = stateProps;
    let width = column.width || stateProps.estimatedColumnWidth;
    // colSpan目前方案是传方法确定哪一行需要列合并
    const colSpan = sameType(column.colSpan, 'Function') ? column.colSpan(realRowIndex) : 1;
    const rowMergeColumns = columns.slice(realColumnIndex, realColumnIndex + colSpan);
    if (rowMergeColumns.length > 1) {
      width = getColumnsWidth(rowMergeColumns);
      // console.log(rowMergeColumns, realColumnIndex, realColumnIndex + colSpan);
    }
    // 改行设置colSpan=0，直接隐藏，就不设置width=0了； 不隐藏设置width=0，会显示border和value，有问题
    let display = colSpan === 0 ? 'none' : 'flex';
    // 如果虚拟列的第一列是合并导致隐藏的，需要让它占个位置，不然这行会错位
    // 如果是尾部列不用考虑这个问题
    let vFirstColSpan = grid.virtualColumns[0] && grid.virtualColumns[0].colSpan;
    if (vFirstColSpan && sameType(vFirstColSpan, 'Function') && vFirstColSpan(realRowIndex) === 0) {
      // console.log('virtualColumns的第一列是display none的');
      // 截取第一列到当前列
      let startVirtualColumns = grid.virtualColumns.slice(0, columnIndex + 1);
      // console.log(startVirtualColumns, 0, columnIndex + 1, value, realColumnIndex);
      // 过滤出第一列到当前列display none的列
      let svHiddenColumns = startVirtualColumns.filter((svColumn) => {
        let svColSpan = sameType(svColumn.colSpan, 'Function') ? svColumn.colSpan(realRowIndex) : 1;
        return svColSpan === 0;
      });
      // 这两个columns相等，说明第一列到当前列全是隐藏到列
      if (startVirtualColumns.length === svHiddenColumns.length) {
        display = 'flex';
      }
    }
    return {
      width,
      display
    };
  };
  // 渲染单元格
  const _cellRender = (row, rowIndex, column, columnIndex, {type}) => {

    const realRowIndex = rowIndex + grid.startRowIndex;
    const realColumnIndex = column.fixed ? column.realFcIndex : columnIndex + grid.startColumnIndex;
    const value = row[column['key'] || column['dataIndex']];
    //
    const {width, display} = getCellColSpanStyle({column, realRowIndex, realColumnIndex, columnIndex});
    // 是否显示边框
    const cellBordered = getCellBordered({type, isSticky, headerBordered, bordered});
    // 对齐方式 'left' | 'right' | 'center'
    const align = getCellAlign({type, column});
    // 固定列阴影
    const {fixedLeftColumns, fixedRightColumns} = stateProps;
    const cellInfo = getFixedCellInfo({column, fixedLeftColumns, fixedRightColumns});
    const cellFixedShadow = getCellFixedShadow({cellInfo});
    const cellFixedStyle = getFixedCellStyle({cellInfo});
    // className
    const {className = ''} = column;
    //
    // 有要重写对应header|body|footer的cell
    const CellComponent = components && components[type] && components[type].cell || 'div';
    // {width, onResize}
    const defaultCellProps = typeof column.onCell === 'function' ? column.onCell(column, realRowIndex) : {};
    const cellPropsMap = {
      header: sameType(column.onHeaderCell, 'Function') ? column.onHeaderCell(column, realRowIndex) : undefined,
      body: sameType(column.onBodyCell, 'Function') ? column.onBodyCell(column, realRowIndex) : undefined,
      footer: sameType(column.onFooterCell, 'Function') ? column.onFooterCell(column, realRowIndex) : undefined,
    };
    const additionalCellProps = cellPropsMap[type] || defaultCellProps;
    return <CellComponent
      {...additionalCellProps}
      key={`cell_${realRowIndex}_${realColumnIndex}`}
      data-key={`cell_${realRowIndex}_${realColumnIndex}`}
      className={`vt-grid-cell ${cellFixedShadow} ${cellBordered} ${align} ${className}`}
      onClick={(e) => __onCellTap(e,
        value,
        row, rowIndex, realRowIndex,
        column, columnIndex, realColumnIndex
      )}
      style={{
        width: width,
        minWidth: width,
        minHeight: stateProps.minRowHeight,
        display: display,
        ...column.style,
        ...cellFixedStyle
      }}
    >
      {
        /* 因flex布局下省略号不生效 故加一层div*/
        column.ellipsis ? <div className={'vt-ellipsis'} title={value}>
          {_render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {type})}
        </div>
          : _render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {type})
      }
    </CellComponent>;
  };
  const _render = (value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {type}) => {
    if (type === 'header') {
      if (column.headRender) { // TODO 后续废弃
        return sameType(column.headRender, 'Function') ? column.headRender(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) : value;
      }
      return sameType(column.title, 'Function') ? column.title(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) : value;
    } else {
      return column.render ? column.render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) : value;
    }

  };

  // 点击单元格
  const __onCellTap = (
    e, value,
    row, rowIndex, realRowIndex,
    column, columnIndex, realColumnIndex
  ) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(realRowIndex, realColumnIndex, e);
    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  };

  // 同步固定列行高
  const getRowHeight = ({type, rowIndex}) => {
    let height = undefined;
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && mgType !== 'mainMultiGrid') {
      let rowHeightArr = getRowHeightArr({
        startRowIndex: grid.startRowIndex,
        endRowIndex: grid.endRowIndex
      });
      height = rowHeightArr[rowIndex];
    }
    return height;
  };

  /**
   * 默认行
   * @param {Object} row 行数据
   * @param {Number} rowIndex 行坐标
   * @param {String} type 类型 header|body|footer
   */
  const _gridRowRender = (row, rowIndex, {type}) => {
    // const {fixedLeftColumns, fixedRightColumns} = stateProps;
    const realRowIndex = rowIndex + grid.startRowIndex;
    // 是否选中
    const {selectedRowKeys = []} = rowSelection;
    const _rowKey = getRowKey(rowKey, row, realRowIndex);
    const selected = selectedRowKeys.includes(_rowKey);
    // isSticky:true时设置
    let height = getRowHeight({type, rowIndex});
    // 有要重写对应header|body|footer的row
    const RowComponent = components && components[type] && components[type].row || 'div';
    // {index, moveRow}
    const additionalRowProps = typeof onRow === 'function' ? onRow(row, realRowIndex) : {};
    return <RowComponent
      {...additionalRowProps}
      key={`row_${realRowIndex}`}
      data-key={`row_${realRowIndex}`}
      className={classNames(
        'vt-grid-row',
        {'vt-grid-row-selected': selected}
      )}
      style={{
        height
        // height: stateProps.estimatedRowHeight,
        // width: stateProps.visibleWidth
      }}
    >
      {
        displayedColumns.map((column, columnIndex) => {
          return _cellRender(row, rowIndex, column, columnIndex, {type});
        })
      }
    </RowComponent>;
  };

  //
  const onScrollCapture = (e) => {
    if (!_VTableContext.isSticky && mgType === 'mainMultiGrid') _VTableContext.onScroll(e);
    if (type === 'body' && onScrollTopSync) {
      onScrollTopSync(e, {
        startRowIndex: grid.startRowIndex,
        endRowIndex: grid.endRowIndex,
      });
    }
    _onScrollEvent();
  };

  return <>
    <div className={classNames('vt-grid-container', className)}
      ref={gridContainer}
      onScrollCapture={(e) => onScrollCapture(e)}
      style={{
        height: stateProps.visibleHeight,
        ...(gridStyle || {}),
      }}
    >
      <div style={{
        willChange: 'transform',
        // pointerEvents: 'none',
        // transform: `translateY(${grid.startVerticalOffset}px)`,
        paddingTop: grid.startVerticalOffset,
        paddingBottom: grid.endVerticalOffset,
        paddingLeft: grid.startHorizontalOffset,
        paddingRight: grid.endHorizontalOffset,
      }}>
        {
          // sticky header
          _VTableContext.isSticky && <div className="vt-table-header vt-header-sticky">
            {
              _VTableContext.headerTitle.map((row, rowIndex) => {
                // 行渲染
                return _gridRowRender(row, rowIndex, {type: 'header'});
              })
            }
          </div>
        }
        {
          grid.virtualData.map((row, rowIndex) => {
            // 行渲染
            return _gridRowRender(row, rowIndex, {type});
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
  headerBordered: PropTypes.bool,
  bordered: PropTypes.bool,
  // 点击每个子项的方法
  onCellTap: PropTypes.func,
  // 左侧固定列
  fixedLeftColumns: PropTypes.array,
  // 右侧固定列
  fixedRightColumns: PropTypes.array,
};
// Grid.whyDidYouRender = true;
export default React.memo(React.forwardRef(Grid));
