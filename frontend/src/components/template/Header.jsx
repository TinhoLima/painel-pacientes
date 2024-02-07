import "./Header.css";
import React from "react";

export default (props) => (
  <header className="header d-none d-sm-flex flex-column">
    <h1 className="mt-3">
      {props.title}
      <span className="data">{props.date}</span>
    </h1>
  </header>
);
