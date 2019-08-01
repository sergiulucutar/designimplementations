import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

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
      <menu
        className={this.state.menuActive ? "menu menu-displayed" : "menu"}
        >
        <a href="">Home</a>
        <a href="">About</a>
      </menu>
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
