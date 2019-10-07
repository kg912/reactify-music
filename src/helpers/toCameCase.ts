import capitalize from './capitalize';

type IndexedObject = { [s: string]: string };
type CustomFunction = (obj: IndexedObject) => IndexedObject;

const toCamelCase: CustomFunction = (obj: IndexedObject) => {
  try {
    return Object.keys(obj).reduce((acc, key = '') => {
      const [first, ...rest] = key.split('-');

      const finalKey = [first, rest.map(capitalize)].join('');

      return {
        ...acc,
        [finalKey]: obj[key]
      };
    }, {});
  } catch (_) {
    return obj;
  }
};

export default toCamelCase;
