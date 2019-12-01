import { TokenInfo } from 'types';

import ModuleTypes from '../moduleTypes';

export interface State {
  isAuthenticated: boolean;
  authToken: string;
  expiresIn: string;
  tokenType: string;
}

export interface AuthState {
  state: State;
  moduleState: ModuleTypes['state'];
  reducer: (state: object, action: { payload: any }) => State;
  rootSelector: (state: ModuleTypes['state']) => State;
}

export interface setAuthTokenAction {
  payload: TokenInfo;
}
