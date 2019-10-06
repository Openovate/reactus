const { join } = require('path');
const webpack = require('webpack');
const engine = require('./src/engine').default;

module.exports = {
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
      './examples/bare-metal-example/src/client/entry.js'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: join(process.cwd(), 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      },
      {
        test: /\.(js|jsx)$/,
        include: /node_modules\/bare_metal/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new engine.WebpackPlugin()
  ]
};
