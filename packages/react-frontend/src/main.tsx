// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import MyApp from "./MyApp.tsx";

// Create the container
const container = document.getElementById("root");
if (container != null) {
  // Create a root
  const root = ReactDOMClient.createRoot(container);

  // Initial render: Render an element to the Root
  root.render(<MyApp />);
}
