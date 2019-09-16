import React from "react";
import { NavLink } from "react-router-dom";
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

    this.handlePageScroll = this.handlePageScroll.bind(this);
  }

  componentDidMount() {
    //Scroll top after the router animation has finished
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
    window.addEventListener("scroll", this.handlePageScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handlePageScroll);
  }

  handlePageScroll() {
    this.setState({
      pageY: window.pageYOffset
    });
  }

  render() {
    return (
      <section className="stories_list">
        <NavLink
          to="/story/"
          className="story right"
          style={{ transform: `translateY(${this.state.pageY / 10}px)` }}
        >
          <div className="story_image">
            <img src={img2} />
            <div
              className="story_image_duplicate"
              style={{ backgroundImage: `url(${img2})` }}
            ></div>
          </div>
          <div className="story_caption">
            <span>The Imaginary Man</span>
            <span>A. Clark</span>
          </div>
        </NavLink>
        <NavLink to="/story/" className="story">
          <div className="story_image">
            <img src={img3} />
            <div
              className="story_image_duplicate"
              style={{ backgroundImage: `url(${img3})` }}
            ></div>
          </div>
          <div className="story_caption">
            <span>Upstairs</span>
            <span>M. Smith</span>
          </div>
        </NavLink>
        <NavLink to="/story/" className="story">
          <div className="story_image">
            <img src={img4} />
            <div
              className="story_image_duplicate"
              style={{ backgroundImage: `url(${img4})` }}
            ></div>
          </div>
          <div className="story_caption">
            <span>When the sun is shy</span>
            <span>Margarette Vile</span>
          </div>
        </NavLink>
        <NavLink
          to="/story/"
          className="story right"
          style={{ transform: `translateY(${this.state.pageY / 5}px)` }}
        >
          <div className="story_image">
            <img src={img5} />
            <div
              className="story_image_duplicate"
              style={{ backgroundImage: `url(${img5})` }}
            ></div>
          </div>
          <div className="story_caption">
            <span>Hello</span>
            <span>A. CLark</span>
          </div>
        </NavLink>
        <NavLink to="/story/" className="story">
          <div className="story_image">
            <img src={img6} />
            <div
              className="story_image_duplicate"
              style={{ backgroundImage: `url(${img6})` }}
            ></div>
          </div>
          <div className="story_caption">
            <span>The Witness</span>
            <span>Margarette Vile</span>
          </div>
        </NavLink>
      </section>
    );
  }
}
