import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true, priority: "High" },
  { id: "todo-1", name: "NetFlix", completed: false, priority: "Medium"},
  { id: "todo-2", name: "Repeat", completed: false, priority: "Low" }
];

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  rootElement
);
