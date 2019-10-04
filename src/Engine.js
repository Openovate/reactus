const fs = require('fs');
const { join, resolve, extname } = require('path');
const { Exception, Registry } = require('@openovate/jsm');

const webpack = require('webpack');
const Watchpack = require('watchpack');
const JailbreakPlugin = require('@openovate/webpack-jailbreak');

const React = require('react');
const { renderToString, renderToStaticMarkup } = require('react-dom/server');
const { createMemoryHistory } = require('history');

const Module = require('module');
const babel = require('@babel/core');
const requireFromString = require('require-from-string');

const Helpers = require('./Helpers');
const Middleware = require('./Middleware');

const noop = () => {};

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
    return 'reactus';
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
      config.plugins.push(this.system);

      //return webpack as compiler
      this.lazyCompiler = webpack(config);
    }

    return this.lazyCompiler;
  }

  /**
   * @var {Object} files
   */
  get files() {
    if (!this.lazyFiles) {
      const files = {};
      //load files from sources
      for(const target in this.sources) {
        const source = this.sources[target];
        //if it doesn't exist or is not a file
        if (!fs.existsSync(source) || !fs.lstatSync(source).isFile()) {
          //assume it's a string
          files[target] = source;
          continue;
        }

        files[target] = fs.readFileSync(source);
      }

      //manually make a routes.js file
      const routes = {};
      const views = this.registry.get('views') || {};
      Object.keys(views).forEach(path => {
        routes[views[path].route] = path;
      });

      //generate routes file
      const brand = this.registry.get('module');
      const target = Engine.FILE_ROUTES.replace('{MODULE}', brand);
      files[target] = 'module.exports = ' + JSON.stringify(routes, null, 2);

      //return webpack as compiler
      this.lazyFiles = files;
    }

    return this.lazyFiles;
  }

  /**
   * @var {Object} presets
   */
  get presets() {
    if (!this.lazyPresets) {
      this.lazyPresets = JSON.parse(
        fs.readFileSync(
          resolve(__dirname, '../.babelrc')
        )
      );
    }

    return this.lazyPresets;
  }

  /**
   * @var {Object} map
   */
  get sources() {
    const sources = {};

    //get the brand name
    const brand = this.registry.get('module');

    //get entry
    const entry = Engine.FILE_ENTRY.replace('{MODULE}', brand);
    sources[entry] = this.registry.get('entry');

    //get router
    const router = Engine.FILE_ROUTER.replace('{MODULE}', brand);
    sources[router] = this.registry.get('router');

    //get views
    const views = this.registry.get('views') || {};
    Object.keys(views).forEach(path => {
      const target = Engine.FILE_VIEW
        .replace('{MODULE}', brand)
        .replace('{PATH}', path);
      sources[target] = views[path].view;
    });

    //get components
    const components = this.registry.get('components') || {};
    Object.keys(components).forEach(name => {
      const target = Engine.FILE_COMPONENT
        .replace('{MODULE}', brand)
        .replace('{NAME}', name);
      sources[target] = components[name];
    });

    //deal with custom files
    Object.keys(this.customFiles).forEach(target => {
      sources[target] = this.customFiles[target];
    });

    return sources;
  }

  /**
   * @var {Object} system
   */
  get system() {
    if (!this.lazySystem) {
      this.lazySystem = new JailbreakPlugin({ files: this.files });
    }

    return this.lazySystem;
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
    this.lazySystem = null;
    this.lazyPresets = null;
    this.lazyWatcher = null;
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
      const { code } = babel.transform(files[formatted].toString(), self.presets);

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
   * @param {Object} config
   *
   * @return {Function}
   */
  middleware(config = {}) {
    //initialize
    this.initialize();

    //load up the middleware
    const middleware = new this.Middleware(this);
    middleware.initialize();

    //watch for changes
    this.watch(config)

    return (req, res, next) => {
      //determine next
      next = next || this.Helpers.next;

      middleware.dev(req, res, (err) => {
        if (err) {
          return next(err);
        }

        middleware.hot(req, res, next);
      });
    };
  }

  /**
   * Renders a react browser view
   *
   * @param {ServerResponse} res
   * @param {String} path
   * @param {Object} [props = {}]
   * @param {Object} [pageProps = {}]
   * @param {React.Component} [page = null]
   *
   * @return {Engine}
   */
  render(res, path, props = {}, pageProps = {}, page = null) {
    //remove forward slash at the start
    if (path.indexOf('/') === 0) {
      path = path.substr(1)
    }

    //setup page
    page = page || this.registry.get('page');

    //setup props
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
    const html = React.createElement(page, pageProps);

    //last set the content
    res.send('<!DOCTYPE html>' + renderToStaticMarkup(html)
      .replace('{APP}', renderToString(view(props)))
    );

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
   * Takes all the files from views and components and listens for changes
   *
   * @param {Object} config
   * @param {Function} listener
   *
   * @return {Watchpack}
   */
  watch(config = {}, listener = noop) {
    //if already watching
    if (this.lazyWatcher) {
      //stop from watching again
      return this;
    }

    this.lazyWatcher = true;

    //gather all the sources in the form of { source: target }
    const sources = {};
    Object.keys(this.sources).forEach(target => {
      const source = this.sources[target];
      //if source is not a real file
      if (!fs.existsSync(source) || !fs.lstatSync(source).isFile()) {
        //skip
        return;
      }

      //perform an hash flip
      sources[source] = target;
    });

    //these are the actual files we are watching
    const files = new Set(Object.keys(sources));
    if (config.watch instanceof Array) {
      config.watch.forEach(file => {
        //if the file is a folder
        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
          Helpers.walk(fs, file, file => files.add(file));
          return;
        }

        files.add(file);
      });
    }

    //start the watcher
    const watcher = new Watchpack(config);
    watcher.watch(Array.from(files), [], Date.now() - 10000);

    watcher.on('aggregated', changes => {
      changes.forEach(updateServer);
      changes.forEach(updateClient);
      this.compiler.compile(listener);
    });

    const updateClient = source => {
      //if source is not found
      if (!sources[source]) {
        //then it's not a virtual file.
        return;
      }

      //just to be clear...
      const target = sources[source];
      const content = fs.readFileSync(source);

      this.system.updateFile(this.compiler, target, content);
    };

    const updateServer = source => {
      //if the source is a folder
      if (fs.statSync(source).isDirectory()) {
        //nothing to update
        return;
      }

      //if source is not found
      if (!sources[source]) {
        //just invalidate the require cache
        delete require.cache[require.resolve(source)];
        return;
      }

      //just to be clear...
      const target = sources[source].replace('node_modules/', '');
      const file = join(__dirname, '../..', target);

      const content = fs.readFileSync(source).toString();
      //transform the code back to commonjs
      const { code } = babel.transform(content, this.presets);

      //if it's not cached
      if (!require.cache[file]) {
        //now call it and cache it
        require.cache[file] = {
          id: file,
          filename: file,
          loaded: true,
          exports: requireFromString(code)
        };
      } else {
        require.cache[file].exports = requireFromString(code);
      }
    };

    return watcher;
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
}

Engine.Middleware = Middleware;
Engine.Helpers = Helpers;

module.exports = Engine;
