const customFilter = (value: unknown) => value || false;

const hasValidValues = (obj = {}) => {
  return Object.values(obj).filter(Boolean).length > 0;
};

export default hasValidValues;
