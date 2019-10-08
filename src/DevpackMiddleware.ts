import { IncomingMessage, ServerResponse } from 'http';

import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import Helpers from './Helpers';

/**
 * Creates a Middleware for http server or express
 *
 * @param webpackConfig - The `webpack` configuration options from webpack.config.js
 * @param devConfig - The `webpack-dev-middleware` options. Usually has `{ noInfo: true }`
 */
export default function createMiddleware(
  webpackConfig: webpack.Configuration,
  devConfig: webpackDev.Options
): Function {
  devConfig = Object.assign({ noInfo: true }, devConfig || {});

  //check for webpackConfig.output.publicPath
  if (!devConfig.publicPath
    && webpackConfig.output
    && webpackConfig.output.publicPath
  ) {
    devConfig.publicPath = webpackConfig.output.publicPath;
  }

  const compiler = webpack(webpackConfig || {});
  const hot = webpackHot(compiler);
  const dev = webpackDev(compiler, devConfig);

  return function middleware(
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction = Helpers.next
  ) {
    dev(req, res, (err: any) => {
      if (err) {
        return next(err);
      }

      hot(req, res, next);
    })
  }
}

//custom interfaces and types

export type NextFunction = (err?: any) => void;
