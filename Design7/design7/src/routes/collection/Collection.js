import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-pixi-fiber';

import CanvasCollection from '../../canvas/collection/Collection';

class Collection extends Component {
  render() {
    render(
      <CanvasCollection bounds={this.props.bounds} pixi={this.props.pixi} />,
      this.props.pixi.stage
    );

    return (
      <div>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default Collection;
