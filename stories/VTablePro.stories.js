// VTablePro.stories.js | VTablePro.stories.jsx

import React from 'react';
import {getDefaultProps} from './knobs';
import VTableCase from '../src/example/VTable2.0';
import VTable2MD from '../libs/VTable2.0/README.md';
import VTableColSpanRowSpan from '../src/example/VTable2.0/colspan-rowspan';
import VTableColumnResize from '../src/example/VTable2.0/column-resize';
import VTableDragSorting from '../src/example/VTable2.0/drag-sorting';
import VTableEllipsis from '../src/example/VTable2.0/ellipsis';

export default {
  title: 'VTablePro/VTable2.0',
};

export const VTablePro = (args) => {
  const props = getDefaultProps({
    fixedLeftColumnCount: true,
    fixedRightColumnCount: true,
    isSticky: true
  });
  return <VTableCase {...props} {...args} />;
};
VTablePro.storyName = 'VTable default';
VTablePro.parameters = {
  docs: {
    page: VTable2MD,
  },
};

// 合并列
export const ColSpanRowSpan = (args) => {
  const props = getDefaultProps();
  return <VTableColSpanRowSpan {...props} {...args} />;
};
ColSpanRowSpan.storyName = 'colspan-rowspan';
ColSpanRowSpan.parameters = {
  docs: {
    page: VTable2MD,
  },
};

// 结合react-resizable拖拽列
export const ColumnResize = (args) => {
  const props = getDefaultProps();
  return <VTableColumnResize {...props} {...args} />;
};
ColumnResize.storyName = 'column-resize';
ColumnResize.parameters = {
  docs: {
    page: VTable2MD,
  },
};

// 结合react-dnd拖拽行示例
export const DragSorting = (args) => {
  const props = getDefaultProps();
  return <VTableDragSorting {...props} {...args} />;
};
DragSorting.storyName = 'drag-sorting';
DragSorting.parameters = {
  docs: {
    page: VTable2MD,
  },
};

// 单元格自动省略
export const Ellipsis = (args) => {
  const props = getDefaultProps();
  return <VTableEllipsis {...props} {...args} />;
};
Ellipsis.storyName = 'ellipsis';
Ellipsis.parameters = {
  docs: {
    page: VTable2MD,
  },
};
