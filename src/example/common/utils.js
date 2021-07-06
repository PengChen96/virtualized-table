
import React from 'react';

const COLUMNS_KEY = 'title';
/**
* 生成列
* @param {number} num 列数
* @param {Object} params {columns}
**/
export const generateColumns = (num = 1, params = {
  columnObj: () =>  {}}
) => {

  let columns = params.columns || [{
    key: 'id',
    title: '复选框',
    width: 150,
    align: 'center'
  }];
  for (let i = 0; i < num; i++) {
    columns.push({
      key: COLUMNS_KEY + i,
      title: '标题列' + i,
      width: 150,
      ...params.columnObj(i),
      render(value) {
        return <span>{value}</span>;
      }
    });
  }

  return columns;

};

/**
 * 生成数据
 * @param {number} num 数据条数
 * @param {number} colNum 数据条数
 * @param {Function} defRowObj 默认行对象方法
 * @param {Function} defRowColObj
 **/
export const generateData = (
  num = 1,
  colNum = 25,
  defRowColObj = (i, j) => {
    return `内容${i}:${j}`;
  },
  defRowObj = (i) => {
    return {
      id: i,
      rowKey: 'rowKey' + i,
      mergeColumn: '合并列'
    };
  }
) => {

  let list = [];
  for (let i = 0; i < num; i++) {
    let rowObj = defRowObj(i);
    for (let j = 0; j < colNum; j++) {
      rowObj[`${COLUMNS_KEY}${j}`] = defRowColObj(i, j);
      // rowObj[`title${j}`] = i % 10 === 0 ? '绝对是分开发的口复上课都会发生的看法和速度快水电费快递师傅看电视' : i;
    }
    list.push(rowObj);
  }

  return list;

};
