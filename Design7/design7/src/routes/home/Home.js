import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Home extends Component {
  viewMore() {
    this.props.history.push('/collections/1');
  }

  render() {
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
