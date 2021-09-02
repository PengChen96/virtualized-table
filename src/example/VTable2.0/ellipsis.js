
/**
 * 单元格自动省略
 */

import React, {useEffect, useState} from 'react';
import {VTable} from '@libs/VTable2.0';
import {generateColumns, generateData} from '../common/utils';

export default (props) => {
  let {columnsNum, dataNum, align} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setColumns(generateColumns(
      columnsNum,
      {
        columnObj: (i) => {
          return {
            align,
            ellipsis: true,
            // width: i % 4 === 0 ? 150 : 100
          };
        }
      }
    ));
    setDataSource(generateData(
      dataNum,
      columnsNum,
      (j) => {
        return `内容A内容B内容C内容D内容E${j}`;
      }
    ));
  }, [props.columnsNum, props.dataNum, props.align]);
  return (
    <>
        <h2>VTable ellipsis</h2>
        <VTable
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={props.bordered}
          // 高度
          visibleHeight={400}
        />
    </>
  );
};
