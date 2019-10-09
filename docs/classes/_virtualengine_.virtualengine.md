[reactus](../README.md) › [Globals](../globals.md) › ["VirtualEngine"](../modules/_virtualengine_.md) › [VirtualEngine](_virtualengine_.virtualengine.md)

# Class: VirtualEngine

The main engine that processes and routes virtual files to webpack, and require

## Hierarchy

  ↳ [VirtualRegistry](_virtualregistry_.virtualregistry.md)

  ↳ **VirtualEngine**

## Index

### Constructors

* [constructor](_virtualengine_.virtualengine.md#constructor)

### Properties

* [data](_virtualengine_.virtualengine.md#protected-data)
* [lazyFiles](_virtualengine_.virtualengine.md#optional-lazyfiles)
* [lazyPage](_virtualengine_.virtualengine.md#protected-optional-lazypage)
* [lazyPresets](_virtualengine_.virtualengine.md#protected-lazypresets)

### Accessors

* [WebpackPlugin](_virtualengine_.virtualengine.md#webpackplugin)
* [files](_virtualengine_.virtualengine.md#files)
* [page](_virtualengine_.virtualengine.md#page)
* [presets](_virtualengine_.virtualengine.md#presets)
* [sources](_virtualengine_.virtualengine.md#sources)

### Methods

* [component](_virtualengine_.virtualengine.md#component)
* [get](_virtualengine_.virtualengine.md#get)
* [getDot](_virtualengine_.virtualengine.md#getdot)
* [has](_virtualengine_.virtualengine.md#has)
* [hasDot](_virtualengine_.virtualengine.md#hasdot)
* [remove](_virtualengine_.virtualengine.md#remove)
* [removeDot](_virtualengine_.virtualengine.md#removedot)
* [render](_virtualengine_.virtualengine.md#render)
* [resolveEngine](_virtualengine_.virtualengine.md#resolveengine)
* [resolveFile](_virtualengine_.virtualengine.md#resolvefile)
* [set](_virtualengine_.virtualengine.md#set)
* [setDot](_virtualengine_.virtualengine.md#setdot)
* [use](_virtualengine_.virtualengine.md#use)
* [view](_virtualengine_.virtualengine.md#view)

## Constructors

###  constructor

\+ **new VirtualEngine**(`config?`: [EngineOptions](../interfaces/_virtualengine_.engineoptions.md)): *[VirtualEngine](_virtualengine_.virtualengine.md)*

*Overrides [VirtualRegistry](_virtualregistry_.virtualregistry.md).[constructor](_virtualregistry_.virtualregistry.md#constructor)*

*Defined in [VirtualEngine.ts:136](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L136)*

Sets up the registry and the require resolver

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config?` | [EngineOptions](../interfaces/_virtualengine_.engineoptions.md) | The options to pass to the engine  |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*

## Properties

### `Protected` data

• **data**: *object*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:3

___

### `Optional` lazyFiles

• **lazyFiles**? : *[FileContentMap](../interfaces/_virtualengine_.filecontentmap.md)*

*Defined in [VirtualEngine.ts:22](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L22)*

Since files should be formed after you set all of your virtual files,
this makes sure we only do it intentionally when we need to. If you need
to rebuild the files just delete this variable

___

### `Protected` `Optional` lazyPage

• **lazyPage**? : *[AnyComponent](../modules/_virtualregistry_.md#anycomponent)*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[lazyPage](_virtualregistry_.virtualregistry.md#protected-optional-lazypage)*

*Defined in [VirtualRegistry.ts:24](https://github.com/Openovate/reactus/blob/b750986/src/VirtualRegistry.ts#L24)*

Since page compiles to common JS, we should cache the results to
intentionally prevent unwanted compiles to the same file over and over
again. To refresh the page, just delete this

___

### `Protected` lazyPresets

• **lazyPresets**: *object | null* =  null

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[lazyPresets](_virtualregistry_.virtualregistry.md#protected-lazypresets)*

*Defined in [VirtualRegistry.ts:31](https://github.com/Openovate/reactus/blob/b750986/src/VirtualRegistry.ts#L31)*

Since .babelrc is read, we should cache the results to intentionally
prevent unwanted compiles to the same file over and over again. To refresh
the preset, just set this to null

## Accessors

###  WebpackPlugin

• **get WebpackPlugin**(): *object*

*Defined in [VirtualEngine.ts:133](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L133)*

The plugin to attach as a plugin in `webpack.config.js`

**Returns:** *object*

* **new __type**(): *[WebpackPlugin](_webpackplugin_.webpackplugin.md)*

___

###  files

• **get files**(): *[FileContentMap](../interfaces/_virtualengine_.filecontentmap.md)*

*Defined in [VirtualEngine.ts:27](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L27)*

A list of files in the form of `{ context target: actual code }`

**Returns:** *[FileContentMap](../interfaces/_virtualengine_.filecontentmap.md)*

___

###  page

• **get page**(): *any*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[page](_virtualregistry_.virtualregistry.md#page)*

*Defined in [VirtualRegistry.ts:36](https://github.com/Openovate/reactus/blob/b750986/src/VirtualRegistry.ts#L36)*

The transformed page component from `Page.jsx`

**Returns:** *any*

___

###  presets

• **get presets**(): *object*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[presets](_virtualregistry_.virtualregistry.md#presets)*

*Defined in [VirtualRegistry.ts:52](https://github.com/Openovate/reactus/blob/b750986/src/VirtualRegistry.ts#L52)*

The configuration from `.babelrc`

**Returns:** *object*

___

###  sources

• **get sources**(): *[FileSourceMap](../interfaces/_virtualengine_.filesourcemap.md)*

*Defined in [VirtualEngine.ts:64](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L64)*

A list of sources in the form of `{ context target: source path }`

**Returns:** *[FileSourceMap](../interfaces/_virtualengine_.filesourcemap.md)*

## Methods

###  component

▸ **component**(`name`: string, `path`: string): *[VirtualEngine](_virtualengine_.virtualengine.md)*

*Overrides [VirtualRegistry](_virtualregistry_.virtualregistry.md).[component](_virtualregistry_.virtualregistry.md#component)*

*Defined in [VirtualEngine.ts:180](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L180)*

Registers a global component

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | the name of the component |
`path` | string | the actual absolute path where this component file is located  |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*

___

###  get

▸ **get**(...`path`: Index[]): *any*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`...path` | Index[] |

**Returns:** *any*

___

###  getDot

▸ **getDot**(`notation`: string, `separator?`: undefined | string): *any*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`notation` | string |
`separator?` | undefined &#124; string |

**Returns:** *any*

___

###  has

▸ **has**(...`path`: Index[]): *boolean*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`...path` | Index[] |

**Returns:** *boolean*

___

###  hasDot

▸ **hasDot**(`notation`: string, `separator?`: undefined | string): *boolean*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`notation` | string |
`separator?` | undefined &#124; string |

**Returns:** *boolean*

___

###  remove

▸ **remove**(...`path`: Index[]): *Registry*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`...path` | Index[] |

**Returns:** *Registry*

___

###  removeDot

▸ **removeDot**(`notation`: string, `separator?`: undefined | string): *Registry*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`notation` | string |
`separator?` | undefined &#124; string |

**Returns:** *Registry*

___

###  render

▸ **render**(`res`: ServerResponse, `path`: string, `props`: object, `pageProps`: object, `page?`: [AnyComponent](../modules/_virtualregistry_.md#anycomponent)): *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[render](_virtualregistry_.virtualregistry.md#render)*

*Defined in [VirtualRegistry.ts:107](https://github.com/Openovate/reactus/blob/b750986/src/VirtualRegistry.ts#L107)*

Renders a react view

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`res` | ServerResponse | - | the response |
`path` | string | - | the path where the virtual view exists. ie `product/detail` |
`props` | object |  {} | the props for the main component |
`pageProps` | object |  {} | the props for the page component |
`page?` | [AnyComponent](../modules/_virtualregistry_.md#anycomponent) | - | if you want to use a custom page component  |

**Returns:** *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

___

###  resolveEngine

▸ **resolveEngine**(`request`: string, `resolve`: [FileResolve](_fileresolve_.fileresolve.md)): *void*

*Defined in [VirtualEngine.ts:193](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L193)*

Require resolver for named engines

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | string | the `require()` request |
`resolve` | [FileResolve](_fileresolve_.fileresolve.md) | if this method can resolve it, file and exports should be set  |

**Returns:** *void*

___

###  resolveFile

▸ **resolveFile**(`request`: string, `resolve`: [FileResolve](_fileresolve_.fileresolve.md)): *void*

*Defined in [VirtualEngine.ts:241](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L241)*

Require resolver for registered files

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | string | the `require()` request |
`resolve` | [FileResolve](_fileresolve_.fileresolve.md) | if this method can resolve it, file and exports should be set  |

**Returns:** *void*

___

###  set

▸ **set**(...`path`: any[]): *Registry*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`...path` | any[] |

**Returns:** *Registry*

___

###  setDot

▸ **setDot**(`notation`: string, `value`: any, `separator?`: undefined | string): *Registry*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`notation` | string |
`value` | any |
`separator?` | undefined &#124; string |

**Returns:** *Registry*

___

###  use

▸ **use**(`middleware`: [VirtualRegistry](_virtualregistry_.virtualregistry.md) | object | Function): *[VirtualEngine](_virtualengine_.virtualengine.md)*

*Defined in [VirtualEngine.ts:295](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L295)*

Middleware method for VirtualEngine. Similar to how `express.use()` works

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`middleware` | [VirtualRegistry](_virtualregistry_.virtualregistry.md) &#124; object &#124; Function | the middleware interface to add to the engine  |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*

___

###  view

▸ **view**(`route`: string, `path`: string, `view`: string): *[VirtualEngine](_virtualengine_.virtualengine.md)*

*Overrides [VirtualRegistry](_virtualregistry_.virtualregistry.md).[view](_virtualregistry_.virtualregistry.md#view)*

*Defined in [VirtualEngine.ts:283](https://github.com/Openovate/reactus/blob/b750986/src/VirtualEngine.ts#L283)*

Registers a view

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | string | the route as in `/product/:id` |
`path` | string | the path where to virtually store the view where `product/detail` will be translated to `reactus/views/product/detail.jsx` |
`view` | string | the actual absolute path where the view file is located  |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*
