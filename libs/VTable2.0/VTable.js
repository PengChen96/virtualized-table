
import React, {useEffect, useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import VTableContext from './context/VTableContext';
import MultiGrid from './MultiGrid';
import {isSupportSticky} from './utils/isSupportSticky';
import {sameType, classNames} from './utils/base';
import {getSelfAdaptionColumns} from './utils/columns';
import {getRowKey} from './utils/rowKey';
import {deepClone} from './utils/deepClone';
import './styles/vtable.less';

const VTable = (props) => {

  let vtable = useRef(null);
  let vtHeader = useRef(null);
  let vtBody = useRef(null);

  let [isSticky, setIsSticky] = useState(false);
  let [bodyScrollBarWidth, setBodyScrollBarWidth] = useState(0);
  let [columns, setColumns] = useState(props.columns);
  let [hasFixed, setHasFixed] = useState(true);

  useEffect(() => {
    let _isSticky = props.isSticky === undefined ? isSupportSticky() : props.isSticky;
    setIsSticky(_isSticky);
  }, [props.isSticky]);

  useEffect(() => {
    if ((props.columns || []).length > 0) {
      reSetColumns();
      window.addEventListener('resize', reSetColumns);
    }
    return () => window.removeEventListener('resize', reSetColumns);
  }, [props.columns, bodyScrollBarWidth, props.rowSelection]);

  const headerColumns = useMemo(() => {
    let autoColumns = deepClone(columns);
    const scrollBarWidth = bodyScrollBarWidth || 0;
    if (autoColumns.length > 0) {
      autoColumns[autoColumns.length - 1].width = autoColumns[autoColumns.length - 1].width + scrollBarWidth;
    }
    return autoColumns;
  }, [columns]);
  // 设置自适应列
  const reSetColumns = () => {
    const originDataSource = props.dataSource;
    const {columns, rowSelection} = props;
    let {offsetWidth} = vtable.current;
    if (rowSelection) {
      const {columnWidth = 60} = rowSelection;
      offsetWidth = offsetWidth - columnWidth;
    }
    const scrollBarWidth = bodyScrollBarWidth || 0;
    const clientWidth = offsetWidth - scrollBarWidth;
    const columnsObj = getSelfAdaptionColumns({
      columns,
      clientWidth,
    });
    let autoColumns = columnsObj.columns;
    // 表头最后一列的宽度加上滚动条宽度
    // if (props.type === 'header' && autoColumns.length > 0) {
    //   autoColumns[autoColumns.length - 1].width = autoColumns[autoColumns.length - 1].width + scrollBarWidth;
    // }
    // 加上勾选列
    if (rowSelection) {
      const {columnWidth = 60, selectedRowKeys = [], getCheckboxProps} = rowSelection;
      autoColumns.unshift({
        type: 'checkBox',
        width: columnWidth,
        align: 'center',
        title: () => {
          let checked = selectedRowKeys.length === originDataSource.filter((r) => getCheckboxProps ? !getCheckboxProps(r).disabled : true).length;
          return <div
            className={'vt-selection'}
            onClick={(e) => {
              _onSelectAll(e);
            }}
          >
            <input type="checkbox" checked={checked}/>
            <div className="vt-show-box" />
          </div>;
        },
        render: (value, row, rowIndex, realRowIndex) => {
          // 是否选中
          // let rowKey = props.rowKey ? (sameType(props.rowKey, 'Function') ? props.rowKey(row) : row[props.rowKey]) : realRowIndex;
          const rowKey = getRowKey(props.rowKey, row, realRowIndex);
          const checked = selectedRowKeys.includes(rowKey);
          // 是否禁用
          let disabled = getCheckboxProps ? getCheckboxProps(row).disabled : false;
          return [
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
              <input type="checkbox" checked={checked}/>
              <div className="vt-show-box" />
            </div>
          ];
        }
      });
    }
    setColumns(autoColumns);
    setHasFixed(columnsObj.hasFixed);
  };
  // 勾选改变
  const _onChange = (e, row, realRowIndex) => {
    e.stopPropagation();
    const originDataSource = props.dataSource;
    const {rowSelection} = props;
    const {selectedRowKeys = [], onChange = ()=>{}, onSelect = () => {}} = rowSelection;
    // let rowKey = props.rowKey ? (sameType(props.rowKey, 'Function') ? props.rowKey(row) : row[props.rowKey]) : realRowIndex;
    const rowKey = getRowKey(props.rowKey, row, realRowIndex);
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
    const _selectedRows = originDataSource.filter((v, i) => {
      // const k = props.rowKey ? (sameType(props.rowKey, 'Function') ? props.rowKey(v) : v[props.rowKey]) : i;
      const k = getRowKey(props.rowKey, v, i);
      return _selectedRowKeys.includes(k);
    });
    onChange(_selectedRowKeys, _selectedRows);
    onSelect(row, selected, _selectedRows, e);
  };
  // 勾选全部
  const _onSelectAll = (e) => {
    e.stopPropagation();
    const originDataSource = props.dataSource;
    const {rowSelection} = props;
    const {selectedRowKeys = [], onChange = ()=>{}, onSelectAll = ()=>{}, getCheckboxProps} = rowSelection;
    let checkedPart = selectedRowKeys.length < originDataSource.filter((r) => getCheckboxProps ? !getCheckboxProps(r).disabled : true).length;
    if (checkedPart) {
      let _selectedRowKeys = [];
      let _selectedRows = originDataSource.filter((v, i) => {
        const disabled = getCheckboxProps ? getCheckboxProps(v).disabled : false;
        if (!disabled) {
          // const k = props.rowKey ? (sameType(props.rowKey, 'Function') ? props.rowKey(v) : v[props.rowKey]) : i;
          const k = getRowKey(props.rowKey, v, i);
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
  // 表头
  const getHeaderTitle = useMemo(() => {
    const {columns} = props;
    let headerData = [{}];
    columns.forEach((column) => {
      headerData[0][column.key || column.dataIndex] = column.title;
    });
    return headerData;
  }, [props.columns]);

  const onScroll = (e) => {
    let scrollLeft = e && e.target && e.target.scrollLeft;
    if (vtHeader.current) {
      vtHeader.current.gridContainer.scrollLeft = scrollLeft;
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

  let spinning = sameType(props.loading, 'Object') ? props.loading.spinning : props.loading;
  return <>
    <VTableContext.Provider
      value={{
        onScroll,
        getBodyScrollBarWidth,
        isSticky: isSticky,
        headerTitle: getHeaderTitle,
        originDataSource: props.dataSource,
      }}
    >
      <div
        ref={vtable}
        className={classNames('vt-table', props.wrapperClassName)}
        style={{height: props.visibleHeight}}
      >
        {
          !isSticky && <MultiGrid
            {...props}
            ref={vtHeader}
            type={'header'}
            className={classNames('vt-table-header', props.className)}
            visibleHeight={props.rowHeight || 40}
            minRowHeight={props.rowHeight}
            columns={headerColumns}
            hasFixed={hasFixed}
            dataSource={getHeaderTitle}
            bodyScrollBarWidth={bodyScrollBarWidth}
          />
        }
        <MultiGrid
          {...props}
          ref={vtBody}
          type={'body'}
          mgClassName={'vt-table-body'}
          visibleHeight={!isSticky ? props.visibleHeight - (props.rowHeight || 40) : props.visibleHeight}
          minRowHeight={props.rowHeight}
          columns={columns}
          hasFixed={hasFixed}
          bodyScrollBarWidth={bodyScrollBarWidth}
        />
        {
          !spinning && props.dataSource.length < 1 ? <div className="vt-table-empty">
            <div style={{pointerEvents: 'auto'}}>
              {
                (props.locale && props.locale.emptyText) ? props.locale.emptyText : '暂无数据'
              }
            </div>
          </div> : ''
        }
        {
          spinning ? <div className="vt-table-loading">
            {
              (props.loading && props.loading.spinningText) ? props.loading.spinningText : '数据加载中，请稍后...'
            }
          </div> : ''
        }
      </div>
    </VTableContext.Provider>
  </>;

};

VTable.propTypes = {
  loading: PropTypes.any,
  locale: PropTypes.object,
  wrapperClassName: PropTypes.string,
  rowHeight: PropTypes.number
};
export default React.memo(VTable);
