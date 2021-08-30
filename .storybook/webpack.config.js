const path = require("path");

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      "@libs": path.resolve(__dirname, "../libs"),
      "@src": path.resolve(__dirname, "../src"),
    }
  },
  module: {
    rules: [
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
    ]
  }
};
