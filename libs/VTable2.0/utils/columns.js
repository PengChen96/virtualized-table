

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
