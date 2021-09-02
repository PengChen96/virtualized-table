
import React from 'react';
import {getDefaultProps} from './knobs';
import VTableCase from '../src/example/VTable';
import VTableMD from '../README.md';

export default {
  title: 'VTable/VTable1.0',
  decorators: [
    (Story) => (
      <div style={{ textAlign: 'center', fontSize: 14, color: '#333' }}>
        <Story/>
      </div>
    ),
  ],
};

export const VTable = (args) => {
  const props = getDefaultProps({
    fixedLeftColumnCount: true,
    fixedRightColumnCount: true,
    isSticky: true
  });
  return <VTableCase {...props} {...args} />;
};
VTable.storyName = 'VTable default';
VTable.parameters = {
  docs: {
    page: () => (
        <>
          <VTableMD/>
        </>
    ),
  },
};
