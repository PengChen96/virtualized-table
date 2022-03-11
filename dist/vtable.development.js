module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./libs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./libs/VTable2.0/Grid.js":
/*!********************************!*\
  !*** ./libs/VTable2.0/Grid.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_gridCell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/gridCell */ "./libs/VTable2.0/utils/gridCell.js");
/* harmony import */ var _utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/fixUtil */ "./libs/VTable2.0/utils/fixUtil.js");
/* harmony import */ var _styles_grid_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/grid.less */ "./libs/VTable2.0/styles/grid.less");
/* harmony import */ var _styles_grid_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_grid_less__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_gridScrollInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/gridScrollInfo */ "./libs/VTable2.0/utils/gridScrollInfo.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./libs/VTable2.0/utils/index.js");
/* harmony import */ var _utils_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/base */ "./libs/VTable2.0/utils/base.js");
/* harmony import */ var _context_VTableContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./context/VTableContext */ "./libs/VTable2.0/context/VTableContext.js");
/* harmony import */ var _utils_rowKey__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/rowKey */ "./libs/VTable2.0/utils/rowKey.js");
/* harmony import */ var _utils_deepClone__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/deepClone */ "./libs/VTable2.0/utils/deepClone.js");
/* harmony import */ var _utils_timer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/timer */ "./libs/VTable2.0/utils/timer.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












 // const whyDidYouRender = require('@welldone-software/why-did-you-render');
// whyDidYouRender(React, {
//   trackAllPureComponents: true
// });

