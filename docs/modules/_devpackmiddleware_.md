[reactus](../README.md) › [Globals](../globals.md) › ["DevpackMiddleware"](_devpackmiddleware_.md)

# External module: "DevpackMiddleware"

## Index

### Type aliases

* [NextFunction](_devpackmiddleware_.md#nextfunction)

### Functions

* [createMiddleware](_devpackmiddleware_.md#createmiddleware)

## Type aliases

###  NextFunction

Ƭ **NextFunction**: *function*

*Defined in [DevpackMiddleware.ts:49](https://github.com/Openovate/reactus/blob/0600fe9/src/DevpackMiddleware.ts#L49)*

#### Type declaration:

▸ (`err?`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err?` | any |

## Functions

###  createMiddleware

▸ **createMiddleware**(`webpackConfig`: Configuration, `devConfig`: webpackDev.Options): *Function*

*Defined in [DevpackMiddleware.ts:14](https://github.com/Openovate/reactus/blob/0600fe9/src/DevpackMiddleware.ts#L14)*

Creates a Middleware for http server or express

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`webpackConfig` | Configuration | The `webpack` configuration options from webpack.config.js |
`devConfig` | webpackDev.Options | The `webpack-dev-middleware` options. Usually has { noInfo: true }  |

**Returns:** *Function*
