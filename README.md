
<p align="center">
  <a href="#">
    <img width="300" src="https://raw.githubusercontent.com/PengChen96/virtualized-table/master/logo.png">
  </a>
  <h1 align="center" style="margin-top: 0px">virtualized-table</h1>
</p>

[![npm version](https://badge.fury.io/js/virtualized-table.svg)](http://badge.fury.io/js/virtualized-table)
[![Build Status](https://travis-ci.org/PengChen96/virtualized-table.svg?branch=master)](https://travis-ci.org/PengChen96/virtualized-table)
[![codecov](https://codecov.io/gh/PengChen96/virtualized-table/branch/master/graph/badge.svg)](https://codecov.io/gh/PengChen96/virtualized-table)
[![NPM downloads](http://img.shields.io/npm/dm/virtualized-table.svg?style=flat-square)](https://www.npmjs.com/package/virtualized-table)
大数据量虚拟化表格组件

## Usage

### Install
```
$ npm install virtualized-table
```

### Example
```javascript
    import {VTable} from "virtualized-table";

    <VTable
      columns={columns}
      dataSource={dataSource}
      fixedLeftColumnCount={2}
    />
```
[完整示例](https://github.com/PengChen96/virtualized-table/blob/master/src/example/VTable/index.js)

### API
#### VTable
参数 | 说明 | 类型 | 默认值
---|---|---|---
columns | 表格列 | array | []
dataSource | 表格数据 | array | []
fixedLeftColumnCount | 左边固定列 列数 | number | 0
fixedRightColumnCount | 右边固定列 列数 | number | 0
visibleWidth | 可视区域宽度 | number | 1200
visibleHeight | 可视区域高度 | number | 400
mainRowHeight | 表格主内容行高 | number | 40
columnOffsetCount | 左右列偏移量 | number | 4
emptyText | 空数据渲染 | element | -
rowSelection | 勾选 | object | -
onCellTap | 点击每个子项 | func | Function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
onSelectAll | 勾选全部 | func | Function(selected, selectedRows)
onSelect | 勾选行 | func | Function(record, selected, selectedRows)
rowKey | 行键 | string | index
onRowRemove | 删除行 | func | Function(e, row, rowIndex, realRowIndex)
rowRemoveText | 删除行内容 | element | -
rowRemoveVisible | 是否显示删除按钮 | bool | true
className | .v-table样式 | string | -
loading | 是否显示加载中 | bool | false
loadingText | 加载中内容 | element | "数据加载中，请稍后.."
rowActiveKey | 标记行的键 | string | "active"
rowActiveColor | 标记行的颜色 | string | "#fff1f0"
footerColumnData | 固定底部行数据 | array | -
pointerEventDisabled | 禁止鼠标事件 | bool | false

#### columns
参数 | 说明 | 类型 | 默认值
---|---|---|---
key | 键 | string | -
title | 列头显示文字 | string | -
width | 列宽度 | number | 150
style | 样式 | object | -
render | 数据渲染函数 | func | Function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
headRender | 渲染表头函数 | func | Function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex)
className | 单元格样式 | string | -
headerClassName | 表头样式(不设置会默认className) | string | -
subColumns | 二级表头(属性跟columns一致) | array | -

## License
virtualized-table is available under the MIT License.
