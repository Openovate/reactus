const fs = require('fs');
const webpack = require('webpack');
const Watchpack = require('watchpack');
const JailbreakPlugin = require('@openovate/webpack-jailbreak');
const Helpers = require('./Helpers');

class WebpackPlugin {
  /**
   * @var {Array} files
   */
  get files() {
    //get files from sources
    const files = new Set(Object.keys(this.sources));
    //if no custom files
    if (!Array.isArray(this.config.watch)) {
      //return what we got
      return Array.from(files);
    }

    //loop through each item as file
    this.config.watch.forEach(file => {
      //if the file is a folder
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        //walk the folder and add files that it finds
        Helpers.walk(fs, file, file => files.add(file));
        return;
      }

      //it's a file, just add it
      files.add(file);
    });

    return Array.from(files);
  }

  /**
   * @var {Object} sources - { source path: context target }
   */
  get sources() {
    const sources = {};
    Object.keys(this.engine.sources).forEach(target => {
      const source = this.engine.sources[target];
      //if source is not a real file
      if (!fs.existsSync(source) || !fs.lstatSync(source).isFile()) {
        //skip
        return;
      }

      //perform an hash flip
      sources[source] = target;
    });

    return sources;
  }

  /**
   * Sets up the engine, watchpack config and listener
   *
   * @param {VirtualEngine} engine
   * @param {Object} [config = {}]
   * @param {Function} [listener = noop]
   */
  constructor(engine, config = {}, listener = Helpers.noop) {
    this.engine = engine;
    this.config = config;
    this.listener = listener;
  }

  /**
   * Used by webpack
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    this.system = new JailbreakPlugin({ files: this.engine.files });

    //start the watcher
    this.watcher = new Watchpack(this.config);
    this.watcher.watch(this.files, [], Date.now() - 10000);

    this.watcher.on('aggregated', changes => {
      changes.forEach(this.updateServer.bind(this, compiler));
      changes.forEach(this.updateClient.bind(this, compiler));
      compiler.compile(this.listener);
    });

    this.system.apply(compiler);
  }

  /**
   * Updates a file's content in webpack
   *
   * @param {Compiler} compiler
   * @param {Compiler} source
   */
  updateClient(compiler, source) {
    //if source is not found
    if (!this.sources[source]) {
      //then it's not a virtual file.
      return;
    }

    //just to be clear...
    const target = this.sources[source];
    const content = fs.readFileSync(source);

    this.system.updateFile(compiler, target, content);
  }

  /**
   * Updates a file's content in require
   *
   * @param {Compiler} compiler
   * @param {Compiler} source
   */
  updateServer(compiler, source) {
    //if the source is a folder
    if (fs.statSync(source).isDirectory()) {
      //nothing to update
      return;
    }

    //just invalidate the require cache
    delete require.cache[require.resolve(source)];
  }
}

module.exports = WebpackPlugin;
