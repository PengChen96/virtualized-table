
/**
 * Created by Administrator on 2019/10/20.
 */

import React, {useEffect, useState} from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import {Grid} from '../../../../libs/VTable2.0';
import {generateColumns, generateData} from '../../common/utils';
import './column-resize.less';

export default (props) => {
  let {columnsNum = 25, dataNum = 10} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setColumns(generateColumns(
      columnsNum
    ));
    setDataSource(generateData(
      dataNum,
      columnsNum
    ));
  }, []);
  //
  const handleResize = index => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };
  const newColumns = () => columns.map((col, index) => ({
    ...col,
    onCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
        <h2>Grid column resize</h2>
        <Grid
          // 表格样式类名
          className="my-custom-class"
          // 列
          columns={newColumns()}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={true}
          // 高度
          visibleHeight={400}
          components={{
            cell: ResizableCell
          }}
        />
    </>
  );
};
const ResizableCell = (props) => {

  const { onResize, width = 150, ...restProps } = props;
  // if (!width) {
  //   return <th {...restProps} />;
  // }
  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      resizeHandles={['e']}
      handle={<span className="custom-handle-e"  onClick={e => {e.stopPropagation();}}/>}
      // draggableOpts={{ grid: [25, 25] }}
    >
      <div className={'my_cell'} {...restProps} />
    </Resizable>
  );

};
