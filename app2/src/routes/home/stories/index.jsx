import React from "react";
import "./stories.scss";

import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg";
import img5 from "../../../assets/img5.jpg";
import img6 from "../../../assets/img6.jpg";

export default class Stories extends React.Component {
  constructor() {
    super();

    this.state = {
      pageY: 0
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", event => {
      this.setState({
        pageY: window.pageYOffset
      });
    });
  }

  render() {
    return (
      <section className="stories_list">
        <div
          className="story right"
          style={{ transform: `translateY(${this.state.pageY / 10}px)` }}
        >
          <div className="story_image">
            <img src={img2} />
          </div>
          <div className="story_caption">
            <span>The Imaginary Man</span>
            <span>A. Clark</span>
          </div>
        </div>
        <div className="story">
          <div className="story_image">
            <img src={img3} />
          </div>
          <div className="story_caption">
            <span>Upstairs</span>
            <span>M. Smith</span>
          </div>
        </div>
        <div className="story">
          <div className="story_image">
            <img src={img4} />
          </div>
          <div className="story_caption">
            <span>When the sun is shy</span>
            <span>Margarette Vile</span>
          </div>
        </div>
        <div
          className="story right"
          style={{ transform: `translateY(${this.state.pageY / 5}px)` }}
        >
          <div className="story_image">
            <img src={img5} />
          </div>
          <div className="story_caption">
            <span>Hello</span>
            <span>A. CLark</span>
          </div>
        </div>
        <div className="story">
          <div className="story_image">
            <img src={img6} />
          </div>
          <div className="story_caption">
            <span>The Witness</span>
            <span>Margarette Vile</span>
          </div>
        </div>
      </section>
    );
  }
}
