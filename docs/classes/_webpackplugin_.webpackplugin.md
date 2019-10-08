[reactus](../README.md) › [Globals](../globals.md) › ["WebpackPlugin"](../modules/_webpackplugin_.md) › [WebpackPlugin](_webpackplugin_.webpackplugin.md)

# Class: WebpackPlugin

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

*Defined in [WebpackPlugin.ts:80](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L80)*

Sets up the engine, watchpack config and listener

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`engine` | [VirtualEngine](../interfaces/_webpackplugin_.virtualengine.md) | - | - |
`config` | [PluginOptions](../interfaces/_webpackplugin_.pluginoptions.md) |  { watch: [] } | - |
`listener` | webpack.Compiler.Handler |  Helpers.noop |   |

**Returns:** *[WebpackPlugin](_webpackplugin_.webpackplugin.md)*

## Properties

### `Protected` config

• **config**: *[PluginOptions](../interfaces/_webpackplugin_.pluginoptions.md)*

*Defined in [WebpackPlugin.ts:17](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L17)*

**`var`** config

___

### `Protected` engine

• **engine**: *any*

*Defined in [WebpackPlugin.ts:12](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L12)*

**`var`** engine

___

### `Protected` listener

• **listener**: *webpack.Compiler.Handler*

*Defined in [WebpackPlugin.ts:22](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L22)*

**`var`** listener

___

### `Protected` `Optional` system

• **system**? : *any*

*Defined in [WebpackPlugin.ts:27](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L27)*

**`var`** system

___

### `Protected` `Optional` watcher

• **watcher**? : *any*

*Defined in [WebpackPlugin.ts:32](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L32)*

**`var`** watcher

## Accessors

###  files

• **get files**(): *string[]*

*Defined in [WebpackPlugin.ts:37](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L37)*

**`var`** files

**Returns:** *string[]*

___

###  sources

• **get sources**(): *[FileSourceMap](../interfaces/_webpackplugin_.filesourcemap.md)*

*Defined in [WebpackPlugin.ts:65](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L65)*

**`var`** sources - { source path: context target }

**Returns:** *[FileSourceMap](../interfaces/_webpackplugin_.filesourcemap.md)*

## Methods

###  apply

▸ **apply**(`compiler`: Compiler): *void*

*Defined in [WebpackPlugin.ts:104](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L104)*

Used by webpack

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compiler` | Compiler |   |

**Returns:** *void*

___

###  updateClient

▸ **updateClient**(`compiler`: Compiler, `source`: string): *void*

*Defined in [WebpackPlugin.ts:126](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L126)*

Updates a file's content in webpack

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compiler` | Compiler | - |
`source` | string |   |

**Returns:** *void*

___

###  updateServer

▸ **updateServer**(`compiler`: Compiler, `source`: string): *void*

*Defined in [WebpackPlugin.ts:146](https://github.com/Openovate/reactus/blob/0600fe9/src/WebpackPlugin.ts#L146)*

Updates a file's content in require

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compiler` | Compiler | - |
`source` | string |   |

**Returns:** *void*
