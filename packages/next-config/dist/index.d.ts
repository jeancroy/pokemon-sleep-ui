import runtimeCaching from '@/src/runtimeCache.js';
export { default as runtimeCaching } from '@/src/runtimeCache.js';

type Config = {
    runtimeCaching: typeof runtimeCaching;
};
declare const config: Config;

export { config as default };
