import { Response } from "express";
import * as React from "react";
import { readFileSync } from "fs";
import { resolve } from "path";
const { renderToPipeableStream } = require("react-server-dom-webpack/server");

type Component =
  | string
  | React.FunctionComponent<{}>
  | React.ComponentClass<{}, any>;

const getManifest = async (manifestDir: string) => {
  try {
    const content = readFileSync(
      resolve(manifestDir, "react-client-manifest.json"),
      "utf8"
    );
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
};

const renderReactTree = async (
  res: Response,
  component: Component,
  manifestDir: string
) => {
  const manifest = await getManifest(manifestDir);
  const { pipe } = renderToPipeableStream(
    React.createElement(component),
    manifest
  );
  res.type('text/plain');
  pipe(res);
};

export default renderReactTree;
