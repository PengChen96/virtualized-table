
import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import {deepClone} from './utils/deepClone';
import {getSelfAdaptionColumns, getScrollBarWidth} from './utils/columns';
import './styles/multi-grid.less';

const MultiGrid =  (props, ref) => {

  const _multiGridContainer = useRef(null);
  // 要向父VTable暴露的
  const multiGridContainer = useRef(null);
  useImperativeHandle(ref, () => ({
    // multiGridContainer: multiGridContainer.current,
    gridContainer: multiGridContainer.current.gridContainer
  }));

  let [columns, setColumns] = useState(props.columns);
  let [hasFixed, setHasFixed] = useState(true);

  useEffect(() => {
    reSetColumns();
    window.addEventListener('resize', reSetColumns);
    return () => window.removeEventListener('resize', reSetColumns);
  }, [props.columns, props.rowSelection]);

  // 设置自适应列
  const reSetColumns = () => {
    const {columns, dataSource, rowSelection} = props;
    let {offsetWidth} = _multiGridContainer.current;
    if (rowSelection) {
      const {columnWidth = 32} = rowSelection;
      offsetWidth = offsetWidth - columnWidth;
    }
    let autoColumns = getSelfAdaptionColumns({columns, offsetWidth}).columns;
    // 表头最后一列的宽度加上滚动条宽度
    if (props.type === 'header' && autoColumns.length > 0) {
      const scrollBarWidth = getScrollBarWidth();
      autoColumns[autoColumns.length - 1].width = autoColumns[autoColumns.length - 1].width + scrollBarWidth;
    }
    // 加上勾选列
    if (rowSelection) {
      const {columnWidth = 32, selectedRowKeys = [], getCheckboxProps} = rowSelection;
      autoColumns.unshift({
        type: 'checkBox',
        width: columnWidth,
        align: 'center',
        title: () => {
          let checked = selectedRowKeys.length === dataSource.filter((r) => getCheckboxProps ? !getCheckboxProps(r).disabled : true).length;
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
          let rowKey = props.rowKey ? row[props.rowKey] : realRowIndex;
          const checked = selectedRowKeys.includes(rowKey);
          // 是否禁用
          let disabled = getCheckboxProps ? getCheckboxProps(row).disabled : false;
          return [
            <div
              key={1}
              className={`v-checkbox-container ${disabled ? 'v-checkbox-container-disabled' : ''}`}
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
    setHasFixed(getSelfAdaptionColumns({columns, offsetWidth}).hasFixed);
  };
  // 勾选改变
  const _onChange = (e, row, realRowIndex) => {
    e.stopPropagation();
    const {rowSelection, dataSource} = props;
    const {selectedRowKeys = [], onChange = ()=>{}, onSelect = () => {}} = rowSelection;
    let rowKey = props.rowKey ? row[props.rowKey] : realRowIndex;
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
      const k = props.rowKey ? v[props.rowKey] : i;
      return _selectedRowKeys.includes(k);
    });
    onChange(_selectedRowKeys, _selectedRows);
    onSelect(row, selected, _selectedRows, e);
  };
  // 勾选全部
  const _onSelectAll = (e) => {
    e.stopPropagation();
    const {rowSelection, dataSource} = props;
    const {selectedRowKeys = [], onChange = ()=>{}, onSelectAll = ()=>{}, getCheckboxProps} = rowSelection;
    let checkedPart = selectedRowKeys.length < dataSource.filter((r) => getCheckboxProps ? !getCheckboxProps(r).disabled : true).length;
    if (checkedPart) {
      let _selectedRowKeys = [];
      let _selectedRows = dataSource.filter((r, i) => {
        const disabled = getCheckboxProps ? getCheckboxProps(r).disabled : false;
        if (!disabled) {
          let rowKey = props.rowKey ? r[props.rowKey] : i;
          _selectedRowKeys.push(rowKey);
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
  return <>
    <div className="vt-multi-grid-container"
      ref={_multiGridContainer}>
      <Grid
        {...props}
        ref={multiGridContainer}
        // 加这个key是因为固定列变化 列数据多渲染一列 todo 原因
        key={`${props.fixedLeftColumnCount}_${props.fixedRightColumnCount}`}
        columns={getColumns}
        fixedLeftColumns={getFixedLeftColumns}
        fixedRightColumns={getFixedRightColumns}
      />
    </div>
  </>;

};

MultiGrid.propTypes = {
  // 类型 header
  type: PropTypes.string,
  // 是否显示边框
  bordered: PropTypes.bool
};

export default React.forwardRef(MultiGrid);
