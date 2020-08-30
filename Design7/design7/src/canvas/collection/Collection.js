import React, { Component } from 'react';
import { Container, Text } from 'react-pixi-fiber';
import Picture from './Picture';
import { random } from 'gsap/gsap-core';

class CanvasCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictuePositions: []
    };

    this.container = React.createRef();
  }

  componentWillMount() {}

  componentDidMount() {
    // this.container.current.on('scroll', event => console.log(event));
    const positions = [];
    for (let i = 0; i < 8; i++) {
      positions.push({
        x: (this.props.bounds.width / 6) * Math.floor(random(0, 6)),
        y: 400 * i,
        zIndex: Math.floor(Math.random() * 2) - 1
      });
    }

    this.setState({
      pictuePositions: positions
    });

    document.addEventListener('wheel', this.updatePicturesPosition.bind(this));
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
      fontSize: 140,
      fill: 0xffffff,
      align: 'center'
    };

    const TextAnchor = {
      x: 0.5,
      y: 0.5
    };

    return (
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
    );
  }
}

export default CanvasCollection;
