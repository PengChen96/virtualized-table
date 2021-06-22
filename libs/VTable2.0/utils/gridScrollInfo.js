
import {getColumnsWidth} from './columns';

/**
 * 计算获取网格垂直滚动对应的实时信息
 */
export const getRealGridVerticalScrollInfo = ({
  scrollTop,
  // 源数据
  dataSource,
  // 一行的高度（预估）
  estimatedRowHeight,
  // 上下偏移渲染个数
  rowOffsetCount,
  // 可渲染的元素个数
  rowVisibleCount
}) => {
  const dataLen = dataSource.length;
  // dom存在的行条数
  const realRowsCount = rowVisibleCount + rowOffsetCount * 2;
  // 获取垂直滚动的条数
  const scrollTopNum = Math.floor(scrollTop / estimatedRowHeight);
  // 获取要渲染的行开始坐标，最小坐标为0  rowOffsetCount: 行偏移量
  let startRowIndex = (scrollTopNum - rowOffsetCount) > 0 ? (scrollTopNum - rowOffsetCount) : 0;
  let maxStartRowIndex = dataLen - realRowsCount;
  maxStartRowIndex = maxStartRowIndex > 0 ? maxStartRowIndex : 0;
  startRowIndex = startRowIndex > maxStartRowIndex ? maxStartRowIndex : startRowIndex;
  // 获取要渲染的行结尾坐标，最大坐标为dataSource长度  rowOffsetCount: 行偏移量
  let endRowIndex = (startRowIndex + realRowsCount) > dataLen ? dataLen : (startRowIndex + realRowsCount);
  // 上方未渲染数据的paddingTop值
  let startVerticalOffset = startRowIndex * estimatedRowHeight;
  // 上方未渲染数据的paddingBottom值
  let endVerticalOffset = (dataLen - endRowIndex) * estimatedRowHeight;
  // 需要渲染显示的行数据
  let virtualData = dataSource.slice(startRowIndex, endRowIndex);
  // console.table({scrollTop, scrollTopNum, startRowIndex, endRowIndex});
  return {
    // 可视区坐标（rowIndex垂直）
    startRowIndex,
    endRowIndex,
    // padding偏移量(垂直)
    startVerticalOffset,
    endVerticalOffset,
    // 数据
    virtualData
  };
};


/**
 * 计算获取网格水平滚动对应的实时信息
 */
export const getRealGridHorizontalScrollInfo = ({
  scrollLeft,
  // 源数据
  dataSource,
  // 源列数据
  columns,
  // 预估的每列宽度
  estimatedColumnWidth,
  // 左右偏移渲染个数
  columnOffsetCount,
  // 可渲染个数（水平）
  columnVisibleCount
}) => {
  let scrollColumns = columns;
  // dom存在的行条数
  let realColumnsCount = columnVisibleCount + columnOffsetCount * 2;
  // 获取水平滚动的条数
  let scrollLeftNum = Math.floor(scrollLeft / estimatedColumnWidth);
  // 获取要渲染的列开始坐标
  let startColumnIndex = (scrollLeftNum - columnOffsetCount) > 0 ? (scrollLeftNum - columnOffsetCount) : 0;
  let maxStartColumnIndex = scrollColumns.length - realColumnsCount;
  maxStartColumnIndex = maxStartColumnIndex > 0 ? maxStartColumnIndex : 0;
  startColumnIndex = startColumnIndex > maxStartColumnIndex ? maxStartColumnIndex : startColumnIndex;
  // 获取要渲染的列结尾坐标
  let endColumnIndex = (startColumnIndex + realColumnsCount) > scrollColumns.length ? scrollColumns.length : (startColumnIndex + realColumnsCount);
  // 左边未渲染数据的paddingLeft值
  let leftOffsetColumns = scrollColumns.slice(0, startColumnIndex);
  let startHorizontalOffset = dataSource.length > 0 ? getColumnsWidth(leftOffsetColumns) : 0;
  // 右边未渲染数据的paddingRight值
  let rightOffsetColumns = scrollColumns.slice(endColumnIndex, scrollColumns.length);
  let endHorizontalOffset = dataSource.length > 0 ? getColumnsWidth(rightOffsetColumns) : 0;
  // 需要渲染显示的列数据
  let virtualColumns = scrollColumns.slice(startColumnIndex, endColumnIndex);
  // console.log(leftOffsetColumns, startHorizontalOffset, rightOffsetColumns, endHorizontalOffset, virtualColumns, getColumnsWidth(virtualColumns));
  // console.table({scrollLeft, scrollLeftNum, startColumnIndex, endColumnIndex});
  return {
    // 可视区坐标（columnIndex水平）
    startColumnIndex,
    endColumnIndex,
    // padding偏移量(水平)
    startHorizontalOffset,
    endHorizontalOffset,
    // 列数据
    virtualColumns
  };
};