var Grid = function Grid(props, ref) {
  // 要向父MultiGrid暴露的
  var gridContainer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, function () {
    return {
      gridContainer: gridContainer.current
    };
  });
  var realGridContainer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var resetIsScrollingTimeoutIdRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var scrollRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({
    gridScrollTop: 0,
    gridScrollLeft: 0
  });

  var _VTableContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_VTableContext__WEBPACK_IMPORTED_MODULE_8__["default"]);

  var isSticky = _VTableContext.isSticky;
  var stateProps = {
    // 固定行高 boolean (需要行合并/分组表头时设置为true)
    fixedRowHeight: props.fixedRowHeight,
    // 列 #
    columns: props.columns || [],
    // 源数据 #
    dataSource: props.dataSource || [],
    // 可视区域高度
    visibleHeight: props.visibleHeight || 400,
    // 一行的高度（预估）
    estimatedRowHeight: props.estimatedRowHeight || 40,
    minRowHeight: props.minRowHeight || 40,
    // 可渲染的元素个数
    rowVisibleCount: props.rowVisibleCount || 20,
    // 上下偏移渲染个数
    rowOffsetCount: props.rowOffsetCount || 10,
    // 可视区域宽度
    visibleWidth: props.visibleWidth || 1200,
    // 预估的每列宽度
    estimatedColumnWidth: props.estimatedColumnWidth || 150,
    // 可渲染个数（水平）
    columnVisibleCount: props.columnVisibleCount || 8,
    // 左右偏移渲染个数
    columnOffsetCount: props.columnOffsetCount || 4,
    fixedLeftColumns: props.fixedLeftColumns || [],
    fixedRightColumns: props.fixedRightColumns || []
  };
  var _props$type = props.type,
      type = _props$type === void 0 ? 'body' : _props$type,
      mgType = props.mgType,
      className = props.className,
      gridStyle = props.gridStyle,
      shouldRowHeightSync = props.shouldRowHeightSync,
      rowKey = props.rowKey,
      _props$rowSelection = props.rowSelection,
      rowSelection = _props$rowSelection === void 0 ? {} : _props$rowSelection,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      onRow = props.onRow,
      headerBordered = props.headerBordered,
      bordered = props.bordered,
      onScrollTopSync = props.onScrollTopSync,
      onCellTap = props.onCellTap;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    // 虚拟列
    virtualColumns: [],
    // 虚拟数据
    virtualData: [],
    // 可视区坐标（rowIndex垂直）
    startRowIndex: 0,
    endRowIndex: 0,
    // 可视区坐标（columnIndex水平）
    startColumnIndex: 0,
    endColumnIndex: 0,
    // padding偏移量(垂直)
    startVerticalOffset: 0,
    endVerticalOffset: 0,
    // padding偏移量(水平)
    startHorizontalOffset: 0,
    endHorizontalOffset: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      grid = _useState2[0],
      setGrid = _useState2[1]; // 真实展示的列


  var displayedColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return [].concat(_toConsumableArray(stateProps.fixedLeftColumns), _toConsumableArray(grid.virtualColumns), _toConsumableArray(stateProps.fixedRightColumns));
  }, [stateProps.fixedLeftColumns, grid.virtualColumns, stateProps.fixedRightColumns]);
  var displayedFooterColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var columns = displayedColumns;

    if (displayedColumns.length > 0 && displayedColumns[0].type === 'checkBox') {
      columns = Object(_utils_deepClone__WEBPACK_IMPORTED_MODULE_10__["deepClone"])(displayedColumns);
      columns[0].render = null;
    }

    return columns;
  }, [displayedColumns]); //

  var Components = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      header: {
        row: components.header && components.header.row || 'div',
        cell: components.header && components.header.cell || 'div'
      },
      body: {
        row: components.body && components.body.row || 'div',
        cell: components.body && components.body.cell || 'div'
      },
      footer: {
        row: components.footer && components.footer.row || 'div',
        cell: components.footer && components.footer.cell || 'div'
      }
    };
  }, [components]); // 更新grid信息

  var updateGrid = function updateGrid(partialState) {
    setGrid(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), partialState);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    _onScrollEvent(true); //


    if (type === 'body' && mgType === 'mainMultiGrid') {
      setTimeout(function () {
        _VTableContext.getBodyScrollBarWidth({
          ref: gridContainer
        });
      }, 0);
    }
  }, [stateProps.dataSource, stateProps.columns]);
  /**
   * 滚动事件
   * @param {Boolean} didMount 是否didMount阶段执行
   * @private
   */

  var _onScrollEvent = function _onScrollEvent(didMount) {
    // window.requestAnimationFrame(() => {
    // 垂直方向滚动
    _onVerticalScroll(didMount); // 水平方向滚动


    _onHorizontalScroll(didMount); // });

  };
  /**
   * 垂直方向滚动
   * @param {Boolean} didMount 是否didMount阶段执行
   * @private
   */


  var _onVerticalScroll = function _onVerticalScroll(didMount) {
    var scrollTop = gridContainer.current.scrollTop;
    var gridScrollTop = scrollRef.current.gridScrollTop;
    var doUpdate = Math.abs(scrollTop - gridScrollTop) > 40;

    if (didMount || doUpdate) {
      scrollRef.current.gridScrollTop = scrollTop;
      var dataSource = stateProps.dataSource,
          estimatedRowHeight = stateProps.estimatedRowHeight,
          rowOffsetCount = stateProps.rowOffsetCount,
          rowVisibleCount = stateProps.rowVisibleCount; // 当前scrollTop

      var gridInfo = Object(_utils_gridScrollInfo__WEBPACK_IMPORTED_MODULE_5__["getRealGridVerticalScrollInfo"])({
        scrollTop: scrollTop,
        dataSource: dataSource,
        estimatedRowHeight: estimatedRowHeight,
        rowOffsetCount: rowOffsetCount,
        rowVisibleCount: rowVisibleCount
      }); // 更新渲染

      updateGrid(gridInfo);
    }
  };
  /**
   * 水平方向滚动
   * @param {Boolean} didMount 是否didMount阶段执行
   * @private
   */


  var _onHorizontalScroll = function _onHorizontalScroll(didMount) {
    var scrollLeft = gridContainer.current.scrollLeft;
    var gridScrollLeft = scrollRef.current.gridScrollLeft;
    var doUpdate = Math.abs(scrollLeft - gridScrollLeft) > 80;

    if (didMount || doUpdate) {
      scrollRef.current.gridScrollLeft = scrollLeft;
      var dataSource = stateProps.dataSource,
          columns = stateProps.columns,
          estimatedColumnWidth = stateProps.estimatedColumnWidth,
          columnOffsetCount = stateProps.columnOffsetCount,
          columnVisibleCount = stateProps.columnVisibleCount; // 当前scrollLeft

      var gridInfo = Object(_utils_gridScrollInfo__WEBPACK_IMPORTED_MODULE_5__["getRealGridHorizontalScrollInfo"])({
        scrollLeft: scrollLeft,
        dataSource: dataSource,
        columns: columns,
        estimatedColumnWidth: estimatedColumnWidth,
        columnOffsetCount: columnOffsetCount,
        columnVisibleCount: columnVisibleCount
      }); // 更新渲染

      updateGrid(gridInfo);
    }
  };
  /**
   * 获取单元格合并列信息
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Number} realRowIndex 真实的行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {Number} realColumnIndex 真实的列坐标
   * @param {Number} colSpan 跨列
   * @param {Number} rowSpan 跨行
   * @returns {object}
   * @private
   */


  var getCellColRowSpanStyle = function getCellColRowSpanStyle(_ref) {
    var row = _ref.row,
        rowIndex = _ref.rowIndex,
        realRowIndex = _ref.realRowIndex,
        column = _ref.column,
        columnIndex = _ref.columnIndex,
        realColumnIndex = _ref.realColumnIndex,
        colSpan = _ref.colSpan,
        rowSpan = _ref.rowSpan,
        type = _ref.type;
    colSpan = colSpan === 0 ? 0 : Number(colSpan || 1);
    rowSpan = rowSpan === 0 ? 0 : Number(rowSpan || 1);
    var columns = stateProps.columns,
        estimatedColumnWidth = stateProps.estimatedColumnWidth,
        minRowHeight = stateProps.minRowHeight; // 获取宽/高

    var height = rowSpan * minRowHeight;
    var width = column.width || estimatedColumnWidth;
    var rowMergeColumns = columns.slice(realColumnIndex, realColumnIndex + colSpan);

    if (rowMergeColumns.length > 1) {
      width = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getColumnsWidth"])(rowMergeColumns);
    } // 该行设置colSpan=0，直接隐藏，就不设置width=0了； 不隐藏设置width=0，会显示border和value，有问题


    var display = colSpan === 0 ? 'none' : 'flex'; // 如果虚拟列的第一列是合并导致隐藏的，需要让它占个位置，不然这行会错位
    // 如果是尾部列不用考虑这个问题

    var vFirstColumn = grid.virtualColumns[0] || {};
    var vFirstColumnRender = type === 'header' ? vFirstColumn._headerCellProps : vFirstColumn.render;

    if (vFirstColumnRender) {
      var vFirstValue = row[vFirstColumn['key'] || vFirstColumn['dataIndex']];
      var vFirstRealColumnsIndex = grid.startColumnIndex;
      var vFirstRenderData = vFirstColumnRender(vFirstValue, row, rowIndex, realRowIndex, vFirstColumn, 0, vFirstRealColumnsIndex);

      if (Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["isRenderCellObj"])(vFirstRenderData)) {
        var vFirstCellProps = type === 'header' ? vFirstRenderData : vFirstRenderData.props || {};

        if (vFirstCellProps.colSpan === 0) {
          // 截取第一列到当前列
          var startVirtualColumns = grid.virtualColumns.slice(0, columnIndex + 1); // 过滤出第一列到当前列display none的列

          var svHiddenColumns = startVirtualColumns.filter(function (svColumn, svColumnIndex) {
            var svColumnRender = type === 'header' ? svColumn._headerCellProps : svColumn.render;

            if (svColumnRender) {
              var svValue = row[svColumn['key'] || svColumn['dataIndex']];
              var svRealColumnIndex = svColumnIndex + vFirstRealColumnsIndex;
              var svRenderData = svColumnRender(svValue, row, rowIndex, realRowIndex, svColumn, svColumnIndex, svRealColumnIndex);

              if (Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["isRenderCellObj"])(svRenderData)) {
                var svCellProps = type === 'header' ? svRenderData : svRenderData.props || {};
                return svCellProps.colSpan === 0;
              }
            }
          }); // 这两个columns相等，说明第一列到当前列全是隐藏到列

          if (startVirtualColumns.length === svHiddenColumns.length) {
            display = 'flex';
          }
        }
      }
    }

    return {
      width: width,
      height: height,
      display: display,
      visibility: rowSpan < 1 ? 'hidden' : undefined // 这个是为了隐藏跨行

    };
  };
  /**
   * 单元格
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {String} type 类型 header|body|footer
   * @returns Element
   * @private
   */


  var _cellRender = function _cellRender(row, rowIndex, column, columnIndex, _ref2) {
    var type = _ref2.type;
    var realRowIndex = rowIndex + grid.startRowIndex;
    var realColumnIndex = column.fixed ? column.realFcIndex : columnIndex + grid.startColumnIndex;
    var value = row[column['key'] || column['dataIndex']];

    var _getCellChildNode2 = _getCellChildNode(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, {
      type: type
    }),
        childNode = _getCellChildNode2.childNode,
        cellProps = _getCellChildNode2.cellProps;

    var colSpan = cellProps.colSpan,
        rowSpan = cellProps.rowSpan; // 获取cell信息

    var _getCellColRowSpanSty = getCellColRowSpanStyle({
      row: row,
      rowIndex: rowIndex,
      realRowIndex: realRowIndex,
      column: column,
      columnIndex: columnIndex,
      realColumnIndex: realColumnIndex,
      colSpan: colSpan,
      rowSpan: rowSpan,
      type: type
    }),
        width = _getCellColRowSpanSty.width,
        height = _getCellColRowSpanSty.height,
        display = _getCellColRowSpanSty.display,
        visibility = _getCellColRowSpanSty.visibility; // 是否显示边框


    var cellBordered = Object(_utils_gridCell__WEBPACK_IMPORTED_MODULE_2__["getCellBordered"])({
      type: type,
      isSticky: isSticky,
      headerBordered: headerBordered,
      bordered: bordered
    }); // 对齐方式 'left' | 'right' | 'center'

    var align = Object(_utils_gridCell__WEBPACK_IMPORTED_MODULE_2__["getCellAlign"])({
      type: type,
      column: column
    }); // 固定列阴影

    var fixedLeftColumns = stateProps.fixedLeftColumns,
        fixedRightColumns = stateProps.fixedRightColumns;
    var cellInfo = Object(_utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__["getFixedCellInfo"])({
      column: column,
      fixedLeftColumns: fixedLeftColumns,
      fixedRightColumns: fixedRightColumns
    });
    var cellFixedShadow = Object(_utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__["getCellFixedShadow"])({
      cellInfo: cellInfo
    });
    var cellFixedStyle = Object(_utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__["getFixedCellStyle"])({
      cellInfo: cellInfo
    }); // className

    var _column$className = column.className,
        className = _column$className === void 0 ? '' : _column$className; // 有要重写对应header|body|footer的cell

    var CellComponent = Components[type].cell; // {width, onResize}

    var defaultCellProps = typeof column.onCell === 'function' ? column.onCell(column, realRowIndex) : {};
    var cellPropsMap = {
      header: Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(column.onHeaderCell, 'Function') ? column.onHeaderCell(column, realRowIndex) : undefined,
      body: Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(column.onBodyCell, 'Function') ? column.onBodyCell(column, realRowIndex) : undefined,
      footer: Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(column.onFooterCell, 'Function') ? column.onFooterCell(column, realRowIndex) : undefined
    };
    var additionalCellProps = cellPropsMap[type] || defaultCellProps;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CellComponent, _extends({}, additionalCellProps, {
      key: "cell_".concat(realRowIndex, "_").concat(realColumnIndex),
      "data-key": "cell_".concat(realRowIndex, "_").concat(realColumnIndex),
      className: "vt-grid-cell ".concat(cellFixedShadow, " ").concat(cellBordered, " ").concat(align, " ").concat(className),
      onClick: function onClick(e) {
        return __onCellTap(e, value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
      },
      colSpan: colSpan,
      rowSpan: rowSpan,
      style: _objectSpread(_objectSpread({
        width: width,
        minWidth: width,
        minHeight: stateProps.minRowHeight,
        height: stateProps.fixedRowHeight ? height : undefined,
        display: display,
        visibility: visibility
      }, column.style), cellFixedStyle)
    }), column.ellipsis ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: 'vt-ellipsis',
      title: value
    }, childNode) : childNode);
  };
  /**
   * 获取单元格渲染信息
   * @param {String} value 值
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Number} realRowIndex 真实的行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {Number} realColumnIndex 真实的列坐标
   * @param {String} type 类型 header|body|footer
   * @returns {{cellProps: {}, childNode: null}}
   * @private
   */


  var _getCellChildNode = function _getCellChildNode(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex, _ref3) {
    var type = _ref3.type;
    var cellProps = {};
    var childNode = value;

    if (type === 'header') {
      if (column.headRender) {
        // TODO 后续废弃
        childNode = Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(column.headRender, 'Function') ? column.headRender(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) : value;
      }

      if (Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(column.title, 'Function')) {
        childNode = column.title(value, row, rowIndex);
      }

      if (Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(column._headerCellProps, 'Function')) {
        cellProps = column._headerCellProps(value, row, rowIndex);
      }
    } else {
      if (column.render) {
        var renderData = column.render(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);

        if (Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["isRenderCellObj"])(renderData)) {
          childNode = renderData.children;
          cellProps = renderData.props || {};
        } else {
          childNode = renderData;
        }
      }
    } // Not crash if final `childNode` is not validate ReactNode


    if (Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["sameType"])(childNode, 'Object') && !react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(childNode)) {
      childNode = null;
    }

    return {
      childNode: childNode,
      cellProps: cellProps
    };
  };
  /**
   * 点击单元格函数
   * @param {Event} e
   * @param {String} value 值
   * @param {Object} row 行信息
   * @param {Number} rowIndex 可视行坐标
   * @param {Number} realRowIndex 真实的行坐标
   * @param {Object} column 列信息
   * @param {Number} columnIndex 可视列坐标
   * @param {Number} realColumnIndex 真实的列坐标
   * @private
   */


  var __onCellTap = function __onCellTap(e, value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) {
    e.preventDefault();

    if (typeof onCellTap === 'function') {
      onCellTap(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex);
    }
  }; // 移入行  新增class vt-grid-row-hover


  var __onMouseEnter = function __onMouseEnter(_ref4) {
    var type = _ref4.type,
        rowKey = _ref4.rowKey;

    // sticky不需要下面方法，直接css：hover就能支持
    if (type === 'body' && !isSticky) {
      // 使用这种方式，减少hover时的重新渲染
      try {
        var scopeDOM = document.querySelectorAll('div.vt-grid-row');
        var rowsCollection = Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["queryCustomAttributeDOM"])(scopeDOM, 'data-key', "row_".concat(rowKey));
        rowsCollection.forEach(function (rowDom) {
          var className = rowDom.getAttribute('class') + ' vt-grid-row-hover';
          rowDom.setAttribute('class', className);
        });
      } catch (e) {
        console.warn(e);
      }
    }
  }; // 移出行 移除class vt-grid-row-hover


  var __onMouseLeave = function __onMouseLeave(_ref5) {
    var type = _ref5.type,
        rowKey = _ref5.rowKey;

    if (type === 'body' && !isSticky) {
      try {
        var scopeDOM = document.querySelectorAll('div.vt-grid-row');
        var rowsCollection = Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["queryCustomAttributeDOM"])(scopeDOM, 'data-key', "row_".concat(rowKey));
        rowsCollection.forEach(function (rowDom) {
          var className = rowDom.getAttribute('class').replace(' vt-grid-row-hover', '');
          rowDom.setAttribute('class', className);
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };
  /**
   * 获取同步固定列的行高
   * @param {String} type 类型 header|body|footer
   * @param {Number} rowIndex 可视行坐标
   * @return height
   */


  function getRowHeight(_ref6) {
    var type = _ref6.type,
        rowIndex = _ref6.rowIndex;
    var height = undefined;

    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && mgType !== 'mainMultiGrid') {
      var _props$rowsHeightArr = props.rowsHeightArr,
          rowsHeightArr = _props$rowsHeightArr === void 0 ? [] : _props$rowsHeightArr;
      height = rowsHeightArr[rowIndex];
    }

    if (type === 'footer') {
      height = stateProps.minRowHeight;
    }

    return height;
  }

  ;
  /**
   * 行
   * @param {Object} row 行数据
   * @param {Number} rowIndex 可视行坐标
   * @param {String} type 类型 header|body|footer
   * @param {Array} displayedFooterColumns footer列 []
   * @return Element
   */

  var _gridRowRender = function _gridRowRender(row, rowIndex, _ref7) {
    var type = _ref7.type,
        displayedFooterColumns = _ref7.displayedFooterColumns;
    var realRowIndex = rowIndex + grid.startRowIndex; // 是否选中

    var _rowSelection$selecte = rowSelection.selectedRowKeys,
        selectedRowKeys = _rowSelection$selecte === void 0 ? [] : _rowSelection$selecte;

    var _rowKey = Object(_utils_rowKey__WEBPACK_IMPORTED_MODULE_9__["getRowKey"])(rowKey, row, realRowIndex);

    var selected = selectedRowKeys.includes(_rowKey); // isSticky:true时设置

    var height = stateProps.fixedRowHeight ? stateProps.minRowHeight : getRowHeight({
      type: type,
      rowIndex: rowIndex
    }); // 有要重写对应header|body|footer的row

    var RowComponent = Components[type].row; // {index, moveRow}

    var additionalRowProps = typeof onRow === 'function' ? onRow(row, realRowIndex) : {};
    var mouseEvent = {
      onMouseEnter: function onMouseEnter(event) {
        __onMouseEnter({
          type: type,
          rowKey: _rowKey
        });

        if (additionalRowProps.onMouseEnter) {
          additionalRowProps.onMouseEnter(event);
        }
      },
      onMouseLeave: function onMouseLeave(event) {
        __onMouseLeave({
          type: type,
          rowKey: _rowKey
        });

        if (additionalRowProps.onMouseLeave) {
          additionalRowProps.onMouseLeave(event);
        }
      }
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RowComponent, _extends({}, additionalRowProps, mouseEvent, {
      key: "row_".concat(_rowKey),
      "data-key": "row_".concat(_rowKey),
      className: Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["classNames"])('vt-grid-row', {
        'vt-grid-row-selected': selected
      }),
      style: {
        height: height,
        contain: stateProps.fixedRowHeight ? 'none' : '' // height: stateProps.estimatedRowHeight,
        // width: stateProps.visibleWidth

      }
    }), // footer不展示勾选框
    (displayedFooterColumns || displayedColumns).map(function (column, columnIndex) {
      return _cellRender(row, rowIndex, column, columnIndex, {
        type: type
      });
    }));
  };

  var onScrollCapture = function onScrollCapture(e) {
    if (!_VTableContext.isSticky && mgType === 'mainMultiGrid') _VTableContext.onScroll(e);
    if (type === 'body' && onScrollTopSync) onScrollTopSync(e);

    _onScrollEvent(); // 设置元素不对指针事件做出反应


    realGridContainer.current.style.pointerEvents = 'none';

    _resetIsScrollingDebounced();
  };

  var _resetIsScrollingDebounced = function _resetIsScrollingDebounced() {
    if (resetIsScrollingTimeoutIdRef.current !== null) {
      Object(_utils_timer__WEBPACK_IMPORTED_MODULE_11__["cancelTimeout"])(resetIsScrollingTimeoutIdRef.current);
    }

    resetIsScrollingTimeoutIdRef.current = Object(_utils_timer__WEBPACK_IMPORTED_MODULE_11__["requestTimeout"])(_resetIsScrolling, 150);
  };

  var _resetIsScrolling = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    resetIsScrollingTimeoutIdRef.current = null;
    realGridContainer.current.style.pointerEvents = ''; // if (type === 'body' &&  props.syncRowHeight) props.syncRowHeight('setState');
  }, []);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(_utils_base__WEBPACK_IMPORTED_MODULE_7__["classNames"])('vt-grid-container', className),
    ref: gridContainer,
    onScrollCapture: onScrollCapture,
    style: _objectSpread({
      height: stateProps.visibleHeight
    }, gridStyle || {})
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: realGridContainer,
    style: {
      willChange: 'transform',
      // pointerEvents: 'none',
      // transform: `translateY(${grid.startVerticalOffset}px)`,
      paddingTop: grid.startVerticalOffset,
      paddingBottom: grid.endVerticalOffset,
      paddingLeft: grid.startHorizontalOffset,
      paddingRight: grid.endHorizontalOffset
    }
  }, // sticky header
  _VTableContext.isSticky && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vt-table-header vt-header-sticky"
  }, _VTableContext.headerTitle.map(function (row, rowIndex) {
    // 行渲染
    return _gridRowRender(row, rowIndex, {
      type: 'header'
    });
  })), grid.virtualData.map(function (row, rowIndex) {
    // 行渲染
    return _gridRowRender(row, rowIndex, {
      type: type
    });
  }), // sticky footer
  _VTableContext.isSticky && _VTableContext.summaryData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vt-table-footer vt-footer-sticky"
  }, _VTableContext.summaryData.map(function (row, rowIndex) {
    // 行渲染
    return _gridRowRender(row, rowIndex, {
      type: 'footer',
      displayedFooterColumns: displayedFooterColumns
    });
  })))));
};

