import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppContainer from 'views/AppContainer';
import Login from 'views/LoginPage/LoginPage';
import Root from 'redux/Root';

const App: React.FC = () => {
  return (
    <Root initialState={{}}>
      <BrowserRouter>
        <AppContainer />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </Root>
  );
};

export default App;
