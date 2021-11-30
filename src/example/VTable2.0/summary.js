
/**
 * Created by Administrator on 2021/04/01.
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
            ellipsis: true,
            align: align,
          };
        }
      }
    ));
    setDataSource(generateData(dataNum, columnsNum));
  }, [props.columnsNum, props.dataNum, props.align]);

  const summary = () => {
    const dataList = [{'checkBox': 'N/A'}];
    columns.forEach((column, index) => {
      dataList[0][column.key] = '总结列' + index;
    });
    return dataList;
  };
  const summaryData = summary();
  const rowKey = (item) => `${item.rowKey}`;
  return (
      <>
        <h2>VTable summary</h2>
        <VTable
          // 表格样式类名
          className="my-custom-class"
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          summary={summaryData}
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
            getCheckboxProps: (record) => ({
              disabled: record.id === 5
            }),
            selectedRowKeys,
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(selectedRowKeys, selectedRows);
              setSelectedRowKeys(selectedRowKeys);
            },
            onSelect: (record, selected, selectedRows, nativeEvent)=>{console.log(record, selected, selectedRows);},
            onSelectAll: (selected, selectedRows, changeRows) => {
              console.log(selected, selectedRows, changeRows);
            }
          }}
        />
      </>
  );
};
