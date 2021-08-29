
/**
 * 表格行/列合并
 */

import React, {useEffect, useState} from 'react';
import {VTable} from '../../../libs/VTable2.0';
import {generateColumns, generateData} from '../common/utils';

export default (props) => {

  let {columnsNum, dataNum, align} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setColumns(getColumns());
    setDataSource(generateData(
      dataNum,
      columnsNum,
    ));
  }, [props.columnsNum, props.dataNum, props.align]);

  const getColumns = () => {
    let dynamicColumns = generateColumns(
      columnsNum,
      {
        columns: [],
        columnObj: () => {
          return {
            align: align,
          };
        },
      }
    );
    const mergesArr = [
      { s: {c: 1, r: 1}, e: {c: 6, r: 1} },
      { s: {c: 1, r: 2}, e: {c: 2, r: 5} },
      { s: {c: 3, r: 2}, e: {c: 4, r: 3} },
      { s: {c: 3, r: 4}, e: {c: 4, r: 5} },
      { s: {c: 5, r: 2}, e: {c: 6, r: 2} },
      { s: {c: 5, r: 3}, e: {c: 6, r: 3} },
      { s: {c: 5, r: 4}, e: {c: 6, r: 4} },
      { s: {c: 1, r: 6}, e: {c: 6, r: 7} },
    ];
    const mergesObj = VTable.utils.formatToCellsSpan(mergesArr);
    return dynamicColumns.map((column, colIndex) => {
      column.render = (value, row, rowIndex, realRowIndex) => {
        const obj = {
          children: value,
          props: mergesObj[`${colIndex}:${realRowIndex}`]
        };
        return obj;
      };
      return column;
    });
  };

  return (
      <>
        <h2>VTable</h2>
        <VTable
          // 固定行高 跨行必须
          fixedRowHeight={true}
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={props.bordered}
          // 可视高度
          visibleHeight={400}
          // 行高
          rowHeight={36}
        />
      </>
  );

};
