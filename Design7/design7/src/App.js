import './App.scss';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Stage } from 'react-pixi-fiber';

import CanvasHome from './canvas/Home/Home';
import CanvasCollection from './canvas/collection/Collection';

const Home = lazy(() => import('./routes/home/Home.js'));
const Collection = lazy(() => import('./routes/collection/Collection'));

const bounds = {
  width: document.body.offsetWidth,
  height: document.body.offsetHeight
};
const OPTIONS = {
  backgroundColor: 0x6d696a,
  height: bounds.height,
  width: bounds.width,
  antialias: true
};

class App extends React.Component {
  render() {
    return (
      <div className='APP'>
        <Stage options={OPTIONS}>
          <Router>
            <Suspense>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <CanvasHome bounds={bounds}></CanvasHome>}
                />
                <Route path='/collections/:id'>
                  <CanvasCollection bounds={bounds}></CanvasCollection>
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </Stage>

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

          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/collections/:id' component={Collection} />
              </Switch>
            </Suspense>
          </Router>

          <footer>
            <div className='slider_numbers'>1 / 4</div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
