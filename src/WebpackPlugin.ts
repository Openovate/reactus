import fs from 'fs';
import webpack from 'webpack';
import { walk, noop } from './helpers';

const Watchpack = require('watchpack');
const JailbreakPlugin = require('@openovate/webpack-jailbreak');

/**
 * This should be added into your `webpack.config.js`. This sends all the
 * virtual file information to webpack to be considered when bundling files
 */
export default class WebpackPlugin {
  /**
   * The Virtual Engine
   */
  protected engine: any;

  /**
   * The plugin options. Right now it's just `{ watch: [file, folder, ..] }`
   */
  protected config: PluginOptions;

  /**
   * The callback to call when webpack finishes compiling
   */
  protected listener: webpack.Compiler.Handler;

  /**
   * This is the holder for the JailbreakPlugin
   */
  protected system?: any;

  /**
   * This is the holder for Watchpack
   */
  protected watcher?: any;

  /**
   * A list of files to watch. When changes are made to any of these files, it
   * will tell webpack to rebuild
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
        walk(file, (file: string) => files.add(file), fs);
        return;
      }

      //it's a file, just add it
      files.add(file);
    });

    return Array.from(files);
  }

  /**
   * a list of sources in the form of `{ source path: context target }`
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
   * @param engine - The Virtual Engine
   * @param config - The plugin options
   * @param listener - The callback to call when webpack finishes compiling
   */
  constructor(
    engine: VirtualEngine,
    config: PluginOptions = { watch: [] },
    listener: webpack.Compiler.Handler = noop
  ) {
    this.engine = engine;
    this.config = config;
    this.listener = listener;
  }

  /**
   * Used by webpack
   *
   * @param compiler - the webpack compiler
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
   * @param compiler - the webpack compiler
   * @param source - the source file to update
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
   * @param compiler - the webpack compiler
   * @param source - the source file to update
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

/**
 * `VirtualEngine.ts` calls this file, so we can't require it back because of
 * circular dependency limitations. Instead we create a mock interface
 */
export interface VirtualEngine {
  files: FileContentMap;
  sources: FileSourceMap;
}

/**
 * An abstract describing the contents of the `engine.files` array
 */
export interface FileContentMap {
  [key: string]: Buffer|string
}

/**
 * An abstract describing `engine.sources`
 */
export interface FileSourceMap {
  [key: string]: string
}

/**
 * An abstract describing all possible options of the plugin
 */
export interface PluginOptions {
  watch: string[];
}
