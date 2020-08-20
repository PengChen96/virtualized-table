import React from 'react';

const ColumnRender = (sumList , assembleDataIndex) => {
  // 台账左侧固定列
  const preColumns = [
    {
      title: '工号',
      key: 'employeeNumber',
      fixed: 'left',
      width: 80,
    },
    {
      title: '姓名',
      key: 'name',
      fixed: 'left',
      width: 90
    },
    {
      title: '部门名称',
      key: 'deptName',
      fixed: 'left',
      width: 90,
     },
    {
      title: '证照号码',
      key: 'licenseNumber',
      width: 200,
    },
    {
      title: '状态',
      key: 'state',
      width: 80,
    },
    {
      title: '参保方案',
      key: 'planUuid',
      width: 120,
    },
  ];
  // 台账最后侧的汇总列
  const lastColumns = [
    {
      title: '公司社保费',
      key: 'companySocialInsuranceAmount',
      width: 100,
    },
    {
      title: '个人社保费',
      key: 'personalSocialInsuranceAmount',
      width: 100,
    },
    {
      title: '公司公积金',
      key: 'companyHousingFundAmount',
      width: 100,
    },
    {
      title: '个人公积金',
      key: 'personalHousingFundAmount',
      width: 100,
    },
    {
      title: '总计',
      key: 'totalAmount',
      width: 120,
    },
  ];
  // 组装各种社保项目的信息
  sumList.map((sumItem) => {
    const { itemName, itemType } = sumItem;
    // 两个表格共用的dataIndex属性列表
    const dataIndexList = [
      {
        title: '基数',
        width: 90,
        socinsIndex: 'radix',
        totalIndex: 'countRadix',
        // 自定义列时服务端配置的code
        customCode: 'radix',
      },
      {
        title: '公司比例',
        width: 90,
        socinsIndex: 'companyRatio',
        totalIndex: 'companyRatio',
        customCode: 'ratio',
      },
      {
        title: '个人比例',
        width: 90,
        socinsIndex: 'personalRatio',
        totalIndex: 'personalRatio',
        customCode: 'ratio',
      },
      {
        title: '公司金额',
        width: 90,
        socinsIndex: 'companyAmount',
        totalIndex: 'countCompanyAmount',
        customCode: 'amount',
      },
      {
        title: '个人金额',
        width: 90,
        socinsIndex: 'personalAmount',
        totalIndex: 'countPersonalAmount',
        customCode: 'amount',
      },
    ];
    preColumns.push(
      {
      title: itemName,
      key: '',
      subColumns: dataIndexList.map((item) => {
        const key = assembleDataIndex(item.socinsIndex, itemName, itemType);
        return {
          ...item,
          key,
          render: (text)=>{
            return <input value={text} />
          }
        };
      }),
    }
    );
    return itemName;
  });

  return {
    customCols: preColumns.concat(lastColumns),
    // customCols: lastColumns,
  };
};

export default ColumnRender;
