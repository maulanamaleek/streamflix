import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Details from './pages/Details';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/details" component={Details} />
        </Switch>
      </Router>
    </div>
  );
}
