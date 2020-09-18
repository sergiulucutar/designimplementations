import './App.scss';

import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Application } from 'pixi.js';

const Home = lazy(() => import('./routes/home/Home.js'));
const Collection = lazy(() => import('./routes/collection/Collection'));

// const OPTIONS = {
//   backgroundColor: 0x6d696a,
//   height: bounds.height,
//   width: bounds.width,
//   antialias: true,
//   view:
// };

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      bounds: {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
      }
    };

    const canvas = document.createElement('canvas');
    this.pixi = new Application({
      backgroundColor: 0x6d696a,
      height: this.state.bounds.height,
      width: this.state.bounds.width,
      antialias: true,
      view: canvas,
      resizeTo: window
    });
  }

  componentDidMount() {
    document
      .querySelector('.APP')
      .insertBefore(this.pixi.view, document.querySelector('.wrapper'));

    document.addEventListener('resize', () => {
      this.setState({
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
      });
    });
  }

  render() {
    return (
      <div className='APP'>
        <header>
          <span className='logo'>LOGO</span>
          <nav>
            <a href=''>Home</a>
            <a href=''>Stories</a>
            <a href=''>Extra</a>
            <a href=''>Contact</a>
          </nav>
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Home bounds={this.state.bounds} pixi={this.pixi} />
              )}
            />
            <Route
              path='/collections/:id'
              render={() => (
                <Collection bounds={this.state.bounds} pixi={this.pixi} />
              )}
            />
          </Switch>
        </Suspense>

        {/* <footer>
          <div className='slider_numbers'>1 / 4</div>
        </footer> */}
      </div>
    );
  }
}

export default App;
