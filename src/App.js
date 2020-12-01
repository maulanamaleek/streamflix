import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Collection, Details, Main } from './pages';
import MovieProvider from './utils/MovieContext';

export default function App() {
  return (
    <div>
      <MovieProvider>
        <Switch>
          <Route path="/page/:page" component={withRouter(Main)} />
          <Route path="/collection" component={Collection} />
          <Route exact path="/:movieID/:slug" component={Details} />
          <Route exact path="/" component={withRouter(Main)} />
        </Switch>
      </MovieProvider>
    </div>
  );
}
