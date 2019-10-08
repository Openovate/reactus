import fs from 'fs';
import webpack from 'webpack';
import Helpers from './Helpers';

const Watchpack = require('watchpack');
const JailbreakPlugin = require('@openovate/webpack-jailbreak');

export default class WebpackPlugin {
  /**
   * @var engine
   */
  protected engine: any;

  /**
   * @var config
   */
  protected config: PluginOptions;

  /**
   * @var listener
   */
  protected listener: webpack.Compiler.Handler;

  /**
   * @var system
   */
  protected system?: any;

  /**
   * @var watcher
   */
  protected watcher?: any;

  /**
   * @var files
   */
  get files(): string[] {
    //get files from sources
    const files = new Set(Object.keys(this.sources));
    //if no custom files
    if (!Array.isArray(this.config.watch)) {
      //return what we got
      return Array.from(files);
    }

    //loop through each item as file
    this.config.watch.forEach((file: string) => {
      //if the file is a folder
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        //walk the folder and add files that it finds
        Helpers.walk(file, (file: string) => files.add(file), fs);
        return;
      }

      //it's a file, just add it
      files.add(file);
    });

    return Array.from(files);
  }

  /**
   * @var sources - { source path: context target }
   */
  get sources(): FileSourceMap {
    const sources: FileSourceMap = {};
    Object.keys(this.engine.sources).forEach((target: string) => {
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
   * @param engine
   * @param config
   * @param listener
   */
  constructor(
    engine: VirtualEngine,
    config: PluginOptions = { watch: [] },
    listener: webpack.Compiler.Handler = Helpers.noop
  ) {
    this.engine = engine;
    this.config = config;
    this.listener = listener;
  }

  /**
   * Used by webpack
   *
   * @param compiler
   */
  apply(compiler: webpack.Compiler) {
    this.system = new JailbreakPlugin({ files: this.engine.files });

    //start the watcher
    this.watcher = new Watchpack(this.config);
    this.watcher.watch(this.files, [], Date.now() - 10000);

    this.watcher.on('aggregated', (changes: string[]) => {
      changes.forEach(this.updateServer.bind(this, compiler));
      changes.forEach(this.updateClient.bind(this, compiler));
      compiler.run(this.listener);
    });

    this.system.apply(compiler);
  }

  /**
   * Updates a file's content in webpack
   *
   * @param compiler
   * @param source
   */
  updateClient(compiler: webpack.Compiler, source: string) {
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
   * @param compiler
   * @param source
   */
  updateServer(compiler: webpack.Compiler, source: string) {
    //if the source is a folder
    if (fs.statSync(source).isDirectory()) {
      //nothing to update
      return;
    }

    //just invalidate the require cache
    delete require.cache[require.resolve(source)];
  }
}

//custom interfaces and types

export interface VirtualEngine {
  files: FileContentMap;
  sources: FileSourceMap;
}

export interface FileContentMap {
  [key: string]: Buffer|string
}

export interface FileSourceMap {
  [key: string]: string
}

export interface PluginOptions {
  watch: string[];
}
