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
  const scrollBarWidth = getScrollBarWidth();
  const _offsetWidth = offsetWidth - scrollBarWidth;
  if (_offsetWidth > allColumnsWidth) {
    const columnsLen = cloneColumns.length;
    const absentAllWidth = _offsetWidth - allColumnsWidth;
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
