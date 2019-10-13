export interface State {
  accent: string;
}

export interface SettingState {
  state: State;
  reducer: (state: object, action: { payload: State }) => State;
}
