
import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js'); // 指定 story 的位置
}

configure(loadStories, module);