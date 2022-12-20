import React, {useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {getCellAlign, getCellBordered} from './Cell';
import {getCellFixedShadow, getFixedCellInfo, getFixedCellStyle} from './utils/fixUtil';
import './styles/grid.less';
import {getRealGridHorizontalScrollInfo, getRealGridVerticalScrollInfo} from './utils/gridScrollInfo';
import {getColumnsWidth} from './utils';
import {classNames, isRenderCellObj, queryCustomAttributeDOM, sameType} from './utils/base';
import VTableContext from './context/VTableContext';
import {getRowKey} from './utils/rowKey';
import {deepClone} from './utils/deepClone';
import {cancelTimeout, requestTimeout} from './utils/timer';

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
  const realGridContainer = useRef(null);
  const resetIsScrollingTimeoutIdRef = useRef(null);
  const scrollRef = useRef({gridScrollTop: 0, gridScrollLeft: 0});

  const _VTableContext = useContext(VTableContext);
  const {isSticky} = _VTableContext;

  const visibleHeight = props.visibleHeight || 400;
  const estimatedRowHeight = props.estimatedRowHeight || 40;
  const estimatedRowVisibleCount = Math.ceil(visibleHeight / estimatedRowHeight);

  const clientWidth = gridContainer.current && gridContainer.current.clientWidth;
  const visibleWidth = props.visibleWidth || clientWidth || 1200;
  const estimatedColumnWidth = props.estimatedColumnWidth || 150;
  const estimatedColumnVisibleCount = Math.ceil(visibleWidth / estimatedColumnWidth);

  // const
  const stateProps = {
    // 固定行高 boolean (需要行合并/分组表头时设置为true)
    fixedRowHeight: props.fixedRowHeight,
    // 列 #
    columns: props.columns || [],
    // 源数据 #
    dataSource: props.dataSource || [],

    // 可视区域高度
    visibleHeight,
    // 一行的高度（预估）
    estimatedRowHeight,
    minRowHeight: props.minRowHeight || 40,
    // 可渲染的元素个数
    rowVisibleCount: props.rowVisibleCount || estimatedRowVisibleCount,
    // 上下偏移渲染个数
    rowOffsetCount: props.rowOffsetCount || 10,

    // 可视区域宽度
    visibleWidth,
    // 预估的每列宽度
    estimatedColumnWidth,
    // 可渲染个数（水平）
    columnVisibleCount: props.columnVisibleCount || estimatedColumnVisibleCount,
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
  const [grid, setGrid] = useState({
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

  const displayedFooterColumns = useMemo(() => {
    let columns = displayedColumns;
    if (displayedColumns.length > 0 && displayedColumns[0].type === 'checkBox') {
      columns = deepClone(displayedColumns);
      columns[0].render = null;
    }
    return columns;
  }, [displayedColumns]);
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
    //
    if (type === 'body' && mgType === 'mainMultiGrid') {
      setTimeout(() => {
        _VTableContext.getBodyScrollBar({ref: gridContainer});
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
    const {gridScrollTop} = scrollRef.current;
    const doUpdate = Math.abs(scrollTop - gridScrollTop) > 40;
    if (didMount || doUpdate) {
      scrollRef.current.gridScrollTop = scrollTop;
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
  const _onHorizontalScroll = (didMount) => {
    const {scrollLeft} = gridContainer.current;
    const {gridScrollLeft} = scrollRef.current;
    const doUpdate = Math.abs(scrollLeft - gridScrollLeft) > 80;
    if (didMount || doUpdate) {
      scrollRef.current.gridScrollLeft = scrollLeft;
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
    colSpan, rowSpan, type
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
    const vFirstColumnRender = type === 'header' ? vFirstColumn._headerCellProps : vFirstColumn.render;
    if (vFirstColumnRender) {
      const vFirstValue = row[vFirstColumn['key'] || vFirstColumn['dataIndex']];
      const vFirstRealColumnsIndex = grid.startColumnIndex;
      const vFirstRenderData = vFirstColumnRender(vFirstValue, row, rowIndex, realRowIndex, vFirstColumn, 0, vFirstRealColumnsIndex);
      if (isRenderCellObj(vFirstRenderData)) {
        const vFirstCellProps = type === 'header' ? vFirstRenderData : (vFirstRenderData.props || {});
        if (vFirstCellProps.colSpan === 0) {
          // 截取第一列到当前列
          const startVirtualColumns = grid.virtualColumns.slice(0, columnIndex + 1);
          // 过滤出第一列到当前列display none的列
          const svHiddenColumns = startVirtualColumns.filter((svColumn, svColumnIndex) => {
            const svColumnRender = type === 'header' ? svColumn._headerCellProps : svColumn.render;
            if (svColumnRender) {
              const svValue = row[svColumn['key'] || svColumn['dataIndex']];
              const svRealColumnIndex = svColumnIndex + vFirstRealColumnsIndex;
              const svRenderData = svColumnRender(svValue, row, rowIndex, realRowIndex, svColumn, svColumnIndex, svRealColumnIndex);
              if (isRenderCellObj(svRenderData)) {
                const svCellProps = type === 'header' ? svRenderData : (svRenderData.props || {});
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
      colSpan, rowSpan, type
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
    const cellKey = `cell_${type === 'body' ? realRowIndex : type}_${realColumnIndex}`;
    return <CellComponent
      {...additionalCellProps}
      key={cellKey}
      data-key={cellKey}
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
        minHeight: stateProps.minRowHeight,
        height: stateProps.fixedRowHeight ? height : undefined,
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
      if (sameType(column.title, 'Function')) {
        childNode = column.title(value, row, rowIndex);
      }
      if (sameType(column._headerCellProps, 'Function')) {
        cellProps = column._headerCellProps(value, row, rowIndex);
      }
    } else {
      if (column.render) {
        const renderData = column.render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
        if (isRenderCellObj(renderData)) {
          childNode = renderData.children;
          cellProps = renderData.props || {};
        } else {
          childNode = renderData;
        }
      }
    }
    // Not crash if final `childNode` is not validate ReactNode
    if (sameType(childNode, 'Object') && !React.isValidElement(childNode)) {
      childNode = null;
    }
    return {
      childNode,
      cellProps
    };
  };

  /**
   * 点击单元格函数
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
    e.preventDefault();
    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  };
  // 移入行  新增class vt-grid-row-hover
  const __onMouseEnter = ({type, rowKey}) => {
    // sticky不需要下面方法，直接css：hover就能支持
    if (type === 'body' && !isSticky) {
      // 使用这种方式，减少hover时的重新渲染
      try {
        const scopeDOM = document.querySelectorAll('div.vt-grid-row');
        const rowsCollection = queryCustomAttributeDOM(scopeDOM, 'data-key', `row_${rowKey}`);
        rowsCollection.forEach((rowDom) => {
          const className = rowDom.getAttribute('class') + ' vt-grid-row-hover';
          rowDom.setAttribute('class', className);
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };
  // 移出行 移除class vt-grid-row-hover
  const __onMouseLeave = ({type, rowKey}) => {
    if (type === 'body' && !isSticky) {
      try {
        const scopeDOM = document.querySelectorAll('div.vt-grid-row');
        const rowsCollection = queryCustomAttributeDOM(scopeDOM, 'data-key', `row_${rowKey}`);
        rowsCollection.forEach((rowDom) => {
          const className = rowDom.getAttribute('class').replace(' vt-grid-row-hover', '');
          rowDom.setAttribute('class', className);
        });
      } catch (e) {
        console.warn(e);
      }
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
      const {rowsHeightArr = []} = props;
      height = rowsHeightArr[rowIndex];
    }
    // todo need test
    if (type === 'footer') {
      height = stateProps.minRowHeight;
    }
    return height;
  };

  /**
   * 行
   * @param {Object} row 行数据
   * @param {Number} rowIndex 可视行坐标
   * @param {String} type 类型 header|body|footer
   * @param {Array} displayedFooterColumns footer列 []
   * @return Element
   */
  const _gridRowRender = (row, rowIndex, {type, displayedFooterColumns}) => {
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
    const mouseEvent = {
      onMouseEnter: (event) => {
        __onMouseEnter({type, rowKey: _rowKey});
        if (additionalRowProps.onMouseEnter) { additionalRowProps.onMouseEnter(event); }
      },
      onMouseLeave: (event) => {
        __onMouseLeave({type, rowKey: _rowKey});
        if (additionalRowProps.onMouseLeave) { additionalRowProps.onMouseLeave(event); }
      }
    };
    return <RowComponent
      {...additionalRowProps}
      {...mouseEvent}
      key={`row_${_rowKey}`}
      data-key={`row_${_rowKey}`}
      className={classNames(
        'vt-grid-row',
        {'vt-grid-row-selected': selected},
        additionalRowProps.className
      )}
      style={{
        height,
        contain: stateProps.fixedRowHeight ? 'none' : ''
        // height: stateProps.estimatedRowHeight,
        // width: stateProps.visibleWidth
      }}
    >
      {
        // footer不展示勾选框
        (displayedFooterColumns || displayedColumns).map((column, columnIndex) => {
          return _cellRender(row, rowIndex, column, columnIndex, {type});
        })
      }
    </RowComponent>;
  };

  const onScrollCapture = (e) => {
    if ((!_VTableContext.isSticky || _VTableContext.headerNotSticky) && mgType === 'mainMultiGrid') _VTableContext.onScroll(e);
    if (type === 'body' && onScrollTopSync) onScrollTopSync(e);
    _onScrollEvent();
    // 设置元素不对指针事件做出反应
    realGridContainer.current.style.pointerEvents = 'none';
    _resetIsScrollingDebounced();
  };

  const _resetIsScrollingDebounced = () => {
    if (resetIsScrollingTimeoutIdRef.current !== null) {
      cancelTimeout(resetIsScrollingTimeoutIdRef.current);
    }
    resetIsScrollingTimeoutIdRef.current = requestTimeout(
      _resetIsScrolling,
      150
    );
  };
  const _resetIsScrolling = useCallback(() => {
    resetIsScrollingTimeoutIdRef.current = null;
    realGridContainer.current.style.pointerEvents = '';
    // if (type === 'body' &&  props.syncRowHeight) props.syncRowHeight('setState');
  }, []);
  return <>
    <div className={classNames('vt-grid-container', className)}
      ref={gridContainer}
      onScrollCapture={onScrollCapture}
      style={{
        height: stateProps.visibleHeight,
        ...(gridStyle || {}),
      }}
    >
      <div ref={realGridContainer} style={{
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
          (_VTableContext.isSticky && !_VTableContext.headerNotSticky) &&
          <div className="vt-table-header vt-header-sticky">
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
        {
          // sticky footer
          _VTableContext.isSticky && _VTableContext.summaryData && <div className="vt-table-footer vt-footer-sticky">
            {
              _VTableContext.summaryData.map((row, rowIndex) => {
                // 行渲染
                return _gridRowRender(row, rowIndex, {type: 'footer', displayedFooterColumns});
              })
            }
          </div>
        }
      </div>
    </div>
  </>;
};

Grid.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  visibleWidth: PropTypes.number,
  visibleHeight: PropTypes.number,
  estimatedRowHeight: PropTypes.number,
  minRowHeight: PropTypes.number,
  rowVisibleCount: PropTypes.number,
  rowOffsetCount: PropTypes.number,
  estimatedColumnWidth: PropTypes.number,
  columnVisibleCount: PropTypes.number,
  columnOffsetCount: PropTypes.number,
  fixedRowHeight: PropTypes.bool,
  fixedLeftColumns: PropTypes.array,
  fixedRightColumns: PropTypes.array,
  // 类型 header
  type: PropTypes.string,
  mgType: PropTypes.string,
  className: PropTypes.string, // .vt-grid-container 样式
  gridStyle: PropTypes.object,
  shouldRowHeightSync: PropTypes.bool,
  headerBordered: PropTypes.bool,
  bordered: PropTypes.bool,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  components: PropTypes.object,
  onRow: PropTypes.func,
  onScrollTopSync: PropTypes.func,
  onCellTap: PropTypes.func,
};
// Grid.whyDidYouRender = true;
export default React.memo(React.forwardRef(Grid));
