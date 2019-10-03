const fs = require('fs');
const { join, resolve, extname } = require('path');
const { Exception, Registry } = require('@openovate/jsm');

const webpack = require('webpack');
const JailbreakPlugin = require('@openovate/webpack-jailbreak');

const React = require('react');
const { renderToString } = require('react-dom/server');
const { createMemoryHistory } = require('history');

const Module = require('module');
const babel = require('@babel/core');
const requireFromString = require('require-from-string');

const Helpers = require('./Helpers');
const Middleware = require('./Middleware');

class Engine {
  /**
   * @const {String} FILE_COMPONENT
   */
  static get FILE_COMPONENT() {
    return 'node_modules/{MODULE}/components/{NAME}.jsx';
  }

  /**
   * @const {String} FILE_ENTRY
   */
  static get FILE_ENTRY() {
    return 'node_modules/{MODULE}/entry.js';
  }

  /**
   * @const {String} FILE_ROUTER
   */
  static get FILE_ROUTER() {
    return 'node_modules/{MODULE}/Router.jsx';
  }

  /**
   * @const {String} FILE_ROUTE
   */
  static get FILE_ROUTES() {
    return 'node_modules/{MODULE}/routes.js';
  }

  /**
   * @const {String} FILE_VIEW
   */
  static get FILE_VIEW() {
    return 'node_modules/{MODULE}/views/{PATH}.jsx';
  }

  /**
   * @const {String} MODULE_NAME
   */
  static get MODULE_NAME() {
    return 'reactve';
  }

  /**
   * @var {Object} files
   */
  get files() {
    if (!this.lazyFiles) {
      const files = Object.assign({}, this.customFiles);

      this._buildEntry(files);
      this._buildRouter(files);
      this._buildRoutes(files);
      this._buildComponents(files);

      //return webpack as compiler
      this.lazyFiles = files;
    }

    return this.lazyFiles;
  }

  /**
   * @var {Compiler} compiler
   */
  get compiler() {
    if (!this.lazyCompiler) {
      //shallow clone config
      const config = Object.assign({}, this.registry.get('webpack') || {});

      //make sure we have plugins
      if (!config.plugins) {
        config.plugins = [];
      }

      //shallow clone plugins
      config.plugins = [].concat(config.plugins);

      //add the jailbreak plugin
      config.plugins.push(new JailbreakPlugin({ files: this.files }));

      //return webpack as compiler
      this.lazyCompiler = webpack(config);
    }

    return this.lazyCompiler;
  }

  /**
   * Sets up the registry
   *
   * @param {Object} config
   */
  constructor(config = {}) {
    //add defaults to config
    config = Object.assign({
      cwd: process.cwd(),
      module: Engine.MODULE_NAME,
      entry: resolve(__dirname, 'client/entry.js'),
      router: resolve(__dirname, 'client/Router.jsx')
    }, config);

    this.registry = new Registry(config);

    this.customFiles = {};

    this.lazyFiles = null;
    this.lazyCompiler = null;
    this.initialized = false;

    this.Helpers = Engine.Helpers;
    this.Middleware = Engine.Middleware;
  }

  /**
   * Compiles the webpack build
   *
   * @param {Function} callback
   *
   * @return {Engine}
   */
  compile(callback) {
    this.compiler.run(callback);
    return this;
  }

  /**
   * Registers a global component
   *
   * @param {String} name
   * @param {String} path
   *
   * @return {Engine}
   */
  component(name, path) {
    this.registry.set('components', name, path);
    return this;
  }

  /**
   * Setups up virtual files for server require requests
   *
   * @return {Engine}
   */
  initialize() {
    //if initialized already
    if (this.initialized) {
      //dont do it again
      return this;
    }

    //flag it so it doesnt initialize again
    this.initialized = true;

    //get the babel presets ready..
    const presets = JSON.parse(
      fs.readFileSync(
        resolve(__dirname, '../.babelrc')
      )
    );

    //when files are requested, it wont start with node_modules
    const files = {};
    Object.keys(this.files).forEach(file => {
      files[file.replace('node_modules/', '')] = this.files[file];
    });

    //overwrite Node's Module->resolveFilename
    const self = this;
    const resolveFilename = Module._resolveFilename;
    Module._resolveFilename = function resolve(request, parent) {
      let formatted = request;
      if (!extname(request)) {
        formatted += '.js';
      }

      //if the file does not exists in the list of virual files
      if (!files[formatted]) {
        //business as usual.
        return resolveFilename(request, parent);
      }

      //make the actual intended path
      const file = join(__dirname, '../..', formatted);

      //transform the code back to commonjs
      const { code } = babel.transform(files[formatted].toString(), presets);

      //if it's not cached
      if (!require.cache[file]) {
        //now call it and cache it
        require.cache[file] = {
          id: file,
          filename: file,
          loaded: true,
          exports: requireFromString(code)
        };
      }

      //redirect them to our cached version
      return file;
    };

    return this;
  }

