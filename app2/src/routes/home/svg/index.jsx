import React from "react";

import { TweenLite, Linear, TimelineLite } from "gsap";

export default class Cover extends React.Component {
  constructor() {
    super();

    this.piecePosition = {
      x: 250,
      y: 400
    };

    this.state = {
      color: 31,
      placed: false,
      intensity: 0,
      isDragging: false,
      svg: {
        gapPosition: {
          x: 0,
          y: 0
        }
      }
    };

    this.movePiece = this.movePiece.bind(this);
    this.updatePieceStatus = this.updatePieceStatus.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  componentDidMount() {
    // Reset dragging event if the mouse button is released anywhere in the page
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    const svgEl = document.querySelector("main svg");

    this.setState({
      ...this.state,
      svg: {
        ...this.state.svg,
        gapPosition: {
          x: svgEl.clientWidth * 0.7,
          y: svgEl.clientHeight * 0.5
        }
      }
    });

    TweenLite.to("#piece", 0, { x: 500 });
    TweenLite.to("#piece", 0, { y: 400 });

    TweenLite.to("#piece", 0.3, { x: 250, delay: 0.1, ease: Linear.easeInOut });
  }

  handleMouseUp() {
    if (this.isPiecePlaced()) {
      this.setState({
        ...this.state,
        isDragging: false,
        placed: true
      });

      document.querySelector("main").classList.add("placed");
      this.playPiecePlacedAnim();
    } else {
      this.setState({
        ...this.state,
        isDragging: false
      });
    }
  }

  updateNewPiecePosition(e) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;

    TweenLite.to("#piece", 0.3, { x, ease: Linear.easeInOut });
    TweenLite.to("#piece", 0.3, { y, ease: Linear.easeInOut });

    this.distance = this.getPieceDistance();
    const intensity = Math.max(100 - this.distance / 10, 0);
    this.piecePosition.x = x;
    this.piecePosition.y = y;

    this.setState({
      ...this.state,
      intensity
    });
  }

  getPieceDistance() {
    const { gapPosition } = this.state.svg;
    const x = this.piecePosition.x - gapPosition.x;
    const y = this.piecePosition.y - gapPosition.y;

    return Math.sqrt(x * x, y * y);
  }

  updatePieceStatus() {
    this.setState({
      ...this.state,
      isDragging: true
    });
  }

  isPiecePlaced() {
    const { gapPosition } = this.state.svg;

    return (
      Math.abs(gapPosition.x + 50 - this.piecePosition.x) < 50 &&
      Math.abs(gapPosition.y + 50 - this.piecePosition.y) < 50
    );
  }

  movePiece(event) {
    if (this.state.isDragging) {
      this.updateNewPiecePosition(event);
    }
  }

  playPiecePlacedAnim() {
    const timeline = new TimelineLite();
    timeline
      .to(".scroll_banner", 0, { css: { className: "+=paused" } })
      .to(".cover_image_duplicate:nth-of-type(3)", 0.1, {
        opacity: 0,
        delay: 0.3
      })
      .to(".cover_image_duplicate:nth-of-type(2)", 0.05, { opacity: 0 })
      .to(".cover_image_duplicate:nth-of-type(1)", 0.025, { opacity: 0 })
      .to("#eye", 0, { css: { className: "+=active" } })
      .to(".hero_banner", 0, { css: { className: "+=active" }, delay: 2 })
      .to(".scroll_banner", 0, { css: { className: "-=paused" } });
  }

  render() {
    const { gapPosition } = this.state.svg;

    return (
      <div className="story_week">
        <div className="cover_image" />
        {/* <span className="cover_image_letter">X</span> */}
        <div className="cover_image_duplicates">
          <div
            className={`cover_image_duplicate ${
              this.state.intensity > 20 ? "active" : ""
            }`}
          >
            <div></div>
          </div>
          <div
            className={`cover_image_duplicate ${
              this.state.intensity > 40 ? "active" : ""
            }`}
          >
            <div></div>
          </div>
          <div
            className={`cover_image_duplicate ${
              this.state.intensity > 70 ? "active" : ""
            }`}
          >
            <div></div>
          </div>
        </div>
        <svg onMouseMove={event => this.movePiece(event)}>
          {!this.state.placed ? (
            <g>
              <rect
                id="gap"
                x={gapPosition.x}
                y={gapPosition.y}
                width="100px"
                height="100px"
              />
              <rect
                id="piece"
                x="-50"
                y="-50"
                width="100px"
                height="100px"
                onMouseDown={this.updatePieceStatus}
                className={this.state.isDragging ? "active" : ""}
              />
            </g>
          ) : null}
          <circle id="eye" cx="87.5%" cy="46%" r="5%"></circle>
        </svg>
      </div>
    );
  }
}
