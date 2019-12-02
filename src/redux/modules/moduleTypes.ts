import { SettingState } from './settings/types';
import { AuthState } from './auth/types';

interface Modules {
  modules: {
    auth: AuthState['state'];
    settings: SettingState['state'];
  };
}

export interface DefaultAction {
  payload: object;
}

type RootSelector = (state: Modules) => any;

interface ModuleTypes {
  state: Modules;
  rootSelector: RootSelector;
}
export default ModuleTypes;
