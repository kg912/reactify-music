import { handleActions } from 'redux-actions';

import { SET_AUTH_TOKEN } from './actions';

import { AuthState } from './types';

const initialState: AuthState['state'] = {
  authToken: '',
  expiresIn: '',
  tokenType: '',
  isAuthenticated: false
};

const setAuthToken: AuthState['reducer'] = (_, action) => ({
  ...initialState,
  ...action.payload.data,
  isAuthenticated: true
});

const reducer = handleActions(
  {
    [SET_AUTH_TOKEN]: setAuthToken
  },
  initialState
);

export default reducer;
