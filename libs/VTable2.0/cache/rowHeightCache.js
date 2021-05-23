
const rowsHeightCache = {
  rowsHeight: []
};
let cacheId = 0;
export const setRowHeightCache = ({startRowIndex, endRowIndex, rowHeightArr}) => {
  const key = `rows_${startRowIndex}_${endRowIndex}`;
  rowsHeightCache[key] = rowHeightArr;
  cacheId += 1;
  return cacheId;
};

export const isRowsHeightCached = ({startRowIndex, endRowIndex, rowHeightArr}) => {
  const key = `rows_${startRowIndex}_${endRowIndex}`;
  const rowHeightCacheArr = rowsHeightCache[key] || [];
  const cached = rowHeightCacheArr.join() === rowHeightArr.join();
  return cached;
};

export const getRowHeightArr = ({startRowIndex, endRowIndex}) => {
  const key = `rows_${startRowIndex}_${endRowIndex}`;
  let rowHeightArr = rowsHeightCache[key] || [];
  return rowHeightArr;
};

export {rowsHeightCache};
