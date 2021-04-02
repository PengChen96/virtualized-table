
/**
 * Created by Administrator on 2021/04/01.
 */

import React, {useEffect, useState} from 'react';
import {VTable} from '../../../libs/VTable2.0';
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
        <h2>VTable</h2>
        <VTable
          // 表格样式类名
          className="my-custom-class"
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={props.bordered}
          // 是否使用sticky
          isSticky={props.isSticky}
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
