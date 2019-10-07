const capitalize = (str = '') => {
  const chars = str.trim().split('');

  if (chars.length > 0) {
    const [first, ...rest] = chars;

    return [first.toUpperCase(), ...rest].join('');
  }

  return str;
};

export default capitalize;
