import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import BasicConnection from "./BasicConnection";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<BasicConnection />, document.querySelector("#application"));
});
