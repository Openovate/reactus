[reactus](../README.md) › [Globals](../globals.md) › ["VirtualRegistry"](../modules/_virtualregistry_.md) › [VirtualRegistry](_virtualregistry_.virtualregistry.md)

# Class: VirtualRegistry

## Hierarchy

* Registry

  ↳ **VirtualRegistry**

  ↳ [VirtualEngine](_virtualengine_.virtualengine.md)

## Index

### Constructors

* [constructor](_virtualregistry_.virtualregistry.md#constructor)

### Properties

* [data](_virtualregistry_.virtualregistry.md#protected-data)
* [lazyPage](_virtualregistry_.virtualregistry.md#protected-optional-lazypage)
* [lazyPresets](_virtualregistry_.virtualregistry.md#protected-lazypresets)

### Accessors

* [page](_virtualregistry_.virtualregistry.md#page)
* [presets](_virtualregistry_.virtualregistry.md#presets)

### Methods

* [component](_virtualregistry_.virtualregistry.md#component)
* [get](_virtualregistry_.virtualregistry.md#get)
* [getDot](_virtualregistry_.virtualregistry.md#getdot)
* [has](_virtualregistry_.virtualregistry.md#has)
* [hasDot](_virtualregistry_.virtualregistry.md#hasdot)
* [remove](_virtualregistry_.virtualregistry.md#remove)
* [removeDot](_virtualregistry_.virtualregistry.md#removedot)
* [render](_virtualregistry_.virtualregistry.md#render)
* [set](_virtualregistry_.virtualregistry.md#set)
* [setDot](_virtualregistry_.virtualregistry.md#setdot)
* [view](_virtualregistry_.virtualregistry.md#view)

## Constructors

###  constructor

\+ **new VirtualRegistry**(`config`: object): *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

*Overrides void*

*Defined in [VirtualRegistry.ts:57](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L57)*

Sets up the registry

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`config` | object |  {} |   |

**Returns:** *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

## Properties

### `Protected` data

• **data**: *object*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Registry.d.ts:3

___

### `Protected` `Optional` lazyPage

• **lazyPage**? : *[AnyComponent](../modules/_virtualregistry_.md#anycomponent)*

*Defined in [VirtualRegistry.ts:19](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L19)*

**`var`** lazyPage

___

### `Protected` lazyPresets

• **lazyPresets**: *object | null* =  null

*Defined in [VirtualRegistry.ts:24](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L24)*

**`var`** lazyPresets

## Accessors

###  page

• **get page**(): *any*

*Defined in [VirtualRegistry.ts:29](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L29)*

**`var`** page

**Returns:** *any*

___

###  presets

• **get presets**(): *object*

*Defined in [VirtualRegistry.ts:45](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L45)*

**`var`** presets

**Returns:** *object*

## Methods

###  component

▸ **component**(`name`: string, `path`: string): *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

*Defined in [VirtualRegistry.ts:86](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L86)*

Registers a global component

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | - |
`path` | string |   |

**Returns:** *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

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

###  view

▸ **view**(`route`: string, `path`: string, `view`: string): *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*

*Defined in [VirtualRegistry.ts:163](https://github.com/Openovate/reactus/blob/0600fe9/src/VirtualRegistry.ts#L163)*

Registers a view

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`route` | string | - |
`path` | string | - |
`view` | string |   |

**Returns:** *[VirtualRegistry](_virtualregistry_.virtualregistry.md)*
