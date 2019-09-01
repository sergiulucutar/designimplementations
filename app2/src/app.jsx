import React from "react";
import { render } from "react-dom";

import "./app.scss";

import Home from "./routes/home";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="app">
        <menu></menu>
        <Home />
      </section>
    );
  }
}

render(<App />, document.querySelector("#root"));
