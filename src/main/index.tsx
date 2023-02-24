import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ViewSelector } from "./views/ViewContext";

const rootElement = document.getElementById("root") as HTMLElement
const root = createRoot(rootElement);
root.render(<ViewSelector>
  <App />
</ViewSelector>);
