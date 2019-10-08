/**
 * File Resolve is an abstract to describe how to resolve a file request from
 * `@require(file)`. You just simply need to set the exports.
 */
export default class FileResolve implements JavascriptFile {
  /**
   * The string file absolute path
   */
  file: string = '';

  /**
   * The compiled results of the file, Usually from `exports`
   */
  exports: any;

  /**
   * Returns the resolved data
   */
  get(): JavascriptFile {
    return {
      file: this.file,
      exports: this.exports
    };
  }

  /**
   * Sets the resolve data
   *
   * @param file - The string file absolute path
   * @param exports - The compiled results of the file, Usually from `exports`
   */
  set(file: string, exports: any): FileResolve {
    this.file = file;
    this.exports = exports;
    return this;
  }

  /**
   * Returns true if resolved
   */
  isResolved(): boolean {
    return typeof this.file === 'string' && !!this.file.length;
  }
}

//custom interfaces and types

/**
 * A JavascriptFile is a file that has exported results
 */
export interface JavascriptFile {
  /**
   * The string file absolute path
   */
  file: string;

  /**
   * The compiled results of the file, Usually from `exports`
   */
  exports: any;
}
