const path = require("path");
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
  webpack: (config) => {
    //setting path alias
    config.resolve.alias = {
      "@root": path.resolve(__dirname, "src"),
    };
    return config;
  },
  jest: (config) => {
    return config;
  },
};

module.exports = config;
