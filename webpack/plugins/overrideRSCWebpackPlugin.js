const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");
const path = require("path");
const fs = require("fs");

class OverrideRSCWebpackPlugin {
  constructor() {}
  /**
   *
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    const targetDir = compiler.options.output.path;
    const mode = compiler.options.mode;
    const outputPath = path.resolve(
      targetDir,
      mode === "production" ? "../" : "./"
    );
    const pluginName = OverrideRSCWebpackPlugin.name;
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: pluginName,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        (compilationAssets, callback) => {
          const fileNamesToTap = [
            "react-client-manifest.json",
            "react-ssr-manifest.json",
          ];
          for (const assetName in compilationAssets) {
            if (!fileNamesToTap.includes(assetName)) {
              continue;
            }
            const originalContent = compilationAssets[assetName].source();
            fs.writeFileSync(
              path.resolve(outputPath, assetName),
              originalContent,
              "utf8"
            );
            delete compilationAssets[assetName];
          }
          callback();
        }
      );
    });
  }
}

module.exports = OverrideRSCWebpackPlugin;
