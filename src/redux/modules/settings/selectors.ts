import ModuleTypes from '../moduleTypes';

const getSettingsState: ModuleTypes['rootSelector'] = ({ modules }) =>
  modules.settings;

export const getAccent = (state: ModuleTypes['state']) =>
  getSettingsState(state).accent;

export default {
  getAccent
};
