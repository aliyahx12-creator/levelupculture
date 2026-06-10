module.exports = function (api) {
  api.cache(true);
  const isDev = api.env('development');
  return {
    presets: [
      [
        'babel-preset-expo',
        // hermes-v0 only in development (Expo Go needs private field transpilation)
        // production uses default hermes-stable (React Native 0.81 Hermes handles it natively)
        isDev ? { unstable_transformProfile: 'hermes-v0' } : {},
      ],
    ],
  };
};
