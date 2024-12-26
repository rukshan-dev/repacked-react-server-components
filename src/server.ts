import { Express, Request } from "express";
import renderReactTree from "@root/server/renderReactTree";
import HelloWorld from "@root/server/components/HelloWorld";
import { FC } from "react";

const serverComponents: Record<string, FC> = {
  HelloWorld,
};

const getComponent = (req: Request): FC => {
  try {
    const component = JSON.parse(req.query.data as string).component as string;
    return serverComponents[component] ?? (() => null);
  } catch (e) {
    return () => null;
  }
};

const server = (app: Express) => {
  app.get("/hello", (req, res) => {
    res.send({
      h1: "Welcome to Your New React App!",
      h2: "(configured with express js backend server)",
    });
  });

  app.get("/rsc", (req, res) => {
    const component = getComponent(req);
    renderReactTree(res, component, __dirname);
  });
};

export default server;
