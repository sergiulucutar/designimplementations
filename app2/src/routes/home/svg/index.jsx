import React from "react";

export default class Cover extends React.Component {
  constructor() {
    super();

    this.isDragging = false;

    this.state = {
      color: 31,
      placed: false,
      svg: {
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

    this.movePiece = this.movePiece.bind(this);
    this.updatePieceStatus = this.updatePieceStatus.bind(this);
  }

  componentDidMount() {
    // Reset dragging event if the mouse buttin is released anywhere in the page
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
  }

  updateNewPiecePosition(e) {
    const x = e.clientX - this.bounds.left;
    const y = e.clientY - this.bounds.top;

    this.setState({
      ...this.state,
      svg: {
        ...this.state.svg,
        piecePosition: { x, y }
      }
    });
    this.distance = this.getPieceDistance();
    console.log(this.distance);
    
  }

  getPieceDistance() {
    const { piecePosition, gapPosition } = this.state.svg;
    const x = piecePosition.x - gapPosition.x;
    const y = piecePosition.y - gapPosition.y;

    return Math.sqrt(x * x, y * y);
  }

  updatePieceStatus() {
    this.isDragging = true;
  }

  isPiecePlaced() {
    const { piecePosition, gapPosition } = this.state.svg;

    return (
      Math.abs(gapPosition.x - piecePosition.x) < 50 &&
      Math.abs(gapPosition.y - piecePosition.y) < 50
    );
  }

  movePiece(event) {
    if (this.isDragging) {
      this.updateNewPiecePosition(event);

      //   this.setState({
      //     ...this.state,
      //     color: this.getPieceDistance()
      //   });
    }
  }

  render() {
    const { piecePosition, gapPosition } = this.state.svg;

    return (
      <div className="story_week">
      <div className="cover_image" />
      <div className="cover_image_duplicate"></div>
      <div className="cover_image_duplicate"></div>
      <div className="cover_image_duplicate"></div>
        <svg onMouseMove={event => this.movePiece(event)}>
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
                onMouseDown={this.updatePieceStatus}
              />
            </g>
          ) : null}
        </svg>
      </div>
    );
  }
}
