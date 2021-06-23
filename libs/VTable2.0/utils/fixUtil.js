import {getColumnsWidth} from './columns';
import {deepClone} from './deepClone';

/**
 * 格式化 左侧固定列
 * @param {object} { fixedLeftColumns 左侧列 }
 * @return columns
 */
export const formatFixedLeftColumns = ({fixedLeftColumns}) => {
  return deepClone(fixedLeftColumns).map((column, index) => {
    column.fixed = 'left';
    column.lastFixLeft = index === fixedLeftColumns.length - 1;
    column.fcIndex = index;
    column.realFcIndex = index;
    return column;
  });
};

/**
 * 格式化 右侧固定列
 * @param {object}
 * {
 *    fixedRightColumns 右侧列
 *    columnsLength  全部列长度
 * }
 * @return columns
 */
export const formatFixedRightColumns = ({fixedRightColumns, columnsLength}) => {
  return deepClone(fixedRightColumns).map((column, index) => {
    column.fixed = 'right';
    column.firstFixRight = index === 0;
    column.fcIndex = index;
    column.realFcIndex = columnsLength - fixedRightColumns.length + index;
    return column;
  });
};
/**
 * 格式化 右侧固定列
 * @param {object}
 * {
 *    column {object} 单列对象
 *    fixedLeftColumns {array} 左侧列
 *    fixedRightColumns {array} 右侧列
 * }
 * @return {object}
 */
export const getFixedCellInfo = ({column, fixedLeftColumns = [], fixedRightColumns = []}) => {
  let isSticky = false;
  let fixLeft = undefined;
  let fixRight = undefined;
  let lastFixLeft = false;
  let firstFixRight = false;
  if (column.fixed === 'left' && fixedLeftColumns.length > 0) {
    isSticky = true;
    fixLeft = getColumnsWidth(fixedLeftColumns.slice(0, column.fcIndex));
    lastFixLeft = column.lastFixLeft;
  } else if (column.fixed === 'right' && fixedRightColumns.length > 0) {
    isSticky = true;
    fixRight = getColumnsWidth(fixedRightColumns.slice(column.fcIndex + 1));
    firstFixRight = column.firstFixRight;
  }
  return {
    isSticky,
    fixLeft,
    fixRight,
    lastFixLeft,
    firstFixRight
  };
};
// cell fixed shadow
export const getCellFixedShadow = ({column, fixedLeftColumns = [], fixedRightColumns = []}) => {
  const cellInfo = getFixedCellInfo({column, fixedLeftColumns, fixedRightColumns});
  const {lastFixLeft, firstFixRight} = cellInfo;
  const lastFixLeftShadow = lastFixLeft ? 'vt-cell-fix-left-last' : '';
  const firstFixRightShadow = firstFixRight ? 'vt-cell-fix-right-first' : '';
  return `${lastFixLeftShadow} ${firstFixRightShadow}`;
};
// 使用sticky实现固定列
export const getFixedCellStyle = ({column, fixedLeftColumns = [], fixedRightColumns = []}) => {
  let cellInfo = getFixedCellInfo({column, fixedLeftColumns, fixedRightColumns});
  const {isSticky, fixLeft, fixRight} = cellInfo;
  return {
    zIndex: isSticky ? 2 : undefined,
    position: isSticky ? 'sticky' : undefined,
    left: fixLeft,
    right: fixRight,
  };
};
