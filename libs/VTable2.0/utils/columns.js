import {deepClone} from './deepClone';


/**
 * 获取columns的总宽度
 * @param {Array} columns 列
 * @returns {Number} width
 */
export const getColumnsWidth = (columns = []) => {

  let width = 0;
  columns.forEach((item) => {
    width += item.width;
  });

  return width;

};

/**
 * 自适应宽度
 * @param {Array} columns 列
 * @param {Number} offsetWidth 列表展示宽度
 * @returns {Object} {columns, hasFixed}
 */
export const getSelfAdaptionColumns = ({columns, offsetWidth}) => {
  let hasFixed = true;
  let cloneColumns = deepClone(columns);
  const allColumnsWidth = getColumnsWidth(columns);
  if (offsetWidth > allColumnsWidth) {
    const columnsLen = cloneColumns.length;
    const absentAllWidth = offsetWidth - allColumnsWidth;
    // 取余
    const remainder = absentAllWidth % columnsLen;
    // 向下取整
    const absentItemColumnWidth = Math.floor(absentAllWidth / columnsLen);
    cloneColumns = cloneColumns.map((item, index) => {
      item.width += absentItemColumnWidth;
      if (index < remainder) {
        item.width += 1;
      }
      return item;
    });
    hasFixed = false;
  } else {
    hasFixed = true;
  }
  return {
    columns: cloneColumns,
    hasFixed
  };
};
