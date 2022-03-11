
// cell bordered
const getCellBordered = ({type, isSticky, headerBordered, bordered}) => {
  // 是否显示边框
  let _bordered = type === 'header' ? (headerBordered || bordered) : bordered;
  const noLastChildBorderRight = isSticky ? 'vt-has-last-child-border-right' : 'vt-no-last-child-border-right';
  _bordered = `vt-default-bordered ${_bordered ? 'vt-bordered-right' : ''} ${noLastChildBorderRight}`;
  return _bordered;
};
// cell align
const ALIGN_TYPE = {
  left: 'vt-align-left',
  right: 'vt-align-right',
  center: 'vt-align-center',
};
const getCellAlign = ({type, column}) => {
  let headerAlign = ALIGN_TYPE[column.headerAlign] || ALIGN_TYPE.center;
  let bodyAlign = ALIGN_TYPE[column.align] || ALIGN_TYPE.left;
  let align = type === 'header' ? headerAlign : bodyAlign;
  return align;
};
export {
  getCellBordered,
  getCellAlign
};
