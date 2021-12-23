
/**
 * 行删除
 */

import React, {useEffect, useState} from 'react';
import {VTable} from '@libs/VTable2.0';
import {generateColumns, generateData} from '../common/utils';

export default (props) => {
  let {columnsNum, dataNum, align} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  let [selectedRowKeys, setSelectedRowKeys] = useState(['rowKey1', 'rowKey3']);
  useEffect(() => {
    setColumns(generateColumns(
      columnsNum,
      {
        columns: [],
        columnObj: () => {
          return {
            align: align,
          };
        }
      }
    ));
    setDataSource(generateData(dataNum, columnsNum));
  }, [props.columnsNum, props.dataNum, props.align]);

  const rowKey = (item) => `${item.rowKey}`;
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
          // 固定列数
          fixedLeftColumnCount={props.fixedLeftColumnCount}
          fixedRightColumnCount={props.fixedRightColumnCount}
          //
          visibleHeight={400}
          rowHeight={36}
          //
          rowKey={rowKey}
          rowSelection={{
            columnWidth: 60,
            selectedRowKeys,
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(selectedRowKeys, selectedRows);
              setSelectedRowKeys(selectedRowKeys);
            },
            rowRemoveVisible: true,
            onRowRemove: (e, row, rowIndex, realRowIndex) => {console.log(e, row, rowIndex, realRowIndex);}
          }}
          onRow={(record, index) => {
            return {
              onMouseEnter: event => { /*console.log('enter', event, record, index);*/ }, // 鼠标移入行
              onMouseLeave: event => { /*console.log('leave', event, record, index);*/ },
            };
          }}
        />
      </>
  );
};
