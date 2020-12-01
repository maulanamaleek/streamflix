import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Collection, Details, Main } from './pages';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/collection" component={Collection} />
          <Route path="/:movieID/:slug" component={Details} />
        </Switch>
      </Router>
    </div>
  );
}
