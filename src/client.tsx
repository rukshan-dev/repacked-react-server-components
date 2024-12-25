import { StrictMode, FC } from "react";
import * as ReactDOM from "react-dom/client";
import RenderServerComponent from "@root/client/rsc/RenderServerComponent";

const App: FC = () => {
  return <RenderServerComponent />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
