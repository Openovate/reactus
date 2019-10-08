[reactus](../README.md) › [Globals](../globals.md) › ["ReactusException"](../modules/_reactusexception_.md) › [ReactusException](_reactusexception_.reactusexception.md)

# Class: ReactusException

The purpose of this is, when errors are thrown
in `reactus`. You will know the error was thrown
from the `reactus` library

## Hierarchy

* Exception

  ↳ **ReactusException**

## Index

### Constructors

* [constructor](_reactusexception_.reactusexception.md#constructor)

### Properties

* [code](_reactusexception_.reactusexception.md#code)
* [error](_reactusexception_.reactusexception.md#error)
* [errors](_reactusexception_.reactusexception.md#errors)
* [message](_reactusexception_.reactusexception.md#message)
* [name](_reactusexception_.reactusexception.md#name)
* [stack](_reactusexception_.reactusexception.md#stack)

### Methods

* [for](_reactusexception_.reactusexception.md#static-for)
* [forErrorsFound](_reactusexception_.reactusexception.md#static-forerrorsfound)

## Constructors

###  constructor

\+ **new ReactusException**(`message`: string, `code?`: undefined | number): *[ReactusException](_reactusexception_.reactusexception.md)*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`code?` | undefined &#124; number |

**Returns:** *[ReactusException](_reactusexception_.reactusexception.md)*

## Properties

###  code

• **code**: *number*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:2

___

###  error

• **error**: *Error*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:3

___

###  errors

• **errors**: *object*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:4

___

###  message

• **message**: *string*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:5

___

###  name

• **name**: *string*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:6

___

###  stack

• **stack**: *string*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:7

## Methods

### `Static` for

▸ **for**(`message`: string, ...`values`: any[]): *Exception*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:9

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *Exception*

___

### `Static` forErrorsFound

▸ **forErrorsFound**(`errors`: object): *Exception*

*Inherited from void*

Defined in /server/node/openovate/reactus/node_modules/@openovate/jsm/dist/Exception.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`errors` | object |

**Returns:** *Exception*
