import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { render } from 'react-pixi-fiber';
import CanvasHome from '../../canvas/home/Home';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.canvasComponent = React.createRef();

    //handlers
    this.h_scroll = this.scroll.bind(this);
  }

  viewMore() {
    this.props.history.push('/collections/1');
  }

  scroll(event) {
    this.canvasComponent.current.scroll(event);
  }

  componentDidMount() {
    // this.canvasComponent.transitionIn();
    console.log('ADD event listener');
    document.addEventListener('wheel', this.h_scroll);
  }

  componentWillUnmount() {
    // this.canvasComponent.transitionOut();
    document.removeEventListener('wheel', this.h_scroll);
  }

  render() {
    render(
      <CanvasHome bounds={this.props.bounds} ref={this.canvasComponent} />,
      this.props.pixi.stage
    );

    return (
      <main>
        <div className='slide'>
          <h1>
            CMGHT <br />
            Collection
          </h1>
          {/* <Link to='/collections/1'>view more</Link> */}
          <button className='button' onClick={() => this.viewMore()}>
            View More
          </button>
        </div>
      </main>
    );
  }
}

export default withRouter(Home);
