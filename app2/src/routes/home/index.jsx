import React from "react";

import "./home.scss";

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section class="stories">
        <main>
          <header>
            <h1>MISSING</h1>
            <h1>PIECE</h1>
            <span>> > ></span>
          </header>
          <div class="splitter" />
          <div class="story_week" />
          <div class="hero_banner">
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
          </div>
        </main>
      </section>
    );
  }
}
