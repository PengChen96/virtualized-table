
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import {deepClone} from './utils/deepClone';
import {getSelfAdaptionColumns} from './utils/columns';
import './styles/multi-grid.less';

const MultiGrid =  (props) => {

  const multiGridContainer = useRef(null);
  let [columns, setColumns] = useState(props.columns);
  let [hasFixed, setHasFixed] = useState(true);

  useEffect(() => {
    reSetColumns();
    window.addEventListener('resize', reSetColumns);
    return () => window.removeEventListener('resize', reSetColumns);
  }, [props.columns]);

  // 设置自适应列
  const reSetColumns = () => {
    const {columns} = props;
    const {offsetWidth} = multiGridContainer.current;
    setColumns(getSelfAdaptionColumns({columns, offsetWidth}).columns);
    setHasFixed(getSelfAdaptionColumns({columns, offsetWidth}).hasFixed);
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
      ref={multiGridContainer}>
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