Grid.propTypes = {
  columns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  visibleWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  visibleHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  estimatedRowHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  minRowHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  rowVisibleCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  rowOffsetCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  estimatedColumnWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  columnVisibleCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  columnOffsetCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  fixedRowHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  fixedLeftColumns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  fixedRightColumns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  // 类型 header
  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  mgType: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  // .vt-grid-container 样式
  gridStyle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  shouldRowHeightSync: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  headerBordered: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  bordered: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  rowKey: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  components: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onRow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onScrollTopSync: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onCellTap: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
}; // Grid.whyDidYouRender = true;

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(Grid)));

/***/ }),

/***/ "./libs/VTable2.0/MultiGrid.js":
/*!*************************************!*\
  !*** ./libs/VTable2.0/MultiGrid.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Grid */ "./libs/VTable2.0/Grid.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/fixUtil */ "./libs/VTable2.0/utils/fixUtil.js");
/* harmony import */ var _utils_deepClone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/deepClone */ "./libs/VTable2.0/utils/deepClone.js");
/* harmony import */ var _utils_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/base */ "./libs/VTable2.0/utils/base.js");
/* harmony import */ var _styles_multi_grid_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/multi-grid.less */ "./libs/VTable2.0/styles/multi-grid.less");
/* harmony import */ var _styles_multi_grid_less__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_multi_grid_less__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _context_VTableContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context/VTableContext */ "./libs/VTable2.0/context/VTableContext.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var MultiGrid = function MultiGrid(props, ref) {
  var _multiGridContainer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null); // 要向父VTable暴露的


  var multiGridContainer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, function () {
    return {
      // multiGridContainer: multiGridContainer.current,
      gridContainer: multiGridContainer.current.gridContainer
    };
  }); //

  var type = props.type,
      mgClassName = props.mgClassName,
      shouldRowHeightSync = props.shouldRowHeightSync,
      columns = props.columns,
      hasFixed = props.hasFixed,
      dataSource = props.dataSource,
      _props$fixedLeftColum = props.fixedLeftColumnCount,
      fixedLeftColumnCount = _props$fixedLeftColum === void 0 ? 0 : _props$fixedLeftColum,
      _props$fixedRightColu = props.fixedRightColumnCount,
      fixedRightColumnCount = _props$fixedRightColu === void 0 ? 0 : _props$fixedRightColu,
      bodyScrollBarWidth = props.bodyScrollBarWidth; //

  var multiGridContainerLeft = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var multiGridContainerRight = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var _VTableContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_VTableContext__WEBPACK_IMPORTED_MODULE_7__["default"]); // let [rowsHeightCacheId, setRowsHeightCacheId] = useState([]);


  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      rowsHeightArr = _useState2[0],
      setRowsHeightArr = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    // 同步固定列的高度
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && hasFixed) {
      var timer = setTimeout(function () {
        // syncRowHeight({forceUpdate: true});
        var current = multiGridContainer.current;

        if (current) {
          current.gridContainer.scrollTop += 1;
          window.requestAnimationFrame(function () {
            current.gridContainer.scrollTop -= 1;
          });
        }

        clearTimeout(timer);
      }, 150);
    }
  }, [columns, dataSource, hasFixed]); // main columns

  var getColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    if (!hasFixed) {
      return columns;
    }

    var end = fixedRightColumnCount ? -fixedRightColumnCount : undefined;
    return fixedLeftColumnCount || fixedRightColumnCount ? Object(_utils_deepClone__WEBPACK_IMPORTED_MODULE_4__["deepClone"])(columns).slice(fixedLeftColumnCount, end) : columns;
  }, [hasFixed, columns, fixedLeftColumnCount, fixedRightColumnCount]); // fixed left columns

  var getFixedLeftColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    if (!hasFixed) {
      return [];
    }

    var fixedLeftColumns = fixedLeftColumnCount ? columns.slice(0, fixedLeftColumnCount) : [];
    return Object(_utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__["formatFixedLeftColumns"])({
      fixedLeftColumns: fixedLeftColumns
    });
  }, [hasFixed, columns, fixedLeftColumnCount]); // fixed right columns

  var getFixedRightColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    if (!hasFixed) {
      return [];
    }

    var fixedRightColumns = fixedRightColumnCount ? columns.slice(-fixedRightColumnCount) : [];
    return Object(_utils_fixUtil__WEBPACK_IMPORTED_MODULE_3__["formatFixedRightColumns"])({
      fixedRightColumns: fixedRightColumns,
      columnsLength: columns.length
    });
  }, [hasFixed, columns, fixedRightColumnCount]); // 未使用sticky的主内容列

  var mainColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return [].concat(_toConsumableArray(getFixedLeftColumns), _toConsumableArray(getColumns), _toConsumableArray(getFixedRightColumns));
  }, [getFixedLeftColumns, getColumns, getFixedRightColumns]); //

  var onScrollTopSync = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    var scrollTop = e && e.target && e.target.scrollTop; // window.requestAnimationFrame(() => {

    var leftCurrent = multiGridContainerLeft.current;
    var rightCurrent = multiGridContainerRight.current; //

    if (leftCurrent) {
      e.preventDefault();
      leftCurrent.gridContainer.scrollTop = scrollTop;
    }

    if (rightCurrent) {
      e.preventDefault();
      rightCurrent.gridContainer.scrollTop = scrollTop;
    } // });


    syncRowHeight('setState');
  }, []); // no isSticky

  var syncRowHeight = function syncRowHeight() {
    var syncType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'setDomStyle';

    // 同步固定列的高度
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && hasFixed) {
      var multiGridCurrent = multiGridContainer.current;
      var gridRowCollection = multiGridCurrent.gridContainer.querySelectorAll('.vt-grid-row'); // if (syncType === 'setDomStyle') {
      //   const multiGridContainerLeftCurrent = multiGridContainerLeft.current;
      //   const multiGridContainerRightCurrent = multiGridContainerRight.current;
      //   gridRowCollection.forEach((gridRowDom) => {
      //     const dataKey = gridRowDom.getAttribute('data-key');
      //     const leftRowDom = multiGridContainerLeftCurrent && multiGridContainerLeftCurrent.gridContainer.querySelector(`[data-key=${dataKey}]`);
      //     if (leftRowDom) leftRowDom.style.height = gridRowDom.clientHeight + 'px';
      //
      //     const rightRowDom = multiGridContainerRightCurrent && multiGridContainerRightCurrent.gridContainer.querySelector(`[data-key=${dataKey}]`);
      //     if (rightRowDom) rightRowDom.style.height = gridRowDom.clientHeight + 'px';
      //   });
      // }

      if (syncType === 'setState') {
        var gridRowHeightArr = Array.prototype.slice.call(gridRowCollection).map(function (item) {
          return item.clientHeight;
        });
        setRowsHeightArr(gridRowHeightArr);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(_utils_base__WEBPACK_IMPORTED_MODULE_5__["classNames"])('vt-multi-grid-container', mgClassName),
    ref: _multiGridContainer
  }, _VTableContext.isSticky ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, props, {
    ref: multiGridContainer // 加这个key是因为固定列变化 列数据多渲染一列 todo 原因
    ,
    key: "".concat(fixedLeftColumnCount, "_").concat(fixedRightColumnCount, "_").concat(hasFixed),
    columns: getColumns,
    fixedLeftColumns: getFixedLeftColumns,
    fixedRightColumns: getFixedRightColumns // 这里加mgType是为了getBodyScrollBarWidth
    ,
    mgType: 'mainMultiGrid'
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, props, {
    ref: multiGridContainer,
    columns: mainColumns,
    fixedLeftColumns: [],
    fixedRightColumns: [],
    mgType: 'mainMultiGrid',
    onScrollTopSync: onScrollTopSync // syncRowHeight={syncRowHeight}

  })), getFixedLeftColumns.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vt-multi-grid-fixed-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, props, {
    ref: multiGridContainerLeft,
    columns: getFixedLeftColumns,
    fixedLeftColumns: [],
    fixedRightColumns: [],
    rowsHeightArr: rowsHeightArr,
    mgType: 'leftMultiGrid',
    gridStyle: {
      marginBottom: type === 'body' ? -bodyScrollBarWidth : undefined
    }
  }))) : null, getFixedRightColumns.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vt-multi-grid-fixed-right",
    style: {
      marginRight: type === 'body' ? bodyScrollBarWidth : undefined
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, props, {
    ref: multiGridContainerRight,
    columns: getFixedRightColumns,
    fixedLeftColumns: [],
    fixedRightColumns: [],
    rowsHeightArr: rowsHeightArr,
    mgType: 'rightMultiGrid',
    gridStyle: {
      marginBottom: type === 'body' ? -bodyScrollBarWidth : undefined
    }
  }))) : null)));
};

