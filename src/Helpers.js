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
   * Primarily used for testing, this creates a virtual `reactus` node module
   *
   * @param {String} brand
   */
  static shim(brand = 'reactus') {
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

  /**
   * Helper to walk through each file
   *
   * @param {FileSystem} fileSystem
   * @param {String} folder
   * @param {Function} callback
   */
  static walk(fileSystem, folder, callback) {
    const files = fileSystem.readdirSync(folder);

    for (const file of files) {
      const item = path.join(folder, file);
      if (fileSystem.statSync(item).isDirectory()) {
        this.walk(fileSystem, item, callback);
      } else {
        callback(item);
      }
    }
  }
}

module.exports = Helpers;
