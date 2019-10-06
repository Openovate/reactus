const path = require('path');
const Module = require('module');
const EventEmitter = require('events');
const FileResolve = require('./FileResolve');

class RequireResolver extends EventEmitter {
  /**
   * In this case you do want a singleton.
   *
   * @return {RequireResolver}
   */
  static load() {
    if (!this.instance) {
      this.instance = new RequireResolver();
    }

    return this.instance;
  }

  /**
   * Set the engine
   *
   * @param {VirtualEngine} engine
   * @param {Function} original
   */
  constructor() {
    super();
    //overwrite Node's Module->resolveFilename
    this.original = Module._resolveFilename;
    Module._resolveFilename = this.resolve.bind(this);
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
    const resolve = new FileResolve;
    this.emit('resolve', formatted, resolve);

    //if its not resolved
    if (!resolve.isResolved()) {
      //business as usual
      return this.original.call(Module, request, parent);
    }

    const { file, exports } = resolve.get();

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
}

module.exports = RequireResolver;
