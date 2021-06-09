
/**
 * Created by Administrator on 2019/10/20.
 */

import React, {useEffect, useState} from 'react';
import {Grid} from '../../../../libs/VTable2.0';
import {generateColumns, generateData} from '../../common/utils';

export default (props) => {
  let {columnsNum = 25, dataNum = 100} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setColumns(generateColumns(
      columnsNum,
      {
        columnObj: (i) => {
          return {
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
  }, []);
  return (
    <>
        <h2>Grid ellipsis</h2>
        <Grid
          // 表格样式类名
          className="my-custom-class"
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={true}
          // 高度
          visibleHeight={400}
        />
    </>
  );
};
