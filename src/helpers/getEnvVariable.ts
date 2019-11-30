export const getEnvVariable = (key = '') =>
  process.env[`${key.toUpperCase().replace('-', '_')}`];

export const getEnvVariables = (list: string[]) =>
  list.reduce(
    (acc, key) => ({
      ...acc,
      [key]: getEnvVariable(key)
    }),
    {}
  );
