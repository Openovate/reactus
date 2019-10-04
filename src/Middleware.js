const { join, basename } = require('path');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

class Middleware {
  /**
   * @var {Function} dev
   */
  get dev() {
    return this.middleware.dev;
  }

  /**
   * @var {Function} hot
   */
  get hot() {
    return this.middleware.hot;
  }

  /**
   * Sets the engine
   *
   * @param {Engine} engine
   */
  constructor(engine) {
    this.engine = engine;
    this.middleware = {};
  }

  /**
   * Initializes all the middleware. Middleware like dev, cannot be ran more than
   * once per process.
   *
   * @return {Middleware}
   */
  initialize() {
    this.initializeDev();
    this.initializeHot();

    return this;
  }

  /**
   * Initializes the dev middleware. Middleware like dev, cannot be ran more than
   * once per process.
   *
   * @return {Middleware}
   */
  initializeDev() {
    if (this.middleware.dev) {
      return this;
    }

    const devConfig = { noInfo: true };
    //if there's a public path
    if (this.engine.registry.has('webpack', 'output', 'publicPath')) {
      devConfig.publicPath = this.engine.registry.get('webpack', 'output', 'publicPath');
    }

    this.middleware.dev = webpackDev(this.engine.compiler, devConfig);

    return this;
  }

  /**
   * Initializes the hot middleware
   *
   * @return {Middleware}
   */
  initializeHot() {
    if (this.middleware.hot) {
      return this;
    }

    this.middleware.hot = webpackHot(this.engine.compiler);

    return this;
  }
}

module.exports = Middleware;
