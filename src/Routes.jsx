import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';

const Routes = () => (
  <Switch>
    <Route path="/">
      <Home />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Routes;
