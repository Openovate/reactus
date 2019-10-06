const fs = require('fs');
const path = require('path');
const { Registry } = require('@openovate/jsm');

const babel = require('@babel/core');
const requireFromString = require('require-from-string');

const React = require('react');
const { renderToString, renderToStaticMarkup } = require('react-dom/server');

const Helpers = require('./Helpers');
const ReactusException = require('./ReactusException');


class VirtualRegistry extends Registry {
  /**
   * @var {Component} page
   */
  get page() {
    if (!this.lazyPage) {
      this.lazyPage = this.get('page');
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
      this.lazyPresets = this.get('source', 'babel');

      //if preset is a path
      if (typeof this.lazyPresets === 'string') {
        //it's a file path
        this.lazyPresets = JSON.parse(fs.readFileSync(this.lazyPresets));
      }
    }

    return this.lazyPresets;
  }

  /**
   * Sets up the registry
   *
   * @param {Object} config
   */
  constructor(config = {}) {
    super(config);
    //add defaults to config
    Helpers.merge(this.data, {
      //custom files and folders to map
      // formatted like - { context target: source path }
      map: {},
      // default page
      page: path.resolve(__dirname, 'client/Page.jsx'),
      //fixed source paths
      source: {
        babel: path.resolve(__dirname, '../.babelrc')
      }
    });

    this.lazyPage = null;
    this.lazyFiles = null;
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
    this.set('components', name, path);
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
    if (!this.has('views', path)) {
      //Can't do anything
      throw ReactusException.for('Path %s does not have a view', path);
    }

    //get the view
    let view = require(this.get('views', path).view);
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

    this.set('views', path, { route, view });
    return this;
  }
}

module.exports = VirtualRegistry;
