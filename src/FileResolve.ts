export default class FileResolve implements JavascriptFile {
  /**
   * @var file
   */
  file: string = '';

  /**
   * @var exports
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
   * @param file
   * @param exports
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

export interface JavascriptFile {
  file: string;
  exports: any;
}
