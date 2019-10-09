[reactus](../README.md) › [Globals](../globals.md) › ["helpers"](_helpers_.md)

# External module: "helpers"

## Index

### Interfaces

* [AnyObject](../interfaces/_helpers_.anyobject.md)

### Functions

* [defaultNext](_helpers_.md#defaultnext)
* [merge](_helpers_.md#merge)
* [noop](_helpers_.md#noop)
* [shim](_helpers_.md#shim)
* [walk](_helpers_.md#walk)

## Functions

###  defaultNext

▸ **defaultNext**(`error`: any): *void*

Defined in helpers.ts:81

Shim for server middleware

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any | Any error *(string or Error or Exception)*  |

**Returns:** *void*

___

###  merge

▸ **merge**(`destination`: [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›, `source`: [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›, ...`sources`: [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›[]): *object*

Defined in helpers.ts:16

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

###  noop

▸ **noop**(): *void*

Defined in helpers.ts:94

A non operational function

**Returns:** *void*

___

###  shim

▸ **shim**(`label`: string): *void*

Defined in helpers.ts:101

Primarily used for testing, this creates a virtual `reactus` node module

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`label` | string | "reactus" | The name of the package to shim this library to  |

**Returns:** *void*

___

###  walk

▸ **walk**(`folder`: string, `callback`: Function, `fileSystem`: "fs"): *void*

Defined in helpers.ts:136

Helper to walk through each file

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`folder` | string | - | the absolute folder path |
`callback` | Function | - | the callback to call when a file is found |
`fileSystem` | "fs" |  fs | the file system in which to find files from  |

**Returns:** *void*
