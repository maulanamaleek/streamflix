import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Collection, Details, Main } from './pages';
import MovieProvider from './utils/MovieContext';

export default function App() {
  return (
    <div>
      <MovieProvider>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/page/:page" component={Main} />
          <Route path="/collection" component={Collection} />
          <Route path="/:movieID/:slug" component={Details} />
        </Switch>
      </MovieProvider>
    </div>
  );
}
