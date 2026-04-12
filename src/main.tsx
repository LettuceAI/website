import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// In prod the root already contains prerendered HTML, so we hydrate instead of
// re-rendering (preserves SSR'd DOM, faster TTI). In dev the root is empty so
// createRoot takes the normal client-render path.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
