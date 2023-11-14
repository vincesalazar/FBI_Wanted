import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import FbiWanted from "./fbiWanted";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FbiWanted />
  </StrictMode>
);
