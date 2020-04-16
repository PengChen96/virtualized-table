
import React from 'react';

const COLUMNS_KEY = 'title';
/**
* 生成列
* @param {number} num 列数
* @param {Object} params {columns}
**/
export const generateColumns = (num = 1, params = {}) => {

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
 * @param {Object} params {colNum, defRowObj, defRowColObj}
 **/
export const generateData = (
  num = 1,
  colNum = 25,
  params = {
    defRowObj: (i) => {
      return {
        id: i,
        mergeColumn: '合并列'
      };
    },
    defRowColObj: (j) => {
      return `内容${j}`;
    }
  }
) => {

  let list = [];
  for (let i = 0; i < num; i++) {
    let rowObj = params.defRowObj(i);
    for (let j = 0; j < colNum; j++) {
      rowObj[`${COLUMNS_KEY}${j}`] = params.defRowColObj(j);
      // rowObj[`title${j}`] = i % 10 === 0 ? '绝对是分开发的口复上课都会发生的看法和速度快水电费快递师傅看电视' : i;
    }
    list.push(rowObj);
  }

  return list;

};