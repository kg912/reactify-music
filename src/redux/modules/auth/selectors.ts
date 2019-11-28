import { AuthState } from './types';

const getAuthState: AuthState['rootSelector'] = ({ modules }) => modules.auth;

export const getIsAuthenticated = (state: AuthState['moduleState']) =>
  getAuthState(state).isAuthenticated;

export default {
  getIsAuthenticated
};
