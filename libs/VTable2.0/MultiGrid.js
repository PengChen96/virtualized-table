
import React, {useEffect} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import './styles/multi-grid.less';

const MultiGrid =  (props) => {

  useEffect(() => {

    console.log('111', props.columns);

  }, [
    props.columns,
  ]);
  const getColumns = () => {
    const {columns, fixedLeftColumnCount = 0, fixedRightColumnCount} = props;
    const end = fixedRightColumnCount ? -fixedRightColumnCount : undefined;
    return (fixedLeftColumnCount || fixedRightColumnCount) ? columns.slice(fixedLeftColumnCount, end) : columns;
  };
  // fixed columns
  const getFixedLeftColumns = () => {
    const {columns, fixedLeftColumnCount} = props;
    const fixedLeftColumns = fixedLeftColumnCount ? columns.slice(0, fixedLeftColumnCount) : [];
    return fixedLeftColumns.map((column, index) => {
      column.fixed = 'left';
      column.lastFixLeft = index === fixedLeftColumns.length - 1;
      column.fcIndex = index;
      column.realFcIndex = index;
      return column;
    });
  };
  const getFixedRightColumns = () => {
    const {columns, fixedRightColumnCount} = props;
    const fixedRightColumns = fixedRightColumnCount ? columns.slice(-fixedRightColumnCount) : [];
    return fixedRightColumns.map((column, index) => {
      column.fixed = 'right';
      column.firstFixRight = index === 0;
      column.fcIndex = index;
      column.realFcIndex = columns.length - fixedRightColumns.length + index;
      return column;
    });
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
