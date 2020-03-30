
import { configure, addParameters } from '@storybook/react';

function loadStories() {
  require('../stories/index.stories.js'); // 指定 story 的位置
  // 可以是任意目录，根据自己需要写路径
}

addParameters({
  options: {
    // tool bar
    // isToolshown: false,
    showAddonPanel: false,
    theme:{
      // base: 'light',
      //
      // colorPrimary: 'hotpink',
      // colorSecondary: 'deepskyblue',
      //
      // // UI
      // appBg: 'white',
      // appContentBg: 'silver',
      // appBorderColor: 'grey',
      // appBorderRadius: 4,
      //
      // // Typography
      // fontBase: '"Open Sans", sans-serif',
      // fontCode: 'monospace',
      //
      // // Text colors
      // textColor: 'black',
      // textInverseColor: 'rgba(255,255,255,0.9)',
      //
      // // Toolbar default and active colors
      // barTextColor: 'silver',
      // barSelectedColor: 'black',
      // barBg: '#eee',
      //
      // // Form colors
      // inputBg: 'white',
      // inputBorder: 'silver',
      // inputTextColor: 'black',
      // inputBorderRadius: 4,

      brandTitle:'VTable表格',
      brandUrl: 'https://github.com/PengChen96/virtualized-table',
      // brandImage: 'https://raw.githubusercontent.com/PengChen96/virtualized-table/master/logo.png'
    }
  }
});

configure(loadStories, module);

