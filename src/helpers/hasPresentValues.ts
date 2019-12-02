const customFilter = (value: unknown) => value ?? false;

const hasPresentValues = (obj = {}) => {
  return Object.values(obj).filter(customFilter).length > 0;
};

export default hasPresentValues;
