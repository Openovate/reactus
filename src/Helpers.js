const path = require('path');
const Module = require('module');
const ReactusException = require('./ReactusException');

class Helpers {
  /**
   * Shim for server middleware
   *
   * @param {(String|Error)} error
   */
  static next(error) {
    if (error) {
      if (typeof error === 'string') {
        error = ReactusException.for(error);
      }

      throw error;
    }
  }

  /**
   * A non operational function
   */
  static noop() {}

  /**
   * Primarily used for testing, this creates a virtual `reactus` node module
   *
   * @param {String} brand
   */
  static shim(label = 'reactus') {
    //overwrite Node's Module->resolveFilename
    const resolveFilename = Module._resolveFilename;
    Module._resolveFilename = function resolve(request, parent) {
      //if they are asking for the brand
      if (request !== label) {
        //business as usual.
        return resolveFilename.call(Module, request, parent);
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
