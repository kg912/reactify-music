import React from 'react';

import Root from 'redux/Root';

import AppContainer from './AppContainer';

const App: React.FC = () => {
  return (
    <Root initialState={{}}>
      <AppContainer />
    </Root>
  );
};

export default App;
