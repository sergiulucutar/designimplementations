import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const customHistory = createBrowserHistory({
  // basename: config.urlBasename || ""
});

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Route
        component={({ history }) => {
          window.appHistory = history;
          return <App />;
        }}
      />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