MultiGrid.propTypes = {
  // 类型 header
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  mgClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  shouldRowHeightSync: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  hasFixed: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  fixedLeftColumnCount: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  fixedRightColumnCount: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  bodyScrollBarWidth: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(MultiGrid)));

/***/ }),

/***/ "./libs/VTable2.0/VTable.js":
/*!**********************************!*\
  !*** ./libs/VTable2.0/VTable.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_VTableContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context/VTableContext */ "./libs/VTable2.0/context/VTableContext.js");
/* harmony import */ var _MultiGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MultiGrid */ "./libs/VTable2.0/MultiGrid.js");
/* harmony import */ var _utils_isSupportSticky__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/isSupportSticky */ "./libs/VTable2.0/utils/isSupportSticky.js");
/* harmony import */ var _utils_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/base */ "./libs/VTable2.0/utils/base.js");
/* harmony import */ var _utils_columns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/columns */ "./libs/VTable2.0/utils/columns.js");
/* harmony import */ var _utils_rowKey__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/rowKey */ "./libs/VTable2.0/utils/rowKey.js");
/* harmony import */ var _utils_deepClone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/deepClone */ "./libs/VTable2.0/utils/deepClone.js");
/* harmony import */ var _utils_colSpanRowSpan__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/colSpanRowSpan */ "./libs/VTable2.0/utils/colSpanRowSpan.js");
/* harmony import */ var _styles_vtable_less__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles/vtable.less */ "./libs/VTable2.0/styles/vtable.less");
/* harmony import */ var _styles_vtable_less__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_vtable_less__WEBPACK_IMPORTED_MODULE_10__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var VTable = function VTable(props) {
  var vtable = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var vtHeader = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var vtBody = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var vtFooter = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var isStickyProps = props.isSticky,
      rowKeyProps = props.rowKey,
      rowSelection = props.rowSelection,
      _props$columns = props.columns,
      columnsProps = _props$columns === void 0 ? [] : _props$columns,
      _props$dataSource = props.dataSource,
      dataSource = _props$dataSource === void 0 ? [] : _props$dataSource,
      summary = props.summary,
      wrapperClassName = props.wrapperClassName,
      visibleHeight = props.visibleHeight,
      _props$rowHeight = props.rowHeight,
      rowHeight = _props$rowHeight === void 0 ? 40 : _props$rowHeight,
      locale = props.locale,
      loading = props.loading;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSticky = _useState2[0],
      setIsSticky = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      _useState4 = _slicedToArray(_useState3, 2),
      bodyScrollBarWidth = _useState4[0],
      setBodyScrollBarWidth = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1),
      _useState6 = _slicedToArray(_useState5, 2),
      headerLevel = _useState6[0],
      setHeaderLevel = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState8 = _slicedToArray(_useState7, 2),
      headerTitle = _useState8[0],
      setHeaderTitle = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(columnsProps),
      _useState10 = _slicedToArray(_useState9, 2),
      columns = _useState10[0],
      setColumns = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState12 = _slicedToArray(_useState11, 2),
      hasFixed = _useState12[0],
      setHasFixed = _useState12[1];

  var summaryData = Object(_utils_base__WEBPACK_IMPORTED_MODULE_5__["sameType"])(summary, 'Function') ? summary() : summary;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var _isSticky = isStickyProps === undefined ? Object(_utils_isSupportSticky__WEBPACK_IMPORTED_MODULE_4__["isSupportSticky"])() : isStickyProps;

    setIsSticky(_isSticky);
  }, [isStickyProps]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (columnsProps.length > 0) {
      reSetColumns();
      window.addEventListener('resize', reSetColumns);
    }

    return function () {
      return window.removeEventListener('resize', reSetColumns);
    };
  }, [columnsProps, bodyScrollBarWidth, rowSelection]); //

  var headerColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var autoColumns = Object(_utils_deepClone__WEBPACK_IMPORTED_MODULE_8__["deepClone"])(columns);
    var scrollBarWidth = bodyScrollBarWidth || 0;

    if (autoColumns.length > 0) {
      autoColumns[autoColumns.length - 1].width = autoColumns[autoColumns.length - 1].width + scrollBarWidth;
    }

    return autoColumns;
  }, [columns]); //

  var footerColumns = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var autoColumns = headerColumns;

    if (headerColumns.length > 0 && headerColumns[0].type === 'checkBox') {
      autoColumns = Object(_utils_deepClone__WEBPACK_IMPORTED_MODULE_8__["deepClone"])(headerColumns);
      autoColumns[0].render = null;
    }

    return autoColumns;
  }, [headerColumns]); // 设置自适应列

  var reSetColumns = function reSetColumns() {
    var offsetWidth = vtable.current.offsetWidth;

    if (rowSelection) {
      var _rowSelection$columnW = rowSelection.columnWidth,
          columnWidth = _rowSelection$columnW === void 0 ? 60 : _rowSelection$columnW;
      offsetWidth = offsetWidth - columnWidth;
    }

    var _flattenColumns = Object(_utils_columns__WEBPACK_IMPORTED_MODULE_6__["flattenColumns"])({
      columns: columnsProps
    }),
        flatColumns = _flattenColumns.columns,
        headerLevel = _flattenColumns.level;

    var scrollBarWidth = bodyScrollBarWidth || 0;
    var clientWidth = offsetWidth - scrollBarWidth;
    var columnsObj = Object(_utils_columns__WEBPACK_IMPORTED_MODULE_6__["getSelfAdaptionColumns"])({
      columns: flatColumns,
      clientWidth: clientWidth
    }); // 多级表头

    var autoColumns = columnsObj.columns;

    var _getHeader2dArray = Object(_utils_columns__WEBPACK_IMPORTED_MODULE_6__["getHeader2dArray"])({
      columns: columnsProps,
      flatColumns: flatColumns,
      headerLevel: headerLevel
    }),
        data = _getHeader2dArray.data,
        merges = _getHeader2dArray.merges;

    var mergesObj = Object(_utils_colSpanRowSpan__WEBPACK_IMPORTED_MODULE_9__["formatToCellsSpan"])(merges);
    autoColumns = autoColumns.map(function (column, colIndex) {
      column._headerCellProps = function (value, row, rowIndex) {
        return _objectSpread({}, mergesObj["".concat(colIndex, ":").concat(rowIndex)]);
      };

      return column;
    }); // 加上勾选列

    if (rowSelection) {
      var _rowSelection$columnW2 = rowSelection.columnWidth,
          _columnWidth = _rowSelection$columnW2 === void 0 ? 60 : _rowSelection$columnW2,
          _rowSelection$selecte = rowSelection.selectedRowKeys,
          selectedRowKeys = _rowSelection$selecte === void 0 ? [] : _rowSelection$selecte,
          getCheckboxProps = rowSelection.getCheckboxProps,
          rowRemoveVisible = rowSelection.rowRemoveVisible,
          onRowRemove = rowSelection.onRowRemove; //


      var __onRowRemove = function __onRowRemove(e, row, rowIndex, realRowIndex) {
        e.stopPropagation();
        onRowRemove(e, row, rowIndex, realRowIndex);
      };

      autoColumns.unshift({
        type: 'checkBox',
        dataIndex: 'checkBox',
        width: _columnWidth,
        align: 'center',
        _headerCellProps: function _headerCellProps(value, row, rowIndex) {
          return {
            rowSpan: rowIndex === 0 ? headerLevel : 0
          };
        },
        title: function title() {
          var checked = getCheckedAll({
            selectedRowKeys: selectedRowKeys,
            getCheckboxProps: getCheckboxProps
          });
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: 'vt-selection',
            onClick: _onSelectAll
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "checkbox",
            checked: checked,
            readOnly: true
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "vt-show-box"
          }));
        },
        render: function render(value, row, rowIndex, realRowIndex) {
          // 是否选中
          var rowKey = Object(_utils_rowKey__WEBPACK_IMPORTED_MODULE_7__["getRowKey"])(rowKeyProps, row, realRowIndex);
          var checked = selectedRowKeys.includes(rowKey); // 是否禁用

          var disabled = getCheckboxProps ? getCheckboxProps(row).disabled : false;
          return [rowRemoveVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: 0,
            onClick: function onClick(e) {
              return __onRowRemove(e, row, rowIndex, realRowIndex);
            }
          }, props.rowRemoveText || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "vt-row-remove"
          })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: 1,
            className: Object(_utils_base__WEBPACK_IMPORTED_MODULE_5__["classNames"])('vt-selection', {
              'vt-selection-disabled': disabled
            }),
            onClick: function onClick(e) {
              if (!disabled) {
                _onChange(e, row, realRowIndex);
              }
            }
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "checkbox",
            checked: checked,
            readOnly: true
          }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "vt-show-box"
          }))];
        }
      });
    }

    setHeaderLevel(headerLevel); // 表头层级

    setHeaderTitle(data); // 表头数据

    setColumns(autoColumns);
    setHasFixed(columnsObj.hasFixed);
  }; // 是否全选


  var getCheckedAll = function getCheckedAll(_ref) {
    var selectedRowKeys = _ref.selectedRowKeys,
        getCheckboxProps = _ref.getCheckboxProps;
    var allEffectiveRowKeys = [];
    dataSource.forEach(function (r, i) {
      // 没有被禁用
      if (getCheckboxProps ? !getCheckboxProps(r).disabled : true) {
        allEffectiveRowKeys.push(Object(_utils_rowKey__WEBPACK_IMPORTED_MODULE_7__["getRowKey"])(rowKeyProps, r, i));
      }
    });
    var effectiveSelectedRowKeys = selectedRowKeys.filter(function (v) {
      return allEffectiveRowKeys.includes(v);
    });
    return allEffectiveRowKeys.length > 0 && effectiveSelectedRowKeys.length === allEffectiveRowKeys.length;
  }; // 勾选改变


  var _onChange = function _onChange(e, row, realRowIndex) {
    e.stopPropagation();
    var _rowSelection$selecte2 = rowSelection.selectedRowKeys,
        selectedRowKeys = _rowSelection$selecte2 === void 0 ? [] : _rowSelection$selecte2,
        _rowSelection$onChang = rowSelection.onChange,
        onChange = _rowSelection$onChang === void 0 ? function () {} : _rowSelection$onChang,
        _rowSelection$onSelec = rowSelection.onSelect,
        onSelect = _rowSelection$onSelec === void 0 ? function () {} : _rowSelection$onSelec;
    var rowKey = Object(_utils_rowKey__WEBPACK_IMPORTED_MODULE_7__["getRowKey"])(rowKeyProps, row, realRowIndex);
    var rowKeysSet = new Set(selectedRowKeys);
    var selected = undefined;

    if (rowKeysSet.has(rowKey)) {
      rowKeysSet.delete(rowKey);
      selected = false;
    } else {
      rowKeysSet.add(rowKey);
      selected = true;
    }

    var _selectedRowKeys = Array.from(rowKeysSet);

    var _selectedRows = dataSource.filter(function (v, i) {
      var k = Object(_utils_rowKey__WEBPACK_IMPORTED_MODULE_7__["getRowKey"])(rowKeyProps, v, i);
      return _selectedRowKeys.includes(k);
    });

    onChange(_selectedRowKeys, _selectedRows);
    onSelect(row, selected, _selectedRows, e);
  }; // 勾选全部


  var _onSelectAll = function _onSelectAll(e) {
    e.stopPropagation();
    var _rowSelection$selecte3 = rowSelection.selectedRowKeys,
        selectedRowKeys = _rowSelection$selecte3 === void 0 ? [] : _rowSelection$selecte3,
        _rowSelection$onChang2 = rowSelection.onChange,
        onChange = _rowSelection$onChang2 === void 0 ? function () {} : _rowSelection$onChang2,
        _rowSelection$onSelec2 = rowSelection.onSelectAll,
        onSelectAll = _rowSelection$onSelec2 === void 0 ? function () {} : _rowSelection$onSelec2,
        getCheckboxProps = rowSelection.getCheckboxProps;
    var checkedAll = getCheckedAll({
      selectedRowKeys: selectedRowKeys,
      getCheckboxProps: getCheckboxProps
    });

    if (!checkedAll) {
      var _selectedRowKeys = [];

      var _selectedRows = dataSource.filter(function (v, i) {
        var disabled = getCheckboxProps ? getCheckboxProps(v).disabled : false;

        if (!disabled) {
          var k = Object(_utils_rowKey__WEBPACK_IMPORTED_MODULE_7__["getRowKey"])(rowKeyProps, v, i);

          _selectedRowKeys.push(k);
        }

        return !disabled;
      });

      onChange(_selectedRowKeys, _selectedRows); // selected, selectedRows

      onSelectAll(true, _selectedRows);
    } else {
      onChange([], []);
      onSelectAll(false, []);
    }
  };

  var onScroll = function onScroll(e) {
    var scrollLeft = e && e.target && e.target.scrollLeft;

    if (vtHeader.current) {
      vtHeader.current.gridContainer.scrollLeft = scrollLeft;
    }

    if (vtFooter.current) {
      vtFooter.current.gridContainer.scrollLeft = scrollLeft;
    } // vtBody.current.scrollLeft = scrollLeft;
    // console.log(vtHeader.current);
    // console.log(vtHeader.current.scrollLeft, vtBody.current.scrollLeft);
    // [vtHeader, vtBody].forEach((vt) => {
    //   if(vt.current.gridContainer.scrollLeft !== scrollLeft) {
    //     vt.current.gridContainer.scrollLeft = scrollLeft;
    //   }
    // });

  }; // 获取body的滚动条宽度，然后去设置header的最后一列宽度


  var getBodyScrollBarWidth = function getBodyScrollBarWidth(_ref2) {
    var ref = _ref2.ref;

    if (ref && ref.current) {
      setBodyScrollBarWidth(ref.current.offsetWidth - ref.current.clientWidth);
    }
  };

  var spinning = Object(_utils_base__WEBPACK_IMPORTED_MODULE_5__["sameType"])(loading, 'Object') ? loading.spinning : loading;
  var headerHeight = rowHeight * headerLevel; // 表头高度

  var footerHeight = summaryData ? rowHeight * summaryData.length : 0; // 总结栏高度

  var bodyHeight = !isSticky ? visibleHeight - headerHeight - footerHeight : visibleHeight; // body高度

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_context_VTableContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: {
      onScroll: onScroll,
      getBodyScrollBarWidth: getBodyScrollBarWidth,
      isSticky: isSticky,
      headerTitle: headerTitle,
      summaryData: summaryData
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: vtable,
    className: Object(_utils_base__WEBPACK_IMPORTED_MODULE_5__["classNames"])('vt-table', wrapperClassName),
    style: {
      height: visibleHeight
    }
  }, !isSticky && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MultiGrid__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, props, {
    ref: vtHeader,
    type: 'header' // className={classNames('vt-table-header', className)}
    ,
    mgClassName: 'vt-table-header',
    visibleHeight: headerHeight,
    minRowHeight: rowHeight,
    columns: headerColumns,
    dataSource: headerTitle,
    hasFixed: hasFixed,
    bodyScrollBarWidth: bodyScrollBarWidth
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MultiGrid__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, props, {
    ref: vtBody,
    type: 'body',
    mgClassName: 'vt-table-body',
    visibleHeight: bodyHeight,
    minRowHeight: rowHeight,
    columns: columns,
    hasFixed: hasFixed,
    bodyScrollBarWidth: bodyScrollBarWidth
  })), !isSticky && summaryData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MultiGrid__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, props, {
    ref: vtFooter,
    type: 'footer',
    mgClassName: 'vt-table-footer',
    visibleHeight: footerHeight,
    minRowHeight: rowHeight,
    columns: footerColumns,
    dataSource: summaryData,
    hasFixed: hasFixed,
    bodyScrollBarWidth: bodyScrollBarWidth
  })), !spinning && dataSource.length < 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vt-table-empty"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      pointerEvents: 'auto'
    }
  }, locale && locale.emptyText ? locale.emptyText : '暂无数据')) : '', spinning ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "vt-table-loading"
  }, loading && loading.spinningText ? loading.spinningText : '数据加载中，请稍后...') : '')));
};

