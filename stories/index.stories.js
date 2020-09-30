import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
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
    const bordered = number('totalPage', 100);
    return <GridCase bordered={bordered}/>;
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
  .add('emoji', () => (  // 这里是另一个 story
    <Dnd/>
  ), {
    notes: {
      Introduction: markdown,
      DesignNotes: markdown
    }
  });

