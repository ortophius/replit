import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import '../styles/style.scss';
import Home from './components/home/Home';
import Project from './components/project/Project';

export default function App() {
  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/project" component={Project} />
        </Switch>
        <Redirect from="/" to="/project" />
      </div>
    </Router>
  );
}
