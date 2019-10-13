import { createAction } from 'redux-actions';

// settings actions
export const SET_ACCENT = 'app/SET_ACCENT';
export const SET_SETTINGS = 'app/SET_SETTINGS';

const setSettings = createAction(SET_SETTINGS);
const setAccent = createAction(SET_ACCENT);

export default {
  setAccent,
  setSettings
};
