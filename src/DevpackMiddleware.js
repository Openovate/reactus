const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const Helpers = require('./Helpers');

function createMiddleware(webpackConfig = {}, devConfig = {}) {
  devConfig = Object.assign({ noInfo: true }, devConfig);

  //check for webpackConfig.output.publicPath
  if (!devConfig.publicPath
    && webpackConfig.output
    && webpackConfig.output.publicPath
  ) {
    devConfig.publicPath = webpackConfig.output.publicPath;
  }

  const compiler = webpack(webpackConfig);
  const hot = webpackHot(compiler);
  const dev = webpackDev(compiler, devConfig);

  return function middleware(req, res, next = Helpers.next) {
    dev(req, res, (err) => {
      if (err) {
        return next(err);
      }

      hot(req, res, next);
    })
  }
}

module.exports = createMiddleware;
