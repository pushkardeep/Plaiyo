const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Your existing Metro configuration
const config = {
};

// Merge the default config and your custom config
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Wrap the merged configuration with Reanimated's wrapper
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
