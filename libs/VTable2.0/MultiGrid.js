
import React, {useContext, useEffect, useImperativeHandle, useMemo, useRef, useState, useCallback} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import {deepClone} from './utils/deepClone';
import {getSelfAdaptionColumns} from './utils/columns';
import {getRowKey} from './utils/rowKey';
import {classNames} from './utils/base';
import {isRowsHeightCached, setRowHeightCache} from './cache/rowHeightCache';
import './styles/multi-grid.less';
import VTableContext from './context/VTableContext';

const MultiGrid =  (props, ref) => {

  const _multiGridContainer = useRef(null);
  // 要向父VTable暴露的
  const multiGridContainer = useRef(null);
  useImperativeHandle(ref, () => ({
    // multiGridContainer: multiGridContainer.current,
    gridContainer: multiGridContainer.current.gridContainer
  }));
  //
  const multiGridContainerLeft = useRef(null);
  const multiGridContainerRight = useRef(null);

  const _VTableContext = useContext(VTableContext);

  let [columns, setColumns] = useState(props.columns);
  let [hasFixed, setHasFixed] = useState(true);

  // let [rowsHeightCacheId, setRowsHeightCacheId] = useState(null);

  useEffect(() => {
    if ((props.columns || []).length > 0) {
      reSetColumns();
      window.addEventListener('resize', reSetColumns);
    }
    return () => window.removeEventListener('resize', reSetColumns);
  }, [props.columns, props.bodyScrollBarWidth, props.rowSelection]);

  useEffect(() => {
    // 同步固定列的高度
    const {fixedLeftColumnCount = 0, fixedRightColumnCount = 0} = props;
    if (!_VTableContext.isSticky && (fixedLeftColumnCount > 0 || fixedRightColumnCount > 0)) {
      let timer = setTimeout(() => {
        // syncRowHeight({forceUpdate: true});
        const {current} = multiGridContainer;
        current.gridContainer.scrollTop += 1;
        window.requestAnimationFrame(() => {
          current.gridContainer.scrollTop -= 1;
        });
        clearTimeout(timer);
      }, 150);
    }
  }, [props.columns, props.dataSource]);

  // 设置自适应列 // TODO 这里的适应列宽 移到外层去
  const reSetColumns = () => {
    const {originDataSource} = _VTableContext;
    const {columns, rowSelection} = props;
    let {offsetWidth} = _multiGridContainer.current;
    if (rowSelection) {
      const {columnWidth = 60} = rowSelection;
      offsetWidth = offsetWidth - columnWidth;
    }
    const scrollBarWidth = props.bodyScrollBarWidth || 0;
    const clientWidth = offsetWidth - scrollBarWidth;
    const columnsObj = getSelfAdaptionColumns({
      columns,
      clientWidth,
    });
    let autoColumns = columnsObj.columns;
    // 表头最后一列的宽度加上滚动条宽度
    if (props.type === 'header' && autoColumns.length > 0) {
      autoColumns[autoColumns.length - 1].width = autoColumns[autoColumns.length - 1].width + scrollBarWidth;
    }
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
            className={'v-checkbox-container'}
            onClick={(e) => {
              _onSelectAll(e);
            }}
          >
            <input type="checkbox" checked={checked}/>
            <div className="show-box" />
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
                'v-checkbox-container',
                {'v-checkbox-container-disabled': disabled}
              )}
              onClick={(e) => {
                if (!disabled) {
                  _onChange(e, row, realRowIndex);
                }
              }}
            >
              <input type="checkbox" checked={checked}/>
              <div className="show-box" />
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
    const {originDataSource} = _VTableContext;
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
    const {originDataSource} = _VTableContext;
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

  // main columns
  const getColumns = useMemo(() => {
    if (!hasFixed) { return columns; }
    const {fixedLeftColumnCount = 0, fixedRightColumnCount = 0} = props;
    const end = fixedRightColumnCount ? -fixedRightColumnCount : undefined;
    return (fixedLeftColumnCount || fixedRightColumnCount) ? deepClone(columns).slice(fixedLeftColumnCount, end) : columns;
  }, [hasFixed, columns, props.fixedLeftColumnCount, props.fixedRightColumnCount]);

  // fixed left columns
  const getFixedLeftColumns = useMemo(() => {
    if (!hasFixed) { return []; }
    const {fixedLeftColumnCount = 0} = props;
    let fixedLeftColumns = fixedLeftColumnCount ? columns.slice(0, fixedLeftColumnCount) : [];
    return formatFixedLeftColumns({fixedLeftColumns});
  }, [hasFixed, columns, props.fixedLeftColumnCount]);

  // fixed right columns
  const getFixedRightColumns = useMemo(() => {
    if (!hasFixed) { return []; }
    const {fixedRightColumnCount = 0} = props;
    let fixedRightColumns = fixedRightColumnCount ? columns.slice(-fixedRightColumnCount) : [];
    return formatFixedRightColumns({fixedRightColumns, columnsLength: columns.length});
  }, [hasFixed, columns, props.fixedRightColumnCount]);

  //
  const onScrollTopSync = useCallback((e, {startRowIndex, endRowIndex}) => {
    const scrollTop = e && e.target && e.target.scrollTop;
    // window.requestAnimationFrame(() => {
    const {current: leftCurrent} = multiGridContainerLeft;
    const {current: rightCurrent} = multiGridContainerRight;
    //
    if (leftCurrent) {
      leftCurrent.gridContainer.scrollTop = scrollTop;
    }
    if (rightCurrent) {
      rightCurrent.gridContainer.scrollTop = scrollTop;
    }
    // });
    syncRowHeight({startRowIndex, endRowIndex});
  }, []);
  // no isSticky
  const syncRowHeight = ({startRowIndex, endRowIndex}) => {
    // 同步固定列的高度
    const {fixedLeftColumnCount = 0, fixedRightColumnCount = 0} = props;
    if (!_VTableContext.isSticky && props.type === 'body' && (fixedLeftColumnCount > 0 || fixedRightColumnCount > 0)) {
      const {current} = multiGridContainer;
      const gridRowCollection = current.gridContainer.getElementsByClassName('vt-grid-row');
      const gridRowHeightArr = Array.prototype.slice.call(gridRowCollection).map((item) => {
        return item.clientHeight;
      });
      //
      const cached = isRowsHeightCached({startRowIndex, endRowIndex, rowHeightArr: gridRowHeightArr});
      if (!cached) {
        setRowHeightCache({startRowIndex, endRowIndex, rowHeightArr: gridRowHeightArr});
      }
    }
  };

  return <>
    <div className={classNames('vt-multi-grid-container', props.mgClassName)}
      ref={_multiGridContainer}>
      {
        _VTableContext.isSticky ? <Grid
          {...props}
          ref={multiGridContainer}
          // 加这个key是因为固定列变化 列数据多渲染一列 todo 原因
          key={`${props.fixedLeftColumnCount}_${props.fixedRightColumnCount}_${hasFixed}`}
          columns={getColumns}
          fixedLeftColumns={getFixedLeftColumns}
          fixedRightColumns={getFixedRightColumns}
          // 这里加mgType是为了getBodyScrollBarWidth
          mgType={'mainMultiGrid'}
        /> : <>
            <Grid
              {...props}
              ref={multiGridContainer}
              columns={[...getFixedLeftColumns, ...getColumns, ...getFixedRightColumns]}
              fixedLeftColumns={[]}
              fixedRightColumns={[]}
              mgType={'mainMultiGrid'}
              onScrollTopSync={onScrollTopSync}
            />
          {
            getFixedLeftColumns.length > 0 ? <div className="vt-multi-grid-fixed-left">
              <Grid
                {...props}
                ref={multiGridContainerLeft}
                columns={getFixedLeftColumns}
                fixedLeftColumns={[]}
                fixedRightColumns={[]}
                // rowsHeightCacheId={rowsHeightCacheId}
                mgType={'leftMultiGrid'}
                gridStyle={{
                  marginBottom: props.type === 'body' ? -props.bodyScrollBarWidth : undefined
                }}
              />
            </div> : null
          }
          {
            getFixedRightColumns.length > 0 ? <div className="vt-multi-grid-fixed-right" style={{
              marginRight: props.type === 'body' ? props.bodyScrollBarWidth : undefined
            }}>
              <Grid
                {...props}
                ref={multiGridContainerRight}
                columns={getFixedRightColumns}
                fixedLeftColumns={[]}
                fixedRightColumns={[]}
                // rowsHeightCacheId={rowsHeightCacheId}
                mgType={'rightMultiGrid'}
                gridStyle={{
                  marginBottom: props.type === 'body' ? -props.bodyScrollBarWidth : undefined
                }}
              />
            </div> : null
          }
        </>
      }
    </div>
  </>;

};

MultiGrid.propTypes = {
  // 类型 header
  type: PropTypes.string,
  // 是否显示边框
  bordered: PropTypes.bool
};

export default React.memo(React.forwardRef(MultiGrid));
