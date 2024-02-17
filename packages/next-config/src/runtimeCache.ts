import {runtimeCaching as defaultRuntimeCacheConfig} from '@ducanh2912/next-pwa';
import {StrategyName, RuntimeCaching} from 'workbox-build';


const overrideCacheFirst: RuntimeCaching['urlPattern'][] = [
  /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  /\.(?:js)$/i,
  /\.(?:css|less)$/i,
];

const runtimeCaching = defaultRuntimeCacheConfig.map((option) => {
  if (overrideCacheFirst.includes(option.urlPattern)) {
    return {
      ...option,
      handler: 'CacheFirst' as StrategyName,
    };
  }
  return option;
});

export default runtimeCaching;

