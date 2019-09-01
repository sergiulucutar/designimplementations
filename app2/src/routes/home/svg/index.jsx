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
  }

  getPieceDistance() {
    const { piecePosition, gapPosition } = this.state.svg;
    const x = piecePosition.x - gapPosition.x;
    const y = piecePosition.y - gapPosition.y;

    return 100 - Math.sqrt(x * x, y * y) / 6 + 20;
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
      <svg onMouseMove={event => this.movePiece(event)}>
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
              onMouseDown={this.updatePieceStatus}
            />
          </g>
        ) : null}
      </svg>
    );
  }
}
