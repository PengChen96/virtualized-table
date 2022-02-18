import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import VTableContext from './context/VTableContext';
import MultiGrid from './MultiGrid';
import {isSupportSticky} from './utils/isSupportSticky';
import {classNames, sameType} from './utils/base';
import {flattenColumns, getHeader2dArray, getSelfAdaptionColumns} from './utils/columns';
import {getRowKey} from './utils/rowKey';
import {deepClone} from './utils/deepClone';
import {formatToCellsSpan} from './utils/colSpanRowSpan';
import './styles/vtable.less';

const VTable = (props) => {

  let vtable = useRef(null);
  let vtHeader = useRef(null);
  let vtBody = useRef(null);
  let vtFooter = useRef(null);

  const {
    isSticky: isStickyProps,
    rowKey: rowKeyProps,
    rowSelection,
    columns: columnsProps = [],
    dataSource = [],
    summary,
    wrapperClassName,
    // className,
    visibleHeight,
    rowHeight = 40,
    locale,
    loading
  } = props;
  let [isSticky, setIsSticky] = useState(false);
  let [bodyScrollBarWidth, setBodyScrollBarWidth] = useState(0);
  let [headerLevel, setHeaderLevel] = useState(1);
  let [headerTitle, setHeaderTitle] = useState([]);
  let [columns, setColumns] = useState(columnsProps);
  let [hasFixed, setHasFixed] = useState(true);
  const summaryData = sameType(summary, 'Function') ? summary() : summary;

  useEffect(() => {
    let _isSticky = isStickyProps === undefined ? isSupportSticky() : isStickyProps;
    setIsSticky(_isSticky);
  }, [isStickyProps]);

  useEffect(() => {
    if (columnsProps.length > 0) {
      reSetColumns();
      window.addEventListener('resize', reSetColumns);
    }
    return () => window.removeEventListener('resize', reSetColumns);
  }, [columnsProps, bodyScrollBarWidth, rowSelection]);
  //
  const headerColumns = useMemo(() => {
    let autoColumns = deepClone(columns);
    const scrollBarWidth = bodyScrollBarWidth || 0;
    if (autoColumns.length > 0) {
      autoColumns[autoColumns.length - 1].width = autoColumns[autoColumns.length - 1].width + scrollBarWidth;
    }
    return autoColumns;
  }, [columns]);
  //
  const footerColumns = useMemo(() => {
    let autoColumns = headerColumns;
    if (headerColumns.length > 0 && headerColumns[0].type === 'checkBox') {
      autoColumns = deepClone(headerColumns);
      autoColumns[0].render = null;
    }
    return autoColumns;
  }, [headerColumns]);
  // 设置自适应列
  const reSetColumns = () => {
    let {offsetWidth} = vtable.current;
    if (rowSelection) {
      const {columnWidth = 60} = rowSelection;
      offsetWidth = offsetWidth - columnWidth;
    }
    const {columns: flatColumns, level: headerLevel} = flattenColumns({columns: columnsProps});
    const scrollBarWidth = bodyScrollBarWidth || 0;
    const clientWidth = offsetWidth - scrollBarWidth;
    const columnsObj = getSelfAdaptionColumns({
      columns: flatColumns,
      clientWidth,
    });
    // 多级表头
    let autoColumns = columnsObj.columns;
    const {data, merges} = getHeader2dArray({
      columns: columnsProps,
      flatColumns,
      headerLevel
    });
    const mergesObj = formatToCellsSpan(merges);
    autoColumns = autoColumns.map((column, colIndex) => {
      column._headerCellProps = (value, row, rowIndex) => {
        return {
          ...mergesObj[`${colIndex}:${rowIndex}`]
        };
      };
      return column;
    });
    // 加上勾选列
    if (rowSelection) {
      const {columnWidth = 60, selectedRowKeys = [], getCheckboxProps, rowRemoveVisible, onRowRemove} = rowSelection;
      //
      const __onRowRemove = (e, row, rowIndex, realRowIndex) => {
        e.stopPropagation();
        onRowRemove(e, row, rowIndex, realRowIndex);
      };
      autoColumns.unshift({
        type: 'checkBox',
        dataIndex: 'checkBox',
        width: columnWidth,
        align: 'center',
        _headerCellProps: (value, row, rowIndex) => {
          return {rowSpan: rowIndex === 0 ? headerLevel : 0};
        },
        title: () => {
          const checked = getCheckedAll({selectedRowKeys, getCheckboxProps});
          return <div
            className={'vt-selection'}
            onClick={(e) => {
              _onSelectAll(e);
            }}
          >
            <input type="checkbox" checked={checked} readOnly/>
            <div className="vt-show-box"/>
          </div>;
        },
        render: (value, row, rowIndex, realRowIndex) => {
          // 是否选中
          const rowKey = getRowKey(rowKeyProps, row, realRowIndex);
          const checked = selectedRowKeys.includes(rowKey);
          // 是否禁用
          let disabled = getCheckboxProps ? getCheckboxProps(row).disabled : false;
          return [
            rowRemoveVisible && <div key={0} onClick={(e) => __onRowRemove(e, row, rowIndex, realRowIndex)}>
              {props.rowRemoveText || <div className="vt-row-remove"/>}
            </div>,
            <div
              key={1}
              className={classNames(
                'vt-selection',
                {'vt-selection-disabled': disabled}
              )}
              onClick={(e) => {
                if (!disabled) {
                  _onChange(e, row, realRowIndex);
                }
              }}
            >
              <input type="checkbox" checked={checked} readOnly/>
              <div className="vt-show-box"/>
            </div>
          ];
        }
      });
    }
    setHeaderLevel(headerLevel); // 表头层级
    setHeaderTitle(data); // 表头数据
    setColumns(autoColumns);
    setHasFixed(columnsObj.hasFixed);
  };
  // 是否全选
  const getCheckedAll = ({
    selectedRowKeys,
    getCheckboxProps
  }) => {
    const allEffectiveRowKeys = [];
    dataSource.forEach((r, i) => {
      // 没有被禁用
      if (getCheckboxProps ? !getCheckboxProps(r).disabled : true) {
        allEffectiveRowKeys.push(getRowKey(rowKeyProps, r, i));
      }
    });
    const effectiveSelectedRowKeys = selectedRowKeys.filter((v) => allEffectiveRowKeys.includes(v));
    return allEffectiveRowKeys.length > 0 && effectiveSelectedRowKeys.length === allEffectiveRowKeys.length;
  };
  // 勾选改变
  const _onChange = (e, row, realRowIndex) => {
    e.stopPropagation();
    const {
      selectedRowKeys = [],
      onChange = () => {},
      onSelect = () => {}
    } = rowSelection;
    const rowKey = getRowKey(rowKeyProps, row, realRowIndex);
    let rowKeysSet = new Set(selectedRowKeys);
    let selected = undefined;
    if (rowKeysSet.has(rowKey)) {
      rowKeysSet.delete(rowKey);
      selected = false;
    } else {
      rowKeysSet.add(rowKey);
      selected = true;
    }
    const _selectedRowKeys = Array.from(rowKeysSet);
    const _selectedRows = dataSource.filter((v, i) => {
      const k = getRowKey(rowKeyProps, v, i);
      return _selectedRowKeys.includes(k);
    });
    onChange(_selectedRowKeys, _selectedRows);
    onSelect(row, selected, _selectedRows, e);
  };
  // 勾选全部
  const _onSelectAll = (e) => {
    e.stopPropagation();
    const {
      selectedRowKeys = [],
      onChange = () => {},
      onSelectAll = () => {},
      getCheckboxProps
    } = rowSelection;
    const checkedAll = getCheckedAll({selectedRowKeys, getCheckboxProps});
    if (!checkedAll) {
      let _selectedRowKeys = [];
      let _selectedRows = dataSource.filter((v, i) => {
        const disabled = getCheckboxProps ? getCheckboxProps(v).disabled : false;
        if (!disabled) {
          const k = getRowKey(rowKeyProps, v, i);
          _selectedRowKeys.push(k);
        }
        return !disabled;
      });
      onChange(_selectedRowKeys, _selectedRows);
      // selected, selectedRows
      onSelectAll(true, _selectedRows);
    } else {
      onChange([], []);
      onSelectAll(false, []);
    }
  };

  const onScroll = (e) => {
    let scrollLeft = e && e.target && e.target.scrollLeft;
    if (vtHeader.current) {
      vtHeader.current.gridContainer.scrollLeft = scrollLeft;
    }
    if (vtFooter.current) {
      vtFooter.current.gridContainer.scrollLeft = scrollLeft;
    }
    // vtBody.current.scrollLeft = scrollLeft;
    // console.log(vtHeader.current);
    // console.log(vtHeader.current.scrollLeft, vtBody.current.scrollLeft);
    // [vtHeader, vtBody].forEach((vt) => {
    //   if(vt.current.gridContainer.scrollLeft !== scrollLeft) {
    //     vt.current.gridContainer.scrollLeft = scrollLeft;
    //   }
    // });
  };
  // 获取body的滚动条宽度，然后去设置header的最后一列宽度
  const getBodyScrollBarWidth = ({ref}) => {
    if (ref && ref.current) {
      setBodyScrollBarWidth(ref.current.offsetWidth - ref.current.clientWidth);
    }
  };

  let spinning = sameType(loading, 'Object') ? loading.spinning : loading;
  const headerHeight = rowHeight * headerLevel; // 表头高度
  const footerHeight = summaryData ? rowHeight * summaryData.length : 0; // 总结栏高度
  const bodyHeight = !isSticky ? visibleHeight - headerHeight - footerHeight : visibleHeight; // body高度
  return <>
    <VTableContext.Provider
      value={{
        onScroll,
        getBodyScrollBarWidth,
        isSticky: isSticky,
        headerTitle: headerTitle,
        summaryData: summaryData
      }}
    >
      <div
        ref={vtable}
        className={classNames('vt-table', wrapperClassName)}
        style={{height: visibleHeight}}
      >
        {
          !isSticky && <MultiGrid
            {...props}
            ref={vtHeader}
            type={'header'}
            // className={classNames('vt-table-header', className)}
            mgClassName={'vt-table-header'}
            visibleHeight={headerHeight}
            minRowHeight={rowHeight}
            columns={headerColumns}
            dataSource={headerTitle}
            hasFixed={hasFixed}
            bodyScrollBarWidth={bodyScrollBarWidth}
          />
        }
        <MultiGrid
          {...props}
          ref={vtBody}
          type={'body'}
          mgClassName={'vt-table-body'}
          visibleHeight={bodyHeight}
          minRowHeight={rowHeight}
          columns={columns}
          hasFixed={hasFixed}
          bodyScrollBarWidth={bodyScrollBarWidth}
        />
        {
          !isSticky && summaryData && <MultiGrid
            {...props}
            ref={vtFooter}
            type={'footer'}
            mgClassName={'vt-table-footer'}
            visibleHeight={footerHeight}
            minRowHeight={rowHeight}
            columns={footerColumns}
            dataSource={summaryData}
            hasFixed={hasFixed}
            bodyScrollBarWidth={bodyScrollBarWidth}
          />
        }
        {
          !spinning && dataSource.length < 1 ? <div className="vt-table-empty">
            <div style={{pointerEvents: 'auto'}}>
              {
                (locale && locale.emptyText) ? locale.emptyText : '暂无数据'
              }
            </div>
          </div> : ''
        }
        {
          spinning ? <div className="vt-table-loading">
            {
              (loading && loading.spinningText) ? loading.spinningText : '数据加载中，请稍后...'
            }
          </div> : ''
        }
      </div>
    </VTableContext.Provider>
  </>;

};

VTable.propTypes = {
  isSticky: PropTypes.bool,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  wrapperClassName: PropTypes.string,
  rowHeight: PropTypes.number,
  rowKey: PropTypes.string | PropTypes.func,
  rowSelection: PropTypes.object,
  rowRemoveText: PropTypes.string | PropTypes.element,
  summary: PropTypes.array | PropTypes.func,
  loading: PropTypes.object | PropTypes.bool,
  locale: PropTypes.object,
};
export default React.memo(VTable);