VTable.propTypes = {
  isSticky: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  wrapperClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  rowHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  rowKey: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  rowSelection: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  rowRemoveText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element]),
  summary: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  loading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool]),
  locale: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(VTable));

/***/ }),

/***/ "./libs/VTable2.0/context/VTableContext.js":
/*!*************************************************!*\
  !*** ./libs/VTable2.0/context/VTableContext.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * onScroll {Function} Grid中滚动时调用同步滚动
 * isSticky {Boolean} 是否使用position:sticky
 * headerTitle {Array} 表头数据
 */

var VTableContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  onScroll: function onScroll() {},
  isSticky: true,
  headerTitle: []
});
/* harmony default export */ __webpack_exports__["default"] = (VTableContext);

/***/ }),

/***/ "./libs/VTable2.0/index.js":
/*!*********************************!*\
  !*** ./libs/VTable2.0/index.js ***!
  \*********************************/
/*! exports provided: default, VTable, MultiGrid, Grid, utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony import */ var _VTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTable */ "./libs/VTable2.0/VTable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTable", function() { return _VTable__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _MultiGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MultiGrid */ "./libs/VTable2.0/MultiGrid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiGrid", function() { return _MultiGrid__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Grid */ "./libs/VTable2.0/Grid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _Grid__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _utils_colSpanRowSpan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/colSpanRowSpan */ "./libs/VTable2.0/utils/colSpanRowSpan.js");




var utils = {
  formatToCellsSpan: _utils_colSpanRowSpan__WEBPACK_IMPORTED_MODULE_3__["formatToCellsSpan"]
};
/* harmony default export */ __webpack_exports__["default"] = (_VTable__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./libs/VTable2.0/styles/grid.less":
/*!*****************************************!*\
  !*** ./libs/VTable2.0/styles/grid.less ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./grid.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/grid.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./libs/VTable2.0/styles/multi-grid.less":
/*!***********************************************!*\
  !*** ./libs/VTable2.0/styles/multi-grid.less ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./multi-grid.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/multi-grid.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./libs/VTable2.0/styles/vtable.less":
/*!*******************************************!*\
  !*** ./libs/VTable2.0/styles/vtable.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./vtable.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/vtable.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./libs/VTable2.0/utils/base.js":
/*!**************************************!*\
  !*** ./libs/VTable2.0/utils/base.js ***!
  \**************************************/
/*! exports provided: sameType, isRenderCellObj, classNames, queryCustomAttributeDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sameType", function() { return sameType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRenderCellObj", function() { return isRenderCellObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classNames", function() { return classNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryCustomAttributeDOM", function() { return queryCustomAttributeDOM; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 判断类型
 * @param {any} value 需要比对的值
 * @param {string} type 比对类型
 * @return {boolean} 比对结果
 */

var sameType = function sameType(value, type) {
  if (type === 'String') {
    return Object.prototype.toString.call(value) === '[object String]';
  }

  if (type === 'Number') {
    return Object.prototype.toString.call(value) === '[object Number]';
  }

  if (type === 'BigInt') {
    return Object.prototype.toString.call(value) === '[object BigInt]';
  }

  if (type === 'Symbol') {
    return Object.prototype.toString.call(value) === '[object Symbol]';
  }

  if (type === 'Null') {
    return Object.prototype.toString.call(value) === '[object Null]';
  }

  if (type === 'Undefined') {
    return Object.prototype.toString.call(value) === '[object Undefined]';
  }

  if (type === 'Function') {
    return Object.prototype.toString.call(value) === '[object Function]';
  }

  if (type === 'Object') {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  if (type === 'Array') {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  if (type === 'Boolean') {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  }
};
/**
 * 判断render返回的对象类型
 * @param {any} data 传入的值
 * @return {boolean} 比对结果
 */

var isRenderCellObj = function isRenderCellObj(data) {
  return data && sameType(data, 'Object') && !react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(data);
}; // classNames('foo', 'bar'); // => 'foo bar'
// classNames('foo', { bar: true }); // => 'foo bar'
// classNames({ 'foo-bar': true }); // => 'foo-bar'
// classNames({ 'foo-bar': false }); // => ''
// classNames({ foo: true }, { bar: true }); // => 'foo bar'
// classNames({ foo: true, bar: true }); // => 'foo bar'

function classNames() {
  var _arguments = arguments;
  var className = '';

  var _loop = function _loop(i) {
    if (sameType(_arguments[i], 'String')) {
      className += " ".concat(_arguments[i]);
    }

    if (sameType(_arguments[i], 'Object')) {
      Object.keys(_arguments[i]).forEach(function (k) {
        className += _arguments[i][k] ? " ".concat(k) : '';
      });
    }
  };

  for (var i in arguments) {
    _loop(i);
  }

  return className.trim();
}
; // 查询自定义属性的DOM
// querySelectorAll 除ASCII 字母、数字、_、- 和 . 以外的字符可能会有兼容性问题

function queryCustomAttributeDOM(scopeDOM, name, value) {
  var selectDom = [];
  var dom = scopeDOM;

  for (var i = 0; i < dom.length; i++) {
    if (value === dom[i].getAttribute(name)) {
      selectDom.push(dom[i]);
    }
  }

  return selectDom;
}

/***/ }),

/***/ "./libs/VTable2.0/utils/colSpanRowSpan.js":
/*!************************************************!*\
  !*** ./libs/VTable2.0/utils/colSpanRowSpan.js ***!
  \************************************************/
/*! exports provided: formatToCellsSpan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatToCellsSpan", function() { return formatToCellsSpan; });
/**
 * 将合并数组转换为单元格的合并信息
 * @param {Array} mergesArr
 *  [
 *    {
 *      s: {c: 0, r: 2},
 *      e: {c: 1, r: 2},
 *    },
 *    {
 *       s: {c: 2, r: 2},
 *       e: {c: 2, r: 3},
 *    }
 *  ];
 * @return {Object}
 * {
 *   '0:2': {colSpan: 2, rowSpan: 1},
 *   '1:2': {colSpan: 0, rowSpan: 0},
 *   '2:2': {colSpan: 1, rowSpan: 2},
 *   '2:3': {colSpan: undefined, rowSpan: 0},
 * }
 */
var formatToCellsSpan = function formatToCellsSpan(mergesArr) {
  var mergesObj = {};
  mergesArr.forEach(function (m) {
    var msc = m.s.c;
    var msr = m.s.r;
    var mec = m.e.c;
    var mer = m.e.r;

    for (var sc = msc; sc <= mec; sc++) {
      for (var sr = msr; sr <= mer; sr++) {
        mergesObj["".concat(sc, ":").concat(sr)] = {
          colSpan: msr === sr ? 0 : undefined,
          // 第一行才设置colSpan=0,兼容VTable与antd差异
          rowSpan: 0
        };
      }
    }

    mergesObj["".concat(msc, ":").concat(msr)] = {
      colSpan: mec - msc + 1,
      rowSpan: mer - msr + 1
    };
  });
  return mergesObj;
};

/***/ }),

/***/ "./libs/VTable2.0/utils/columns.js":
/*!*****************************************!*\
  !*** ./libs/VTable2.0/utils/columns.js ***!
  \*****************************************/
/*! exports provided: getColumnsWidth, getSelfAdaptionColumns, getScrollBarWidth, flattenColumns, getHeader2dArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColumnsWidth", function() { return getColumnsWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelfAdaptionColumns", function() { return getSelfAdaptionColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollBarWidth", function() { return getScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenColumns", function() { return flattenColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeader2dArray", function() { return getHeader2dArray; });
/* harmony import */ var _deepClone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepClone */ "./libs/VTable2.0/utils/deepClone.js");

