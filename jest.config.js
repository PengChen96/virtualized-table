
const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, 'libs', '__tests__'),
  // babel转义白名单，默认不转义node_modules，改为[]后会转义
  'transformIgnorePatterns': [],
  'collectCoverageFrom': [
    'collapse/*.{js,jsx,tsx}',
    'pagination/*.{js,jsx,tsx}'
  ],
  // 指定需要进行单元测试的文件匹配规则
  testMatch: [
    '<rootDir>/*.test.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/styleMock.js',
    '\\.(css|less)$': '<rootDir>/styleMock.js'
  },
};
