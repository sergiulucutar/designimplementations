import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { render } from 'react-pixi-fiber';
import CanvasHome from '../../canvas/home/Home';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlideIndex: 0
    };

    this.canvasComponent = React.createRef();

    //handlers
    this.h_scroll = this.scroll.bind(this);

    this.slidesContent = [
      {
        title: 'CMGHT'
      },
      {
        title: 'Zmashra'
      },
      {
        title: 'Whatever'
      }
    ];
  }

  viewMore() {
    this.canvasComponent.current.close();
    setTimeout(() => this.props.history.push('/collections/1'), 2000);
  }

  scroll(event) {
    this.setState({
      activeSlideIndex:
        (this.state.activeSlideIndex +
          this.slidesContent.length +
          Math.sign(event.deltaY)) %
        this.slidesContent.length
    });
    this.canvasComponent.current.scroll(event);
  }

  componentDidMount() {
    document.addEventListener('wheel', this.h_scroll);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.h_scroll);
  }

  render() {
    render(
      <CanvasHome bounds={this.props.bounds} ref={this.canvasComponent} />,
      this.props.pixi.stage
    );

    return (
      <div className='wrapper'>
        <main>
          <div className='slides'>
            {this.slidesContent.map((slide, index) => (
              <div
                className={
                  this.state.activeSlideIndex === index
                    ? 'slide slide-active'
                    : 'slide'
                }
              >
                <h1>{slide.title}</h1>
                <h2>collection</h2>
              </div>
            ))}
          </div>
          <button className='button' onClick={() => this.viewMore()}>
            View More
          </button>
        </main>
      </div>
    );
  }
}

export default withRouter(Home);
