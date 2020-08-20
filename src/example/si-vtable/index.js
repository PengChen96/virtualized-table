import React, { useEffect, useState } from 'react';
import generateCols from './columns';
import { VTable } from '../../../libs/VTable';
import  getData from './data';

const assembleDataIndex = (dataCode, dataName, dataType) => `${dataCode}-${dataName}-${dataType}`;

// 组装所有社保公积金项目列表(存在重复的社保项目)
const setSocinsItemList = (socinsList) => {
  const socinsItemList = [];
  socinsList.map((socinsItem) => {
    socinsItem.insuranceDetailList.map((detail) => {
      socinsItemList.push(detail);
      return detail;
    });
    return socinsItem;
  });
  return socinsItemList;
};

 // 社保公积金项目平铺并合并到参保人员信息对象中
 const doTileSocinsList = (socinsList, insuranceItemUnion) => {
  const list = socinsList.map((socinsItem) => {
    const detailData = {};
    const newItemlist = [];
    // insuranceItemUnion项目合集 包含 insuranceDetailList项目合集，这里需要处理合集时的默认值问题，默认置 0.00
    if (insuranceItemUnion.length > socinsItem.insuranceDetailList.length) {
      let tempData = {};
      // 查询当前参保人的的项目明细
      const existNameList = socinsItem.insuranceDetailList.map((detail) => {
        tempData = { ...detail };
        return detail.itemName;
      });
      // 组装一份新的社保公积金项目明细
      Object.assign(tempData, defaultSocinsItem);
      // 遍历全集，并补全子集
      insuranceItemUnion.forEach((item) => {
        if (existNameList.indexOf(item.itemName) === -1) {
          newItemlist.push({
            ...tempData,
            itemName: item.itemName,
            itemType: item.itemType,
          });
        }
      });
      // 将缺少的社保项目补充到 socinsList 中
      socinsItem.insuranceDetailList = socinsItem.insuranceDetailList.concat(newItemlist);
    }
    socinsItem.insuranceDetailList.map((detail) => {
      const { itemName, itemType } = detail;
      Object.keys(detail).map((key) => {
        // 组装每一项column数据
        detailData[assembleDataIndex(key, itemName, itemType)] = detail[key];
        return key;
      });
      return detail;
    });
    return { ...socinsItem, ...detailData };
  });
  return list;
};

 // 注意：insuranceItemSumList作为表头合集，强依赖itemName字段值与insuranceDetailList的itemName相同
 const unitInsuranceItem = (itemSumList = [], socinsList = []) => {
  const socinsItemList = setSocinsItemList(socinsList);
  const tileSumTotalData = {}
  // 社保公积金汇总数据为空时，默认设置五险一金为表头信息
  const list = itemSumList.map((sumItem) => {
    const newItem = {};
    let sumItemType = '';
    // 给每个dataIndex增加项目类型字段
    socinsItemList.some(({ itemName, itemType }) => {
      sumItemType = itemType;
      return sumItem.itemName === itemName;
    });
    Object.keys(sumItem).map((key) => {
      newItem[assembleDataIndex(key, sumItem.itemName, sumItemType)] = sumItem[key];
      return key;
    });
    // 平铺数据汇总列表对象
    Object.assign(tileSumTotalData, newItem);
    return { ...sumItem, itemType: sumItemType };
  });
  return list;
};


const MassTable = () => {
  const [dataInfo, setDataInfo] = useState({
    data: [],
    columns:  [],
    total: 0 
  });
  const [value, setValue] = useState(5000);
  const [length, setLength] = useState(5000);

  useEffect(() => {
    const loadData = () => {
      console.time("XXX");
      const { list, total, insuranceItemSumList } = getData({ length });
      const union = unitInsuranceItem(insuranceItemSumList, list);
      const sourceData = doTileSocinsList(list, union);
      const { customCols } = generateCols(union, assembleDataIndex);
      console.timeEnd("XXX");
      setDataInfo({
        data: sourceData,
        columns: customCols,
        total
      })
    };
    loadData();
  }, [length]);

  return (
    <div>
      <div>
        <input type="number" value={value} onChange={ e => setValue(Number(e.target.value)) } placeholder='输入渲染条数，默认5000条'/> 
        <button onClick={() => setLength(value)}>查询</button>
      </div>
      <VTable 
        columns={dataInfo.columns} 
        dataSource={dataInfo.data}
        fixedLeftColumnCount={2}
        columnOffsetCount={100}
        visibleHeight={'calc(100vh - 100px )'}
       />
    </div>
    
  );
};

export default MassTable;
