
const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, 'libs'),
  // babel转义白名单，默认不转义node_modules，改为[]后会转义
  'transformIgnorePatterns': [],
  // 需要收集覆盖率的文件
  'collectCoverageFrom': [
    'collapse/*.{js,jsx,tsx}',
    '<rootDir>/__tests__/sum.js',
    '<rootDir>/VTable2.0/Grid.js'
  ],
  // 指定需要进行单元测试的文件匹配规则
  testMatch: [
    '<rootDir>/**/__tests__/*.test.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/jest.setup.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/styleMock.js',
    '\\.(css|less)$': '<rootDir>/__tests__/styleMock.js'
  },
};
