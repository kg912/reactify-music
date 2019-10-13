import { handleActions } from 'redux-actions';

import { ACCENTS } from 'utils/constants';

import { SettingState } from './types';
import { SET_ACCENT } from './actions';

const initialState: SettingState['state'] = {
  accent: ACCENTS.TEAL
};

const setAccent: SettingState['reducer'] = (_, action) => ({
  ...initialState,
  accent: action.payload.accent
});

const reducer = handleActions(
  {
    [SET_ACCENT]: setAccent
  },
  initialState
);

export default reducer;
