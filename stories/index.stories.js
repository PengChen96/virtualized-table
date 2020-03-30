import React from 'react';
import { storiesOf } from '@storybook/react';
import markdown from '../libs/VTable2.0/README.md';
import VTable2 from '../src/example/VTable2.0/index';

storiesOf('VTable', module)
  .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .add('default', () => (
    <span>😀 😎 👍 💯<VTable2/></span>
  ),{
    notes: {markdown}   // 将会渲染 markdown 内容
  });

storiesOf('MultiGrid', module)
  .addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .add('default', () => (
    <span>😀 😎 👍 💯</span>
  ),{
    notes: {markdown}   // 将会渲染 markdown 内容
  });

storiesOf('Grid', module)
  .add('default', () => (  // 一个 add 表示添加一个 story
    <span>Hello Button</span>
  ))
  .add('emoji', () => (  // 这里是另一个 story
    <span role="img" aria-label="so cool">😀 😎 👍 💯</span>
  ), {
    notes: {
      Introduction: markdown,
      DesignNotes: markdown
    }
  });

