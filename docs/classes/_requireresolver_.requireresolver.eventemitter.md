[reactus](../README.md) › [Globals](../globals.md) › ["RequireResolver"](../modules/_requireresolver_.md) › [RequireResolver](_requireresolver_.requireresolver.md) › [EventEmitter](_requireresolver_.requireresolver.eventemitter.md)

# Class: EventEmitter

## Hierarchy

* **EventEmitter**

## Index

### Properties

* [defaultMaxListeners](_requireresolver_.requireresolver.eventemitter.md#static-defaultmaxlisteners)

### Methods

* [addListener](_requireresolver_.requireresolver.eventemitter.md#addlistener)
* [emit](_requireresolver_.requireresolver.eventemitter.md#emit)
* [eventNames](_requireresolver_.requireresolver.eventemitter.md#eventnames)
* [getMaxListeners](_requireresolver_.requireresolver.eventemitter.md#getmaxlisteners)
* [listenerCount](_requireresolver_.requireresolver.eventemitter.md#listenercount)
* [listeners](_requireresolver_.requireresolver.eventemitter.md#listeners)
* [off](_requireresolver_.requireresolver.eventemitter.md#off)
* [on](_requireresolver_.requireresolver.eventemitter.md#on)
* [once](_requireresolver_.requireresolver.eventemitter.md#once)
* [prependListener](_requireresolver_.requireresolver.eventemitter.md#prependlistener)
* [prependOnceListener](_requireresolver_.requireresolver.eventemitter.md#prependoncelistener)
* [rawListeners](_requireresolver_.requireresolver.eventemitter.md#rawlisteners)
* [removeAllListeners](_requireresolver_.requireresolver.eventemitter.md#removealllisteners)
* [removeListener](_requireresolver_.requireresolver.eventemitter.md#removelistener)
* [setMaxListeners](_requireresolver_.requireresolver.eventemitter.md#setmaxlisteners)
* [listenerCount](_requireresolver_.requireresolver.eventemitter.md#static-listenercount)

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:9

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:11

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

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:24

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:20

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:17

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

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:12

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

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:13

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

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:14

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

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:15

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

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:16

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

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

Defined in /server/node/openovate/reactus/node_modules/@types/node/events.d.ts:8

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
