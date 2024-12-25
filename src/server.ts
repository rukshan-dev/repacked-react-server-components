import { Express } from "express";
import renderReactTree from "@root/server/renderReactTree";
import HelloWorld from "@root/server/components/HelloWorld";

const server = (app: Express) => {
  app.get("/hello", (req, res) => {
    res.send({
      h1: "Welcome to Your New React App!",
      h2: "(configured with express js backend server)",
    });
  });

  app.get("/rsc", (req, res) => {
    renderReactTree(res, HelloWorld, __dirname);
  });
};

export default server;
