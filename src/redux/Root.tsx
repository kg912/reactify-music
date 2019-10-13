import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';

import { rootReducer } from './reducer';

interface Props {
  children: React.ReactNode;
  initialState: object;
}

const Root: React.FC<Props> = ({ children, initialState }) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(ThunkMiddleware)
  );

  return <Provider store={store}>{children}</Provider>;
};

export default Root;
