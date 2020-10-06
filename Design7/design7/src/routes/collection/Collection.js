import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-pixi-fiber';

import './Collection.scss';

import CanvasCollection from '../../canvas/collection/Collection';

class Collection extends Component {
  constructor(props) {
    super(props);

    this.canvasComponent = React.createRef();
    this.h_scroll = this.scroll.bind(this);
  }

  scroll(event) {
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
      <CanvasCollection
        bounds={this.props.bounds}
        ref={this.canvasComponent}
      />,
      this.props.pixi.stage
    );

    return (
      <div>
        <Link className='button button-close' to='/home'>
          Home
        </Link>
      </div>
    );
  }
}

export default Collection;
