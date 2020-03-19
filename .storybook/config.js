
import { configure, addParameters } from '@storybook/react';

function loadStories() {
  require('../stories/index.stories.js'); // 指定 story 的位置
  // 可以是任意目录，根据自己需要写路径
}

addParameters({
  options: {
    theme:{
      brandTitle:'VTable表格',
      brandUrl: 'https://github.com/PengChen96/virtualized-table',
      // brandImage: 'https://raw.githubusercontent.com/PengChen96/virtualized-table/master/logo.png'
    },
  }
});

configure(loadStories, module);

