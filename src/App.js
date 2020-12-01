import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Collection, Details, Main } from './pages';
import MovieProvider from './utils/MovieContext';

export default function App() {
  return (
    <div>
      <MovieProvider>
        <Switch>
          <Route path="/page/:page" component={Main} />
          <Route path="/collection" component={Collection} />
          <Route exact path="/:movieID/:slug" component={Details} />
          <Route exact path="/" component={Main} />
        </Switch>
      </MovieProvider>
    </div>
  );
}
