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
 * @param {Number} clientWidth 列表展示宽度 去掉滚动条的
 * @returns {Object} {columns, hasFixed}
 */
export const getSelfAdaptionColumns = ({columns, clientWidth}) => {
  let hasFixed = true;
  let cloneColumns = deepClone(columns);
  const allColumnsWidth = getColumnsWidth(columns);
  // const scrollBarWidth = getScrollBarWidth();
  if (clientWidth > allColumnsWidth) {
    const columnsLen = cloneColumns.length;
    const absentAllWidth = clientWidth - allColumnsWidth;
    // 取余  余数向下取整
    const remainder = Math.floor(absentAllWidth % columnsLen);
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

/**
 * 获取滚动条宽度
 * @returns {Number} width
 */
export const getScrollBarWidth = () => {
  let odiv = document.createElement('div');//创建一个div
  let styles = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll'//让他有滚动条
  };
  for (let i in styles) odiv.style[i] = styles[i];
  document.body.appendChild(odiv);//把div添加到body中
  let scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//相减
  odiv.remove();//移除创建的div
  return scrollbarWidth;//返回滚动条宽度
};

/**
 * 扁平化列
 */
export const flattenColumns = (
  {
    columns,
    childrenField = 'children'
  }
) => {
  const newColumns = [];
  const level = [];
  const flatten = (_columns, index = 0) => {
    level[index] = true;
    index += 1;
    _columns.forEach((column) => {
      const childColumns = column[childrenField];
      if (childColumns && childColumns.length > 0) {
        flatten(childColumns, index);
      } else {
        newColumns.push(column);
      }
    });
  };
  flatten(columns);
  return {
    level: level.length,
    columns: newColumns
  };
};
/**
 * 获取表头二维数组
 */
export const getHeader2dArray = ({
                                   columns,
                                   flatColumns,
                                   headerLevel,
                                   childrenField = 'children'
                                 }) => {
  const arr = [];
  const merges = [];
  const getKey = (colIndex) => {
    const column = flatColumns[colIndex] || {};
    return column.key || column.dataIndex;
  };
  const deal = (_columns, startCol = 0, rowLevel = 0) => {
    _columns.reduce((prevCol, currentColumn) => {
      if (!arr[rowLevel]) {
        arr[rowLevel] = {};
      }
      arr[rowLevel][getKey(prevCol)] = currentColumn.title;
      let nextCol = prevCol;
      const childColumns = currentColumn[childrenField];
      if (childColumns) {
        deal(childColumns, prevCol, rowLevel + 1);
        const {columns: flatChildColumns} = flattenColumns({columns: childColumns, childrenField});
        nextCol += flatChildColumns.length;
        merges.push({
          s: {c: prevCol, r: rowLevel},
          e: {c: nextCol - 1, r: rowLevel},
        });
        // 补全值 跨行的值
        for (let c = prevCol + 1; c < nextCol; c++) {
          arr[rowLevel][getKey(c)] = currentColumn.title;
        }
      } else {
        nextCol += 1;
        // 有跨列
        if (headerLevel - 1 - rowLevel > 0) {
          merges.push({
            s: {c: prevCol, r: rowLevel},
            e: {c: prevCol, r: headerLevel - 1},
          });
          // 补全值 跨列的值
          for (let r = rowLevel + 1; r < headerLevel; r++) {
            if (!arr[r]) {
              arr[r] = {};
            }
            arr[r][getKey(prevCol)] = currentColumn.title;
          }
        }
      }
      return nextCol;
    }, startCol);
  };
  deal(columns);
  return {
    data: arr,
    merges,
  };
};
