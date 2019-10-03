const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

class Middleware {
  /**
   * @var {Function} bundler
   */
  get bundler() {
    return this.middleware.bundler;
  }

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
    this.initializeBundler();

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

  /**
   * Initializes the bundler middleware
   *
   * @return {Middleware}
   */
  initializeBundler() {
    if (this.middleware.bundler) {
      return this;
    }

    this.middleware.bundler = (req, res, next) => {
      //if it's not a bundle
      if (!/^\/(.+)\.bundle\.js$/.test(req.url)) {
        return next();
      }

      //write it and send it
      res.setHeader('Content-Type', 'text/javascript');
      res.write(webpackDev.fileSystem.readFileSync(req.url));
      res.end();
      next();
    };

    return this;
  }
}

module.exports = Middleware;
