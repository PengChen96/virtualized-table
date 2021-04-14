

#### VTable2.0
参数 | 说明 | 类型 | 默认值
---|---|---|---
bordered | 是否显示边框 | boolean | false
rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string/function(record) | -
rowHeight | 表格行高 | number | 40


#### columns
参数 | 说明 | 类型 | 默认值
---|---|---|---
align | 设置单元格对齐方式 | string | 'left'，'right'，'center'
ellipsis | 是否显示省略号 | boolean | false


#### rowSelection
参数 | 说明 | 类型 | 默认值
---|---|---|---
columnWidth | 自定义列表选择框宽度 | number | 60
selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[]/number[] | []
getCheckboxProps | 选择框的默认属性配置 | function(record) | -
onChange | 选中项发生变化时的回调 | function(selectedRowKeys, selectedRows) | -
onSelect | 用户手动选择/取消选择某行的回调 | function(record, selected, selectedRows) | -
onSelectAll | 用户手动选择/取消选择所有行的回调 | function(selected, selectedRows) | -
