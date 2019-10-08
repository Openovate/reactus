[reactus](../README.md) › [Globals](../globals.md) › ["RequireResolver"](../modules/_requireresolver_.md) › [RequireResolver](_requireresolver_.requireresolver.md)

# Class: RequireResolver

Allows to define how a virtual module gets loaded when a user does
`require('something')` instead of having multiple points where the
`Module._resolveFilename()` is wrapped, this class is a single point
where it is wrapped then triggering an event when `require()` is used.
This class should be instantiated using `RequireResolver.load()` to
enforce a static class pattern because `require()` is heavily used so
we shouldn't be wrapping this more than once.

## Hierarchy

* internal

  ↳ **RequireResolver**

## Index

### Classes

* [EventEmitter](_requireresolver_.requireresolver.eventemitter.md)

### Constructors

* [constructor](_requireresolver_.requireresolver.md#constructor)

### Properties

* [original](_requireresolver_.requireresolver.md#original)
* [instance](_requireresolver_.requireresolver.md#static-instance)

### Methods

* [addListener](_requireresolver_.requireresolver.md#addlistener)
* [emit](_requireresolver_.requireresolver.md#emit)
* [eventNames](_requireresolver_.requireresolver.md#eventnames)
* [getMaxListeners](_requireresolver_.requireresolver.md#getmaxlisteners)
* [listenerCount](_requireresolver_.requireresolver.md#listenercount)
* [listeners](_requireresolver_.requireresolver.md#listeners)
* [off](_requireresolver_.requireresolver.md#off)
* [on](_requireresolver_.requireresolver.md#on)
* [once](_requireresolver_.requireresolver.md#once)
* [prependListener](_requireresolver_.requireresolver.md#prependlistener)
* [prependOnceListener](_requireresolver_.requireresolver.md#prependoncelistener)
* [rawListeners](_requireresolver_.requireresolver.md#rawlisteners)
* [removeAllListeners](_requireresolver_.requireresolver.md#removealllisteners)
* [removeListener](_requireresolver_.requireresolver.md#removelistener)
* [resolve](_requireresolver_.requireresolver.md#resolve)
* [setMaxListeners](_requireresolver_.requireresolver.md#setmaxlisteners)
* [load](_requireresolver_.requireresolver.md#static-load)
* [once](_requireresolver_.requireresolver.md#static-once)

## Constructors

###  constructor

\+ **new RequireResolver**(): *[RequireResolver](_requireresolver_.requireresolver.md)*

*Defined in [RequireResolver.ts:35](https://github.com/Openovate/reactus/blob/519cdb0/src/RequireResolver.ts#L35)*

Wrap the original resolveFilename()

**Returns:** *[RequireResolver](_requireresolver_.requireresolver.md)*

## Properties

###  original

• **original**: *Function*

*Defined in [RequireResolver.ts:24](https://github.com/Openovate/reactus/blob/519cdb0/src/RequireResolver.ts#L24)*

The original Module._resolveFilename()

___

### `Static` instance

▪ **instance**: *[RequireResolver](_requireresolver_.requireresolver.md)*

*Defined in [RequireResolver.ts:19](https://github.com/Openovate/reactus/blob/519cdb0/src/RequireResolver.ts#L19)*

The static instance of RequireResolver

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:611

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:621

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:626

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:618

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:622

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:619

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:615

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:612

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:613

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:624

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:625

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:620

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:616

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:614

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  resolve

▸ **resolve**(`request`: string, `parent`: object): *any*

*Defined in [RequireResolver.ts:53](https://github.com/Openovate/reactus/blob/519cdb0/src/RequireResolver.ts#L53)*

Resolve callback for Module._resolveFilename

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | string | the request string; may not be an absolute path |
`parent` | object | the parent object from the `require.cache`  |

**Returns:** *any*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@types/node/globals.d.ts:617

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` load

▸ **load**(): *[RequireResolver](_requireresolver_.requireresolver.md)*

*Defined in [RequireResolver.ts:29](https://github.com/Openovate/reactus/blob/519cdb0/src/RequireResolver.ts#L29)*

In this case you do want a singleton.

**Returns:** *[RequireResolver](_requireresolver_.requireresolver.md)*

___

### `Static` once

▸ **once**(`emitter`: EventEmitter, `event`: string | symbol): *Promise‹any[]›*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *Promise‹any[]›*
