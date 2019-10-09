import fs from 'fs';
import path from 'path';

import { walk, merge } from './helpers';
import FileResolve from './FileResolve';
import WebpackPlugin from './WebpackPlugin';
import RequireResolver from './RequireResolver';
import VirtualRegistry, { RegistryOptions } from './VirtualRegistry';

const babel = require('@babel/core');
const requireFromString = require('require-from-string');

/**
 * The main engine that processes and routes virtual files to webpack, and require
 */
export default class VirtualEngine extends VirtualRegistry {
  /**
   * Since files should be formed after you set all of your virtual files,
   * this makes sure we only do it intentionally when we need to. If you need
   * to rebuild the files just delete this variable
   */
  public lazyFiles?: FileContentMap;

  /**
   * A list of files in the form of `{ context target: actual code }`
   */
  get files(): FileContentMap {
    if (!this.lazyFiles) {
      const files: FileContentMap = {};
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
      const routes: RouteMap = {};
      const views = this.get('views') || {};
      Object.keys(views).forEach((path: string) => {
        routes[views[path].route] = path;
      });

      //generate routes file
      const label = this.get('label');
      const target = this.get('path', 'routes').replace('{LABEL}', label);
      files[target] = 'module.exports = ' + JSON.stringify(routes, null, 2);

      this.lazyFiles = files;
    }

    return this.lazyFiles;
  }

  /**
   * A list of sources in the form of `{ context target: source path }`
   */
  get sources(): FileSourceMap {
    const sources: FileSourceMap = {};

    //get the label name
    const label = this.get('label');
    const template = this.get('path');

    //get entry
    const entry = template.entry.replace('{LABEL}', label);
    sources[entry] = this.get('source', 'entry');

    //get router
    const router = template.router.replace('{LABEL}', label);
    sources[router] = this.get('source', 'router');

    //get views
    const views = this.get('views') || {};
    Object.keys(views).forEach((path: string) => {
      const target = template.view
        .replace('{LABEL}', label)
        .replace('{PATH}', path);
      sources[target] = views[path].view;
    });

    //get components
    const components = this.get('components') || {};
    Object.keys(components).forEach((name: string) => {
      const target = template.component
        .replace('{LABEL}', label)
        .replace('{NAME}', name);
      sources[target] = components[name];
    });

    //deal with custom files
    // formatted like - { context target: source path }
    const custom = this.get('map');
    Object.keys(custom).forEach((target: string) => {
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
        walk(source, (file: string) => {
          //so let's say source is /foo/bar/zoo
          //file could look like /foo/bar/zoo/bam.js
          //so we just need to chop off the source and use the target instead
          const sourceTarget = path.join(target, file.substr(source.length));
          sources[sourceTarget] = file;
        }, fs);

        return;
      }

      //source is a file
      sources[target] = custom[target];
    });

