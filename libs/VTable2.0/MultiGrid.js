
import React, {useMemo} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import './styles/multi-grid.less';
import {deepClone} from './utils/deepClone';

const MultiGrid =  (props) => {

  // main columns
  const getColumns = useMemo(() => {
    const {columns, fixedLeftColumnCount = 0, fixedRightColumnCount} = props;
    const end = fixedRightColumnCount ? -fixedRightColumnCount : undefined;
    return (fixedLeftColumnCount || fixedRightColumnCount) ? deepClone(columns).slice(fixedLeftColumnCount, end) : columns;
  }, [props.columns, props.fixedLeftColumnCount, props.fixedRightColumnCount]);

  // fixed left columns
  const getFixedLeftColumns = useMemo(() => {
    const {columns, fixedLeftColumnCount} = props;
    let fixedLeftColumns = fixedLeftColumnCount ? columns.slice(0, fixedLeftColumnCount) : [];
    return formatFixedLeftColumns({fixedLeftColumns});
  }, [props.columns, props.fixedLeftColumnCount]);

  // fixed right columns
  const getFixedRightColumns = useMemo(() => {
    const {columns, fixedRightColumnCount} = props;
    let fixedRightColumns = fixedRightColumnCount ? columns.slice(-fixedRightColumnCount) : [];
    return formatFixedRightColumns({fixedRightColumns, columnsLength: columns.length});
  }, [props.columns, props.fixedRightColumnCount]);

  return <>
    <div className="vt-multi-grid-container">
      <Grid
        type={'1'}
        {...props}
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

export default MultiGrid;
