import { SettingState } from './settings/types';

interface Modules {
  modules: {
    settings: SettingState['state'];
  };
}

type RootSelector = (state: Modules) => any;

interface ModuleTypes {
  state: Modules;
  rootSelector: RootSelector;
}
export default ModuleTypes;
