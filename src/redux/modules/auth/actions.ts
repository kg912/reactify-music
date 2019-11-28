import { createAction } from 'redux-actions';

// auth actions
export const SET_AUTH_TOKEN = 'app/SET_AUTH_TOKEN';

const setTokenInfo = createAction(SET_AUTH_TOKEN);

export default {
  setTokenInfo
};
