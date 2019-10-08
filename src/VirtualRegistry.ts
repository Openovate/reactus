import fs from 'fs';
import path from 'path';
import { ServerResponse } from 'http';
import { Registry } from '@openovate/jsm';

import React, { FunctionComponent, ComponentClass } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import Helpers from './Helpers';
import ReactusException from './ReactusException';

const babel = require('@babel/core');
const requireFromString = require('require-from-string');

export default class VirtualRegistry extends Registry {
  /**
   * @var lazyPage
   */
  protected lazyPage?: AnyComponent;

  /**
   * @var lazyPresets
   */
  protected lazyPresets: object|null = null;

  /**
   * @var page
   */
  get page(): any {
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
   * @var presets
   */
  get presets(): object {
    if (!this.lazyPresets) {
      this.lazyPresets = this.get('source', 'babel');

      //if preset is a path
      if (typeof this.lazyPresets === 'string') {
        //it's a file path
        this.lazyPresets = JSON.parse(fs.readFileSync(this.lazyPresets).toString());
      }
    }

    return this.lazyPresets || {};
  }

  /**
   * Sets up the registry
   *
   * @param config
   */
  constructor(config: object = {}) {
    super(config);
    //add defaults to config
    Helpers.merge(this.data, {
      //custom files and folders to map
      // formatted like - { context target: source path }
      map: {},
      // default page
      page: path.resolve(__dirname, '../client/Page.jsx'),
      //fixed source paths
      source: {
        babel: path.resolve(__dirname, '../.babelrc')
      }
    });
  }

  /**
   * Registers a global component
   *
   * @param name
   * @param path
   */
  component(name: string, path: string): VirtualRegistry {
    this.set('components', name, path);
    return this;
  }

  /**
   * Renders a react view
   *
   * @param res
   * @param path
   * @param props
   * @param pageProps
   * @param page
   */
  render(
    res: ServerResponse,
    path: string,
    props: object = {},
    pageProps: object = {},
    page?: AnyComponent
  ): VirtualRegistry {
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
      view = function componentToComposite(props: object) {
        return React.createElement(original, props);
      }
    }

    if (!page) {
      res.write(renderToString(view(props)));
      res.end();
      return this;
    }

    //component should be a composite, make a page
    const html = React.createElement(page, pageProps);

    //last set the content
    res.write('<!DOCTYPE html>' + renderToStaticMarkup(html)
      .replace('{APP}', renderToString(view(props)))
      .replace('{DATA}', JSON.stringify(props))
    );

    res.end();

    return this;
  }

  /**
   * Registers a view
   *
   * @param route
   * @param path
   * @param view
   */
  view(route: string, path: string, view: string): VirtualRegistry {
    //remove forward slash at the start
    if (path.indexOf('/') === 0) {
      path = path.substr(1)
    }

    this.set('views', path, { route, view });
    return this;
  }
}

//custom interfaces and types

export type AnyComponent = string | FunctionComponent<object> | ComponentClass<object, any>;

export interface RegistryOptions {
  //custom files and folders to map
  // formatted like - { context target: source path }
  map?: { [key: string]: string },
  // default page
  page?: string,
  //fixed source paths
  source?: {
    babel?: string
  }
}
