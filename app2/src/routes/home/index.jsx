import React from "react";
import "./home.scss";

import Cover from "./svg";

export default class Home extends React.Component {
  constructor() {
    super();

    this.isDragging = false;
    this.index = 10;

    this.state = {
      color: 31,
      placed: false,
      svg: {
        isDraging: false,
        piecePosition: {
          x: 400,
          y: 250
        },
        gapPosition: {
          x: 0,
          y: 0
        }
      }
    };
  }

  render() {
    const color = `hsl(4, 76%, ${this.state.color}%)`;
    // const bg = `hsl(343, 100%, ${(this.state.color * 3) / 100}%)`;

    return (
      <section className="stories">
        <main style={{ color }}>
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
              <span>Written by:</span>
              <strong>Adrian Myoasdjja</strong>
            </div>
            {/* <h2>FEATHERS</h2> */}
          </div>
          <Cover />
          <div className="hero_banner">
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
        </main>
      </section>
    );
  }
}
