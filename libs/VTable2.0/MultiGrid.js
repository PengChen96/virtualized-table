
import React from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import './styles/multi-grid.less';

const MultiGrid =  (props) => {

  const getColumns = () => {
    const {columns, fixedLeftColumnCount = 0, fixedRightColumnCount} = props;
    const end = fixedRightColumnCount ? -fixedRightColumnCount : undefined;
    return (fixedLeftColumnCount || fixedRightColumnCount) ? columns.slice(fixedLeftColumnCount, end) : columns;
  };
  // fixed columns
  const getFixedLeftColumns = () => {
    const {columns, fixedLeftColumnCount} = props;
    const fixedLeftColumns = fixedLeftColumnCount ? columns.slice(0, fixedLeftColumnCount) : [];
    return formatFixedLeftColumns({fixedLeftColumns});
  };
  const getFixedRightColumns = () => {
    const {columns, fixedRightColumnCount} = props;
    const fixedRightColumns = fixedRightColumnCount ? columns.slice(-fixedRightColumnCount) : [];
    return formatFixedRightColumns({fixedRightColumns, columnsLength: columns.length});
  };

  return <>
    <div className="vt-multi-grid-container">
      <Grid
        type={'1'}
        {...props}
        columns={getColumns()}
        fixedLeftColumns={getFixedLeftColumns()}
        fixedRightColumns={getFixedRightColumns()}
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
