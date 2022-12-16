
<p align="center">
  <a href="#">
    <img width="300" src="https://raw.githubusercontent.com/PengChen96/virtualized-table/master/logo.png"/>
  </a>
  <h1 align="center">virtualized-table</h1>
</p>

[![npm version](https://badge.fury.io/js/virtualized-table.svg)](http://badge.fury.io/js/virtualized-table)
[![Build Status](https://travis-ci.com/PengChen96/virtualized-table.svg?branch=master)](https://travis-ci.com/github/PengChen96/virtualized-table)
[![codecov](https://codecov.io/gh/PengChen96/virtualized-table/branch/master/graph/badge.svg)](https://codecov.io/gh/PengChen96/virtualized-table)
[![NPM downloads](http://img.shields.io/npm/dm/virtualized-table.svg?style=flat-square)](https://www.npmjs.com/package/virtualized-table)  
大数据量虚拟化表格组件

## 📦 安装
**使用npm或yarn**
```shell
npm install --save virtualized-table 
# or
yarn add virtualized-table 
```
**使用CDN**
```html
<!-- 注意: 部署时，将 "development.umd.js" 替换为 "production.umd.min.js"-->
<script crossorigin src="https://unpkg.com/virtualized-table/dist/vtable.development.umd.js"></script>
```
<details>
  <summary><b>CDN Availability</b> (click to show)</summary>

|    CDN     | URL                                        |
|-----------:|:-------------------------------------------|
|    `unpkg` | <https://unpkg.com/virtualized-table/>                  |
| `jsDelivr` | <https://jsdelivr.com/package/npm/virtualized-table>    |
</details>

## 🔨 使用
### 示例
```javascript
    import {VTablePro} from "virtualized-table";
    const columns = [
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '住址', dataIndex: 'address' },
    ];
    const dataSource = [
      { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
      { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    ];
    <VTablePro
      columns={columns}
      dataSource={dataSource}
    />
```
[简单示例](https://github.com/PengChen96/virtualized-table/blob/master/src/example/html/eg-basic-umd.html)

## 📖 API
### VTable
参数 | 说明 | 类型 | 默认值
---|---|---|---
bordered | 是否显示边框 | boolean | false
columns | 表格列的配置 | object[] | []
components | 覆盖默认的Grid元素 {header{row, cell}, body{row, cell}} | object | -
columnOffsetCount | 表格可视区域可渲染的列数 | number | 8
columnVisibleCount | 表格列渲染数左右偏移量 | number | 4
dataSource | 数据数组 | object[] | []
estimatedRowHeight | 一行的预估高度 | number | 40
estimatedColumnWidth | 一列的预估宽度 | number | 40
fixedLeftColumnCount | 左边固定列 列数 | number | 0
fixedRightColumnCount | 右边固定列 列数 | number | 0
fixedRowHeight | 固定行高(需要行合并/分组表头时设置为true) | boolean | false
headerBordered | 是否显示表头边框,不设置则按bordered | boolean | false
isSticky | 是否使用粘性布局 | boolean | - 看浏览器是否支持sticky
loading | 页面是否加载中 | boolean / Spin props | false
locale | 默认文案设置，目前包括空数据文案 | object | emptyText: 暂无数据
rowHeight | 表格行高 | number | 40
rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string/function(record) | -
rowOffsetCount | 表格行渲染数上下偏移量 | number | 20
rowSelection | 表格行是否可选择,rowSelection props | object | -
rowVisibleCount | 表格可视区域可渲染的行数 | number | 20
summary | 总结栏数据 | object[] | -
shouldRowHeightSync | 是否要同步行高（isSticky=false,有固定列并且行高不固定时设置为true） | boolean | false
visibleHeight | 表格可视区域高度 | number | 400
onRow | 设置行属性 | function(row, realRowIndex) | -

*onRow 用法*
```javascript
<Table
  onRow={(record, index) => {
    return {
      onClick: event => {}, // 点击行
      onDoubleClick: event => {},
      onContextMenu: event => {},
      onMouseEnter: event => {}, // 鼠标移入行
      onMouseLeave: event => {},
    };
  }}
/>
```

#### columns
参数 | 说明 | 类型 | 默认值
---|---|---|---
headerAlign | 设置列表头的对齐方式 | string / 'left'，'right'，'center' | 'center'
align | 设置列的对齐方式 | string / 'left'，'right'，'center' | 'left'
dataIndex | 列数据在数据项中对应的路径，暂不支持通过数组查询嵌套路径 | string | -
ellipsis | 是否显示省略号 | boolean | false
key | 列数据的键值 | string | -
render | 生成复杂数据的渲染函数,@return 里面可以设置表格[行/列合并](https://pengchen96.github.io/virtualized-table/?path=/story/vtable2-0-grid--colspan-rowspan) | function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) | -
title | 列头显示文字（函数用法暂不支持多级表头） | ReactNode/(value, row, rowIndex)=>ReactNode | -
onCell | 设置表头、表格、合计行属性 | function(column, realRowIndex) | -
onHeaderCell | 设置表头属性 | function(column, realRowIndex) | -
onBodyCell | 设置表格属性 | function(column, realRowIndex) | -
onFooterCell | 设置合计行属性 | function(column, realRowIndex) | -

*render @return 合并行/列*
```javascript
render(value) {
  return {
    children: value,
    props: {
      colSpan: 1, // 列合并，设置为0时，不渲染(设置display:none)
      rowSpan: 1, // 行合并，设置为0时，不渲染(设置visibility:hidden)
    }
  }
}
```
*表头分组：columns[n] 可以内嵌children，以渲染分组表头。*


#### rowSelection
参数 | 说明 | 类型 | 默认值
---|---|---|---
columnWidth | 自定义列表选择框宽度 | number | 60
columnTitle | 自定义列表选择框标题 | string / ReactNode | -
columnProps | 自定义列属性 | object | -
rowRemoveVisible | hover显示行删除图标 | boolean | false
selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[]/number[] | []
getCheckboxProps | 选择框的默认属性配置 | function(record){ return {disabled, notVisible} } | -
onChange | 选中项发生变化时的回调 | function(selectedRowKeys, selectedRows) | -
onSelect | 用户手动选择/取消选择某行的回调 | function(record, selected, selectedRows) | -
onSelectAll | 用户手动选择/取消选择所有行的回调 | function(selected, selectedRows) | -
onRowRemove | 点击行删除回调 | function(e, row, rowIndex, realRowIndex) | -


#### Spin
参数 | 说明 | 类型 | 默认值
---|---|---|---
spinning | 是否为加载中状态 | boolean | false
spinningText | 加载中内容 | string / ReactNode | -
wrapperClassName | 包装器的类属性 | string | -


### VTable.utils
- VTable.utils.formatToCellsSpan(arr)
```
[
  {
    s: {c: 0, r: 2},
    e: {c: 1, r: 2},
  },
]

=>

{
  '0:2': {colSpan: 2, rowSpan: 1},
  '1:2': {colSpan: 0, rowSpan: 0},
}
```

## 📝 License
virtualized-table is available under the MIT License.
