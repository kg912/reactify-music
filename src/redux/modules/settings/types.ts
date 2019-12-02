import { AccentType } from 'utils/constants';

export interface State {
  accent: AccentType;
}

export interface SettingState {
  state: State;
  reducer: (state: object, action: { payload: State }) => State;
}
