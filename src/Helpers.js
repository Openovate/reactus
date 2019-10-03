const path = require('path');
const Module = require('module');
const { Exception } = require('@openovate/jsm');

class Helpers {
  /**
   * Primarily used for http.createServer to match interface with express
   *
   * @param {String} error
   */
  static next(error) {
    if (error) {
      throw Exception.for(error);
    }
  }

  /**
   * Primarily used for testing, this creates a virtual `reactve` node module
   *
   * @param {String} brand
   */
  static shim(brand = 'reactve') {
    //overwrite Node's Module->resolveFilename
    const resolveFilename = Module._resolveFilename;
    Module._resolveFilename = function resolve(request, parent) {
      //if they are asking for the brand
      if (request !== brand) {
        //business as usual.
        return resolveFilename(request, parent);
      }

      const index = path.resolve(__dirname, 'index.js');

      //if it's not cached
      if (!require.cache[index]) {
        //now call it and cache it
        require.cache[index] = {
          id: index,
          filename: index,
          loaded: true,
          exports: require('./index')
        };
      }

      //redirect them to our cached version
      return index;
    };
  }
}

module.exports = Helpers;
