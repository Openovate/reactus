[reactus](../README.md) › [Globals](../globals.md) › ["FileResolve"](../modules/_fileresolve_.md) › [FileResolve](_fileresolve_.fileresolve.md)

# Class: FileResolve

File Resolve is an abstract to describe how to resolve a file request from
`@require(file)`. You just simply need to set the exports.

## Hierarchy

* **FileResolve**

## Implements

* [JavascriptFile](../interfaces/_fileresolve_.javascriptfile.md)

## Index

### Properties

* [exports](_fileresolve_.fileresolve.md#exports)
* [file](_fileresolve_.fileresolve.md#file)

### Methods

* [get](_fileresolve_.fileresolve.md#get)
* [isResolved](_fileresolve_.fileresolve.md#isresolved)
* [set](_fileresolve_.fileresolve.md#set)

## Properties

###  exports

• **exports**: *any*

*Implementation of [JavascriptFile](../interfaces/_fileresolve_.javascriptfile.md).[exports](../interfaces/_fileresolve_.javascriptfile.md#exports)*

*Defined in [FileResolve.ts:14](https://github.com/Openovate/reactus/blob/b750986/src/FileResolve.ts#L14)*

The compiled results of the file, Usually from `exports`

___

###  file

• **file**: *string* = ""

*Implementation of [JavascriptFile](../interfaces/_fileresolve_.javascriptfile.md).[file](../interfaces/_fileresolve_.javascriptfile.md#file)*

*Defined in [FileResolve.ts:9](https://github.com/Openovate/reactus/blob/b750986/src/FileResolve.ts#L9)*

The string file absolute path

## Methods

###  get

▸ **get**(): *[JavascriptFile](../interfaces/_fileresolve_.javascriptfile.md)*

*Defined in [FileResolve.ts:19](https://github.com/Openovate/reactus/blob/b750986/src/FileResolve.ts#L19)*

Returns the resolved data

**Returns:** *[JavascriptFile](../interfaces/_fileresolve_.javascriptfile.md)*

___

###  isResolved

▸ **isResolved**(): *boolean*

*Defined in [FileResolve.ts:41](https://github.com/Openovate/reactus/blob/b750986/src/FileResolve.ts#L41)*

Returns true if resolved

**Returns:** *boolean*

___

###  set

▸ **set**(`file`: string, `exports`: any): *[FileResolve](_fileresolve_.fileresolve.md)*

*Defined in [FileResolve.ts:32](https://github.com/Openovate/reactus/blob/b750986/src/FileResolve.ts#L32)*

Sets the resolve data

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | The string file absolute path |
`exports` | any | The compiled results of the file, Usually from `exports`  |

**Returns:** *[FileResolve](_fileresolve_.fileresolve.md)*