/**
 * 获取columns的总宽度
 * @param {Array} columns 列
 * @returns {Number} width
 */

var getColumnsWidth = function getColumnsWidth() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var width = 0;
  columns.forEach(function (item) {
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

var getSelfAdaptionColumns = function getSelfAdaptionColumns(_ref) {
  var columns = _ref.columns,
      clientWidth = _ref.clientWidth;
  var hasFixed = true;
  var cloneColumns = Object(_deepClone__WEBPACK_IMPORTED_MODULE_0__["deepClone"])(columns);
  var allColumnsWidth = getColumnsWidth(columns); // const scrollBarWidth = getScrollBarWidth();

  if (clientWidth > allColumnsWidth) {
    var columnsLen = cloneColumns.length;
    var absentAllWidth = clientWidth - allColumnsWidth; // 取余  余数向下取整

    var remainder = Math.floor(absentAllWidth % columnsLen); // 向下取整

    var absentItemColumnWidth = Math.floor(absentAllWidth / columnsLen);
    cloneColumns = cloneColumns.map(function (item, index) {
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
    hasFixed: hasFixed
  };
};
/**
 * 获取滚动条宽度
 * @returns {Number} width
 */

var getScrollBarWidth = function getScrollBarWidth() {
  var odiv = document.createElement('div'); //创建一个div

  var styles = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll' //让他有滚动条

  };

  for (var i in styles) {
    odiv.style[i] = styles[i];
  }

  document.body.appendChild(odiv); //把div添加到body中

  var scrollbarWidth = odiv.offsetWidth - odiv.clientWidth; //相减

  odiv.remove(); //移除创建的div

  return scrollbarWidth; //返回滚动条宽度
};
/**
 * 扁平化列
 */

var flattenColumns = function flattenColumns(_ref2) {
  var columns = _ref2.columns,
      _ref2$childrenField = _ref2.childrenField,
      childrenField = _ref2$childrenField === void 0 ? 'children' : _ref2$childrenField;
  var newColumns = [];
  var level = [];

  var flatten = function flatten(_columns) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    level[index] = true;
    index += 1;

    _columns.forEach(function (column) {
      var childColumns = column[childrenField];

      if (childColumns && childColumns.length > 0) {
        flatten(childColumns, index);
      } else {
        column.width = column.width || 100;
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

var getHeader2dArray = function getHeader2dArray(_ref3) {
  var columns = _ref3.columns,
      flatColumns = _ref3.flatColumns,
      headerLevel = _ref3.headerLevel,
      _ref3$childrenField = _ref3.childrenField,
      childrenField = _ref3$childrenField === void 0 ? 'children' : _ref3$childrenField;
  var arr = [];
  var merges = [];

  var getKey = function getKey(colIndex) {
    var column = flatColumns[colIndex] || {};
    return column.key || column.dataIndex;
  };

  var deal = function deal(_columns) {
    var startCol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var rowLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _columns.reduce(function (prevCol, currentColumn) {
      if (!arr[rowLevel]) {
        arr[rowLevel] = {};
      }

      arr[rowLevel][getKey(prevCol)] = currentColumn.title;
      var nextCol = prevCol;
      var childColumns = currentColumn[childrenField];

      if (childColumns) {
        deal(childColumns, prevCol, rowLevel + 1);

        var _flattenColumns = flattenColumns({
          columns: childColumns,
          childrenField: childrenField
        }),
            flatChildColumns = _flattenColumns.columns;

        nextCol += flatChildColumns.length;
        merges.push({
          s: {
            c: prevCol,
            r: rowLevel
          },
          e: {
            c: nextCol - 1,
            r: rowLevel
          }
        }); // 补全值 跨行的值

        for (var c = prevCol + 1; c < nextCol; c++) {
          arr[rowLevel][getKey(c)] = currentColumn.title;
        }
      } else {
        nextCol += 1; // 有跨列

        if (headerLevel - 1 - rowLevel > 0) {
          merges.push({
            s: {
              c: prevCol,
              r: rowLevel
            },
            e: {
              c: prevCol,
              r: headerLevel - 1
            }
          }); // 补全值 跨列的值

          for (var r = rowLevel + 1; r < headerLevel; r++) {
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
    merges: merges
  };
};

/***/ }),

/***/ "./libs/VTable2.0/utils/deepClone.js":
/*!*******************************************!*\
  !*** ./libs/VTable2.0/utils/deepClone.js ***!
  \*******************************************/
/*! exports provided: deepClone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepClone", function() { return deepClone; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./libs/VTable2.0/utils/base.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


/**
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 */

var deepClone = function deepClone(value) {
  // 记录被拷贝的值，避免循环引用的出现
  var memo = new WeakMap();

  function baseClone(data) {
    if (_typeof(data) !== 'object' || data === null) {
      return data;
    }

    if (memo.get(data)) {
      return memo.get(data);
    }

    var newData;

    if (Object(_base__WEBPACK_IMPORTED_MODULE_0__["sameType"])(data, 'Array')) {
      newData = _toConsumableArray(data);
    } else if (Object(_base__WEBPACK_IMPORTED_MODULE_0__["sameType"])(data, 'Object')) {
      newData = _objectSpread({}, data);
    }

    memo.set(data, newData);
    Reflect.ownKeys(data).forEach(function (key) {
      if (_typeof(data[key]) === 'object' && data[key] !== null) {
        newData[key] = baseClone(data[key]);
      }
    });
    return newData;
  }

  return baseClone(value);
};

/***/ }),

/***/ "./libs/VTable2.0/utils/fixUtil.js":
/*!*****************************************!*\
  !*** ./libs/VTable2.0/utils/fixUtil.js ***!
  \*****************************************/
/*! exports provided: formatFixedLeftColumns, formatFixedRightColumns, getFixedCellInfo, getCellFixedShadow, getFixedCellStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatFixedLeftColumns", function() { return formatFixedLeftColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatFixedRightColumns", function() { return formatFixedRightColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedCellInfo", function() { return getFixedCellInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellFixedShadow", function() { return getCellFixedShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedCellStyle", function() { return getFixedCellStyle; });
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columns */ "./libs/VTable2.0/utils/columns.js");
/* harmony import */ var _deepClone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deepClone */ "./libs/VTable2.0/utils/deepClone.js");


/**
 * 格式化 左侧固定列
 * @param {Array} fixedLeftColumns 左侧列
 * @return columns
 */

var formatFixedLeftColumns = function formatFixedLeftColumns(_ref) {
  var fixedLeftColumns = _ref.fixedLeftColumns;
  return Object(_deepClone__WEBPACK_IMPORTED_MODULE_1__["deepClone"])(fixedLeftColumns).map(function (column, index) {
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

var formatFixedRightColumns = function formatFixedRightColumns(_ref2) {
  var fixedRightColumns = _ref2.fixedRightColumns,
      columnsLength = _ref2.columnsLength;
  return Object(_deepClone__WEBPACK_IMPORTED_MODULE_1__["deepClone"])(fixedRightColumns).map(function (column, index) {
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

var getFixedCellInfo = function getFixedCellInfo(_ref3) {
  var column = _ref3.column,
      _ref3$fixedLeftColumn = _ref3.fixedLeftColumns,
      fixedLeftColumns = _ref3$fixedLeftColumn === void 0 ? [] : _ref3$fixedLeftColumn,
      _ref3$fixedRightColum = _ref3.fixedRightColumns,
      fixedRightColumns = _ref3$fixedRightColum === void 0 ? [] : _ref3$fixedRightColum;
  var isSticky = false;
  var fixLeft = undefined;
  var fixRight = undefined;
  var lastFixLeft = false;
  var firstFixRight = false;

  if (column.fixed === 'left' && fixedLeftColumns.length > 0) {
    isSticky = true;
    fixLeft = Object(_columns__WEBPACK_IMPORTED_MODULE_0__["getColumnsWidth"])(fixedLeftColumns.slice(0, column.fcIndex));
    lastFixLeft = column.lastFixLeft;
  } else if (column.fixed === 'right' && fixedRightColumns.length > 0) {
    isSticky = true;
    fixRight = Object(_columns__WEBPACK_IMPORTED_MODULE_0__["getColumnsWidth"])(fixedRightColumns.slice(column.fcIndex + 1));
    firstFixRight = column.firstFixRight;
  }

  return {
    isSticky: isSticky,
    fixLeft: fixLeft,
    fixRight: fixRight,
    lastFixLeft: lastFixLeft,
    firstFixRight: firstFixRight
  };
};
/**
 * cell fixed shadow
 * @param {Object} cellInfo 单元格信息
 * @return {String}
 */

var getCellFixedShadow = function getCellFixedShadow(_ref4) {
  var cellInfo = _ref4.cellInfo;
  var lastFixLeft = cellInfo.lastFixLeft,
      firstFixRight = cellInfo.firstFixRight;
  var lastFixLeftShadow = lastFixLeft ? 'vt-cell-fix-left-last' : '';
  var firstFixRightShadow = firstFixRight ? 'vt-cell-fix-right-first' : '';
  return "".concat(lastFixLeftShadow, " ").concat(firstFixRightShadow);
};
/**
 * 使用sticky实现固定列
 * @param {Object} cellInfo 单元格信息
 * @return {Object}
 */

var getFixedCellStyle = function getFixedCellStyle(_ref5) {
  var cellInfo = _ref5.cellInfo;
  var isSticky = cellInfo.isSticky,
      fixLeft = cellInfo.fixLeft,
      fixRight = cellInfo.fixRight;
  return {
    zIndex: isSticky ? 2 : undefined,
    position: isSticky ? 'sticky' : undefined,
    left: fixLeft,
    right: fixRight
  };
};

/***/ }),

/***/ "./libs/VTable2.0/utils/gridCell.js":
/*!******************************************!*\
  !*** ./libs/VTable2.0/utils/gridCell.js ***!
  \******************************************/
/*! exports provided: getCellBordered, getCellAlign */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellBordered", function() { return getCellBordered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellAlign", function() { return getCellAlign; });
// cell bordered
var getCellBordered = function getCellBordered(_ref) {
  var type = _ref.type,
      isSticky = _ref.isSticky,
      headerBordered = _ref.headerBordered,
      bordered = _ref.bordered;

  // 是否显示边框
  var _bordered = type === 'header' ? headerBordered || bordered : bordered;

  var noLastChildBorderRight = isSticky ? 'vt-has-last-child-border-right' : 'vt-no-last-child-border-right';
  _bordered = "vt-default-bordered ".concat(_bordered ? 'vt-bordered-right' : '', " ").concat(noLastChildBorderRight);
  return _bordered;
}; // cell align


var ALIGN_TYPE = {
  left: 'vt-align-left',
  right: 'vt-align-right',
  center: 'vt-align-center'
};

var getCellAlign = function getCellAlign(_ref2) {
  var type = _ref2.type,
      column = _ref2.column;
  var headerAlign = ALIGN_TYPE[column.headerAlign] || ALIGN_TYPE.center;
  var bodyAlign = ALIGN_TYPE[column.align] || ALIGN_TYPE.left;
  var align = type === 'header' ? headerAlign : bodyAlign;
  return align;
};



/***/ }),

/***/ "./libs/VTable2.0/utils/gridScrollInfo.js":
/*!************************************************!*\
  !*** ./libs/VTable2.0/utils/gridScrollInfo.js ***!
  \************************************************/
/*! exports provided: getRealGridVerticalScrollInfo, getRealGridHorizontalScrollInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRealGridVerticalScrollInfo", function() { return getRealGridVerticalScrollInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRealGridHorizontalScrollInfo", function() { return getRealGridHorizontalScrollInfo; });
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columns */ "./libs/VTable2.0/utils/columns.js");

/**
 * 计算获取网格垂直滚动对应的实时信息
 */

var getRealGridVerticalScrollInfo = function getRealGridVerticalScrollInfo(_ref) {
  var scrollTop = _ref.scrollTop,
      dataSource = _ref.dataSource,
      estimatedRowHeight = _ref.estimatedRowHeight,
      rowOffsetCount = _ref.rowOffsetCount,
      rowVisibleCount = _ref.rowVisibleCount;
  var dataLen = dataSource.length; // dom存在的行条数

  var realRowsCount = rowVisibleCount + rowOffsetCount * 2; // 获取垂直滚动的条数

  var scrollTopNum = Math.floor(scrollTop / estimatedRowHeight); // 获取要渲染的行开始坐标，最小坐标为0  rowOffsetCount: 行偏移量

  var startRowIndex = scrollTopNum - rowOffsetCount > 0 ? scrollTopNum - rowOffsetCount : 0;
  var maxStartRowIndex = dataLen - realRowsCount;
  maxStartRowIndex = maxStartRowIndex > 0 ? maxStartRowIndex : 0;
  startRowIndex = startRowIndex > maxStartRowIndex ? maxStartRowIndex : startRowIndex; // 获取要渲染的行结尾坐标，最大坐标为dataSource长度  rowOffsetCount: 行偏移量

  var endRowIndex = startRowIndex + realRowsCount > dataLen ? dataLen : startRowIndex + realRowsCount; // 上方未渲染数据的paddingTop值

  var startVerticalOffset = startRowIndex * estimatedRowHeight; // 上方未渲染数据的paddingBottom值

  var endVerticalOffset = (dataLen - endRowIndex) * estimatedRowHeight; // 需要渲染显示的行数据

  var virtualData = dataSource.slice(startRowIndex, endRowIndex); // console.table({scrollTop, scrollTopNum, startRowIndex, endRowIndex});

  return {
    // 可视区坐标（rowIndex垂直）
    startRowIndex: startRowIndex,
    endRowIndex: endRowIndex,
    // padding偏移量(垂直)
    startVerticalOffset: startVerticalOffset,
    endVerticalOffset: endVerticalOffset,
    // 数据
    virtualData: virtualData
  };
};
/**
 * 计算获取网格水平滚动对应的实时信息
 */

var getRealGridHorizontalScrollInfo = function getRealGridHorizontalScrollInfo(_ref2) {
  var scrollLeft = _ref2.scrollLeft,
      dataSource = _ref2.dataSource,
      columns = _ref2.columns,
      estimatedColumnWidth = _ref2.estimatedColumnWidth,
      columnOffsetCount = _ref2.columnOffsetCount,
      columnVisibleCount = _ref2.columnVisibleCount;
  var scrollColumns = columns; // dom存在的行条数

  var realColumnsCount = columnVisibleCount + columnOffsetCount * 2; // 获取水平滚动的条数

  var scrollLeftNum = Math.floor(scrollLeft / estimatedColumnWidth); // 获取要渲染的列开始坐标

  var startColumnIndex = scrollLeftNum - columnOffsetCount > 0 ? scrollLeftNum - columnOffsetCount : 0;
  var maxStartColumnIndex = scrollColumns.length - realColumnsCount;
  maxStartColumnIndex = maxStartColumnIndex > 0 ? maxStartColumnIndex : 0;
  startColumnIndex = startColumnIndex > maxStartColumnIndex ? maxStartColumnIndex : startColumnIndex; // 获取要渲染的列结尾坐标

  var endColumnIndex = startColumnIndex + realColumnsCount > scrollColumns.length ? scrollColumns.length : startColumnIndex + realColumnsCount; // 左边未渲染数据的paddingLeft值

  var leftOffsetColumns = scrollColumns.slice(0, startColumnIndex);
  var startHorizontalOffset = dataSource.length > 0 ? Object(_columns__WEBPACK_IMPORTED_MODULE_0__["getColumnsWidth"])(leftOffsetColumns) : 0; // 右边未渲染数据的paddingRight值

  var rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
  var endHorizontalOffset = dataSource.length > 0 ? Object(_columns__WEBPACK_IMPORTED_MODULE_0__["getColumnsWidth"])(rightOffsetColumns) : 0; // 需要渲染显示的列数据

  var virtualColumns = scrollColumns.slice(startColumnIndex, endColumnIndex); // console.log(leftOffsetColumns, startHorizontalOffset, rightOffsetColumns, endHorizontalOffset, virtualColumns, getColumnsWidth(virtualColumns));
  // console.table({scrollLeft, scrollLeftNum, startColumnIndex, endColumnIndex});

  return {
    // 可视区坐标（columnIndex水平）
    startColumnIndex: startColumnIndex,
    endColumnIndex: endColumnIndex,
    // padding偏移量(水平)
    startHorizontalOffset: startHorizontalOffset,
    endHorizontalOffset: endHorizontalOffset,
    // 列数据
    virtualColumns: virtualColumns
  };
};

/***/ }),

/***/ "./libs/VTable2.0/utils/index.js":
/*!***************************************!*\
  !*** ./libs/VTable2.0/utils/index.js ***!
  \***************************************/
/*! exports provided: getColumnsWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./columns */ "./libs/VTable2.0/utils/columns.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColumnsWidth", function() { return _columns__WEBPACK_IMPORTED_MODULE_0__["getColumnsWidth"]; });



/***/ }),

/***/ "./libs/VTable2.0/utils/isSupportSticky.js":
/*!*************************************************!*\
  !*** ./libs/VTable2.0/utils/isSupportSticky.js ***!
  \*************************************************/
/*! exports provided: isSupportSticky */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportSticky", function() { return isSupportSticky; });
/**
 * 是否支持position: sticky
 * @return {boolean}
 */
var isSupportSticky = function isSupportSticky() {
  var vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
  var vendorListLength = vendorList.length;
  var stickyElement = document.createElement('div');

  for (var i = 0; i < vendorListLength; i++) {
    stickyElement.style.position = vendorList[i] + 'sticky';

    if (stickyElement.style.position !== '') {
      return true;
    }
  }

  return false;
};

/***/ }),

