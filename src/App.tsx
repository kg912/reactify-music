import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from 'views/AppContainer';
import Login from 'views/LoginPage';
import Home from 'views/Home/Home';
import Root from 'redux/Root';

const App: React.FC = () => {
  return (
    <Root initialState={{}}>
      <Router>
        <AppContainer />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Router>
    </Root>
  );
};

export default App;
