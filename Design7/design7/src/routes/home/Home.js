import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { render } from 'react-pixi-fiber';
import CanvasHome from '../../canvas/Home/Home';

class Home extends Component {
  constructor(props) {
    super(props);

    this.canvasComponent = React.createRef();
  }

  viewMore() {
    this.props.history.push('/collections/1');
  }

  componentDidMount() {
    // this.canvasComponent.transitionIn();

    document.addEventListener('wheel', () =>
      this.canvasComponent.current.scroll()
    );
  }

  componentWillUnmount() {
    // this.canvasComponent.transitionOut();
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
