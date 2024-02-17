import runtimeCaching from './runtimeCache.js';


type Config = {
  runtimeCaching: typeof runtimeCaching,
};

const config: Config = {
  runtimeCaching,
};

export default config;

export {runtimeCaching};
