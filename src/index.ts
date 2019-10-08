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

export function VirtualRegistry(config?: RegistryOptions) {
  return new VirtualRegistryClass(config);
};

createVirtualEngine.devpack = devpack;
createVirtualEngine.VirtualRegistry = VirtualRegistry;
VirtualRegistry.VirtualRegistryClass = VirtualRegistryClass;
