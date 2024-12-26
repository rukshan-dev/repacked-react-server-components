import { StrictMode, FC } from "react";
import * as ReactDOM from "react-dom/client";
import RenderServerComponent from "@root/client/rsc/RenderServerComponent";
import "@root/client/styles.css";

const App: FC = () => {
  return <RenderServerComponent component="HelloWorld" />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
