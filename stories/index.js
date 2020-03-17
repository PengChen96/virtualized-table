import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Button', module)
  .add('with text', () => (  // 一个 add 表示添加一个 story
    <span>Hello Button</span>
  ))
  .add('with some emoji', () => (  // 这里是另一个 story
    <span role="img" aria-label="so cool">😀 😎 👍 💯</span>
  ));