  /**
   * Creates a middleware for an http interface
   *
   * @return {Function}
   */
  middleware() {
    //initialize
    this.initialize();

    //load up the middleware
    const middleware = new this.Middleware(this);
    middleware.initialize();

    return (req, res, next) => {
      //determine next
      next = next || this.Helpers.next;

      middleware.dev(req, res, (err) => {
        if (err) {
          return next(err);
        }

        middleware.hot(req, res, (err) => {
          if (err) {
            return next(err);
          }

          middleware.bundler(req, res, next);
        });
      });
    };
  }

  /**
   * Renders a react browser view
   *
   * @param {String} path
   * @param {ServerResponse} res
   * @param {Object} props
   * @param {React.Component} [page = Page]
   *
   * @return {Engine}
   */
  render(path, res, props, page) {
    //remove forward slash at the start
    if (path.indexOf('/') === 0) {
      path = path.substr(1)
    }

    //setup page
    page = page || this.registry.get('page');
    //setup props
    props = props || {};
    props.history = createMemoryHistory();

    //if no browser path
    if (!this.registry.has('views', path)) {
      //Can't do anything
      throw Exception.for('Path %s does not have a view', path);
    }

    //get the view
    let view = require(this.registry.get('views', path).view);
    if (typeof view === 'object' && view.default) {
      view = view.default
    }

    //if view is a react component
    if (view.prototype && !!view.prototype.isReactComponent) {
      //convert the view to a composite
      const original = view;
      view = function componentToComposite(props) {
        return React.createElement(original, props);
      }
    }

    if (!page) {
      res.send(renderToString(view(props)));
      return this;
    }

    //component should be a composite, make a page
    const html = React.createElement(page, props, view(props));
    //last set the content
    res.send('<!DOCTYPE html>' + renderToString(html));
    return this;
  }

  /**
   * Sets a parameter path to the given value
   *
   * @param {*} [...path]
   *
   * @return {Router}
   */
  set(...path) {
    this.registry.set(...path)
    return this;
  }

  /**
   * Registers a view
   *
   * @param {String} route
   * @param {String} path
   * @param {String} view
   *
   * @return {Router}
   */
  view(route, path, view) {
    //remove forward slash at the start
    if (path.indexOf('/') === 0) {
      path = path.substr(1)
    }

    this.registry.set('views', path, { route, view });
    return this;
  }

  /**
   * Builds component files
   *
   * @param {Object} [files = {}]
   *
   * @return {Object}
   */
  _buildComponents(files = {}) {
    const brand = this.registry.get('module');
    const components = this.registry.get('components') || {};

    //make components
    Object.keys(components).forEach(name => {
      const target = Engine.FILE_COMPONENT
        .replace('{MODULE}', brand)
        .replace('{NAME}', name);

      files[target] = fs.readFileSync(components[name]);
    });

    return files;
  }

  /**
   * Builds an entry file
   *
   * @param {Object} [files = {}]
   *
   * @return {Object}
   */
  _buildEntry(files = {}) {
    const brand = this.registry.get('module');

    //make entry
    const entry = this.registry.get('entry');
    const target = Engine.FILE_ENTRY.replace('{MODULE}', brand);
    files[target] = fs.readFileSync(entry);
    return files;
  }

  /**
   * Builds a router file
   *
   * @param {Object} [files = {}]
   *
   * @return {Object}
   */
  _buildRouter(files = {}) {
    const brand = this.registry.get('module');

    //make the router
    const router = this.registry.get('router');
    const target = Engine.FILE_ROUTER.replace('{MODULE}', brand);
    files[target] = fs.readFileSync(router);

    return files;
  }

  /**
   * Builds routes and view files
   *
   * @param {Object} [files = {}]
   *
   * @return {Object}
   */
  _buildRoutes(files = {}) {
    const routes = {};
    const brand = this.registry.get('module');

    //make the routes
    const views = this.registry.get('views') || {};
    Object.keys(views).forEach(path => {
      //determine the target file path (virtual pathing)
      const target = Engine.FILE_VIEW
        .replace('{MODULE}', brand)
        .replace('{PATH}', path);

      //add the target/view to the virtual modules
      files[target] = fs.readFileSync(views[path].view);
      //add route/view to the router
      routes[views[path].route] = path;
    });

    //generate a routes file
    const target = Engine.FILE_ROUTES.replace('{MODULE}', brand);
    files[target] = 'module.exports = ' + JSON.stringify(routes, null, 2);

    return files;
  }
}

Engine.Middleware = Middleware;
Engine.Helpers = Helpers;

module.exports = Engine;
