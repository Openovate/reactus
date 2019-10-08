[reactus](../README.md) › [Globals](../globals.md) › ["Helpers"](../modules/_helpers_.md) › [Helpers](_helpers_.helpers.md)

# Class: Helpers

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

*Defined in [Helpers.ts:17](https://github.com/Openovate/reactus/blob/97dd666/src/Helpers.ts#L17)*

This version of merge assumes the objects given are pure objects with
static values. For example you should be able to JSON.stringify each of
them. This helper does a deep merge in summary

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`destination` | [AnyObject](../interfaces/_helpers_.anyobject.md)‹any› | - |
`source` | [AnyObject](../interfaces/_helpers_.anyobject.md)‹any› | - |
`...sources` | [AnyObject](../interfaces/_helpers_.anyobject.md)‹any›[] |   |

**Returns:** *object*

___

### `Static` next

▸ **next**(`error`: any): *void*

*Defined in [Helpers.ts:82](https://github.com/Openovate/reactus/blob/97dd666/src/Helpers.ts#L82)*

Shim for server middleware

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | any |   |

**Returns:** *void*

___

### `Static` noop

▸ **noop**(): *void*

*Defined in [Helpers.ts:95](https://github.com/Openovate/reactus/blob/97dd666/src/Helpers.ts#L95)*

A non operational function

**Returns:** *void*

___

### `Static` shim

▸ **shim**(`label`: string): *void*

*Defined in [Helpers.ts:102](https://github.com/Openovate/reactus/blob/97dd666/src/Helpers.ts#L102)*

Primarily used for testing, this creates a virtual `reactus` node module

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`label` | string | "reactus" |   |

**Returns:** *void*

___

### `Static` walk

▸ **walk**(`folder`: string, `callback`: Function, `fileSystem`: "fs"): *void*

*Defined in [Helpers.ts:137](https://github.com/Openovate/reactus/blob/97dd666/src/Helpers.ts#L137)*

Helper to walk through each file

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`folder` | string | - | - |
`callback` | Function | - |   |
`fileSystem` | "fs" |  fs | - |

**Returns:** *void*