    return sources;
  }

  /**
   * The plugin to attach as a plugin in `webpack.config.js`
   */
  get WebpackPlugin(): { new(): WebpackPlugin } {
    //trick to bind an extra argument to constructor
    return WebpackPlugin.bind(null, this);
  }

  /**
   * Sets up the registry and the require resolver
   *
   * @param config - The options to pass to the engine
   */
  constructor(config?: EngineOptions) {
    super(config || {});

    //add defaults to config
    merge(this.data, {
      //used for white labeling
      label: 'reactus',
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
        entry: path.resolve(__dirname, '../client/entry.js'),
        router: path.resolve(__dirname, '../client/Router.jsx')
      }
    });

    RequireResolver.on('resolve', this.resolveFile.bind(this));

    //if this is a name engine
    if (this.has('name')) {
      RequireResolver.on('resolve', this.resolveEngine.bind(this));
    }
  }

  /**
   * Registers a global component
   *
   * @param name - the name of the component
   * @param path - the actual absolute path where this component file is located
   */
  component(name: string, path: string): VirtualEngine {
    super.component(name, path);
    //uncache files
    delete this.lazyFiles;
    return this;
  }

  /**
   * Require resolver for named engines
   *
   * @param request - the `require()` request
   * @param resolve - if this method can resolve it, file and exports should be set
   */
  resolveEngine(request: string, resolve: FileResolve) {
    //if it's already resolved
    if (resolve.isResolved()) {
      //don't resolve
      return;
    }

    //if the request starts with / or;
    if (request.indexOf('/') === 0
      //if the request starts with . or;
      || request.indexOf('.') === 0
      //if this is not a name engine
      || !this.has('name')
    ) {
      //cannot resolve
      return;
    }

    //get the label
    const name = this.get('name');
    const label = this.get('label');
    //looking for something like reactus/engine/web
    //if the request doesn't start with reactus/engine/web
    if (request.indexOf(path.join(label, 'engine', name)) !== 0) {
      //cannot resolve
      return;
    }

    let formatted = request;
    if (!path.extname(formatted)) {
      formatted += '.js';
    }

    //make the actual intended path
    resolve.set(
      //file
      path.join(__dirname, '../..', formatted),
      //exports
      this
    );
  }

  /**
   * Require resolver for registered files
   *
   * @param request - the `require()` request
   * @param resolve - if this method can resolve it, file and exports should be set
   */
  resolveFile(request: string, resolve: FileResolve) {
    //if it's already resolved
    if (resolve.isResolved()) {
      //don't resolve
      return;
    }

    if (!path.extname(request)) {
      request = request + '.js';
    }

    //if the request starts with /, . or is not a file
    if (request.indexOf('/') === 0
      || request.indexOf('.') === 0
      || !this.files['node_modules/' + request]
    ) {
      //cannot resolve
      return;
    }

    //transform the code back to commonjs
    const content = this.files['node_modules/' + request].toString();
    const { code } = babel.transform(content, this.presets);

    const source = this.sources['node_modules/' + request];

    resolve.set(
      //file
      path.join(__dirname, '../..', request),
      //exports
      requireFromString(code, source)
    );
  }

  /**
   * Registers a view
   *
   * @param route - the route as in `/product/:id`
   * @param path - the path where to virtually store the view where
   * `product/detail` will be translated to `reactus/views/product/detail.jsx`
   * @param view - the actual absolute path where the view file is located
   */
  view(route: string, path: string, view: string): VirtualEngine {
    super.view(route, path, view);
    //uncache files
    delete this.lazyFiles;
    return this;
  }

  /**
   * Middleware method for VirtualEngine. Similar to how `express.use()` works
   *
   * @param middleware - the middleware interface to add to the engine
   */
  use(middleware: VirtualRegistry|object|Function): VirtualEngine {
    //if middleware is a VirtualRegistry
    if (middleware instanceof VirtualRegistry) {
      //just get the data
      middleware = middleware.get();
    }

    //if middleware is an object
    if (typeof middleware === 'object') {
      //merge and return
      merge(this.data, middleware);
      //uncache files
      delete this.lazyFiles;
      return this;
    }

    //if middleware is a function
    if (typeof middleware === 'function') {
      //pass this engine to the middleware
      (async() => {
        //wait for the middleware
        await middleware(this) ;
        //uncache files
        delete this.lazyFiles;
      })();

      return this;
    }

    //anything else?

    return this;
  }
}

//additional exports

export {
  VirtualRegistry,
  WebpackPlugin,
  RequireResolver,
  FileResolve,
  RegistryOptions
};

//custom interfaces and types

/**
 * An abstract describing the contents of the `engine.files` array
 */
export interface FileContentMap {
  [key: string]: Buffer|string
}

/**
 * An abstract describing `engine.sources`
 */
export interface FileSourceMap {
  [key: string]: string
}

/**
 * An abstract describing `routes`
 */
export interface RouteMap {
  [key: string]: string
}

/**
 * An abstract describing all possible options of the engine
 */
export interface EngineOptions extends RegistryOptions {
  //used for white labeling
  label?: string,
  //virtual path templates which represent the target destination
  path?: {
    component?: string,
    entry?: string,
    router?: string,
    routes?: string,
    view?: string
  },
  //fixed source paths
  source?: {
    babel?: string,
    entry?: string,
    router?: string
  }
}
