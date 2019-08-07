import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/home/Home';
import About from './pages/About';
import { Menu } from './components/menu/menu';

// const Home = lazy(() => import('./pages/Home'));
// const About = lazy(() => import('./pages/About'));

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menuActive: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      menuActive: !this.state.menuActive
    });
  }

  render() {
    return (
      <section className="page">
        <button className="menu_button" onClick={this.toggleMenu}>Menu</button>
        <Menu active={this.state.menuActive} />
        <Router>
          <Suspense fallback={<div>Loading...</div>} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </section>
    );
  }
}

render(<App />, document.querySelector('#root'));
