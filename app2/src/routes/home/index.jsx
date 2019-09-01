import React from "react";

import "./home.scss";

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

  componentDidMount() {
    this.piece = document.querySelector("main svg #piece");
    this.piece.addEventListener("mousedown", () => {
      this.isDragging = true;
    });

    document.addEventListener("mouseup", () => {
      this.isDragging = false;

      if (this.isPiecePlaced()) {
        this.setState({
          ...this.state,
          placed: true,
          svg: {
            ...this.state.svg,
            piecePosition: {
              x: this.state.svg.gapPosition.x,
              y: this.state.svg.gapPosition.y
            }
          }
        });

        document.querySelector("main").classList.add("placed");
      }
    });

    const svgEl = document.querySelector("main svg");
    this.bounds = svgEl.getBoundingClientRect();

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

    document.querySelector("main svg").addEventListener("mousemove", event => {
      if (this.isDragging) {
        this.getNewPiecePosittion(event);

        this.setState({
          ...this.state,
          color: this.getPieceDistance()
        });
      }
    });
  }

  getNewPiecePosittion(e) {
    const x = e.clientX - this.bounds.left;
    const y = e.clientY - this.bounds.top;

    this.setState({
      ...this.state,
      svg: {
        ...this.state.svg,
        piecePosition: { x, y }
      }
    });
  }

  getPieceDistance() {
    const { piecePosition, gapPosition } = this.state.svg;
    const x = piecePosition.x - gapPosition.x;
    const y = piecePosition.y - gapPosition.y;

    return 100 - Math.sqrt(x * x, y * y) / 6 + 20;
  }

  isPiecePlaced() {
    const { piecePosition, gapPosition } = this.state.svg;

    return (
      Math.abs(gapPosition.x - piecePosition.x) < 50 &&
      Math.abs(gapPosition.y - piecePosition.y) < 50
    );
  }

  isPieceInPosition() {}

  render() {
    const { piecePosition, gapPosition } = this.state.svg;
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
              <span>Author:</span>
              <strong>Adrian Myoasdjja</strong>
            </div>
          </div>
          <div
            className="story_week"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <pattern id="img1" width="100%" height="100%">
                <image
                  xlinkHref="https://images.unsplash.com/photo-1500373994708-4d781bd7bd15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                />
              </pattern>
              <image
                xlinkHref="https://images.unsplash.com/photo-1500373994708-4d781bd7bd15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                x="60%"
                y="0"
                width="50%"
                height="100%"
                preserveAspectRatio="xMinYMin slice"
              />
              {!this.state.placed ? (
                <g>
                  <rect
                    id="gap"
                    x={gapPosition.x}
                    y={gapPosition.y}
                    width="5%"
                    height="40%"
                  />
                  <rect
                    id="piece"
                    x={piecePosition.x}
                    y={piecePosition.y}
                    width="5%"
                    height="40%"
                    fill="white"
                  />
                </g>
              ) : null}
            </svg>
            {/* <span>THRILLER</span> */}
            <h2>FEATHERS</h2>
          </div>
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
          </div>
        </main>
      </section>
    );
  }
}
