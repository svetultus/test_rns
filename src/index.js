import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/Board";
import "./index.css";
import createStore from "./store";
import { Provider } from "react-redux";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById("root")
);
