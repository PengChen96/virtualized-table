

#### Grid2.0
参数 | 说明 | 类型 | 默认值
---|---|---|---
bordered | 是否显示边框 | boolean | false
className | 表格样式类名 | string | -
onCellTap | 点击每个子项 | function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) | -
components | 覆盖默认的Grid元素 {row, header{cell}, body{cell}} | object | -
onRow | 设置行属性 | function(row, realRowIndex) | -


#### columns
参数 | 说明 | 类型 | 默认值
---|---|---|---
align | 设置列的对齐方式 | string | 'left'，'right'，'center'
colSpan | 列合并，设置为0时，不渲染 | function(rowIndex) | -
dataIndex | 列数据在数据项中对应的路径，暂不支持通过数组查询嵌套路径 | string | -
ellipsis | 是否显示省略号 | boolean | false
key | 列数据的键值 | string | -
render | 生成复杂数据的渲染函数 | function(value, row, rowIndex, realRowIndex, column, columnIndex, realColumnIndex) | -
onHeaderCell | 设置表头属性 | function(column, realRowIndex) | -
onBodyCell | 设置表格属性 | function(column, realRowIndex) | -
onFooterCell | 设置合计行属性 | function(column, realRowIndex) | -

