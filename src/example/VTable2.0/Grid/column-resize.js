
/**
 * Created by Administrator on 2019/10/20.
 */

import React, {useEffect, useState} from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import {VTable} from '../../../../libs/VTable2.0';
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
  }, [props.columnsNum, props.dataNum,]);
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
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
        <h2>Grid column resize</h2>
        <VTable
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
          isSticky={props.isSticky}
          components={{
            header: {
              cell: ResizableCell
            },
            // body: {
            //   cell: ResizableCell
            // }
          }}
        />
    </>
  );
};
const ResizableCell = (props) => {

  const { onResize, width = 150, ...restProps } = props;
  let [w, setW] = useState(width);
  let [resizeActive, setResizeActive] = useState(false);
  const _onResize = (e, { size }) => {
    e.stopPropagation();
    setW(size.width);
  };
  const _onResizeStart = (e) => {
    e.stopPropagation();
    setResizeActive(true);
  };
  const _onResizeStop = (e, {element, size}) => {
    e.stopPropagation();
    setResizeActive(false);
    onResize(e, {element, size});
  };
  return (
    <Resizable
      width={w}
      height={0}
      onResize={_onResize}
      onResizeStart={_onResizeStart}
      onResizeStop={_onResizeStop}
      resizeHandles={['e']}
      handle={<span className={`custom-handle-e ${resizeActive ? 'active' : ''}`} style={{left: w - 5}} onClick={e => {e.stopPropagation();}}/>}
      // draggableOpts={{ grid: [25, 25] }}
    >
      <div className={'my_cell'} {...restProps} />
    </Resizable>
  );

};
