import EventEmitter from 'events';
import FileResolve from './FileResolve';

const Module = require('module');

/**
 * Allows to define how a virtual module gets loaded when a user does
 * `require('something')` instead of having multiple points where the
 * `Module._resolveFilename()` is wrapped, this class is a single point
 * where it is wrapped then triggering an event when `require()` is used.
 * This class should be instantiated using `RequireResolver.load()` to
 * enforce a static class pattern because `require()` is heavily used so
 * we shouldn't be wrapping this more than once.
 */
export default class RequireResolver extends EventEmitter {
  /**
   * The static instance of RequireResolver
   */
  static instance: RequireResolver;

  /**
   * The original Module._resolveFilename()
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
   * @param request - the request string; may not be an absolute path
   * @param parent - the parent object from the `require.cache`
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
