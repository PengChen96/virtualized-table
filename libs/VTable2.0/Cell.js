
import React from 'react';
import PropTypes from 'prop-types';

// class Cell extends React.PureComponent {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const {
//       children,
//       //
//       cellKey,
//       className,
//       display,
//       width,
//       minRowHeight,
//       cellFixedShadow,
//       bordered,
//       align,
//       columnStyle,
//       cellFixedStyle
//     } = this.props;
//     return <div
//       key={cellKey}
//       data-key={cellKey}
//       className={`vt-grid-cell ${cellFixedShadow} ${bordered} ${align} ${className}`}
//       // onClick={(e) => __onCellTap(e,
//       //   value,
//       //   row, rowIndex, realRowIndex,
//       //   column, columnIndex, realColumnIndex
//       // )}
//       style={{
//         width: width,
//         minWidth: width,
//         minHeight: minRowHeight,
//         display: display,
//         ...columnStyle,
//         ...cellFixedStyle
//       }}
//     >
//       {children}
//     </div>;
//   }
// }
const Cell = (props) => {
  const {
    children,
    //
    cellKey,
    className,
    display,
    width,
    minRowHeight,
    cellFixedShadow,
    bordered,
    align,
    columnStyle,
    cellFixedStyle
  } = props;
  return <div
    key={cellKey}
    data-key={cellKey}
    className={`vt-grid-cell ${cellFixedShadow} ${bordered} ${align} ${className}`}
    // onClick={(e) => __onCellTap(e,
    //   value,
    //   row, rowIndex, realRowIndex,
    //   column, columnIndex, realColumnIndex
    // )}
    style={{
      width: width,
      minWidth: width,
      minHeight: minRowHeight,
      display: display,
      ...columnStyle,
      ...cellFixedStyle
    }}
  >
    {children}
  </div>;
};

Cell.propTypes = {
  children: PropTypes.element,
  //
  cellKey: PropTypes.string,
  display: PropTypes.string,
  width: PropTypes.number,
  minRowHeight: PropTypes.number,
  cellFixedShadow: PropTypes.string,
  bordered: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string,
  columnStyle: PropTypes.object,
  cellFixedStyle: PropTypes.object
};
export default React.memo(Cell);

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
