class FileResolve {
  /**
   * Returns the resolved data
   *
   * @return {(Object|False)}
   */
  get() {
    return {
      file: this.file,
      exports: this.exports
    };
  }

  /**
   * Sets the resolve data
   *
   * @param {String} file
   * @param {*} exports
   *
   * @return {Resolve}
   */
  set(file, exports) {
    this.file = file;
    this.exports = exports;
    return this;
  }

  /**
   * Returns true if resolved
   *
   * @return {Boolean}
   */
  isResolved() {
    return typeof this.file === 'string' && this.file.length;
  }
}

module.exports = FileResolve;
