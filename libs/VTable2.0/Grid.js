
import React, {useEffect, useState, useMemo, useRef, useImperativeHandle, useContext} from 'react';
import PropTypes from 'prop-types';
import {getCellBordered, getCellAlign} from './Cell';
import {getCellFixedShadow, getFixedCellInfo, getFixedCellStyle} from './utils/fixUtil';
import './styles/grid.less';
import {getRealGridVerticalScrollInfo, getRealGridHorizontalScrollInfo} from './utils/gridScrollInfo';
import {getColumnsWidth} from './utils';
import {sameType, classNames, isRenderCellObj} from './utils/base';
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
    // 固定行高 boolean
    fixedRowHeight: props.fixedRowHeight,
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
    type = 'body',
    mgType,
    className,
    gridStyle,
    //
    shouldRowHeightSync,
    //
    rowKey,
    rowSelection = {},
    //
    components = {},
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
  //
  const Components = useMemo(() => {
    return {
      header: {
        row: components.header && components.header.row || 'div',
        cell: components.header && components.header.cell || 'div'
      },
      body: {
        row: components.body && components.body.row || 'div',
        cell: components.body && components.body.cell || 'div'
      },
      footer: {
        row: components.footer && components.footer.row || 'div',
        cell: components.footer && components.footer.cell || 'div'
      }
    };
  }, [components]);

  // 更新grid信息
  const updateGrid = (partialState) => {
    setGrid(oldState => ({
      ...oldState,
      ...partialState
    }));
  };

  useEffect(() => {

    _onScrollEvent(true);
    // console.log('dataSource change');
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

  /**
   * 滚动事件
   * @param {Boolean} didMount 是否didMount阶段执行
   * @private
   */
  const _onScrollEvent = (didMount) => {

    // window.requestAnimationFrame(() => {
    // 垂直方向滚动
    _onVerticalScroll(didMount);
    // 水平方向滚动
    _onHorizontalScroll(didMount);
    // });

  };
  /**
   * 垂直方向滚动
   * @param {Boolean} didMount 是否didMount阶段执行
   * @private
   */
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
  /**
   * 水平方向滚动
   * @param {Boolean} didMount 是否didMount阶段执行
   * @private
   */
  function _onHorizontalScroll (didMount) {
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
  /**
   * 获取单元格合并列信息
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Number} realRowIndex 真实的行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {Number} realColumnIndex 真实的列坐标
   * @param {Number} colSpan 跨列
   * @param {Number} rowSpan 跨行
   * @returns {object}
   * @private
   */
  const getCellColRowSpanStyle = ({
    row, rowIndex, realRowIndex,
    column, columnIndex, realColumnIndex,
    colSpan, rowSpan,
  }) => {
    colSpan = colSpan === 0 ? 0 : Number(colSpan || 1);
    rowSpan = rowSpan === 0 ? 0 : Number(rowSpan || 1);
    const {columns, estimatedColumnWidth, minRowHeight} = stateProps;
    // 获取宽/高
    const height = rowSpan * minRowHeight;
    let width = column.width || estimatedColumnWidth;
    const rowMergeColumns = columns.slice(realColumnIndex, realColumnIndex + colSpan);
    if (rowMergeColumns.length > 1) {
      width = getColumnsWidth(rowMergeColumns);
    }
    // 该行设置colSpan=0，直接隐藏，就不设置width=0了； 不隐藏设置width=0，会显示border和value，有问题
    let display = colSpan === 0 ? 'none' : 'flex';
    // 如果虚拟列的第一列是合并导致隐藏的，需要让它占个位置，不然这行会错位
    // 如果是尾部列不用考虑这个问题
    const vFirstColumn = grid.virtualColumns[0] || {};
    if (vFirstColumn.render) {
      const vFirstValue = row[vFirstColumn['key'] || vFirstColumn['dataIndex']];
      const vFirstRealColumnsIndex = grid.startColumnIndex;
      const vFirstRenderData = vFirstColumn.render(vFirstValue, row, rowIndex, realRowIndex, vFirstColumn, 0, vFirstRealColumnsIndex);
      if (isRenderCellObj(vFirstRenderData)) {
        const vFirstCellProps = vFirstRenderData.props || {};
        if (vFirstCellProps.colSpan === 0) {
          // 截取第一列到当前列
          const startVirtualColumns = grid.virtualColumns.slice(0, columnIndex + 1);
          // 过滤出第一列到当前列display none的列
          const svHiddenColumns = startVirtualColumns.filter((svColumn, svColumnIndex) => {
            if (svColumn.render) {
              const svValue = row[svColumn['key'] || svColumn['dataIndex']];
              const svRealColumnIndex = svColumnIndex + vFirstRealColumnsIndex;
              const svRenderData = svColumn.render(svValue, row, rowIndex, realRowIndex, svColumn, svColumnIndex, svRealColumnIndex);
              if (isRenderCellObj(svRenderData)) {
                const svCellProps = svRenderData.props || {};
                return svCellProps.colSpan === 0;
              }
            }
          });
          // 这两个columns相等，说明第一列到当前列全是隐藏到列
          if (startVirtualColumns.length === svHiddenColumns.length) {
            display = 'flex';
          }
        }
      }
    }
    return {
      width,
      height,
      display,
      visibility: rowSpan < 1 ? 'hidden' : undefined, // 这个是为了隐藏跨行
    };
  };

  /**
   * 单元格
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {String} type 类型 header|body|footer
   * @returns Element
   * @private
   */
  const _cellRender = (
    row, rowIndex,
    column, columnIndex,
    {type}
  ) => {
    const realRowIndex = rowIndex + grid.startRowIndex;
    const realColumnIndex = column.fixed ? column.realFcIndex : columnIndex + grid.startColumnIndex;
    const value = row[column['key'] || column['dataIndex']];
    const {childNode, cellProps} = _getCellChildNode(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {type});
    const {colSpan, rowSpan} = cellProps;
    // 获取cell信息
    const {width, height, display, visibility} = getCellColRowSpanStyle({
      row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex,
      colSpan, rowSpan,
    });
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
    // 有要重写对应header|body|footer的cell
    const CellComponent = Components[type].cell;
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
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{
        width: width,
        minWidth: width,
        // minHeight: stateProps.minRowHeight,
        height,
        display,
        visibility,
        ...column.style,
        ...cellFixedStyle,
      }}
    >
      {
        /* 因flex布局下省略号不生效 故加一层div*/
        column.ellipsis ? <div className={'vt-ellipsis'} title={value}>
          { childNode }
        </div>
          : childNode
      }
    </CellComponent>;
  };

  /**
   * 获取单元格渲染信息
   * @param {String} value 值
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Number} realRowIndex 真实的行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {Number} realColumnIndex 真实的列坐标
   * @param {String} type 类型 header|body|footer
   * @returns {{cellProps: {}, childNode: null}}
   * @private
   */
  const _getCellChildNode = (
    value,
    row, rowIndex, realRowIndex,
    column, columnIndex, realColumnIndex,
    {type}
  ) => {
    let cellProps = {};
    let childNode = value;
    if (type === 'header') {
      if (column.headRender) { // TODO 后续废弃
        childNode = sameType(column.headRender, 'Function') ? column.headRender(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) : value;
      }
      childNode = sameType(column.title, 'Function') ? column.title(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) : value;
    } else {
      if (column.render) {
        const renderData = column.render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
        if (isRenderCellObj(renderData)) {
          childNode = renderData.children;
          cellProps = renderData.props;
        } else {
          childNode = renderData;
        }
      }
      // Not crash if final `childNode` is not validate ReactNode
      if (sameType(childNode, 'Object') && !React.isValidElement(childNode)) {
        childNode = null;
      }
    }
    return {
      childNode,
      cellProps
    };
  };

  /**
   *点击单元格函数
   * @param {Event} e
   * @param {String} value 值
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Number} realRowIndex 真实的行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {Number} realColumnIndex 真实的列坐标
   * @private
   */
  const __onCellTap = (
    e, value,
    row, rowIndex, realRowIndex,
    column, columnIndex, realColumnIndex
  ) => {
    e.stopPropagation();
    e.preventDefault();
    // console.log(realRowIndex, realColumnIndex, e);
    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  };

  /**
   * 获取同步固定列的行高
   * @param {String} type 类型 header|body|footer
   * @param {Number} rowIndex 可视行坐标
   * @return height
   */
  function getRowHeight ({type, rowIndex}) {
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
   * 行
   * @param {Object} row 行数据
   * @param {Number} rowIndex 可视行坐标
   * @param {String} type 类型 header|body|footer
   * @return Element
   */
  const _gridRowRender = (row, rowIndex, {type}) => {
    // const {fixedLeftColumns, fixedRightColumns} = stateProps;
    const realRowIndex = rowIndex + grid.startRowIndex;
    // 是否选中
    const {selectedRowKeys = []} = rowSelection;
    const _rowKey = getRowKey(rowKey, row, realRowIndex);
    const selected = selectedRowKeys.includes(_rowKey);
    // isSticky:true时设置
    const height = stateProps.fixedRowHeight ? stateProps.minRowHeight : getRowHeight({type, rowIndex});
    // 有要重写对应header|body|footer的row
    const RowComponent = Components[type].row;
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
        height,
        contain: stateProps.fixedRowHeight ? 'none' : ''
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
      onScrollCapture={onScrollCapture}
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
