
import React, {useEffect, useState, useRef, useImperativeHandle, useContext} from 'react';
import PropTypes from 'prop-types';
import './styles/grid.less';
import {getColumnsWidth} from './utils';
import {getFixedCellInfo} from './utils/fixUtil';
import {sameType} from './utils/base';
import VTableContext from './context/VTableContext';

const ALIGN_TYPE = {
  left: 'vt-align-left',
  right: 'vt-align-right',
  center: 'vt-align-center',
};

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
    console.log('dataSource change');
    //
    if (!_VTableContext.isSticky && props.type === 'body') {
      _VTableContext.getBodyScrollBarWidth({ref: gridContainer});
    }

  }, [
    props.dataSource,
    props.columns,
  ]);

  const _onScrollEvent = () => {

    // window.requestAnimationFrame(() => {
    // 垂直方向滚动
    _onVerticalScroll();
    // 水平方向滚动
    _onHorizontalScroll();
    // });

  };
  // 垂直方向滚动
  const _onVerticalScroll = () => {
    console.log('vertical');
    const {scrollTop} = gridContainer.current;
    // 当前scrollTop
    let gridInfo = getRealGridVerticalScrollInfo({scrollTop});
    // 更新渲染
    updateGrid(gridInfo);
  };
  // 计算获取网格垂直滚动对应的实时信息
  const getRealGridVerticalScrollInfo = ({scrollTop}) => {
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
    return {
      startRowIndex,
      endRowIndex,
      startVerticalOffset,
      endVerticalOffset,
      virtualData
    };
  };

  // 水平方向滚动
  const _onHorizontalScroll = () => {
    const {scrollLeft} = gridContainer.current;
    // 当前scrollLeft
    let gridInfo = getRealGridHorizontalScrollInfo({scrollLeft});
    // 更新渲染
    updateGrid(gridInfo);
  };
  // 计算获取网格水平滚动对应的实时信息
  const getRealGridHorizontalScrollInfo = ({scrollLeft}) => {
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
    let startHorizontalOffset = dataSource.length > 0 ? getColumnsWidth(leftOffsetColumns) : 0;
    // 右边未渲染数据的paddingRight值
    let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
    let endHorizontalOffset = dataSource.length > 0 ? getColumnsWidth(rightOffsetColumns) : 0;
    // 需要渲染显示的列数据
    let virtualColumns = scrollColumns.slice(startColumnIndex, endColumnIndex);
    // console.log(leftOffsetColumns, startHorizontalOffset, rightOffsetColumns, endHorizontalOffset, virtualColumns, getColumnsWidth(virtualColumns));
    // console.table({scrollLeft, scrollLeftNum, startColumnIndex, endColumnIndex});
    return{
      startColumnIndex,
      endColumnIndex,
      startHorizontalOffset,
      endHorizontalOffset,
      virtualColumns
    };
  };
  // 渲染单元格
  const _cellRender = (row, rowIndex, column, columnIndex, {type}) => {

    const {columns} = stateProps;

    let realRowIndex = rowIndex + grid.startRowIndex;
    let realColumnIndex = column.fixed ? column.realFcIndex : columnIndex + grid.startColumnIndex;
    let value = row[column['key'] || column['dataIndex']];
    let width = column.width || stateProps.estimatedColumnWidth;

    // colSpan目前方案是传方法确定哪一行需要列合并
    let colSpan = sameType(column.colSpan, 'Function') ? column.colSpan(realRowIndex) : 1;
    let rowMergeColumns = columns.slice(realColumnIndex, realColumnIndex + colSpan);
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

    // 是否显示边框
    let bordered = type==='header' ? (props.headerBordered || props.bordered) : props.bordered;
    let noLastChildBorderRight = _VTableContext.isSticky ? 'vt-has-last-child-border-right' : 'vt-no-last-child-border-right';
    bordered = `vt-default-bordered ${bordered?'vt-bordered-right':''} ${noLastChildBorderRight}`;
    // 对齐方式 'left' | 'right' | 'center'
    let align = ALIGN_TYPE[column.align] || ALIGN_TYPE.left;
    // 固定列阴影
    const {fixedLeftColumns, fixedRightColumns} = props;
    const cellInfo = getFixedCellInfo({column, fixedLeftColumns, fixedRightColumns});
    const {lastFixLeft, firstFixRight} = cellInfo;
    const lastFixLeftShadow = lastFixLeft ? 'vt-cell-fix-left-last' : '';
    const firstFixRightShadow = firstFixRight ? 'vt-cell-fix-right-first' : '';
    // className
    const className = column.className;
    return <div
      key={`cell_${realRowIndex}_${realColumnIndex}}`}
      data-key={`cell_${realRowIndex}_${realColumnIndex}`}
      className={`vt-grid-cell ${lastFixLeftShadow} ${firstFixRightShadow} ${bordered} ${align} ${className}`}
      onClick={() => __onCellTap(
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
        ...getFixedCellStyle({column})
      }}
    >
      {
        /* 因flex布局下省略号不生效 故加一层div*/
        column.ellipsis ? <div className={'vt-ellipsis'} title={value}>
          { _render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {type}) }
        </div>
          : _render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {type})
      }
    </div>;
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
  // 使用sticky实现固定列
  const getFixedCellStyle = ({column}) => {
    const {fixedLeftColumns, fixedRightColumns} = props;
    let cellInfo = getFixedCellInfo({column, fixedLeftColumns, fixedRightColumns});
    const {isSticky, fixLeft, fixRight} = cellInfo;
    return {
      zIndex: isSticky ? 2 : undefined,
      position: isSticky ? 'sticky' : undefined,
      left: fixLeft,
      right: fixRight,
    };
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

  /**
   * 默认行
   * @param {Object} row 行数据
   * @param {Number} rowIndex 行坐标
   * @param {String} type 类型 header|body|footer
   */
  const defaultGridRow = (row, rowIndex, {type}) => {
    let realRowIndex = rowIndex + grid.startRowIndex;
    return <div
      key={`row_${realRowIndex}`}
      data-key={`row_${realRowIndex}`}
      className="vt-grid-row"
      style={{
        // height: stateProps.estimatedRowHeight,
        // width: stateProps.visibleWidth
      }}
    >
      {
        [...(props.fixedLeftColumns || []), ...grid.virtualColumns, ...(props.fixedRightColumns || [])].map((column, columnIndex) => {
          let gridRowCell = _cellRender(row, rowIndex, column, columnIndex, {type});
          // 有要重写对应header|body|footer的cell
          if (props.components && props.components[type] && props.components[type].cell) {
            let realColumnIndex = columnIndex + grid.startColumnIndex;
            // {width, onResize}
            let defaultCellProps = typeof column.onCell === 'function' ? column.onCell(column, realRowIndex) : {};
            let cellPropsMap = {
              header: sameType(column.onHeaderCell, 'Function') ? column.onHeaderCell(column, realRowIndex) : undefined,
              body: sameType(column.onBodyCell, 'Function') ? column.onBodyCell(column, realRowIndex) : undefined,
              footer: sameType(column.onFooterCell, 'Function') ? column.onFooterCell(column, realRowIndex) : undefined,
            };
            let Cell = props.components[type].cell;
            gridRowCell = <Cell
              key={`${realRowIndex}_${realColumnIndex}`}
              data-key={`${realRowIndex}_${realColumnIndex}`}
              {...(cellPropsMap[type] || defaultCellProps)}
              style={{...getFixedCellStyle({column})}}
            >
              {_cellRender(row, rowIndex, column, columnIndex, {type})}
            </Cell>;
          }
          return gridRowCell;
        })
      }
    </div>;
  };

  /**
   * 渲染行
   * @param {Object} row 行数据
   * @param {Number} rowIndex 行坐标
   * @param {String} type 类型 header|body|footer
   */
  const _gridRowRender = (row, rowIndex, {type}) => {
    let gridRow = defaultGridRow(row, rowIndex, {type});
    // 覆盖默认的 GridRow 元素
    if (props.components && props.components.row) {
      let realRowIndex = rowIndex + grid.startRowIndex;
      // {index, moveRow}
      let rowProps = typeof props.onRow === 'function' ? props.onRow(row, realRowIndex) : {};
      gridRow = <props.components.row
        key={realRowIndex}
        data-key={realRowIndex}
        {...rowProps}
      >
        {defaultGridRow(row, rowIndex, {type})}
      </props.components.row>;
    }
    return gridRow;

  };
  return <>
    <div className={`vt-grid-container ${props.className}`}
      ref={gridContainer}
      onScrollCapture={(e) => {
        _VTableContext.onScroll(e);
        _onScrollEvent();
      }}
      style={{height: stateProps.visibleHeight}}
    >
      <div style={{
        paddingTop: grid.startVerticalOffset,
        paddingBottom: grid.endVerticalOffset,
        paddingLeft: grid.startHorizontalOffset,
        paddingRight: grid.endHorizontalOffset
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
          [ ...grid.virtualData].map((row, rowIndex) => {
            // 行渲染
            return _gridRowRender(row, rowIndex, {type: props.type});
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
export default React.forwardRef(Grid);
