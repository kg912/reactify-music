import capitalize from './capitalize';
import { REGEX } from 'utils/constants';

type IndexedObject = { [s: string]: string };
type CustomFunction = (obj: IndexedObject) => IndexedObject;

export const toCamelCase = (key = '') => {
  const [first, ...rest] = key.split(REGEX.SYMBOL);
  return [first, rest.map(capitalize)].join('');
};

const toCamelCaseObject: CustomFunction = (obj: IndexedObject) => {
  try {
    return Object.keys(obj).reduce(
      (acc, key = '') => ({
        ...acc,
        [toCamelCase(key)]: obj[key]
      }),
      {}
    );
  } catch (_) {
    return obj;
  }
};

export default toCamelCaseObject;
