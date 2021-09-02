const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.(js|md|mdx)',
  ],
  addons: [
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  webpackFinal: async (config, {configType}) => {
    config.resolve.extensions.push('.js', '.css', '.less',);
    config.module.rules.push(
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
    );
    config.resolve.alias = {
      "@libs": path.resolve(__dirname, "../libs"),
      "@src": path.resolve(__dirname, "../src"),
    }
    return config;
  },
}
