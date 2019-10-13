import forEach from 'lodash/forEach';

// Exporting root state selectors for our modules so the
// components don't have to know about the state shape.
const createAndAddRootSelector = (
  module: any,
  moduleName: any,
  mountPoint: any
) => {
  const setRootSelector =
    (module.selectors && module.selectors.setRootSelector) ||
    module.setRootSelector;

  if (!setRootSelector) {
    return;
  }

  if (mountPoint) {
    setRootSelector((state: any) => state[mountPoint][moduleName]);
  } else {
    setRootSelector((state: any) => state[moduleName]);
  }
};

const registerModules = (modules: any, mountPoint: any) => {
  forEach(modules, (module, moduleName) =>
    createAndAddRootSelector(module, moduleName, mountPoint)
  );
};

export default registerModules;
