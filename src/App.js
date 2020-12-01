import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Collection, Details, Main } from './pages';
import MovieProvider from './utils/MovieContext';

export default function App() {
  return (
    <div>
      <MovieProvider>
        <Router>
          <Switch>
            <Route path="/page/:page" component={Main} />
            <Route path="/collection" component={Collection} />
            <Route path="/:movieID/:slug" component={Details} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </MovieProvider>
    </div>
  );
}
