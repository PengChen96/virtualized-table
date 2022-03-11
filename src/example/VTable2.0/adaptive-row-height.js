/**
 * 自适应行高
 */

import React, {useEffect, useState} from 'react';
import {VTable} from '@libs/VTable2.0';
import {generateColumns, generateData} from '../common/utils';

export default (props) => {
  let {columnsNum, dataNum, align, bordered, fixedLeftColumnCount, isSticky} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setColumns(generateColumns(
      columnsNum,
      {
        columnObj: () => {
          return {
            align,
          };
        }
      }
    ));
    setDataSource(generateData(
      dataNum,
      columnsNum,
      (j) => {
        return [1,2,3].includes(j % 8) ? `内容A内容B内容C内容D内容E内容A内容B内容C内容D内容E${j}` : `内容A${j}`;
      }
    ));
  }, [props.columnsNum, props.dataNum, props.align]);
  return (
    <>
      <h2>VTable adaptive-row-height</h2>
      <VTable
        // 列
        columns={columns}
        // 数据
        dataSource={dataSource}
        // 是否使用sticky
        isSticky={isSticky}
        // 同步行高
        shouldRowHeightSync={true}
        // 固定列数
        fixedLeftColumnCount={fixedLeftColumnCount}
        // 边框
        bordered={bordered}
        // 高度
        visibleHeight={400}
      />
    </>
  );
};
