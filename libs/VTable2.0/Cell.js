
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
