/* global __dirname*/

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rules = [
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  }
];

const devConfig = ['commonjs2', 'umd'].map((libraryTarget) => {
  const name = libraryTarget === 'commonjs2' ? 'development' : `development.${libraryTarget}`;
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: './libs/index.js',
    output: {
      filename: `vtable.${name}.js`,
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: libraryTarget
    },
    module: {
      rules: rules
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    externals: [{
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      }
    }]
  };
});

const prodConfig = ['commonjs2', 'umd'].map((libraryTarget) => {
  const name = libraryTarget === 'commonjs2' ? 'production' : `production.${libraryTarget}`;
  return {
    mode: 'production',
    entry: './libs/index.js',
    output: {
      filename: `vtable.${name}.min.js`,
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: libraryTarget
    },
    module: {
      rules: rules
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    externals: [{
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      }
    }]
  };
});

module.exports = [
  ...devConfig,
  ...prodConfig,
];
