[reactus](../README.md) › [Globals](../globals.md) › ["Helpers"](../modules/_helpers_.md) › [Helpers](_helpers_.helpers.md)

# Class: Helpers

Helpers are generic methods used by this library

## Hierarchy

* **Helpers**

## Index

### Methods

* [merge](_helpers_.helpers.md#static-merge)
* [next](_helpers_.helpers.md#static-next)
* [noop](_helpers_.helpers.md#static-noop)
* [shim](_helpers_.helpers.md#static-shim)
* [walk](_helpers_.helpers.md#static-walk)

## Methods

### `Static` merge

▸ **merge**(`destination`: [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›, `source`: [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›, ...`sources`: [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›[]): *object*

*Defined in [Helpers.ts:20](https://github.com/Openovate/reactus/blob/519cdb0/src/Helpers.ts#L20)*

This version of merge assumes the objects given are pure objects with
static values. For example you should be able to JSON.stringify each of
them. This helper does a deep merge in summary

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`destination` | [AnyObject](../interfaces/_helpers_.anyobject.md)‹any› | The object where all the sources will be merged into |
`source` | [AnyObject](../interfaces/_helpers_.anyobject.md)‹any› | The source object to copy over to the destination |
`...sources` | [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›[] | If there are more sources, same as `source`  |

**Returns:** *object*

___

### `Static` next

▸ **next**(`error`: any): *void*

*Defined in [Helpers.ts:85](https://github.com/Openovate/reactus/blob/519cdb0/src/Helpers.ts#L85)*

Shim for server middleware

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any | Any error *(string or Error or Exception)*  |

**Returns:** *void*

___

### `Static` noop

▸ **noop**(): *void*

*Defined in [Helpers.ts:98](https://github.com/Openovate/reactus/blob/519cdb0/src/Helpers.ts#L98)*

A non operational function

**Returns:** *void*

___

### `Static` shim

▸ **shim**(`label`: string): *void*

*Defined in [Helpers.ts:105](https://github.com/Openovate/reactus/blob/519cdb0/src/Helpers.ts#L105)*

Primarily used for testing, this creates a virtual `reactus` node module

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`label` | string | "reactus" | The name of the package to shim this library to  |

**Returns:** *void*

___

### `Static` walk

▸ **walk**(`folder`: string, `callback`: Function, `fileSystem`: "fs"): *void*

*Defined in [Helpers.ts:140](https://github.com/Openovate/reactus/blob/519cdb0/src/Helpers.ts#L140)*

Helper to walk through each file

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`folder` | string | - | the absolute folder path |
`callback` | Function | - | the callback to call when a file is found |
`fileSystem` | "fs" |  fs | the file system in which to find files from  |

**Returns:** *void*