/***/ "./libs/VTable2.0/utils/rowKey.js":
/*!****************************************!*\
  !*** ./libs/VTable2.0/utils/rowKey.js ***!
  \****************************************/
/*! exports provided: getRowKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRowKey", function() { return getRowKey; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./libs/VTable2.0/utils/base.js");

var getRowKey = function getRowKey(rowKey, row, index) {
  return rowKey ? Object(_base__WEBPACK_IMPORTED_MODULE_0__["sameType"])(rowKey, 'Function') ? rowKey(row) : row[rowKey] : index;
};

/***/ }),

/***/ "./libs/VTable2.0/utils/timer.js":
/*!***************************************!*\
  !*** ./libs/VTable2.0/utils/timer.js ***!
  \***************************************/
/*! exports provided: cancelTimeout, requestTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelTimeout", function() { return cancelTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestTimeout", function() { return requestTimeout; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var hasNativePerformanceNow = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === 'object' && typeof performance.now === 'function';
var now = hasNativePerformanceNow ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}
function requestTimeout(callback, delay) {
  var start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  var timeoutID = {
    id: requestAnimationFrame(tick)
  };
  return timeoutID;
}

/***/ }),

/***/ "./libs/index.js":
/*!***********************!*\
  !*** ./libs/index.js ***!
  \***********************/
