import React, { Component } from 'react';
import { Container, Text, withApp } from 'react-pixi-fiber';

class Collection extends Component {
  componentWillMount() {}

  render() {
    return (
      <Container>
        <Text
          text='CMGHT 
        Collection'
          x={this.props.bounds.width / 2}
          y={this.props.bounds.height / 2}
        ></Text>
      </Container>
    );
  }
}

export default withApp(Collection);
