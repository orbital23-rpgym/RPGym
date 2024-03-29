module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["."],
          alias: {
            assets: "./assets",
            library: "./library",
            constants: "./constants",
            src: "./src",
          },
        },
      ],
      require.resolve("react-native-reanimated/plugin"),
    ],
  };
};
