const joinArray = (...args: string[]) =>
  args.reduce((acc, curr) => {
    if (!curr) {
      return acc;
    }

    return `${acc} ${curr}`;
  }, '');

export default joinArray;
