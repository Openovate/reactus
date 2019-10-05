const fs = require('fs');
const path = require('path');
const { Registry } = require('@openovate/jsm');

const React = require('react');
const { renderToString, renderToStaticMarkup } = require('react-dom/server');

const Module = require('module');
const babel = require('@babel/core');
const requireFromString = require('require-from-string');

const Helpers = require('./Helpers');
const WebpackPlugin = require('./WebpackPlugin');
const RequireResolver = require('./RequireResolver');
const ReactusException = require('./ReactusException');

class VirtualEngine {
  /**
   * @var {Object} files - { context target: actual code }
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
      const label = this.registry.get('label');
      const target = this.registry.get('path', 'routes').replace('{LABEL}', label);
      files[target] = 'module.exports = ' + JSON.stringify(routes, null, 2);

      this.lazyFiles = files;
    }

    return this.lazyFiles;
  }

  /**
   * @var {Component} page
   */
  get page() {
    if (!this.lazyPage) {
      this.lazyPage = this.registry.get('page');
      if (typeof this.lazyPage === 'string') {
        const content = fs.readFileSync(this.lazyPage);
        const { code } = babel.transform(content, this.presets);
        this.lazyPage = requireFromString(code, this.lazyPage).default;
      }
    }

    return this.lazyPage;
  }

  /**
   * @var {Object} presets
   */
  get presets() {
    if (!this.lazyPresets) {
      this.lazyPresets = this.registry.get('source', 'babel');

      //if preset is a path
      if (typeof this.lazyPresets === 'string') {
        //it's a file path
        this.lazyPresets = JSON.parse(fs.readFileSync(this.lazyPresets));
      }
    }

    return this.lazyPresets;
  }

  /**
   * @var {Object} sources - { context target: source path }
   */
  get sources() {
    const sources = {};

    //get the label name
    const label = this.registry.get('label');
    const template = this.registry.get('path');

    //get entry
    const entry = template.entry.replace('{LABEL}', label);
    sources[entry] = this.registry.get('source', 'entry');

    //get router
    const router = template.router.replace('{LABEL}', label);
    sources[router] = this.registry.get('source', 'router');

    //get views
    const views = this.registry.get('views') || {};
    Object.keys(views).forEach(path => {
      const target = template.view
        .replace('{LABEL}', label)
        .replace('{PATH}', path);
      sources[target] = views[path].view;
    });

    //get components
    const components = this.registry.get('components') || {};
    Object.keys(components).forEach(name => {
      const target = template.component
        .replace('{LABEL}', label)
        .replace('{NAME}', name);
      sources[target] = components[name];
    });

    //deal with custom files
    // formatted like - { context target: source path }
    const custom = this.registry.get('map');
    Object.keys(custom).forEach(target => {
      //name the source
      const source = custom[target];
      //if the source does not exist
      if (!fs.existsSync(source)) {
        //skip
        return;
      }

      //if source is a folder
      if (fs.statSync(source).isDirectory()) {
        //walk the folder and add files that it finds
        Helpers.walk(fs, source, file => {
          //so let's say source is /foo/bar/zoo
          //file could look like /foo/bar/zoo/bam.js
          //so we just need to chop off the source and use the target instead
          const sourceTarget = path.join(target, file.substr(source.length));
          sources[sourceTarget] = file;
        });

        return;
      }

      //source is a file
      sources[target] = custom[target];
    });

    return sources;
  }

  /**
   * @var {Plugin} WebpackPlugin
   */
  get WebpackPlugin() {
    //trick to bind an extra argument to constructor
    return VirtualEngine.WebpackPlugin.bind(null, this);
  }

  /**
   * Sets up the registry
   *
   * @param {Object} config
   */
  constructor(config = {}) {
    //add defaults to config
    config = Object.assign({
      //used for white labeling
      label: 'reactus',
      //custom files and folders to map
      // formatted like - { context target: source path }
      map: {},
      // default page
      page: path.resolve(__dirname, 'client/Page.jsx'),
      //virtual path templates which represent the target destination
      path: {
        component: 'node_modules/{LABEL}/components/{NAME}.jsx',
        entry: 'node_modules/{LABEL}/entry.js',
        router: 'node_modules/{LABEL}/Router.jsx',
        routes: 'node_modules/{LABEL}/routes.js',
        view: 'node_modules/{LABEL}/views/{PATH}.jsx'
      },
      //fixed source paths
      source: {
        babel: path.resolve(__dirname, '../.babelrc'),
        entry: path.resolve(__dirname, 'client/entry.js'),
        router: path.resolve(__dirname, 'client/Router.jsx')
      }
    }, config);

    this.registry = new Registry(config);

    this.lazyPage = null;
    this.lazyFiles = null;
    this.lazyPresets = null;

    //overwrite Node's Module->resolveFilename
    this.resolver = new VirtualEngine.RequireResolver(this, Module._resolveFilename);
    Module._resolveFilename = this.resolver.resolve.bind(this.resolver);
  }

  /**
   * Registers a global component
   *
   * @param {String} name
   * @param {String} path
   *
   * @return {VirtualEngine}
   */
  component(name, path) {
    this.registry.set('components', name, path);
    return this;
  }

  /**
   * Renders a react view
   *
   * @param {ServerResponse} res
   * @param {String} path
   * @param {Object} [props = {}]
   * @param {Object} [pageProps = {}]
   * @param {React.Component} [page = null]
   *
   * @return {VirtualEngine}
   */
  render(res, path, props = {}, pageProps = {}, page = null) {
    //remove forward slash at the start
    if (path.indexOf('/') === 0) {
      path = path.substr(1)
    }

    //setup page
    page = page || this.page;

    //if no browser path
    if (!this.registry.has('views', path)) {
      //Can't do anything
      throw VirtualEngine.ReactusException.for('Path %s does not have a view', path);
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
      .replace('{DATA}', JSON.stringify(props))
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

VirtualEngine.WebpackPlugin = WebpackPlugin;
VirtualEngine.RequireResolver = RequireResolver;
VirtualEngine.ReactusException = ReactusException;

module.exports = VirtualEngine;
