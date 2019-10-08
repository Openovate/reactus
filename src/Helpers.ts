import fs from 'fs';
import path from 'path';
import FileResolve from './FileResolve';
import RequireResolver from './RequireResolver';
import ReactusException from './ReactusException';

export default class Helpers {
  /**
   * This version of merge assumes the objects given are pure objects with
   * static values. For example you should be able to JSON.stringify each of
   * them. This helper does a deep merge in summary
   *
   * @param destination
   * @param source
   * @param sources
   */
  static merge(
    destination: AnyObject<any>,
    source: AnyObject<any>,
    ...sources: AnyObject<any>[]
  ): object {
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

    Object.keys(source).forEach((key: string) => {
      //if there is no key for this
      if (!destination[key]
        //if the value is null
        || source[key] === null
        //if the value is not an object
        || typeof source[key] !== 'object'
        //if the key is not an object
        || typeof destination[key] !== 'object'
      ) {
        //if source key is an object
        if (typeof source[key] === 'object') {
          //make a shallow clone
          destination[key] = Object.assign({}, source[key]);
          return;
        }

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
    sources.forEach((source: object) => this.merge(destination, source));

    return destination;
  }

  /**
   * Shim for server middleware
   *
   * @param error
   */
  static next(error: any) {
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
   * @param label
   */
  static shim(label: string = 'reactus') {
    RequireResolver.load().on('resolve', (
      request: string,
      resolve: FileResolve
    ) => {
      //if they are not asking for the label
      if (request !== label) {
        //business as usual.
        return;
      }

      const index = path.resolve(__dirname, '../dist/index.js');

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

      resolve.set(index, require('./index'))
    });
  }

  /**
   * Helper to walk through each file
   *
   * @param fileSystem
   * @param folder
   * @param callback
   */
  static walk(folder: string, callback: Function, fileSystem = fs) {
    const files = fileSystem.readdirSync(folder);

    for (const file of files) {
      const item = path.join(folder, file);
      if (fileSystem.statSync(item).isDirectory()) {
        this.walk(item, callback, fileSystem);
      } else {
        callback(item);
      }
    }
  }
}

//custom interfaces and types

export interface AnyObject<T> { [key: string]: T; }
