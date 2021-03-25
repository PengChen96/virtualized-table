/**
 * Created by Administrator on 2019/10/20.
 */

import React, {useEffect, useState} from 'react';
import {MultiGrid} from '../../../libs/VTable2.0';
import {generateColumns, generateData} from '../common/utils';

export default (props) => {
  let {columnsNum, dataNum, align} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setColumns(generateColumns(
      columnsNum,
      {
        columnObj: () => {
          return {
            align: align,
          };
        }
      }
    ));
    setDataSource(generateData(dataNum, columnsNum));
  }, [props.columnsNum, props.dataNum, props.align]);
  return (
      <>
        <h2>MultiGrid</h2>
        <MultiGrid
          // 表格样式类名
          className="my-custom-class"
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={props.bordered}
          //
          fixedLeftColumnCount={props.fixedLeftColumnCount}
          fixedRightColumnCount={props.fixedRightColumnCount}
          //
          visibleHeight={400}
          minRowHeight={40}
          emptyText={<div>未查询到数据</div>}
        />
      </>
  );
};
