import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import "./app.scss";

import Home from "./routes/home";
import Story from "./routes/story";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="app">
        <Router>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/" component={Home} />
            <Route path="/story/" component={Story} />
          </AnimatedSwitch>
        </Router>
      </section>
    );
  }
}

render(<App />, document.querySelector("#root"));
