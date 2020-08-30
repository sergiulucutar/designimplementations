import './App.scss';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Stage } from 'react-pixi-fiber';

import CanvasHome from './canvas/Home/Home';
import CanvasCollection from './canvas/collection/Collection';
import { Application } from 'pixi.js';

const Home = lazy(() => import('./routes/home/Home.js'));
const Collection = lazy(() => import('./routes/collection/Collection'));

const bounds = {
  width: document.body.offsetWidth,
  height: document.body.offsetHeight
};
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
    const canvas = document.createElement('canvas');
    this.pixi = new Application({
      backgroundColor: 0x6d696a,
      height: bounds.height,
      width: bounds.width,
      antialias: true,
      view: canvas
    });
  }

  componentDidMount() {
    document
      .querySelector('.APP')
      .insertBefore(this.pixi.view, document.querySelector('.wrapper'));
  }

  render() {
    return (
      <div className='APP'>
        <div className='wrapper'>
          <header>
            <span>LOGO</span>
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
                render={() => <Home bounds={bounds} pixi={this.pixi} />}
              />
              <Route
                path='/collections/:id'
                render={() => <Collection bounds={bounds} pixi={this.pixi} />}
              />
            </Switch>
          </Suspense>

          <footer>
            <div className='slider_numbers'>1 / 4</div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
