[reactus](../README.md) › [Globals](../globals.md) › ["VirtualEngine"](../modules/_virtualengine_.md) › [VirtualEngine](_virtualengine_.virtualengine.md)

# Class: VirtualEngine

## Hierarchy

  ↳ [VirtualRegistry](_virtualregistry_.virtualregistry.md)

  ↳ **VirtualEngine**

## Index

### Constructors

* [constructor](_virtualengine_.virtualengine.md#constructor)

### Properties

* [data](_virtualengine_.virtualengine.md#protected-data)
* [lazyFiles](_virtualengine_.virtualengine.md#protected-optional-lazyfiles)
* [lazyPage](_virtualengine_.virtualengine.md#protected-optional-lazypage)
* [lazyPresets](_virtualengine_.virtualengine.md#protected-lazypresets)
* [resolver](_virtualengine_.virtualengine.md#protected-resolver)

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

*Defined in [VirtualEngine.ts:136](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L136)*

Sets up the registry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config?` | [EngineOptions](../interfaces/_virtualengine_.engineoptions.md) |   |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*

## Properties

### `Protected` data

• **data**: *object*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:3

___

### `Protected` `Optional` lazyFiles

• **lazyFiles**? : *[FileContentMap](../interfaces/_virtualengine_.filecontentmap.md)*

*Defined in [VirtualEngine.ts:17](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L17)*

**`var`** lazyPage

___

### `Protected` `Optional` lazyPage

• **lazyPage**? : *[AnyComponent](../modules/_virtualregistry_.md#anycomponent)*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[lazyPage](_virtualregistry_.virtualregistry.md#protected-optional-lazypage)*

*Defined in [VirtualRegistry.ts:19](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L19)*

**`var`** lazyPage

___

### `Protected` lazyPresets

• **lazyPresets**: *object | null* =  null

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[lazyPresets](_virtualregistry_.virtualregistry.md#protected-lazypresets)*

*Defined in [VirtualRegistry.ts:24](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L24)*

**`var`** lazyPresets

___

### `Protected` resolver

• **resolver**: *[RequireResolver](_requireresolver_.requireresolver.md)*

*Defined in [VirtualEngine.ts:22](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L22)*

**`var`** resolver

## Accessors

###  WebpackPlugin

• **get WebpackPlugin**(): *object*

*Defined in [VirtualEngine.ts:133](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L133)*

**`var`** WebpackPlugin

**Returns:** *object*

* **new __type**(): *[WebpackPlugin](_webpackplugin_.webpackplugin.md)*

___

###  files

• **get files**(): *[FileContentMap](../interfaces/_virtualengine_.filecontentmap.md)*

*Defined in [VirtualEngine.ts:27](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L27)*

**`var`** files - { context target: actual code }

**Returns:** *[FileContentMap](../interfaces/_virtualengine_.filecontentmap.md)*

___

###  page

• **get page**(): *any*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[page](_virtualregistry_.virtualregistry.md#page)*

*Defined in [VirtualRegistry.ts:29](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L29)*

**`var`** page

**Returns:** *any*

___

###  presets

• **get presets**(): *object*

*Inherited from [VirtualRegistry](_virtualregistry_.virtualregistry.md).[presets](_virtualregistry_.virtualregistry.md#presets)*

*Defined in [VirtualRegistry.ts:45](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L45)*

**`var`** presets

**Returns:** *object*

___

###  sources

• **get sources**(): *[FileSourceMap](../interfaces/_virtualengine_.filesourcemap.md)*

*Defined in [VirtualEngine.ts:64](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L64)*

**`var`** sources - { context target: source path }

**Returns:** *[FileSourceMap](../interfaces/_virtualengine_.filesourcemap.md)*

## Methods

###  component

▸ **component**(`name`: string, `path`: string): *[VirtualEngine](_virtualengine_.virtualengine.md)*

*Overrides [VirtualRegistry](_virtualregistry_.virtualregistry.md).[component](_virtualregistry_.virtualregistry.md#component)*

*Defined in [VirtualEngine.ts:181](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L181)*

Registers a global component

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | - |
`path` | string |   |

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

*Defined in [VirtualRegistry.ts:100](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L100)*

Renders a react view

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`res` | ServerResponse | - | - |
`path` | string | - | - |
`props` | object |  {} | - |
`pageProps` | object |  {} | - |
`page?` | [AnyComponent](../modules/_virtualregistry_.md#anycomponent) | - |   |

**Returns:** *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

___

###  resolveEngine

▸ **resolveEngine**(`request`: string, `resolve`: [FileResolve](_fileresolve_.fileresolve.md)): *void*

*Defined in [VirtualEngine.ts:194](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L194)*

Require resolver for named engines

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | string | - |
`resolve` | [FileResolve](_fileresolve_.fileresolve.md) |   |

**Returns:** *void*

___

###  resolveFile

▸ **resolveFile**(`request`: string, `resolve`: [FileResolve](_fileresolve_.fileresolve.md)): *void*

*Defined in [VirtualEngine.ts:242](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L242)*

Require resolver for registered files

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | string | - |
`resolve` | [FileResolve](_fileresolve_.fileresolve.md) |   |

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

*Defined in [VirtualEngine.ts:295](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L295)*

Middleware for VirtualEngine.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`middleware` | [VirtualRegistry](_virtualregistry_.virtualregistry.md) &#124; object &#124; Function |   |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*

___

###  view

▸ **view**(`route`: string, `path`: string, `view`: string): *[VirtualEngine](_virtualengine_.virtualengine.md)*

*Overrides [VirtualRegistry](_virtualregistry_.virtualregistry.md).[view](_virtualregistry_.virtualregistry.md#view)*

*Defined in [VirtualEngine.ts:283](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualEngine.ts#L283)*

Registers a view

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | string | - |
`path` | string | - |
`view` | string |   |

**Returns:** *[VirtualEngine](_virtualengine_.virtualengine.md)*
