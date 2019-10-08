import EventEmitter from 'events';
import FileResolve from './FileResolve';

const Module = require('module');

export default class RequireResolver extends EventEmitter {
  /**
   * @var instance
   */
  static instance: RequireResolver;

  /**
   * @var original
   */
  original: Function;

  /**
   * In this case you do want a singleton.
   */
  static load(): RequireResolver {
    if (!this.instance) {
      this.instance = new RequireResolver();
    }

    return this.instance;
  }

  /**
   * Wrap the original resolveFilename()
   */
  constructor() {
    super();
    //overwrite Node's Module->resolveFilename
    this.original = <Function> Module._resolveFilename;
    Module._resolveFilename = this.resolve.bind(this);
  }

  /**
   * Resolve callback for Module._resolveFilename
   *
   * @param {String} request
   * @param {Object} parent
   */
  resolve(request: string, parent: object) {
    //try to resolve
    const resolve = new FileResolve;
    this.emit('resolve', request, resolve, parent);

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

//additional exports

export { FileResolve };
