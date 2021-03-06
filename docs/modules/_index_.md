[reactus](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# External module: "index"

## Index

### Variables

* [devpack](_index_.md#const-devpack)

### Functions

* [VirtualRegistry](_index_.md#virtualregistry)
* [createVirtualEngine](_index_.md#createvirtualengine)

## Variables

### `Const` devpack

• **devpack**: *[createMiddleware](_devpackmiddleware_.md#createmiddleware)* =  DevpackMiddleware

*Defined in [index.ts:11](https://github.com/Openovate/reactus/blob/b750986/src/index.ts#L11)*

## Functions

###  VirtualRegistry

▸ **VirtualRegistry**(`config?`: [RegistryOptions](../interfaces/_virtualregistry_.registryoptions.md)): *[VirtualRegistry](../classes/_virtualregistry_.virtualregistry.md)*

*Defined in [index.ts:40](https://github.com/Openovate/reactus/blob/b750986/src/index.ts#L40)*

Instantiates a Virtual Registry by `engine = reactus.VirtualRegistry()`
following how express instantiates routers by `express.Router()`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config?` | [RegistryOptions](../interfaces/_virtualregistry_.registryoptions.md) | The registry options  |

**Returns:** *[VirtualRegistry](../classes/_virtualregistry_.virtualregistry.md)*

___

###  createVirtualEngine

▸ **createVirtualEngine**(`config?`: [EngineOptions](../interfaces/_virtualengine_.engineoptions.md)): *[VirtualEngine](../classes/_virtualengine_.virtualengine.md)*

*Defined in [index.ts:18](https://github.com/Openovate/reactus/blob/b750986/src/index.ts#L18)*

Instantiates the Virtual Engine by `engine = reactus()`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config?` | [EngineOptions](../interfaces/_virtualengine_.engineoptions.md) | The engine options  |

**Returns:** *[VirtualEngine](../classes/_virtualengine_.virtualengine.md)*
