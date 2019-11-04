import React from 'react';
import ReactGA from 'react-ga';

import Routes from './Routes';
import Header from './components/Header';

ReactGA.initialize('UA-119974867-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => (
  <div>
    <Header />
    <Routes />
  </div>
);

export default App;
