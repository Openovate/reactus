import VirtualEngine, {
  VirtualRegistry as VirtualRegistryClass,
  RequireResolver,
  FileResolve,
  EngineOptions,
  RegistryOptions
} from './VirtualEngine';
import Helpers from './Helpers';
import DevpackMiddleware from './DevpackMiddleware';

const shim = Helpers.shim;
const devpack = DevpackMiddleware;

/**
 * Instantiates the Virtual Engine by `engine = reactus()`.
 *
 * @param config - The engine options
 */
export default function createVirtualEngine(config?: EngineOptions) {
  return new VirtualEngine(config);
}

//additional exports

export {
  VirtualEngine,
  RequireResolver,
  FileResolve,
  EngineOptions,
  RegistryOptions,
  Helpers,
  devpack,
  shim
};

/**
 * Instantiates a Virtual Registry by `engine = reactus.VirtualRegistry()`
 * following how express instantiates routers by `express.Router()`.
 *
 * @param config - The registry options
 */
export function VirtualRegistry(config?: RegistryOptions) {
  return new VirtualRegistryClass(config);
};

createVirtualEngine.devpack = devpack;
createVirtualEngine.VirtualRegistry = VirtualRegistry;
VirtualRegistry.VirtualRegistryClass = VirtualRegistryClass;
