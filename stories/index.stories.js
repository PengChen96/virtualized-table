import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import VTable from '../src/example/VTable/index';
import VTableMD from '../README.md';

// 2.0
import VTable2 from '../src/example/VTable2.0/index';
import markdown from '../libs/VTable2.0/README.md';
//　
import GridCase from '../src/example/VTable2.0/GridCase';
import GridMD from '../libs/VTable2.0/Grid_README.md';
import Dnd from '../src/example/VTable2.0/dnd';
// 结合react-dnd拖拽行示例
import GridDragSorting from '../src/example/VTable2.0/Grid/drag-sorting';
import GridDragSortingMD from '../src/example/VTable2.0/Grid/drag-sorting.md';
// 行/列合并示例
import GridColspanRowSpan from '../src/example/VTable2.0/Grid/colspan-rowspan';
import GridColspanRowSpanMD from '../src/example/VTable2.0/Grid/colspan-rowspan.md';
// ellipsis
import GridEllipsis from '../src/example/VTable2.0/Grid/ellipsis';

storiesOf('VTable1.0|VTable', module)
  .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .add('default', () => (
    <span>😀 😎 👍 💯<VTable/></span>
  ),{
    notes: {VTableMD}   // 将会渲染 markdown 内容
  });

storiesOf('VTable2.0|VTable', module)
  .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .add('default', () => (
    <span>😀 😎 👍 💯<VTable2/></span>
  ),{
    notes: {markdown}   // 将会渲染 markdown 内容
  });

storiesOf('VTable2.0|MultiGrid', module)
  .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .add('default', () => (
    <span/>
  ),{
    notes: {markdown}   // 将会渲染 markdown 内容
  });

storiesOf('VTable2.0|Grid', module)
  .addDecorator(storyFn => <div style={{ padding: 16 }}>{storyFn()}</div>)
  .addDecorator(withKnobs)
  .add('default', () => {  // 一个 add 表示添加一个 story
    const columnsNum = number('ColumnsNum', 25, {range: true, min: 25, max: 1000, step: 25});
    const dataNum = number('DataNum', 50, {range: true, min: 50, max: 100000, step: 50});
    const bordered = boolean('Bordered', true);
    return <GridCase
      columnsNum={columnsNum}
      dataNum={dataNum}
      bordered={bordered}
    />;
  },{
    notes: {GridMD}   // 将会渲染 markdown 内容
  })
  .add('colspan-rowspan', () => (
    <GridColspanRowSpan/>
  ),{
    notes: {GridColspanRowSpanMD}
  })
  .add('drag-sorting', () => (
    <GridDragSorting/>
  ),{
    notes: {GridDragSortingMD}
  })
  .add('ellipsis', () => (
    <GridEllipsis/>
  ))
  .add('emoji', () => (  // 这里是另一个 story
    <Dnd/>
  ), {
    notes: {
      Introduction: markdown,
      DesignNotes: markdown
    }
  });