/*! exports provided: VTable, Grid, VTablePro, GridPro, utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTable2_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTable2.0 */ "./libs/VTable2.0/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTable", function() { return _VTable2_0__WEBPACK_IMPORTED_MODULE_0__["VTable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _VTable2_0__WEBPACK_IMPORTED_MODULE_0__["Grid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTablePro", function() { return _VTable2_0__WEBPACK_IMPORTED_MODULE_0__["VTable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridPro", function() { return _VTable2_0__WEBPACK_IMPORTED_MODULE_0__["Grid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _VTable2_0__WEBPACK_IMPORTED_MODULE_0__["utils"]; });





/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/grid.less":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/grid.less ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".vt-grid-container {\n  flex-grow: 1;\n  position: relative;\n  overflow: auto;\n  display: flex;\n  flex-wrap: wrap;\n  font-size: 14px;\n  color: #333333;\n}\n.vt-grid-container .vt-grid-row {\n  position: inherit;\n  display: flex;\n  contain: layout paint;\n}\n.vt-grid-container .vt-grid-row:hover .vt-grid-cell {\n  background: #ebf5ff;\n}\n.vt-grid-container .vt-grid-row.vt-grid-row-selected .vt-grid-cell {\n  background: #ebf5ff;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell {\n  display: flex;\n  align-items: center;\n  background: #fff;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-align-left {\n  justify-content: flex-start;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-align-right {\n  justify-content: flex-end;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-align-center {\n  justify-content: center;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-default-bordered {\n  box-sizing: border-box;\n  border-bottom: 1px solid #d1d3d8;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-default-bordered.vt-bordered-right {\n  border-right: 1px solid #d1d3d8;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-default-bordered.vt-has-last-child-border-right:last-child {\n  border-right: 1px solid #d1d3d8;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-default-bordered.vt-no-last-child-border-right:last-child {\n  border-right: none;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-cell-fix-left-last {\n  border-right: none !important;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-cell-fix-left-last:after,\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-cell-fix-right-first:after {\n  position: absolute;\n  top: 0;\n  bottom: -1px;\n  width: 30px;\n  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;\n  content: \"\";\n  pointer-events: none;\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-cell-fix-left-last:after {\n  right: 0;\n  box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);\n  transform: translateX(100%);\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell.vt-cell-fix-right-first:after {\n  left: 0;\n  box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);\n  transform: translateX(-100%);\n}\n.vt-grid-container .vt-grid-row .vt-grid-cell .vt-ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/multi-grid.less":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/multi-grid.less ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".vt-multi-grid-container {\n  display: flex;\n}\n.vt-multi-grid-container .vt-multi-grid-fixed-left,\n.vt-multi-grid-container .vt-multi-grid-fixed-right {\n  position: absolute;\n  overflow: hidden;\n}\n.vt-multi-grid-container.vt-table-body .vt-multi-grid-fixed-left .vt-grid-container,\n.vt-multi-grid-container.vt-table-body .vt-multi-grid-fixed-right .vt-grid-container {\n  overflow-y: hidden;\n  overflow-x: scroll;\n}\n.vt-multi-grid-container .vt-multi-grid-fixed-left {\n  left: 0;\n  box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);\n}\n.vt-multi-grid-container .vt-multi-grid-fixed-right {\n  right: 0;\n  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/vtable.less":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./libs/VTable2.0/styles/vtable.less ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".vt-table {\n  /* vvv todo 待优化 支持table有border*/\n  /* ^^^ */\n  position: relative;\n}\n.vt-table .vt-table-header .vt-grid-container::-webkit-scrollbar {\n  display: none;\n}\n.vt-table .vt-table-header.vt-header-sticky {\n  z-index: 3;\n  position: sticky;\n  top: 0;\n}\n.vt-table .vt-table-header .vt-grid-row {\n  contain: none;\n}\n.vt-table .vt-table-header .vt-grid-row:hover .vt-grid-cell {\n  background: #e9ebf0;\n}\n.vt-table .vt-table-header .vt-grid-row .vt-grid-cell {\n  background: #e9ebf0 !important;\n  font-weight: 700;\n}\n.vt-table .vt-table-footer {\n  margin-top: -1px;\n}\n.vt-table .vt-table-footer .vt-grid-container::-webkit-scrollbar {\n  display: none;\n}\n.vt-table .vt-table-footer.vt-footer-sticky {\n  z-index: 3;\n  position: sticky;\n  bottom: 0;\n}\n.vt-table .vt-table-footer .vt-grid-row:hover .vt-grid-cell {\n  background: #fffae6;\n}\n.vt-table .vt-table-footer .vt-grid-row .vt-grid-cell {\n  background: #fffae6;\n  border-bottom: none;\n  border-top: 1px solid #d1d3d8;\n}\n.vt-table .vt-selection {\n  position: relative;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n}\n.vt-table .vt-selection input {\n  display: none;\n}\n.vt-table .vt-selection input:checked + .vt-show-box:before {\n  border: solid #ff8040;\n  border-width: 0 2px 2px 0;\n}\n.vt-table .vt-selection .vt-show-box {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 16px;\n  height: 16px;\n  border-radius: 2px;\n  border: 1px solid #d1d3d8;\n  background: #fff;\n}\n.vt-table .vt-selection .vt-show-box:hover {\n  border-color: #ff8040;\n}\n.vt-table .vt-selection .vt-show-box:before {\n  content: '';\n  position: absolute;\n  top: 1px;\n  left: 4px;\n  width: 5px;\n  height: 8px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n.vt-table .vt-selection-disabled {\n  cursor: not-allowed;\n}\n.vt-table .vt-selection-disabled .vt-show-box {\n  background: #eee;\n}\n.vt-table .vt-selection-disabled .vt-show-box:hover {\n  border-color: #d1d3d8;\n}\n.vt-table .vt-selection-disabled .vt-show-box:before {\n  border: solid transparent;\n}\n.vt-table .vt-grid-row.vt-grid-row-hover .vt-grid-cell {\n  background: #ebf5ff;\n}\n.vt-table .vt-grid-row.vt-grid-row-hover .vt-row-remove {\n  position: absolute;\n  top: -20px;\n  left: -20px;\n  border: 20px solid;\n  border-color: red transparent transparent transparent;\n  transform: rotate(135deg);\n  cursor: pointer;\n}\n.vt-table .vt-grid-row.vt-grid-row-hover .vt-row-remove:after {\n  content: \"x\";\n  position: absolute;\n  top: -20px;\n  left: -2px;\n  color: #fff;\n  transform: rotate(45deg);\n}\n.vt-table .vt-grid-row:hover .vt-row-remove {\n  position: absolute;\n  top: -20px;\n  left: -20px;\n  border: 20px solid;\n  border-color: red transparent transparent transparent;\n  transform: rotate(135deg);\n  cursor: pointer;\n}\n.vt-table .vt-grid-row:hover .vt-row-remove:after {\n  content: \"x\";\n  position: absolute;\n  top: -20px;\n  left: -2px;\n  color: #fff;\n  transform: rotate(45deg);\n}\n.vt-table .vt-table-loading {\n  z-index: 20;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0.8;\n  background: #fff;\n}\n.vt-table .vt-table-empty {\n  z-index: 20;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  pointer-events: none;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=vtable.development.js.map