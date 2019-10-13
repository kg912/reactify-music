import { ACCENTS, COLORS } from 'utils/constants';

const getColorFromAccent = (accent: string) => {
  // @ts-ignore
  return COLORS[accent];
};

export default getColorFromAccent;
