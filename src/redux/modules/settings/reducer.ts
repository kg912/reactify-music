import { handleActions } from 'redux-actions';

import { SettingState } from './types';
import { SET_ACCENT } from './actions';

const initialState: SettingState['state'] = {
  accent: 'teal'
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
