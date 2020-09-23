import React, { Component } from 'react';
import { Container, Graphics, Text } from 'react-pixi-fiber';
import Picture from './Picture';
import { random } from 'gsap/gsap-core';

class CanvasCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictuePositions: []
    };

    this.background = React.createRef();
  }

  componentDidMount() {
    const positions = [];
    for (let i = 0; i < 8; i++) {
      positions.push({
        x: (this.props.bounds.width / 6) * Math.floor(random(0, 6)),
        y: 500 * i,
        zIndex: Math.floor(Math.random() * 2) - 1
      });
    }

    this.setState({
      pictuePositions: positions
    });

    document.addEventListener('wheel', this.updatePicturesPosition.bind(this));

    this.background.current.clear();
    this.background.current.beginFill(0xff7d00);
    this.background.current.drawRect(
      0,
      0,
      this.props.bounds.width / 2,
      this.props.bounds.height
    );
    this.background.current.endFill();
  }

  componentWillUnmount() {
    document.removeEventListener(
      'wheel',
      this.updatePicturesPosition.bind(this)
    );
  }

  updatePicturesPosition(event) {
    this.setState({
      pictuePositions: this.state.pictuePositions.map(value => {
        value.y += event.deltaY;
        return value;
      })
    });
  }

  render() {
    const fontOptions = {
      fontFamily: 'WremenaLight',
      fontSize: 90,
      fill: 0xffffff,
      align: 'center'
    };

    const TextAnchor = {
      x: 0.5,
      y: 0.5
    };

    return (
      <Container>
        <Graphics ref={this.background} />
        <Container sortableChildren={true}>
          <Text
            text='CMGHT 
          Collection'
            x={this.props.bounds.width / 2}
            y={this.props.bounds.height / 2}
            style={fontOptions}
            anchor={TextAnchor}
            zIndex={0}
          ></Text>
          {this.state.pictuePositions.map((pos, index) => {
            return (
              <Picture
                x={pos.x}
                y={pos.y}
                zIndex={pos.zIndex}
                pixi={this.props.pixi}
                key={index}
              />
            );
          })}
        </Container>
      </Container>
    );
  }
}

export default CanvasCollection;
