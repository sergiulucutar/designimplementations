import React from "react";
import "./home.scss";

import Cover from "./svg";
import Stories from "./stories";

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
              <span>></span>
            </div>
          </header>
          <div className="story_week_info ">
            <div className="author">
              <span>Written by:</span>
              <strong>Adrian Myoasdjja</strong>
            </div>
            <h2>FEATHERS</h2>
          </div>
          <Cover />
          <div className="hero_banner">
            <div className="banner">
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
            </div>
            <div className="banner">
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
              <span>
                <span>STORY</span> OF THE WEEK
              </span>
            </div>
          </div>
        </main>
        <Stories />
      </section>
    );
  }
}
