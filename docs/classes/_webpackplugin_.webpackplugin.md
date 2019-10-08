[reactus](../README.md) › [Globals](../globals.md) › ["WebpackPlugin"](../modules/_webpackplugin_.md) › [WebpackPlugin](_webpackplugin_.webpackplugin.md)

# Class: WebpackPlugin

This should be added into your `webpack.config.js`. This sends all the
virtual file information to webpack to be considered when bundling files

## Hierarchy

* **WebpackPlugin**

## Index

### Constructors

* [constructor](_webpackplugin_.webpackplugin.md#constructor)

### Properties

* [config](_webpackplugin_.webpackplugin.md#protected-config)
* [engine](_webpackplugin_.webpackplugin.md#protected-engine)
* [listener](_webpackplugin_.webpackplugin.md#protected-listener)
* [system](_webpackplugin_.webpackplugin.md#protected-optional-system)
* [watcher](_webpackplugin_.webpackplugin.md#protected-optional-watcher)

### Accessors

* [files](_webpackplugin_.webpackplugin.md#files)
* [sources](_webpackplugin_.webpackplugin.md#sources)

### Methods

* [apply](_webpackplugin_.webpackplugin.md#apply)
* [updateClient](_webpackplugin_.webpackplugin.md#updateclient)
* [updateServer](_webpackplugin_.webpackplugin.md#updateserver)

## Constructors

###  constructor

\+ **new WebpackPlugin**(`engine`: [VirtualEngine](../interfaces/_webpackplugin_.virtualengine.md), `config`: [PluginOptions](../interfaces/_webpackplugin_.pluginoptions.md), `listener`: webpack.Compiler.Handler): *[WebpackPlugin](_webpackplugin_.webpackplugin.md)*

*Defined in [WebpackPlugin.ts:85](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L85)*

Sets up the engine, watchpack config and listener

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`engine` | [VirtualEngine](../interfaces/_webpackplugin_.virtualengine.md) | - | The Virtual Engine |
`config` | [PluginOptions](../interfaces/_webpackplugin_.pluginoptions.md) |  { watch: [] } | The plugin options |
`listener` | webpack.Compiler.Handler |  Helpers.noop | The callback to call when webpack finishes compiling  |

**Returns:** *[WebpackPlugin](_webpackplugin_.webpackplugin.md)*

## Properties

### `Protected` config

• **config**: *[PluginOptions](../interfaces/_webpackplugin_.pluginoptions.md)*

*Defined in [WebpackPlugin.ts:21](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L21)*

The plugin options. Right now it's just `{ watch: [file, folder, ..] }`

___

### `Protected` engine

• **engine**: *any*

*Defined in [WebpackPlugin.ts:16](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L16)*

The Virtual Engine

___

### `Protected` listener

• **listener**: *webpack.Compiler.Handler*

*Defined in [WebpackPlugin.ts:26](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L26)*

The callback to call when webpack finishes compiling

___

### `Protected` `Optional` system

• **system**? : *any*

*Defined in [WebpackPlugin.ts:31](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L31)*

This is the holder for the JailbreakPlugin

___

### `Protected` `Optional` watcher

• **watcher**? : *any*

*Defined in [WebpackPlugin.ts:36](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L36)*

This is the holder for Watchpack

## Accessors

###  files

• **get files**(): *string[]*

*Defined in [WebpackPlugin.ts:42](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L42)*

A list of files to watch. When changes are made to any of these files, it
will tell webpack to rebuild

**Returns:** *string[]*

___

###  sources

• **get sources**(): *[FileSourceMap](../interfaces/_webpackplugin_.filesourcemap.md)*

*Defined in [WebpackPlugin.ts:70](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L70)*

a list of sources in the form of `{ source path: context target }`

**Returns:** *[FileSourceMap](../interfaces/_webpackplugin_.filesourcemap.md)*

## Methods

###  apply

▸ **apply**(`compiler`: Compiler): *void*

*Defined in [WebpackPlugin.ts:109](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L109)*

Used by webpack

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compiler` | Compiler | the webpack compiler  |

**Returns:** *void*

___

###  updateClient

▸ **updateClient**(`compiler`: Compiler, `source`: string): *void*

*Defined in [WebpackPlugin.ts:131](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L131)*

Updates a file's content in webpack

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compiler` | Compiler | the webpack compiler |
`source` | string | the source file to update  |

**Returns:** *void*

___

###  updateServer

▸ **updateServer**(`compiler`: Compiler, `source`: string): *void*

*Defined in [WebpackPlugin.ts:151](https://github.com/Openovate/reactus/blob/519cdb0/src/WebpackPlugin.ts#L151)*

Updates a file's content in require

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compiler` | Compiler | the webpack compiler |
`source` | string | the source file to update  |

**Returns:** *void*
