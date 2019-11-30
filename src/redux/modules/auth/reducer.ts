import { handleActions } from 'redux-actions';
import SpotifyService from 'services/SpotifyService';

import { SET_AUTH_TOKEN, LOGOUT } from './actions';

import { AuthState } from './types';
import { DefaultAction } from 'redux/modules/moduleTypes';

const initialState: AuthState['state'] = {
  authToken: '',
  expiresIn: '',
  tokenType: '',
  isAuthenticated: false
};

const setAuthToken: AuthState['reducer'] = (_, action: DefaultAction) => {
  const { payload } = action;

  SpotifyService.setToken(payload);

  return {
    ...initialState,
    ...payload,
    isAuthenticated: true
  };
};

const logoutFromApp: AuthState['reducer'] = () => {
  SpotifyService.clearToken();

  return {
    ...initialState
  };
};

const reducer = handleActions(
  {
    [SET_AUTH_TOKEN]: setAuthToken,
    [LOGOUT]: logoutFromApp
  },
  initialState
);

export default reducer;
