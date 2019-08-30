import React from "react";

import "./home.scss";

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="stories">
        <main>
          <header>
            <h1>MISSING</h1>
            <h1>PIECE</h1>
            <div className="scroll_banner">
              <span>></span>
              <span>></span>
              <span>></span>
            </div>
          </header>
          <div className="story_week_info splitter">
            <div className="author">
              <span>Author:</span>
              <strong>Adrian Myoasdjja</strong>
            </div>
          </div>
          <div className="story_week" />
          <div className="hero_banner">
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
            <span>STORY OF THE WEEK</span>
          </div>
        </main>
      </section>
    );
  }
}
