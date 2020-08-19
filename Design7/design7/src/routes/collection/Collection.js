import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Collection extends Component {
  render() {
    return (
      <div>
        <h1>Collection</h1>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default Collection;
