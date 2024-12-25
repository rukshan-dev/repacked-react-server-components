const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
/**
 *
 * @param {string} source
 * @returns {string}
 * @this {import('webpack').LoaderContext<unknown>}
 */
module.exports = function (source) {
  const ast = parse(source.toString(), {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  const modulePath = this.resourcePath;
  const directives = ast.program.directives;
  const useClient = directives.some(
    (directive) => directive.value.value === "use client"
  );
  const useServer = directives.some(
    (directive) => directive.value.value === "use server"
  );

  if (!useClient && !useServer) {
    return source;
  }

  if (useClient && useServer) {
    throw new Error(
      'Cannot have both "use client" and "use server" directives in the same file.'
    );
  }

  let defaultExport = false;
  /**
   * @type {string[]}
   */
  const namedExports = [];

  traverse(ast, {
    ExportNamedDeclaration: (path) => {
      const declaration = path.node.declaration;
      if (t.isVariableDeclaration(declaration)) {
        declaration.declarations.forEach((node) => {
          if (
            !(
              t.isFunctionExpression(node.init) ||
              t.isArrowFunctionExpression(node.init)
            )
          ) {
            return;
          }
          if (t.isIdentifier(node.id)) {
            namedExports.push(node.id.name);
          }
        });
      }
      if (
        t.isFunctionDeclaration(declaration) &&
        t.isIdentifier(declaration.id)
      ) {
        namedExports.push(declaration.id.name);
      }
    },
    ExportDefaultDeclaration: (path) => {
      defaultExport = true;
    },
  });

  const generateExport = (/** @type {string} */ name) => {
    return `export ${
      name === "default" ? name : `const ${name} =`
    } registerClientReference(function() {
              throw new Error('Unable to invoke client components from server.')
            },"file://${modulePath}","${name}");`;
  };

  const newSource = `
      import {registerClientReference} from "react-server-dom-webpack/server";
      ${namedExports.map((name) => generateExport(name)).join("\n")}
      ${defaultExport ? generateExport("default") : ""}
  `;

  return newSource;
};
