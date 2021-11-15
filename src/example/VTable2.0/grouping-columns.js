/**
 * 表格行/列合并
 */

import React, {useEffect, useState} from 'react';
import {VTable} from '@libs/VTable2.0';

export default (props) => {

  let {dataNum} = props;
  let [columns, setColumns] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setColumns(getColumns());
    const data = [];
    for (let i = 0; i < dataNum; i++) {
      data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      });
    }
    setDataSource(data);
    // setDataSource(generateData(
    //   dataNum,
    //   columnsNum,
    // ));
  }, [props.columnsNum, props.dataNum, props.align]);

  const getColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: 'Other',
        children: [
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 150,
            sorter: (a, b) => a.age - b.age,
          },
          {
            title: 'Address',
            children: [
              {
                title: 'Street',
                dataIndex: 'street',
                key: 'street',
                width: 150,
              },
              {
                title: 'Block',
                children: [
                  {
                    title: 'Building',
                    dataIndex: 'building',
                    key: 'building',
                    width: 100,
                  },
                  {
                    title: 'Number',
                    dataIndex: 'number',
                    key: 'number',
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Company',
        children: [
          {
            title: 'Company Address',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 200,
          },
          {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: 200,
          },
        ],
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
      },
    ];
  };

  return (
    <>
      <h2>VTable group columns</h2>
      <VTable
        // isSticky={false}
        // 边框
        bordered={props.bordered}
        // 列
        columns={columns}
        // 数据
        dataSource={dataSource}
        // 固定行高 跨行必须
        fixedRowHeight={true}
        // 行高
        rowHeight={36}
        // 可视高度
        visibleHeight={400}
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
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
          }
        }}
      />
    </>
  );

};
