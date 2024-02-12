const childProcess = require('child_process');

const {default: withPWAInit} = require('@ducanh2912/next-pwa');
const {runtimeCaching} = require('@pokemon-sleep-ui/next-config');
const {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD} = require('next/constants');


/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 * @typedef {import('next/dist/server/config-shared').WebpackConfigContext} NextJsWebpackContext
 */

const buildId = childProcess
  .execSync('git show -s --format="%h-%cI"')
  .toString()
  .trim()
  .replaceAll(':', '-');

const isProd = process.env.NODE_ENV !== 'development';

/**
 * Custom Webpack project configuration.
 * @function
 * @param {WebpackConfig} defaultConfig Default Nextjs Webpack configuration.
 * @param {NextJsWebpackContext} context      Default Nextjs Webpack context.
 *
 * @return {WebpackConfig} The custom webpack configuration.
 */
const webpackConfig = (defaultConfig, context) => {
  const {dev, isServer} = context;

  /** @type {WebpackConfig} */
  const config = {
    ...defaultConfig,
    experiments: {
      layers: true,
      topLevelAwait: true,
    },
  };

  // Useful for advanced debugging.
  return (dev || isServer) ? {
    ...config,
    devtool: dev ? 'eval-source-map' : config.devtool,
  } : config;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => buildId,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: isProd && {
      exclude: ['info', 'warn'],
    },
  },
  pageExtensions: ['ts', 'tsx'],
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: webpackConfig,
  eslint: {
    dirs: ['src'],
  },
};

/** @type {import('@ducanh2912/next-pwa').PluginOptions} */
const pwaConfig = {
  dest: 'public',
  disable: !isProd,
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: false,
  publicExcludes: ['!images/**/*.png'],
  workboxOptions: {
    runtimeCaching,
    disableDevLogs: isProd,
    directoryIndex: '/_next/',
  },
  fallbacks: {
    // Failed page requests fallback to this.
    document: '/~offline',
  },
};

module.exports = (phase) => {
  const withNextI18n = require('next-intl/plugin')();
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = withPWAInit(pwaConfig);
    return withNextI18n(withPWA(nextConfig));
  }
  return withNextI18n(nextConfig);
};
