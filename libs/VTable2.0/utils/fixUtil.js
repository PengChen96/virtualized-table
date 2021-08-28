import {getColumnsWidth} from './columns';
import {deepClone} from './deepClone';

/**
 * 格式化 左侧固定列
 * @param {Array} fixedLeftColumns 左侧列
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
 * @param {Array} fixedRightColumns 右侧列
 * @param {Number} columnsLength 全部列长度
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
 * @param {Object} column 单列对象
 * @param {Array} fixedLeftColumns 左侧列
 * @param {Array} fixedRightColumns 右侧列
 * @return {Object}
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

/**
 * cell fixed shadow
 * @param {Object} cellInfo 单元格信息
 * @return {String}
 */
export const getCellFixedShadow = ({cellInfo}) => {
  const {lastFixLeft, firstFixRight} = cellInfo;
  const lastFixLeftShadow = lastFixLeft ? 'vt-cell-fix-left-last' : '';
  const firstFixRightShadow = firstFixRight ? 'vt-cell-fix-right-first' : '';
  return `${lastFixLeftShadow} ${firstFixRightShadow}`;
};

/**
 * 使用sticky实现固定列
 * @param {Object} cellInfo 单元格信息
 * @return {Object}
 */
export const getFixedCellStyle = ({cellInfo}) => {
  const {isSticky, fixLeft, fixRight} = cellInfo;
  return {
    zIndex: isSticky ? 2 : undefined,
    position: isSticky ? 'sticky' : undefined,
    left: fixLeft,
    right: fixRight,
  };
};
