export const getEnvVariable = (key = '') =>
  process.env[`REACT_APP_${key.toUpperCase().replace('-', '_')}`];

export const getEnvVariables = (list: string[]) =>
  list.reduce(
    (acc, key) => ({
      ...acc,
      [key]: getEnvVariable(key)
    }),
    {}
  );
