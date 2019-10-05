const fs = require('fs');
const path = require('path');

const Module = require('module');
const babel = require('@babel/core');
const requireFromString = require('require-from-string');

class RequireResolver {
  /**
   * Set the engine
   *
   * @param {VirtualEngine} engine
   * @param {Function} original
   */
  constructor(engine, original) {
    this.engine = engine;
    this.original = original;
  }

  /**
   * Resolve callback for Module._resolveFilename
   *
   * @param {String} request
   * @param {Object} parent
   */
  resolve(request, parent) {
    let formatted = request;

    if (!path.extname(formatted)) {
      formatted += '.js';
    }

    //try to resolve
    const resolved = this._resolve(formatted);

    //if its not resolved
    if (!resolved) {
      //business as usual
      return this.original.call(Module, request, parent);
    }

    const [ file, exports ] = resolved;

    //if it's not cached
    if (!require.cache[file]) {
      //cache it
      require.cache[file] = {
        id: file,
        filename: file,
        loaded: true,
        exports: exports
      };
    }

    //redirect them to our cached version
    return file;
  }

  /**
   * Require resolver
   *
   * @param {String} request
   *
   * @return {(Array|False)}
   */
  _resolve(request) {
    let resolved = false;
    const resolvers = ['_resolveFile', '_resolveEngine'];
    //for each resolver
    for(const resolver of resolvers) {
      //try to resolve
      resolved = this[resolver](request);
      //if it's resolved
      if (resolved) {
        //dont resolve anymore
        break;
      }
    }

    return resolved;
  }

  /**
   * Require resolver for named engines
   *
   * @param {String} request
   *
   * @return {(Array|False)}
   */
  _resolveEngine(request) {
    //if the request starts with / or .
    if (request.indexOf('/') === 0 || request.indexOf('.') === 0) {
      //cannot resolve
      return false;
    }

    //get the brand
    const brand = this.engine.registry.get('module');
    //looking for something like reactus/engine/web.js
    //if the request doesn't start with reactus/engine/
    if (request.indexOf(brand + '/engine/') !== 0) {
      //cannot resolve
      return false;
    }

    //make the actual intended path
    const file = path.join(__dirname, '../..', request);

    return [ file, new this.engine.constructor() ];
  }

  /**
   * Require resolver for registered files
   *
   * @param {String} request
   *
   * @return {(Array|False)}
   */
  _resolveFile(request) {
    //if the request starts with /, . or is not a file
    if (request.indexOf('/') === 0
      || request.indexOf('.') === 0
      || !this.engine.files['node_modules/' + request]
    ) {
      //cannot resolve
      return false;
    }

    //make the actual intended path
    const file = path.join(__dirname, '../..', request);

    //transform the code back to commonjs
    const content = this.engine.files['node_modules/' + request].toString();
    const { code } = babel.transform(content, this.engine.presets);

    const source = this.engine.sources['node_modules/' + request];
    return [ file, requireFromString(code, source) ];
  }
}

module.exports = RequireResolver;
