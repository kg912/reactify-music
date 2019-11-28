import { toCamelCase } from 'helpers';

const getHash: () => any = () => {
  const { location: { hash = '' } = {} } = window;

  const params = hash.substring(1).split('&');

  return params.reduce((acc, curr) => {
    const [key, value] = (curr || '').split('=');

    if (!key || !value) {
      return acc;
    }

    return {
      ...acc,
      [toCamelCase(key)]: decodeURIComponent(value)
    };
  }, {});
};

export default getHash;
