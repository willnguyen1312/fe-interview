import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
// import App from "./components/TagsInput";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV !== "production") {
  import("@axe-core/react").then((axe) => {
    axe.default(React, ReactDOM, 1000);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
