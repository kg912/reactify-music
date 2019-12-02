import { createAction } from 'redux-actions';

// auth actions
export const SET_AUTH_TOKEN = 'app/SET_AUTH_TOKEN';
export const LOGOUT = 'app/LOGOUT';

const setTokenInfo = createAction(SET_AUTH_TOKEN);

const logout = createAction(LOGOUT);

export default {
  setTokenInfo,
  logout
};
