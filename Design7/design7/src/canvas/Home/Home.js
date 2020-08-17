import React, { Component } from 'react';
import { Container } from 'react-pixi-fiber';
import { Power2, TimelineLite } from 'gsap';
import Slide from './Slide';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.activeSlide = 0;

    this.container = React.createRef();
  }

  componentWillMount() {
    console.log('Will mount ', this.props);
    this.props.history.listen((location, action) => {
      console.log('ASTA DA', location, action);
    });
  }

  componentDidMount() {
    document.addEventListener('wheel', event => this.scroll());
  }

  componentWillUnmount() {
    console.log('wheel unmount');
  }

  scroll() {
    const currentItem = this.container.current.getChildAt(this.activeSlide);
    const nextitem = this.container.current.getChildAt(++this.activeSlide);

    nextitem.position.y = this.props.bounds.height;
    nextitem.visible = true;
    // currentItem.visible = true;
    const timeline = new TimelineLite({
      onComplete: () => {
        currentItem.visible = false;
        currentItem.position.y = 0;
      }
    });
    timeline
      .to(currentItem.position, 1.2, {
        y: -this.props.bounds.height,
        ease: Power2.easeInOut
      })
      .to(
        nextitem.position,
        1.2,
        {
          y: 0,
          ease: Power2.easeInOut
        },
        0
      );
  }

  render() {
    return (
      <Container ref={this.container}>
        <Slide bounds={this.props.bounds} visible={true}></Slide>
        <Slide bounds={this.props.bounds} visible={false}></Slide>
        <Slide bounds={this.props.bounds} visible={false}></Slide>
      </Container>
    );
  }
}

export default withRouter(Home);
