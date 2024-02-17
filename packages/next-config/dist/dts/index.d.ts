import runtimeCaching from '@/src/runtimeCache.js';
type Config = {
    runtimeCaching: typeof runtimeCaching;
};
declare const config: Config;
export default config;
export { runtimeCaching };
