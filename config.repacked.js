const path = require("path");
const OverrideRSCWebpackPlugin = require("./webpack/plugins/overrideRSCWebpackPlugin");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

/**
 * @type {import('repacked').AppConfig}
 */
const config = {
  client: {
    entry: "./src/client.tsx",
  },
  server: {
    enabled: true,
    entry: "./src/server.ts",
  },
  development: {
    open: true,
    port: 3000,
  },
  webpack: (config, target) => {
    //setting path alias
    config.resolve.alias = {
      "@root": path.resolve(__dirname, "src"),
    };

    //setting conditions for server.
    if (target === "server") {
      config.module.rules.push({
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: path.resolve(__dirname, "./webpack/loaders/serverLoader.js"),
        },
      });
      config.resolve.conditionNames = [
        "react-server",
        "..."
      ];
    } else {
      config.plugins.push(
        new ReactServerWebpackPlugin({
          isServer: false,
          clientReferences: {
            directory: "./src",
            recursive: true,
            include: /\.(js|ts|jsx|tsx)$/,
          },
        })
      );
      config.plugins.push(new OverrideRSCWebpackPlugin());
    }
    return config;
  },
  jest: (config) => {
    return config;
  },
};

module.exports = config;
