const path = require('path');
const Module = require('module');
const ReactusException = require('./ReactusException');

class Helpers {
  /**
   * This version of merge assumes the objects given are pure objects with
   * static values. For example you should be able to JSON.stringify each of
   * them. This helper does a deep merge in summary
   *
   * @param {Object} destination
   * @param {Object} source
   * @param {Array} [...sources]
   *
   * @return {Object}
   */
  static merge(destination, source, ...sources) {
    if (typeof destination !== 'object' || destination == null) {
      throw ReactusException.for('destination should be an object');
    }

    if (typeof source !== 'object' || source == null) {
      throw ReactusException.for('source should be an object');
    }

    try {
      JSON.parse(JSON.stringify(destination));
    } catch(e) {
      throw ReactusException.for('destination should be an object');
    }

    try {
      JSON.parse(JSON.stringify(source));
    } catch(e) {
      throw ReactusException.for('source should be an object');
    }

    Object.keys(source).forEach(key => {
      //if there is no key for this
      if (!destination[key]
        //if the value is null
        || source[key] === null
        //if the value is not an object
        || typeof source[key] !== 'object'
        //if the key is not an object
        || typeof destination[key] !== 'object'
      ) {
        //just set it
        destination[key] = source[key];
        return;
      }

      //we can assume that the destination exists,
      // key and value is an object

      //recurse merge
      this.merge(destination[key], source[key]);
    });

    //if there are more sources, recurse merge
    sources.forEach(source => this.merge(destination, source));

    return destination;
  }

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
