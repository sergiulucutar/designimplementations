import React, { Component } from 'react';
import { Container } from 'react-pixi-fiber';
import { withRouter } from 'react-router-dom';

class Collection extends Component {
  componentWillMount() {
    console.log(this.props);
    this.props.history.listen((location, action) => {
      console.log('ASTA Nu', location, action);
    });
  }

  render() {
    return <Container></Container>;
  }
}

export default withRouter(Collection);
