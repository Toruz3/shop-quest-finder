
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Make sure React is properly initialized before rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create root with explicit typing
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <App />
);
